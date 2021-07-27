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
          console.log("token recived");
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
            .then((response) => response.json())
            .then((result) => {
              this.setState({ loadingSpinner: false });
              console.log("result " + result);
              console.log("update API");
              this.props.navigation.navigate('auth');

            }).catch((error) => {

              this.setState({ loadingSpinner: false });
              console.log('update Error', error);
            }
            );
        }

      })
      .catch((error) => console.log('error', error));
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
              <Text style={{ fontWeight: 'bold' }}>
                Terms and conditions</Text>
              <Text>
                These terms and conditions (“Agreement”) set forth the general terms and conditions of your use of the “UlcerNOTE” mobile application (“Mobile Application” or “Service”) and any of its related products and services (collectively, “Services”). This Agreement is legally binding between you (“User”, “you” or “your”) and this Mobile Application developer (“Operator”, “we”, “us” or “our”). If you are entering into this agreement on behalf of a business or other legal entity, you represent that you have the authority to bind such entity to this agreement, in which case the terms “User”, “you” or “your” shall refer to such entity. If you do not have such authority, or if you do not agree with the terms of this agreement, you must not accept this agreement and may not access and use the Mobile Application and Services. By accessing and using the Mobile Application and Services, you acknowledge that you have read, understood, and agree to be bound by the terms of this Agreement. You acknowledge that this Agreement is a contract between you and the Operator, even though it is electronic and is not physically signed by you, and it governs your use of the Mobile Application and Services. This terms and conditions policy was created with the help of the terms and conditions generator.
              </Text>
              <Text style={{ fontWeight: 'bold' }}>Accounts and membership</Text>
              <Text>If you create an account in the Mobile Application, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it. We may, but have no obligation to, monitor and review new accounts before you may sign in and start using the Services. Providing false contact information of any kind may result in the termination of your account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security. We will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions. We may suspend, disable, or delete your account (or any part thereof) if we determine that you have violated any provision of this Agreement or that your conduct or content would tend to damage our reputation and goodwill. If we delete your account for the foregoing reasons, you may not re-register for our Services. We may block your email address and Internet protocol address to prevent further registration. </Text>

              <Text style={{ fontWeight: 'bold' }}>Links to other resources</Text>
              <Text>  Although the Mobile Application and Services may link to other resources (such as websites, mobile applications, etc.), we are not, directly or indirectly, implying any approval, association, sponsorship, endorsement, or affiliation with any linked resource, unless specifically stated herein. We are not responsible for examining or evaluating, and we do not warrant the offerings of, any businesses or individuals or the content of their resources. We do not assume any responsibility or liability for the actions, products, services, and content of any other third parties. You should carefully review the legal statements and other conditions of use of any resource which you access through a link in the Mobile Application. Your linking to any other off-site resources is at your own risk.</Text>

              <Text style={{ fontWeight: 'bold' }}>Intellectual property rights</Text>
              <Text>  “Intellectual Property Rights” means all present and future rights conferred by statute, common law or equity in or in relation to any copyright and related rights, trademarks, designs, patents, inventions, goodwill and the right to sue for passing off, rights to inventions, rights to use, and all other intellectual property rights, in each case whether registered or unregistered and including all applications and rights to apply for and be granted, rights to claim priority from, such rights and all similar or equivalent rights or forms of protection and any other results of intellectual activity which subsist or will subsist now or in the future in any part of the world. This Agreement does not transfer to you any intellectual property owned by the Operator or third parties, and all rights, titles, and interests in and to such property will remain (as between the parties) solely with the Operator. All trademarks, service marks, graphics and logos used in connection with the Mobile Application and Services, are trademarks or registered trademarks of the Operator or its licensors. Other trademarks, service marks, graphics and logos used in connection with the Mobile Application and Services may be the trademarks of other third parties. Your use of the Mobile Application and Services grants you no right or license to reproduce or otherwise use any of the Operator or third party trademarks. </Text>

              <Text style={{ fontWeight: 'bold' }}>Limitation of liability</Text>
              <Text>    To the fullest extent permitted by applicable law, in no event will the Operator, its affiliates, directors, officers, employees, agents, suppliers or licensors be liable to any person for any indirect, incidental, special, punitive, cover or consequential damages (including, without limitation, damages for lost profits, revenue, sales, goodwill, use of content, impact on business, business interruption, loss of anticipated savings, loss of business opportunity) however caused, under any theory of liability, including, without limitation, contract, tort, warranty, breach of statutory duty, negligence or otherwise, even if the liable party has been advised as to the possibility of such damages or could have foreseen such damages. To the maximum extent permitted by applicable law, the aggregate liability of the Operator and its affiliates, officers, employees, agents, suppliers and licensors relating to the services will be limited to an amount greater of one dollar or any amounts actually paid in cash by you to the Operator for the prior one month period prior to the first event or occurrence giving rise to such liability. The limitations and exclusions also apply if this remedy does not fully compensate you for any losses or fails of its essential purpose.</Text>

              <Text style={{ fontWeight: 'bold' }}> Severability</Text>
              <Text>  All rights and restrictions contained in this Agreement may be exercised and shall be applicable and binding only to the extent that they do not violate any applicable laws and are intended to be limited to the extent necessary so that they will not render this Agreement illegal, invalid or unenforceable. If any provision or portion of any provision of this Agreement shall be held to be illegal, invalid or unenforceable by a court of competent jurisdiction, it is the intention of the parties that the remaining provisions or portions thereof shall constitute their agreement with respect to the subject matter hereof, and all such remaining provisions or portions thereof shall remain in full force and effect.</Text>

              <Text style={{ fontWeight: 'bold' }}>  Changes and amendments</Text>

              <Text>    We reserve the right to modify this Agreement or its terms related to the Mobile Application and Services at any time at our discretion. When we do, we will post a notification in the Mobile Application. We may also provide notice to you in other ways at our discretion, such as through the contact information you have provided.
                An updated version of this Agreement will be effective immediately upon the posting of the revised Agreement unless otherwise specified. Your continued use of the Mobile Application and Services after the effective date of the revised Agreement (or such other act specified at that time) will constitute your consent to those changes. </Text>

              <Text style={{ fontWeight: 'bold' }}>  Acceptance of these terms</Text>

              <Text>  You acknowledge that you have read this Agreement and agree to all its terms and conditions. By accessing and using the Mobile Application and Services you agree to be bound by this Agreement. If you do not agree to abide by the terms of this Agreement, you are not authorized to access or use the Mobile Application and Services.</Text>

              <Text style={{ fontWeight: 'bold' }}> Contacting Us</Text>
              <Text>    If you have any questions, concerns, or complaints regarding this Agreement, we encourage you to contact us using the details below:</Text>

              <Text>   nikiperera20@gmail.com</Text>

              <Text>  This document was last updated on July 27, 2021</Text>
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