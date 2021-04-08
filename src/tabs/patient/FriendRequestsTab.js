import React, { Component, useEffect, useState } from 'react';
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, View, FlatList } from 'react-native';

function FriendRequestsTab({ navigation }) {
  const [token, setToken] = useState('');
  const [incomingRequests, setIncomingRequests] = useState([]);


  const fetchDetails = async () => {
    try {
      const token = await AsyncStorage.getItem('@auth_token');
      if (token === null) {
        console.log('token null');
      }
      setToken(token);
      getSenders(token);
    } catch (e) {
      console.log("token error: " + e);
    }
  }

  const getSenders = async (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);
    myHeaders.append("Content-Type", "application/json");
    var requestOption = {
      method: 'GET',
      headers: myHeaders,
    };

    await fetch('https://prevelcer.herokuapp.com/api/friend_request/', requestOption)
      .then((response) => response.json())
      .then((friendRequests) => {
        setIncomingRequests(friendRequests);
        console.log(friendRequests + " incoming friend requests");
      }).catch((error) => console.log('Doctor list', error));
  }

  const unfriend = async (username) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);
    myHeaders.append("Content-Type", "application/json");
    var data = JSON.stringify(
      { "username": username }
    );
    var requestOptionUnfriend = {
      method: 'DELETE',
      headers: myHeaders,
      body: data
    };

    await fetch('https://prevelcer.herokuapp.com/api/unfriend/', requestOptionUnfriend)
      .then((response) => response.json())
      .then((unfriend) => {
        console.log(unfriend);
      }).catch((error) => console.log('unfriend error', error));
    getSenders(token);
  }

  const acceptFriendRequest = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);
    myHeaders.append("Content-Type", "application/json");
    var data = JSON.stringify(
      { "id": id }
    );
    var requestsOptionsAccept = {
      method: 'POST',
      headers: myHeaders,
      body: data
    };
    await fetch('https://prevelcer.herokuapp.com/api/accept_request/', requestsOptionsAccept)
      .then((response) => response.json())
      .then((unfriend) => {
        console.log(unfriend);
      }).catch((error) => console.log('unfriend error', error));
      getSenders(token);
  }



  useEffect(() => {
    fetchDetails();
  }, [])

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
          <Title style={{ textTransform: 'capitalize' }}>Friend Requests</Title>
        </Body>
        <Right>
          <Button
            style={{ width: 50, justifyContent: 'center' }}
            onPress={() => getSenders(token)}>
            <Icon name="refresh" style={{ fontSize: 25, color: 'yellow' }} />
          </Button>
        </Right>
      </Header>

      <View style={{ margin: 15 }}>
        <FlatList
          data={incomingRequests}
          keyExtractor={(item) => item.sender_name}
          renderItem={({ item }) =>
            <View style={styles.listCard}>
              <Text style={styles.font}>{item.sender_name} </Text>
              <View style={{ flex: 1 }}>
                <Button
                  onPress={() => acceptFriendRequest(item.id)}
                  small
                  primary
                  style={styles.button}>
                  <Text style={styles.buttonFont}>Accept</Text>
                </Button>
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  onPress={() => unfriend(item.sender_name)}
                  small
                  danger
                  style={styles.button}>
                  <Text style={styles.buttonFont}>Delete</Text>
                </Button>
              </View>

            </View>
          }
        />

      </View>
    </Container>
  );
}

export default FriendRequestsTab;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-end',
    borderRadius: 10,
    width: 80,
    justifyContent: 'center',
  },
  buttonFont: {
    fontSize: 12
  },
  font: {
    flex: 1,
    color: "#000099",
    fontWeight: 'bold'
  },
  listCard: {
    margin: 5,
    flexDirection: 'row',
    padding: 5,
    borderTopWidth: 0.75,
    borderTopColor: "grey"
  }
});