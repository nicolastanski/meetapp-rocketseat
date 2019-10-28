import React from 'react';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import BannerInput from './BannerInput';

import { Container } from './styles';

export default function MeetupNew() {

  const schema = Yup.object().shape({
    banner_id: Yup.string().required('Campo Obrigatório'),
    title: Yup.string().required('Campo Obrigatório'),
    description: Yup.string().required('Campo Obrigatório'),
    date: Yup.string().required('Campo Obrigatório'),
    location: Yup.string().required('Campo Obrigatório'),
  });

  async function handleSubmit(data) {

    const response = await api.post('/meetups', data);

    toast.success('Cadastro realizado com sucesso');

    history.push('/');

  }

  return (
    <Container>

      <Form schema={schema} onSubmit={handleSubmit}>

        <BannerInput name="banner_id" />

        <Input type="text" name="title" placeholder="Título do Meeetup" />
        <Input type="text" name="description" placeholder="Descrição completa" multiline />
        <Input type="text" name="date" placeholder="Data do Meeetup" />
        <Input type="text" name="location" placeholder="Localização" />

        <button type="submit"><MdAddCircleOutline size={20} />Salvar meetup</button>

      </Form>

    </Container>
  );

}
