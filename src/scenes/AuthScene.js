import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker, Form, Item, Button, Container, Input, Label} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {styles} from '../styles/AuthScStyles';

export default class AuthScene extends Component {
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
