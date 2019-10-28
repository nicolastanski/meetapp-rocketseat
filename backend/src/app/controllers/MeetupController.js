import { Op } from 'sequelize';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';
import * as Yup from 'yup';
import { parseISO, isBefore, startOfDay, endOfDay } from 'date-fns';

class MeetupController {
  async index(req, res) {
    const { date, page = 1 } = req.query;

    const parseDate = parseISO(date);

    const meetups = await Meetup.findAll({
      where: {
        date: {
          [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)],
        }
      },
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url']
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        }
      ],
      attributes: ['id', 'title', 'description', 'location', 'date'],
      limit: 10,
      offset: (page - 1 ) * 10,
    });

    return res.json(meetups);
  }

  async store(req, res) {

    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { banner_id, title, description, location, date } = req.body;
    const user_id = req.userId;

    const dateStart = startOfDay(parseISO(date));

    if (isBefore(dateStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted'});
    }

    const banner = await File.findByPk(banner_id);

    if (!banner) {
      return res.status(401).json({ error: 'Banner not found' });
    }

    const meetup = await Meetup.create({
      user_id,
      banner_id,
      title,
      description,
      location,
      date,
    });

    return res.json(meetup);
  }

  async update(req, res) {

    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const  user_id = req.userId;
    const { id } = req.params;
    const { date } = req.body;

    const meetup = await Meetup.findOne({ where: {
      id,
      user_id
      },
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url']
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        }
      ],
    });

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup not found' });
    }

    const dateStart = startOfDay(parseISO(date));

    if (isBefore(dateStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted'});
    }

    await meetup.update(req.body);

    return res.json(meetup);

  }

  async show(req, res) {
    const id = req.params.id

    const meetup = await Meetup.findByPk(id, {
      attributes: ['id', 'title', 'description', 'location', 'date'],
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url']
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        }
      ],
    });

    if (!meetup) {
      return res.status(401).json({ error: 'Meetup not found' });
    }

    return res.json(meetup);
  }

  async delete(req, res) {
    const { id } = req.params;

    const meetup = await Meetup.findByPk(id);

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup not found' });
    }

    if (meetup.user_id !== req.userId) {
      return res.status(401).json({ error: "You don't have permission to cancel this meetup" });
    }

    await meetup.destroy();

    return res.json({ message: 'The Meetup has been deleted successfully' });
  }

  async myMeetups(req, res) {

    const meetups = await Meetup.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url']
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        }
      ],
      attributes: ['id', 'title', 'description', 'location', 'date'],
    });

    return res.json(meetups);
  }

}

export default new MeetupController();
