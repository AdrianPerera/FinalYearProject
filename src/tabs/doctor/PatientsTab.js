import React, { useState,useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  Card,
  CardItem,
  Badge,
  Right,
  Left,
  Text,
  Button,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function PatientsTab({ route, navigation }) {
  const [token, setToken] = useState('');
  const [username,setUsername]=useState("");
  const DATA = [
    {
      id: 1,
      name: 'Erna Blaksland',
    },
    {
      id: 2,
      name: 'Carline Kupisz',
    },
    {
      id: 3,
      name: 'Robby Doghartie',
    },
    {
      id: 4,
      name: 'Enid Lindup',
    },
    {
      id: 5,
      name: 'Sydney Lesek',
    },
    {
      id: 6,
      name: 'Bren Noddings',
    },
    {
      id: 7,
      name: 'Courtnay Stockill',
    },
    {
      id: 8,
      name: 'Weider Vinecombe',
    },
    {
      id: 9,
      name: 'Lothaire Cabena',
    },
    {
      id: 10,
      name: 'Letisha Spragge',
    },
    {
      id: 11,
      name: 'Barrie Jaques',
    },
    {
      id: 12,
      name: 'Quill Weinham',
    },
    {
      id: 13,
      name: 'Ilaire Trodd',
    },
    {
      id: 14,
      name: 'Winne Iffland',
    },
    {
      id: 15,
      name: 'Nicolea Spehr',
    },
  ];
  
  const viewPatientRiskScale = (name) => {

    navigation.navigate(
      'doctorRiskScaleScene',
      { name: name, token: token,username:username }
    );
  };

  const viewPatientUclerRecord = (name) => {
    navigation.navigate(
      'ulcerRecordScene',
      { name: name, token: token ,username:username},
    );

  }

  const fetchToken = async () => {
    try {
      const token = await AsyncStorage.getItem('@auth_token');
      const username= await AsyncStorage.getItem('@username');
      if (token === null) {
        console.log('token null');
      }
      setToken(token);
      setUsername(username);
    } catch (e) {
      console.log("token error: " + e);
    }
  }

  useEffect(() => {
    fetchToken();
  }, [])

  const renderThis = ({ item }) => (
    <View style={{ marginTop: 3, marginHorizontal: 10, padding: 5 }}>
      <Text style={{ flex: 1 }}>{item.name} </Text>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Button
          onPress={() => viewPatientRiskScale(item.name)}
          small
          success
          style={styles.button}>
          <Text>risk scale</Text>
        </Button>
        <Button
          onPress={() => viewPatientUclerRecord(item.name)}
          small
          primary
          style={styles.button}>
          <Text>Record Ulcer</Text>
        </Button>
      </View>
    </View>
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
          <Title style={{ textTransform: 'capitalize' }}>Patients</Title>
        </Body>
        <Right>
          <Icon
            name="hospital-o"
            style={{ fontSize: 30, color: '#dff604', marginRight: 5 }}
          />
        </Right>
      </Header>

      <View style={{ marginBottom: 50 }}>
        <FlatList
          data={DATA}
          renderItem={renderThis}
          keyExtractor={(item) => item.id}
          numColumns={1}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: { flex: 1, justifyContent: 'center', borderRadius: 10, marginTop: 1, marginHorizontal: 5 }
});