import React, { useEffect, useState, useMemo } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, addDays, subDays } from 'date-fns';
import { pt } from 'date-fns/locale';

import Background from '~/components/Background';
import MeetupItem from '~/components/MeetupItem';
import Button from '~/components/Button';

import api from '~/services/api';

import {
  Container,
  MeetupsList,
  DateShow,
  DateNavigator,
} from './styles';

export default function Dashboard({ navigation }) {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());

  const formattedDate = useMemo(
    () => format(date, "d 'de' MMMM'", { locale: pt }),
    [date]
  );

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups', {
        params: {
          date
        }
      });

      const meetupsFormated = response.data.map(data => ({
        ...data,
        date: format(date, "d 'de' MMMM 'às' hh'h'", { locale: pt }),
      }));

      setMeetups(meetupsFormated);

    }
    loadMeetups();

  }, [date]);

  function changeDate(isAdd) {
    if (isAdd) {
      setDate(addDays(date, 1));
    } else {
      setDate(subDays(date, 1));
    }
  }

  return (
    <Background>
      <Container>
        <DateNavigator>
          <Icon name="chevron-left" size={40} color="#FFF" onPress={() => changeDate(false)} />
          <DateShow>{formattedDate}</DateShow>
          <Icon name="chevron-right" size={40} color="#FFF" onPress={() => changeDate(true)} />
        </DateNavigator>
        <MeetupsList
          data={meetups}
          keyExtractor={meetup => String(meetup.id)}
          renderItem={({ item }) => (
            <MeetupItem item={item} subscription />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = ({ navigation }) => ({
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
});
