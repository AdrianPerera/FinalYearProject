import React, { useEffect, useState } from 'react';
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
import { Alert, StyleSheet, View, Image, FlatList } from 'react-native';
import Img from '../../images/profile_pic.png';


function LandingTab({ route, navigation }) {
  const { param } = route.params;
  const [token, setToken] = useState(param.auth_token);
  const [phoneNumber, setPhoneNumber] = useState('')
  const [details, setDetails] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [carers, setCarers] = useState([]);
  param.isLoggedIn = true;


  const getUserDetails = async () => {
    var headers = new Headers();
    headers.append("Authorization", "Token " + token);
    headers.append("Content-Type", "application/json");
    var requestOption = {
      method: 'GET',
      headers: headers,
    };

    await fetch('https://prevelcer.herokuapp.com/api/user/', requestOption)
      .then((response) => response.json())
      .then((details) => {
        setDetails(details)
      }).catch((error) => console.log('user details', error));


    await fetch('https://prevelcer.herokuapp.com/api/profile/', requestOption)
      .then((response) => response.json())
      .then((result) => {
        setPhoneNumber(result.phone_number)
      }).catch((error) => console.log('phone number , role', error));



    await fetch('https://prevelcer.herokuapp.com/api/show_connections/Doctor', requestOption)
      .then((response) => response.json())
      .then((doctors) => {
        setDoctors(doctors);
      }).catch((error) => console.log('Doctor retrieve', error));

    await fetch('https://prevelcer.herokuapp.com/api/show_connections/Carer', requestOption)
      .then((response) => response.json())
      .then((carers) => {
        setCarers(carers);
      }).catch((error) => console.log('Doctor retrieve', error));

    console.log(details);
    console.log(phoneNumber);
    console.log(doctors);
    console.log(carers);
  }

  const logOutHandler = () => {
    Alert.alert('Log out From Landing Tab?', 'You are about to Log out!', [
      { text: 'Cancel', style: 'cancel', onPress: () => { } },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: () => {
          param.isLoggedIn = false;
          navigation.reset({
            index: 0,
            routes: [{ name: 'auth' }],
          });
        },
      },
    ]);
  };

  //hardware backbutton prevent going back
  useEffect(() => {
    getUserDetails();
    navigation.addListener('beforeRemove', (e) => {
      if (param.isLoggedIn) {
        e.preventDefault();
        logOutHandler();
      }
    })
  }, []
  );

  return (
    <Container>
      <Header>
        <Left>
          <Button
            style={{ width: 50, justifyContent: 'center' }}
            onPress={() => navigation.toggleDrawer()}>
            <Icon name="reorder" style={{ fontSize: 30, color: 'white' }} />
          </Button>
        </Left>
        <Body>
          <Title style={{ textTransform: 'capitalize' }}>Patient</Title>
        </Body>
        <Right />
      </Header>

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image style={styles.avatar} source={Img} />

            <Text style={{ fontWeight: 'bold', fontSize: 35, color: 'white' }}>
              {details.first_name + " " + details.last_name}{' '}
            </Text>
          </View>
        </View>
      </View>

      <Content style={{ padding: 10 }}>
        <Card style={styles.card}>
          <CardItem>
            <Body style={{ flexDirection: 'row' }}>
              <Text style={{ flex: 1 }}> <Icon name="envelope" style={{ fontSize: 20, color: 'blacks' }} /> </Text>
              <Text style={{ flex: 4 }}>{details.email}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body style={{ flexDirection: 'row' }}>
              <Text style={{ flex: 1 }}> <Icon name="phone" style={{ fontSize: 20, color: 'black' }} /> </Text>
              <Text style={{ flex: 4 }}>{phoneNumber}</Text>
            </Body>
          </CardItem>

        </Card>

        <Card style={styles.card}>
          <CardItem>
            <Body style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text>
                  <Icon name="user-md" style={{ fontSize: 20, color: '#005affeb' }} />
                </Text>
              </View>
              <View style={{ flex: 4 }}>
                <FlatList
                  data={doctors}
                  keyExtractor={(item) => item.username}
                  renderItem={({ item }) =>
                    <Text style={{fontWeight:'bold',color:'grey'}}>{item.first_name + " " + item.last_name}</Text>
                  }
                />
              </View>
            </Body>
          </CardItem>
          <CardItem>
            <Body style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text>
                  <Icon name="heartbeat" style={{ fontSize: 20, color: '#005affeb' }} />
                </Text>
              </View>
              <View style={{ flex: 4 }}>
                <FlatList
                  data={carers}
                  keyExtractor={(item) => item.username}
                  renderItem={({ item }) =>
                    <Text style={{fontWeight:'bold',color:'grey'}}>{item.first_name + " " + item.last_name}</Text>
                  }
                />
              </View>
            </Body>
          </CardItem>

        </Card>
        <View style={{ margin: 15 }}>
          <Button
            block
            style={{ alignSelf: 'center', padding: 5, borderRadius: 5 }}
            onPress={() => navigation.navigate('editTab')}>
            <Icon name="edit" style={{ fontSize: 20, color: 'white', paddingLeft: 10 }} />
            <Text>Edit</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
}

export default LandingTab;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00BFFF',
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  card: {
    padding: 5,
    alignItems: 'flex-start',
    borderRadius: 8,
  }
  ,
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
});
