import React, { Component } from 'react';
import { Text, View, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { Picker, Form, Item, Button, Container, Input, Label } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { styles } from '../styles/AuthScStyles';

// import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AuthScene extends Component {
  state = {
    selected: 'patient',
    username: '',
    password: '',
    isLoggedIn: false,
    auth_token: '',
    loadingSpinner: false,
  };


  changeValue = (value) => {
    this.setState({
      selected: value,
    });
  };

  goToProfile() {
    this.setState({ loadingSpinner: true });
    var data = JSON.stringify({
      'username': this.state.username,
      'password': this.state.password,
    });
    var requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data,
      redirect: 'follow',
    };

    fetch(
      'https://prevelcer.herokuapp.com/api-token-auth/',
      requestOptions,
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        this.setState({ loadingSpinner: false });
        this.setState({ auth_token: result.token });
        console.log("rabbit");

        var new_auth_token = this.state.auth_token;

        console.log(new_auth_token);
        if (new_auth_token == undefined) {


          console.log("yeah");
          const logOutHandler = () => {
            Alert.alert('Password or Username is not correct?', 'Password or Username or wrong', [
              { text: 'OK', style: 'cancel', onPress: () => { } },
            ]);
          };
          logOutHandler();
        }
        else {
          this.setState({ loadingSpinner: true });
          this.props.navigation.navigate('profile', {
            screen: 'landingTab',
            params: { param: this.state },
          });
        }
      })
      .catch((error) => console.log('error', error));
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
              style={{ width: 100 }}
              placeholder="Proceed As"
              placeholderStyle={{ color: '#bfc6ea' }}
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
              onChangeText={(text) => this.setState({ username: text })}
            />
          </Item>
          <Item inlineLabel>
            <Icon type="Fontawesome" style={styles.icon} name="key" />
            <Input
              secureTextEntry
              placeholder="Password"
              onChangeText={(text) => this.setState({ password: text })}
            />
          </Item>

          <Button
            primary
            block
            disabled={this.state.loadingSpinner}
            style={styles.button}
            onPress={() => this.goToProfile()}>

            <Text style={styles.buttonText}> Sign In</Text>
          </Button>
        </Form>
        <Text style={styles.subText}>
          {' '}
          Don't have an account?{' '}
          <Text
            style={{ textDecorationLine: 'underline' }}
            onPress={() => this.props.navigation.navigate('signup')}>
            Sign up!
          </Text>
        </Text>
        <View>
          {this.state.loadingSpinner ?
            <ActivityIndicator
              size={60}
              color="white"
              style={style.activityInd}
            /> : null}
        </View >

      </Container>

    );
  }
}

const style = StyleSheet.create({
  spinnerView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityInd: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: -187,
    alignItems: 'center',
    justifyContent: 'center',
  }
})