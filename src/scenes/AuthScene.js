import React, {Component} from 'react';
import {Text, Alert} from 'react-native';
import {Picker, Form, Item, Button, Container, Input, Label} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {styles} from '../styles/AuthScStyles';

export default class AuthScene extends Component {
  state = {
    selected: 'patient',
    username: '',
    password: '',
    isLoggedIn: false,
    token: '',
  };

  changeValue = (value) => {
    this.setState({
      selected: value,
    });
  };

  async goToProfile() {
    // var raw = JSON.stringify({username: 'nimal_new', password: 'hello123456'});
    var requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
      redirect: 'follow',
    };

    loginHandle = () => {
      this.props.navigation.navigate('profile', {
        screen: 'landingTab',
        params: {param: this.state},
      });
    };

    await fetch(
      'http://prevelcer.herokuapp.com/api-token-auth/',
      requestOptions,
    )
      .then(
        (response) => response.json(),
        (error) => console.log(error),
      )
      .then((token) => console.log(token))
      .catch((error) => console.log('error', error));

    // if (this.state.token) {
    //   console.log(this.state.token);
    //
    // } else {
    //   Alert.alert('Login Failed', 'Invalid Credentials');
    // }
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
            onPress={() => this.goToProfile()}>
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
