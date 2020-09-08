import React from 'react';
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  Card,
  CardItem,
  Right,
  Left,
  Text,
  Button,
  Badge,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';



export default function PatientViewTab({route, navigation}) {
  const {name} = route.params;


  return (
    <Container>
      <Header noLeft>
        <Left />
        <Body>
          <Title style={{textTransform: 'capitalize'}}>Patient</Title>
        </Body>
        <Right>
          <Icon name="bed" style={{fontSize: 30, color: '#e4e213'}} />
        </Right>
      </Header>

      <Content>
        <Text> {name} </Text>
      
      </Content>
    </Container>
  );
}
