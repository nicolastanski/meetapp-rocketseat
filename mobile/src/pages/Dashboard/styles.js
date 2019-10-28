import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const MeetupsList = styled.FlatList`
  margin-top: 60px;
  padding: 0 20px;
`;

export const DateShow = styled.Text`
  font-size: 24px;
  color: #FFF;
  font-weight: bold;
  margin: 0 10px;
`;


export const DateNavigator = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
