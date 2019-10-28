import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';

import api from '~/services/api';

import { Container } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('/meetups/my-meetups');

      const meetupsFormatted = response.data.map(meetup => ({
        ...meetup,
        date: format(parseISO(meetup.date), "d 'de' MMMM 'às' hh'h'", { locale: pt }),
      }));

      setMeetups(meetupsFormatted);
    }

    loadMeetups();
  }, []);

  return (
    <Container>
      <header>
        <h1>Meus meetups</h1>
        <Link to="meetups/new">
          <button type="button"><MdAddCircleOutline size={20} />Nova Meetup</button>
        </Link>
      </header>

      <ul>
        { meetups.map(meetup => (
          <Link to={`meetups/${meetup.id}`}>
            <li>
            <strong>{meetup.title}</strong>
            <span>{meetup.date}</span>
            <MdChevronRight size={24} />
            </li>
          </Link>
        )) }
      </ul>
    </Container>
  );
}
