import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  const { email, password } = payload;

  try {

    const response = yield call(api.post, 'auth', {
      email,
      password
    });

    const { token, user } = response.data;

    yield put(signInSuccess(token, user));

    api.defaults.headers.Authorization = `Bearer ${token}`;

    history.push('/');

  } catch (err) {
    toast.error('Usuário e/ou senha incorretos!');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {

  const { name, email, password } = payload;

  try {

    yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    toast.success('Usuário criado com sucesso!');

    history.push('/');

  } catch (err) {
    toast.error('Occorreu um erro ao tentar cadastrar o usuário, tente novamente!');
    yield put(signFailure());
  }

}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
