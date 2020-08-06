import React, {Component} from 'react';
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
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

function PaymentTab({navigation}) {
  return (
    <Container>
      <Header>
        <Left>
          <Button>
            <Icon
              name="reorder"
              style={{fontSize: 30, color: 'white'}}
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          </Button>
        </Left>
        <Body>
          <Title style={{textTransform: 'capitalize'}}>Payments</Title>
        </Body>
        <Right>
        <Icon name='money' style={{fontSize: 30, color: '#92d26b'}} />
        </Right>
      </Header>
    </Container>
  );
}

export default PaymentTab;
