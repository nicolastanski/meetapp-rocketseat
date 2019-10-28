import { Op } from 'sequelize';
import Subscription from '../models/Subscription';
import { isAfter, startOfDay, isEqual } from 'date-fns';

import Mail from '../../lib/Mail';
import User from '../models/User';
import Meetup from '../models/Meetup';
import File from '../models/File';

class SubscriptionController {
  async index(req, res) {

    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          attributes: ['id', 'title', 'description', 'location', 'date'],
          where: {
            date: {
              [Op.gt]: startOfDay(new Date())
            }
          },
          order: ['date'],
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
            },
          ],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    const { id } = req.params;

    const meetup = await Meetup.findOne({
      where: {
        id,
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
      return res.status(400).json({ error: 'Meetups not found for you' });
    }

    if (meetup.user_id === req.userId) {
      return res.status(400).json({ error: 'You cant\'t subscribe in your own meetup' });
    }

    const { date } = meetup;

    if (isAfter(new Date(), date)) {
      return res.status(400).json({ error: 'This meetup already past' });
    }

    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          attributes: ['id', 'date'],
        },
      ]
    });

    subscriptions.map(subscription => {

      if (subscription.meetup_id == meetup.id && subscription.user_id === req.userId) {
        return res.status(400).json({ error: 'You already registered in this meetup!' });
      }

      if (isEqual(subscription.meetup.date, date)) {
        return res.status(401).json({ error: 'You already subscribed to a meetup at the same time' });
      }
    });

    const newSubscription = await Subscription.create({
      meetup_id: id,
      user_id: req.userId,
    });

    await Mail.sendMail({
      to: `${meetup.user.name} <${meetup.user.email}>`,
      subject: 'Confirmação de Inscrição',
      template: 'teste',
      context: {
        user: 'Nicolas',
        // date: format(meetup.date, "'dia' dd 'de' MMMM', às' H:mm'h'", {
        //   locale: pt,
        // })
      }
    });

    return res.json(newSubscription);

  }

  async delete(req, res) {
    const { id } = req.params;

    const subscription = await Subscription.findOne({
      where: {
        meetup_id: id,
        user_id: req.userId,
      }
    });

    console.log(subscription);

    if (!subscription) {
      return res.status(401).json({ error: 'Subscription not found' });
    }

    if (subscription.user_id !== req.userId) {
      return res.status(401).json({ error: 'Just the user can cancel the subscription' });
    }

    await subscription.destroy();

    return res.json(subscription);

  }
}

export default new SubscriptionController();
