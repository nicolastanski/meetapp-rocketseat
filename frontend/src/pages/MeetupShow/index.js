import React, { useState, useEffect } from 'react';
import { MdEdit, MdDeleteForever, MdPlace, MdInsertInvitation } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';

import api from '~/services/api';

import history from '~/services/history';

import { Container } from './styles';
import { toast } from 'react-toastify';

export default function MeetupShow({ match, history }) {

  const [meetup, setMeetup] = useState('');

  useEffect(() => {
    async function loadMeetup() {
      const response = await api.get(`/meetups/${match.params.id}`)

      const meetupFormatted = {
        ...response.data,
        date: format(parseISO(response.data.date), "d 'de' MMMM 'às' hh'h'", { locale: pt }),
      };

      setMeetup(meetupFormatted);
    }

    loadMeetup();
  }, []);

  async function handleCancel() {

    try {
      await api.delete(`/meetups/${match.params.id}`);

      toast.success('Evento cancelado com sucesso');

      history.push('/');

    } catch (err) {
      toast.error('Ocorreu um erro ao cancelar o evento');
    }
  }

  async function handleEdit(id) {
    try {

      history.push(`/meetups/${id}/edit`);

    } catch (err) {
      toast.error('Ocorreu um erro ao tentar editar o evento');
    }
  }

  return (
    <Container>

      <header>
        <h1>{meetup.title}</h1>
        <div>
          <button type="button" className="edit-btn" onClick={() => handleEdit(meetup.id)} ><MdEdit />Editar</button>
          <button type="button" onClick={() => handleCancel}><MdDeleteForever />Cancelar</button>
        </div>
      </header>

      <img src={meetup.banner ? meetup.banner.url : '' } alt={meetup.title}  width="100%" />

      <p>{meetup.description}</p>

      <footer>
        <div>
          <MdPlace size={20} />
          <span>
            {meetup.date}
          </span>
        </div>

        <div>
          <MdInsertInvitation size={20} />
          <span>
            {meetup.location}
          </span>
        </div>
      </footer>

    </Container>
  );

}
