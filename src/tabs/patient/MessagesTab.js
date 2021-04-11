<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
import React, { Component,useState } from 'react';
>>>>>>> ploty
import {
  Container,
  Header,
  Body,
  Title,
<<<<<<< HEAD
=======

>>>>>>> ploty
  Right,
  Left,
  Button,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Plotly from 'react-native-plotly';
<<<<<<< HEAD
import AsyncStorage from "@react-native-async-storage/async-storage";

function MessagesTab({ navigation }) {

  const [data, setData] = useState([]);
  const [layout, setLayout] = useState({ title: 'Ucler Pressure Map' });

  const fetchDetails = async () => {
    try {
      const token = await AsyncStorage.getItem('@auth_token');
      if (token === null) {
        console.log('token null');
      }
      console.log("token " + token);
      getData(token)
    } catch (e) {
      console.log("token error: " + e);
    }
  }

  const getData = async (token) => {

    var headers = new Headers();
    headers.append("Authorization", "Token " + token);
    headers.append("Content-Type", "application/json");
    var requestOption = {
      method: 'GET',
      headers: headers,
    };
=======
import { View ,Text} from 'react-native';
import { useEffect } from 'react/cjs/react.development';
import AsyncStorage from "@react-native-async-storage/async-storage";

function MessagesTab({ navigation }) {
  const [data ,setData]=useState([]);
  const [layout,setLayout]=useState({ title: 'Ucler Pressure Map' });

  const fetchDetails = async () => {
    try {
        const token = await AsyncStorage.getItem('@auth_token');
        if (token === null) {
            console.log('token null');
        }
        console.log("token " + token);
        getData(token)
    } catch (e) {
        console.log("token error: " + e);
    }
}
  
  const getData= async(token)=>{

    var headers = new Headers();
    headers.append("Authorization", "Token " + token);
    headers.append("Content-Type", "application/json");
    var requestOption = {
        method: 'GET',
        headers: headers,
    };

    await fetch('http://prevelcer.herokuapp.com/pressure/visualize?patient=Adrian', requestOption)
        .then((response) => response.json())
        .then((result) => {
            setData(result.image)
        }).catch((error) => console.log('Data list ', error));
    
  }
  const data1 = [
    {
      z: data,
      type: 'heatmap',
      colorscale: 'Jet',
      zmin: 0,
      zmax: 700,
      zsmooth: 'best'
    }
  ];

  const update = (_, { data, layout, config }, plotly) => {
    plotly.react(data, layout, config);
  };

  useEffect(()=>{
    fetchDetails();
  },[])

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
          <Title style={{ textTransform: 'capitalize' }}>Messages</Title>
        </Body>
        <Right>
          <Icon name="envelope" style={{ fontSize: 30, color: '#e4e213' }} />
        </Right>
      </Header>
     
      <Plotly
        data={data1}
        layout={layout}
        update={update}
        onLoad={() => console.log('loaded')}
        
        enableFullPlotly
      />


    </Container>

  );
}
>>>>>>> ploty

    await fetch('http://prevelcer.herokuapp.com/pressure/visualize?patient=Adrian', requestOption)
      .then((response) => response.json())
      .then((result) => {
        setData(result.image)
      }).catch((error) => console.log('Data list ', error));

  }
  const data1 = [
    {
      z: data,
      type: 'heatmap',
      colorscale: 'Jet',
      zmin: 0,
      zmax: 700,
      zsmooth: 'best'
    }
  ];

  const update = (_, { data, layout, config }, plotly) => {
    plotly.react(data, layout, config);
  };

  useEffect(() => {
    fetchDetails();
  }, [])

  function MessagesTab({ navigation }) {
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
            <Title style={{ textTransform: 'capitalize' }}>Messages</Title>
          </Body>
          <Right>
            <Icon name="envelope" style={{ fontSize: 30, color: '#e4e213' }} />
          </Right>
        </Header>
      </Container>
    );
  }
}
export default MessagesTab;
