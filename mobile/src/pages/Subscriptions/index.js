import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import MeetupItem from '~/components/MeetupItem';

import api from '~/services/api';

import { Container, SubscriptionsList } from './styles';

export default function Subscriptions({ navigation }) {
  const [subscriptions, setSubscriptions] = useState([]);
  useEffect(() => {
    async function loadSubscriptions() {
      const response = await api.get('subscriptions');
      setSubscriptions(response.data);
    }
    loadSubscriptions();
  }, []);

  return (
    <Background>
      <Container>
        <SubscriptionsList
          data={subscriptions}
          keyExtractor={subscription => String(subscription.id)}
          renderItem={({ item }) => (
            <MeetupItem item={item.meetup} />
          )}
        />
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = ({ navigation }) => ({
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
});
