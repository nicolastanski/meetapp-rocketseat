import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { signUpRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/logo.png';

export default function SignUp() {

  const dispatch = useDispatch();

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  const schema = Yup.object().shape({
    name: Yup.string().required('O campo Nome é obrigatório'),
    email: Yup.string().email('Informe um e-mail válido').required('O campo E-mail é obrigatório'),
    password: Yup.string().min(6, 'A senha deve conter no mínimo 6 dígitos').required('O campo Senha é obrigatório'),
  });

  return (
    <>
      <img src={logo} alt="MeetApp" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input type="text" name="name" placeholder="Nome completo"/>
        <Input type="text" name="email" placeholder="Digite seu e-mail"/>
        <Input type="password" name="password" placeholder="Sua senha secreta"/>

        <button type="submit">Cadastrar</button>
        <Link to="/">
          Já tenho login
        </Link>
      </Form>
    </>
  );
}
