import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'auth', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (!response) {
      Alert.alert('Erro no login', 'O usuário não encontrado');
    }

    yield put(signInSuccess(token, user));

    api.defaults.headers.Authorization = `Bearer ${token}`;

  } catch (err) {
    Alert.alert('Falha na autenticação', 'Ocorreu um erro no login');
    yield put(signFailure());
  }
}

export function* signUp({ payload, navigation }) {
  const { name, email, password } = payload;

  try {
    yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    Alert.alert('Sucesso!', 'Cadastro realizado com sucesso');

    navigation.navigate('SignIn');
  } catch (err) {
    Alert.alert('Falha no cadastro', 'Ocorreu um erro ao realizar o cadastro');
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

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
