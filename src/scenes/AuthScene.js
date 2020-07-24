import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  Picker,
  Form,
  Item,
  Button,
  Container,
  Input,
  Label,

} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Actions} from 'react-native-router-flux';

const openSignUp = ()=>{
  Actions.jump("signup");
}

class AuthScene extends Component {
  state = {
    selected: undefined,
  };

  changeValue = (value) => {
    this.setState({
      selected: value,
    });
  };

  render() {
    return (
      <Container style={styles.top}>
        
        
        <Text style={styles.textContainer}>You are ready to go!</Text>
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
                <Picker.Item label="Patient" value="key0" />
                <Picker.Item label="Caretaker " value="key1" />
                <Picker.Item label="Doctor" value="key2" />
              </Picker>
            </Item>

            <Item inlineLabel>
              <Icon type="Fontawesome" style={{fontSize: 20}} name="user" />
              <Input placeholder="Username" />
            </Item>
            <Item inlineLabel>
              <Icon type="Fontawesome" style={{fontSize: 20}} name="key" />
              <Input placeholder="Password" />
            </Item>
            <Button primary block style={styles.button}>
              <Text style={styles.buttonText}> Sign In</Text>
            </Button>
          </Form>
     
          <Text style={styles.subText}> Don't have an account? <Text style={{textDecorationLine:'underline'}} onPress={openSignUp}>Sign up!</Text></Text>
          
       
      </Container>
    );
  }
}

export default AuthScene;

const styles = StyleSheet.create({
  
  top: {
    paddingRight: 26.3,
    paddingLeft: 26.3,
    backgroundColor: '#2570e0',
    justifyContent:'center'
  },
  Form: {
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    paddingBottom: 20,
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
  bottom: {
    backgroundColor: 'red',
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
  subText:{
    marginTop:30,
    alignSelf:'center',
    fontSize:16
  }
});
