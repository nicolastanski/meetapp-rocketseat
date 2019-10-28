import React from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { API_URL } from 'react-native-dotenv';

import api from '~/services/api';

import {
  Container,
  Meetup,
  MeetupDescription,
  Banner,
  Title,
  InfoMeetup,
  InfoText,
  SubscribeButton,
} from './styles';

export default function MeetupItem({item, subscription, navigation}) {

  async function handleSubscribe(id) {

    try {
      const response = await api.post(`subscriptions/${id}`);

      Alert.alert('Sucesso', 'Inscrição realizada com sucesso');
    } catch (err) {
      Alert.alert('Erro', 'Ocorreu um erro ao realizar a inscrição');
    }

    navigation.navigate('Subscriptions');
  }

  async function handleCancelSubscribe(id) {

    try {
      const response = await api.delete(`subscriptions/${id}`);

      Alert.alert('Sucesso', 'Inscrição cancelada com sucesso');
    } catch (err) {
      Alert.alert('Erro', 'Ocorreu um erro ao cancelar a inscrição');
    }

    navigation.navigate('Subscriptions');
  }

  return (
    <Container>
      <Meetup>
        <Banner
            source={{
              uri: item.banner ? `${API_URL}/files/${item.banner.path}` : '',
            }}
          />
        <MeetupDescription>
          <Title>{item.title}</Title>
          <InfoMeetup>
            <Icon name="insert-invitation" size={20} />
            <InfoText>{item.date}</InfoText>
          </InfoMeetup>
          <InfoMeetup>
            <Icon name="location-on" size={20} />
            <InfoText>{item.location}</InfoText>
          </InfoMeetup>
          <InfoMeetup>
            <Icon name="person" size={20} />
            <InfoText>{item.user.name}</InfoText>
          </InfoMeetup>
        </MeetupDescription>
        { subscription ? (
          <SubscribeButton onPress={() => handleSubscribe(item.id)}>
            Realizar Inscrição
          </SubscribeButton>
        ) : (
          <SubscribeButton onPress={() => handleCancelSubscribe(item.id)}>
            Cancelar Inscrição
          </SubscribeButton>
        )}
      </Meetup>
    </Container>
  );
}
