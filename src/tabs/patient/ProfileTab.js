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

function ProfileTab({navigation}) {
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
          <Title style={{textTransform: 'capitalize'}}>My Profile</Title>
        </Body>
        <Right>
        <Icon name='user' style={{fontSize: 30, color: 'white'}} /> 
        </Right>
      </Header>
    </Container>
  );
}

export default ProfileTab;
