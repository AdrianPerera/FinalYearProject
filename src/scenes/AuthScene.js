import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker, Form, Item, Button, Container, Input, Label} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Actions} from 'react-native-router-flux';
import { cos } from 'react-native-reanimated';

const openSignUp = () => {
  Actions.signup();
};

const goToProfile = (state) => {
  /* temporary code for develpment */  
  // TODO: code for checking username and password authorization
  // {state.username ==="admin" && state.password ==="admin" ? Actions.profile() : alert('Invalid Credentials!')}
  Actions.profile({state});
    
};

export default class AuthScene extends Component {
  state = {
    selected: 'patient',
    username: '',
    password: '',
  };

  changeValue = (value) => {
    this.setState({
      selected: value,
    });

    console.log(this.state.selected);
  };

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
          <Button primary block style={styles.button} onPress={()=>goToProfile(this.state)}>
            <Text style={styles.buttonText}> Sign In</Text>
          </Button>
        </Form>

        <Text style={styles.subText}>
          {' '}
          Don't have an account?{' '}
          <Text style={{textDecorationLine: 'underline'}} onPress={openSignUp}>
            Sign up!
          </Text>
        </Text>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  icon:{fontSize:20, marginRight:5, color:'grey'},
  top: {
    paddingRight: 26.3,
    paddingLeft: 26.3,
    backgroundColor: '#2570e0',
    justifyContent: 'center',
  },
  Form: {
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    paddingBottom: 20,
    paddingRight:10,
    borderRadius: 10,
  },

  textContainer: {
    color: '#FFFFFF',
    fontFamily: 'GoogleSans-Bold',
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 30,
    position: 'relative',
    alignSelf: 'center',
  },
  button: {
    marginTop: 20,
    width: '50%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'GoogleSans-Bold',
    fontSize: 18,
  },
  subText: {
    marginTop: 30,
    alignSelf: 'center',
    fontSize: 16,
  },
});
