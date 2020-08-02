import React, {useEffect} from 'react';
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
import {Alert} from 'react-native';

function LandingTab({route, navigation}) {
  const {param} = route.params;
  param.isLoggedIn = true;

  useEffect(() =>
    navigation.addListener('beforeRemove', (e) => {
      if (param.isLoggedIn) {
        param.isLoggedIn = false;
        e.preventDefault();
        Alert.alert('Log out?', 'You are about to Log out!', [
          {text: 'Do not leave', style: 'cancel', onPress: () => {}},
          {
            text: 'Log Out',
            style: 'destructive',
            onPress: () => navigation.reset({
              index:0,
              routes:[{name:'auth'}]
            }),
          },
        ]);
      }
    }),
  );

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
          <Title style={{textTransform: 'capitalize'}}>{param.selected}</Title>
        </Body>
        <Right />
      </Header>

      <Content padder>
        <Card
          style={{
            height: 600,
            justifyContent: 'space-around',
            borderRadius: 5,
          }}>
          <CardItem style={{alignSelf: 'center'}} header>
            <Text style={{fontWeight: 'bold', fontSize: 35}}>
              {param.username}{' '}
            </Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Registration ID : </Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Doctor : </Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Caretaker : </Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Room Number : </Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Status : </Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
}

export default LandingTab;
