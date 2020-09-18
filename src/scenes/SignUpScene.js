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
import {styles} from '../styles/SignUpStyles';


class SignUpScene extends Component {
  state = {
    secureEntry: true,
    modalVisible: false,
    selected: undefined,
    checked: false,
    fcmToken: '',
    username: '',
    phoneNumber: '',
    email: '',
    password: '',
    reEnterPassword: '',
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
                <Button
                  transparent
                  onPress={() => {
                    this.setState({modalVisible: false});
                  }}>
                  <Icon style={{fontSize: 20}} name="arrow-left" />
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
              <Picker.Item label="Patient" value="patient" />
              <Picker.Item label="Caretaker " value="caretaker" />
              <Picker.Item label="Doctor" value="doctor" />
            </Picker>
          </Item>

          <Item inlineLabel>
            <Icon style={styles.icon} name="user" />
            <Input
              placeholder="Username"
              onChangeText={(value) => this.setState({username: value})}
            />
          </Item>

          <Item inlineLabel>
            <Icon style={styles.icon} name="phone-square" />
            <Input
              keyboardType="number-pad"
              placeholder="Phone Number"
              onChangeText={(value) => this.setState({phoneNumber: value})}
            />
          </Item>

          <Item inlineLabel>
            <Icon style={styles.icon} name="envelope" />
            <Input
              placeholder="E-mail"
              onChangeText={(value) => this.setState({email: value})}
            />
          </Item>

          <Item inlineLabel>
            <Icon style={styles.icon} name="key" />
            <Input
              secureTextEntry={this.state.secureEntry}
              placeholder="Password"
              onChangeText={(value) => this.setState({password: value})}
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
              onChangeText={(value) => this.setState({reEnterPassword: value})}
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
                <Text onPress={() =>this.setState({modalVisible: true})}
                  style={styles.link}>
                  Terms and Conditions
                </Text>
              </Text>
            </Body>
          </ListItem>

          <Button
            primary
            block
            style={styles.button}
            onPress={() => this.beforeSubmit()}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

export default SignUpScene;
