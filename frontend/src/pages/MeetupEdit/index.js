import React, { useEffect, useState }from 'react';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';

import api from '~/services/api';

import { Container } from './styles';

export default function MeetupEdit({ match, history }) {
  const [meetup, setMeetup] = useState('');

  const schema = Yup.object().shape({
    banner_id: Yup.string().required('Campo Obrigatório'),
    title: Yup.string().required('Campo Obrigatório'),
    description: Yup.string().required('Campo Obrigatório'),
    date: Yup.string().required('Campo Obrigatório'),
    location: Yup.string().required('Campo Obrigatório'),
  });

  useEffect((data) => {
    async function loadMeetup() {
      const response = await api.get(`/meetups/${match.params.id}`);

      setMeetup(response.data);
    }

    loadMeetup();

  }, []);

  async function handleUpdate(data) {

    console.log(data);

    try {
      const { id } = data;
      const response = await api.put(`/meetups/${id}`, data);

      toast.success('Atualização realizada com sucesso');

    } catch (err) {
      toast.error('Ocorreu um problema em atualizar o Meetup');
    }

  }

  return (
    <Container>

      <Form  initialData={meetup} onSubmit={handleUpdate}>

        <Input type="hidden" name="id" />
        <Input type="text" name="title" placeholder="Título do Meeetup" />
        <Input type="text" name="description" placeholder="Descrição completa" multiline />
        <Input type="text" name="date" placeholder="Data do Meeetup" />
        <Input type="text" name="location" placeholder="Localização" />

        <button type="submit"><MdAddCircleOutline size={20} />Salvar meetup</button>

      </Form>

    </Container>
  );
}
