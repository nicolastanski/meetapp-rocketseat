import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Meetup = styled.View`
  margin: 20px 0;
  background: #FFF;
`;

export const MeetupDescription = styled.View`
  padding: 0 24px;
`;

export const Banner = styled.Image`
  width: 100%;
  min-height: 200px;
  border-radius: 4px;
`;

export const Title = styled.Text`
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
`;

export const InfoMeetup = styled.View`
  font-size: 13px;
  color: #999999;
  margin: 8px 0;

  flex-direction: row;
`;

export const InfoText = styled.Text`
  margin-left: 10px;
`;

export const SubscribeButton = styled(Button)`
  margin: 20px;
`;
