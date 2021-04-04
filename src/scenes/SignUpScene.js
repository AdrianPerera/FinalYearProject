import React, { Component } from 'react';
import { StyleSheet, Modal, ActivityIndicator, View, Alert } from 'react-native';
import {
  Picker,
  Form,
  Item,
  Text,
  Button,
  Container,
  Input,
  Label,
  CheckBox,
  ListItem,
  Body,
  Header,
  Left,
  Title,
  Content,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { styles } from '../styles/SignUpStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

class SignUpScene extends Component {
  state = {
    secureEntry: true,
    modalVisible: false,
    selected: '1',
    checked: false,
    username: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    reEnterPassword: '',
    auth_token: '',
    loadingSpinner: false
  };


  changeChecked = () => {
    this.setState({ checked: !this.state.checked });
  };

  changeValue = (value) => {
    this.setState({
      selected: value,
    });
  };

  async beforeSubmit() {
    this.setState({ loadingSpinner: true });

    var data = JSON.stringify({
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
    });

    var requestOptions1 = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
      redirect: 'follow',
    };

    await fetch(
      'https://prevelcer.herokuapp.com/api/register/',
      requestOptions1,
    )
      .then((response) => response)
      .then((result) => result)
      .catch((error) => console.log('error', error));
    var credentials = JSON.stringify({
      "username": this.state.username,
      "password": this.state.password,
    });

    var requestOptions2 = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: credentials,
    };

    await fetch(
      'https://prevelcer.herokuapp.com/api-token-auth/',
      requestOptions2,
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.token == undefined) {
          const errorHandler = () => {
            Alert.alert('Password or Username is not correct?', 'Username not available', [
              { text: 'OK', style: 'cancel', onPress: () => { } },
            ]);
          };
          errorHandler();
          this.setState({ loadingSpinner: false })
        } else {
          AsyncStorage.setItem('@auth_token', result.token)
          this.setState({ auth_token: result.token })

          var updateData = JSON.stringify({
            'phone_number': this.state.phoneNumber,
            'role': parseInt(this.state.selected)
          })

          const sendingToken = "Token " + this.state.auth_token;
          var myHeaders = new Headers();
          myHeaders.append("Authorization", sendingToken);
          myHeaders.append("Content-Type", "application/json");
          var requestOptions3 = {
            method: 'POST',
            headers: myHeaders,
            body: updateData,
            redirect: 'follow',
          };
          fetch('https://prevelcer.herokuapp.com/api/profile/', requestOptions3)
            .then((response) => {
              this.setState({ loadingSpinner: false })
              response.text()
            })
            .then((result) => console.log(result)).catch((error) => console.log('update Error', error));

          this.props.navigation.navigate('auth');

        }

      })
      .catch((error) => console.log('error', error));

    // var updateData = JSON.stringify({
    //   'phone_number': this.state.phoneNumber,
    //   'role': parseInt(this.state.selected)
    // })

    // const sendingToken = "Token " + this.state.auth_token;
    // var myHeaders = new Headers();
    // myHeaders.append("Authorization", sendingToken);
    // myHeaders.append("Content-Type", "application/json");
    // var requestOptions3 = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: updateData,
    //   redirect: 'follow',
    // };
    // await fetch('https://prevelcer.herokuapp.com/api/profile/', requestOptions3)
    //   .then((response) => {
    //     this.setState({loadingSpinner:false})
    //     response.text()
    //   })
    //   .then((result) => console.log(result)).catch((error) => console.log('update Error', error));

    // this.props.navigation.navigate('auth');
  }

  async postSubmit() { }

  render() {
    return (
      <Container style={styles.top}>
        <Modal animationType="fade" visible={this.state.modalVisible}>
          <Container>
            <Header>
              <Left>
                <Button
                  transparent
                  onPress={() => {
                    this.setState({ modalVisible: false });
                  }}>
                  <Icon style={{ fontSize: 20 }} name="arrow-left" />
                </Button>
              </Left>
              <Body>
                <Title>Terms & Conditions</Title>
              </Body>
            </Header>
            <Content>
              <Text>Modal Body</Text>
            </Content>
          </Container>
        </Modal>

        <Text style={styles.textContainer}>Create An Account</Text>
        <Form style={styles.Form}>
          <Item picker inlineLabel>
            <Label>Create As</Label>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              placeholder="Proceed As"
              placeholderStyle={{ color: '#bfc6ea' }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.selected}
              onValueChange={this.changeValue.bind(this)}>
              <Picker.Item label="Patient" value="1" />
              <Picker.Item label="Caretaker " value="2" />
              <Picker.Item label="Doctor" value="3" />
            </Picker>
          </Item>

          <Item inlineLabel>
            <Icon style={styles.icon} name="user" />
            <Input
              placeholder="Username"
              onChangeText={(value) => this.setState({ username: value })}
            />
          </Item>

          <Item inlineLabel>
            <Icon style={styles.icon} name="user-circle" />
            <Input
              placeholder="first name"
              onChangeText={(value) => this.setState({ firstName: value })}
            />
          </Item>

          <Item inlineLabel>
            <Icon style={styles.icon} name="user-circle" />
            <Input
              placeholder="last name"
              onChangeText={(value) => this.setState({ lastName: value })}
            />
          </Item>

          <Item inlineLabel>
            <Icon style={styles.icon} name="phone-square" />
            <Input
              keyboardType="number-pad"
              placeholder="Phone Number"
              onChangeText={(value) => this.setState({ phoneNumber: value })}
            />
          </Item>

          <Item inlineLabel>
            <Icon style={styles.icon} name="envelope" />
            <Input
              placeholder="E-mail"
              onChangeText={(value) => this.setState({ email: value })}
            />
          </Item>

          <Item inlineLabel>
            <Icon style={styles.icon} name="key" />
            <Input
              secureTextEntry={this.state.secureEntry}
              placeholder="Password"
              onChangeText={(value) => this.setState({ password: value })}
            />
            <Button
              transparent
              style={styles.eye}
              onPress={() =>
                this.setState({ secureEntry: !this.state.secureEntry })
              }>
              {this.state.secureEntry ? (
                <Icon style={{ fontSize: 20 }} name="eye-slash" />
              ) : (
                <Icon style={{ fontSize: 20 }} name="eye" />
              )}
            </Button>
          </Item>

          <Item inlineLabel>
            <Icon style={styles.icon} name="key" />
            <Input
              secureTextEntry={this.state.secureEntry}
              placeholder="Re-Enter Password"
              onChangeText={(value) => this.setState({ reEnterPassword: value })}
            />
          </Item>

          <ListItem>
            <CheckBox
              checked={this.state.checked}
              onPress={this.changeChecked}
            />
            <Body>
              <Text style={styles.subText}>
                I Agree to the
                <Text
                  onPress={() => this.setState({ modalVisible: true })}
                  style={styles.link}>
                  Terms and Conditions
                </Text>
              </Text>
            </Body>
          </ListItem>

          <Button
            primary
            block
            disabled={this.state.loadingSpinner}
            style={styles.button}
            onPress={() => this.beforeSubmit()}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Button>
        </Form>

        <View>
          {this.state.loadingSpinner ?
            <ActivityIndicator
              size={54}
              color="white"
              style={style.activityInd}
            /> : null}
        </View >
      </Container>
    );
  }
}

export default SignUpScene;


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
    top: -89,
    alignItems: 'center',
    justifyContent: 'center',
  }
})