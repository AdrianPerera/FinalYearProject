import React, {Component} from 'react';
import {Container, Header, Body, Title, Right, Left, Button} from 'native-base';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserImg from '../../images/tab-Icons/male-skin.png';
import IdImg from '../../images/tab-Icons/id-verified.png';
import PasswordImg from '../../images/tab-Icons/password.png';
import LetterImg from '../../images/tab-Icons/secured-letter.png';
import CalenderImg from '../../images/tab-Icons/age.png';

function ProfileTab({navigation}) {
  return (
    <Container>
      <Header>
        <Left>
          <Button
            style={{width: 50, justifyContent: 'center'}}
            onPress={() => navigation.toggleDrawer()}>
            <Icon name="reorder" style={{fontSize: 30, color: 'white'}} />
          </Button>
        </Left>
        <Body>
          <Title style={{textTransform: 'capitalize'}}>Edit My Profile</Title>
        </Body>
        <Right>
          <Icon name="user" style={{fontSize: 30, color: 'white'}} />
        </Right>
      </Header>

      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Full name"
            underlineColorAndroid="transparent"
            onChangeText={(email) => this.setState({email})}
          />
          <Image style={styles.inputIcon} source={UserImg} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Registration ID"
            underlineColorAndroid="transparent"
            onChangeText={(email) => this.setState({email})}
          />
          <Image style={styles.inputIcon} source={IdImg} />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Age"
            underlineColorAndroid="transparent"
            onChangeText={(email) => this.setState({email})}
          />
          <Image style={styles.inputIcon} source={CalenderImg} />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={(email) => this.setState({email})}
          />
          <Image style={styles.inputIcon} source={LetterImg} />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={(password) => this.setState({password})}
          />
          <Image style={styles.inputIcon} source={PasswordImg} />
        </View>

        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]}>
          <Text style={styles.loginText}>OK</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}

const resizeMode = 'center';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#808080',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 300,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },

  loginButton: {
    backgroundColor: '#00b5ec',

    shadowColor: '#808080',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
  },
  loginText: {
    color: 'white',
  },
});

export default ProfileTab;
