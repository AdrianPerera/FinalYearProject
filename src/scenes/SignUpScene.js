import React, {Component} from 'react';
import {StyleSheet, Modal} from 'react-native';
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

class SignUpScene extends Component {
  state = {
    selected: undefined,
    checked: false,
    secureEntry: true,
    modalVisible: false,
  };

  changeChecked = () => {
    this.setState({checked: !this.state.checked});
  };

  changeValue = (value) => {
    this.setState({
      selected: value,
    });
  };

  render() {
    return (
      <Container style={styles.top}>
        <Modal animationType="fade" visible={this.state.modalVisible}>
          <Container>
            <Header>
              <Left>
              <Button transparent onPress={() => {
                this.setState({modalVisible: false});
              }}>
              <Icon style={{fontSize:20}} name="arrow-left"/>
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
            <Icon style={styles.icon} name="user" />
            <Input placeholder="Username" />
          </Item>

          <Item inlineLabel>
            <Icon style={styles.icon} name="phone-square" />
            <Input keyboardType="number-pad" placeholder="Phone Number" />
          </Item>

          <Item inlineLabel>
            <Icon style={styles.icon} name="key" />
            <Input
              secureTextEntry={this.state.secureEntry}
              placeholder="Password"
            />
            <Button
              transparent
              style={styles.eye}
              onPress={() =>
                this.setState({secureEntry: !this.state.secureEntry})
              }>
              {this.state.secureEntry ? (
                <Icon style={{fontSize: 20}} name="eye-slash" />
              ) : (
                <Icon style={{fontSize: 20}} name="eye" />
              )}
            </Button>
          </Item>

          <Item inlineLabel>
            <Icon style={styles.icon} name="key" />
            <Input
              secureTextEntry={this.state.secureEntry}
              placeholder="Re-Enter Password"
            />
          </Item>

          <ListItem>
            <CheckBox
              checked={this.state.checked}
              onPress={this.changeChecked}
            />
            <Body>
              <Text style={styles.subText}>
                I Agree to the{' '}
                <Text
                  onPress={() => {
                    this.setState({modalVisible: true});
                  }}
                  style={styles.link}>
                  Terms and Conditions
                </Text>
              </Text>
            </Body>
          </ListItem>

          <Button primary block style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

export default SignUpScene;

const styles = StyleSheet.create({
  icon: {fontSize: 20, marginRight: 5, color: 'grey'},

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
    paddingRight: 5,
    borderRadius: 10,
  },
  eye: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginTop: 5,
    marginRight: 5,
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
  },
  subText: {
    alignSelf: 'flex-start',
    fontSize: 15,
  },
  link: {
    textDecorationLine: 'underline',
    color: 'blue',
    fontSize: 15,
  },
});
