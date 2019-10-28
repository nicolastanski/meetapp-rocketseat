import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

export default function SignIn() {
  const dispatch = useDispatch();

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  const schema = Yup.object().shape({
    email: Yup.string().email('Informe um e-mail válido').required('O campo E-mail é obrigatório'),
    password: Yup.string().min(6, 'A senha deve conter no mínimo 6 caracteres').required('O campo Senha é obrigatório'),
  });

  return (
    <>
      <img src={logo} alt="MeetApp" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input type="text" name="email" placeholder="Digite seu e-mail"/>
        <Input type="password" name="password" placeholder="Sua senha secreta"/>

        <button type="submit">Entrar</button>

        <Link to="/register">
          Criar conta grátis
        </Link>
      </Form>
    </>
  );
}
