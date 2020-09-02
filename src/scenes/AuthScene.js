import React, {Component} from 'react';
import { Text }  from 'react-native';
import {Picker, Form, Item, Button, Container, Input, Label} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {styles} from '../styles/AuthScStyles';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from "react-native-firebase";



export default class AuthScene extends Component {

  async componentDidMount() {
    //we check if user has granted permission to receive push notifications.
    this.checkPermission();
    // Register all listener for notification 
    this.createNotificationListeners();
  } 
    async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();

    // If Premission granted proceed towards token fetch
    if (enabled) {
      this.getToken();
    } else {
      // If permission hasn’t been granted to our app, request user in requestPermission method. 
      this.requestPermission();
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    // console.log("fcmToken  "+ fcmToken);
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
    
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }
 
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  async createNotificationListeners() {

    // This listener triggered when notification has been received in foreground
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      this.displayNotification(title, body);
    });

    // This listener triggered when app is in backgound and we click, tapped and opened notifiaction
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      this.displayNotification(title, body);
    });

    // This listener triggered when app is closed and we click,tapped and opened notification 
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.displayNotification(title, body);
    }
  }

  displayNotification = (title, body)=> {
    // we display notification in alert box with title and body
    console.log(title);
    console.log(body);
    }


 
  state = {
    selected: 'patient',
    username: '',
    password: '',
    isLoggedIn:false
  };

  changeValue = (value) => {
    this.setState({
      selected: value,
    });
  };

  gotToProfile= ()=>{
    // TODO: code for checking username and password authorization
    this.props.navigation.navigate('profile', { screen:'landingTab', params: { param:this.state}});
  }

  render() {
    return (
      <Container style={styles.top}>
        <Text style={styles.textContainer}>You are ready to go! </Text>
        <Form style={styles.Form}>
          <Item picker inlineLabel>
            <Label>Continue As</Label>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{width: 100}}
              placeholder="Proceed As"
              placeholderStyle={{color: '#bfc6ea'}}
              placeholderIconColor="#007aff"
              selectedValue={this.state.selected}
              onValueChange={this.changeValue.bind(this)}>
              <Picker.Item label="Patient" value="patient" />
              <Picker.Item label="Caretaker " value="caretaker" />
              <Picker.Item label="Doctor" value="doctor" />
            </Picker>
          </Item>

          <Item inlineLabel>
            <Icon type="Fontawesome" style={styles.icon} name="user" />
            <Input
              placeholder="Username"
              onChangeText={(text) => this.setState({username: text})}
            />
          </Item>
          <Item inlineLabel>
            <Icon type="Fontawesome" style={styles.icon} name="key" />
            <Input
              secureTextEntry
              placeholder="Password"
              onChangeText={(text) => this.setState({password: text})}
            />
          </Item>
          <Button
            primary
            block
            style={styles.button}
            onPress={() => this.gotToProfile()}>
            <Text style={styles.buttonText}> Sign In</Text>
          </Button>

        </Form>

        <Text style={styles.subText}>
          {' '}
          Don't have an account?{' '}
          <Text
            style={{textDecorationLine: 'underline'}}
            onPress={() => this.props.navigation.navigate('signup')}>
            Sign up!
          </Text>
        </Text>
      </Container>
    );
  }
}
