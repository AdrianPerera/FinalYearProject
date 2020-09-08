import React, {Component} from 'react';
import { Alert } from "react-native";
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  Card,
  CardItem,
  Right,
  Left,
  Text,
  Button, 
  Input,
  Label,
  List,
  ListItem,

} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from '../../styles/EditTabStyles';

function EditTab({navigation}) {

  const [value, setValue] = React.useState('male');

  const [ans, setAns] = React.useState('no');

  const [diabetes, set_Diabetes_Checked] = React.useState(false);

  const [high_blood_pressure, set_High_Blood_Pressure_Checked] = React.useState(false);
  const showAlert = () => Alert.alert("Message", "Button Clicked!!");

  return (
    <Container>
      <Header>
        <Left>
          <Button>
            <Icon
              name="reorder"
              style={{fontSize: 30, color: 'white'}}
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          </Button>
        </Left>
        <Body>
          <Title style={{textTransform: 'capitalize'}}>Edit My Profile</Title>
        </Body>
        <Right>
        <Icon name='user' style={{fontSize: 30, color: 'white'}} /> 
        </Right>
      </Header>

      <Content>
       <Card> 
       <CardItem>         
      <List>
      <ListItem itemHeader first style={{marginBottom:-50}}>
        <Label style={styles.formLabel} >Name in Full</Label>
        </ListItem>
        <ListItem>
        <Input  style={styles.formItem} placeholder="Eg: Helik Tribuwan"/>      
        </ListItem>

        <ListItem itemHeader first style={{marginBottom:-50}}>
        <Label style={styles.formLabel} >Registration ID</Label>
        </ListItem>
        <ListItem>
        <Input  style={styles.formItem} placeholder="Eg: 2390"/>      
        </ListItem>

       <ListItem itemHeader first style={{marginBottom:-50}}>
        <Label style={styles.formLabel} >Email Address</Label>
        </ListItem>
        <ListItem>
        <Input  style={styles.formItem} placeholder="Eg: heliktrbuwan995@gmail.com"/>      
        </ListItem>

          <ListItem itemHeader first style={{marginBottom:-50}}>
        <Label style={styles.formLabel} >Phone Number</Label>
        </ListItem>
        <ListItem>
        <Input  style={styles.formItem} placeholder="Eg: 0710311885"/>      
        </ListItem>

       <ListItem itemHeader first style={{marginBottom:-50}}>
        <Label style={styles.formLabel} >Working Hours</Label>
        </ListItem>
        <ListItem>
        <Input  style={styles.formItem} placeholder="Eg: 8hours"/>      
        </ListItem>

         <ListItem itemHeader first style={{marginBottom:-50}}>
        <Label style={styles.formLabel} >Patients now handling</Label>
        </ListItem>
        <ListItem>
        <Input  style={styles.formItem} placeholder="Eg: De Silva"/>      
        </ListItem>
              
      </List>
     </CardItem>
     <CardItem>
          <Button primary block style={{flex:1}}>
            <Text>Save</Text>
          </Button>
          </CardItem>
    
</Card>
      </Content>

    </Container>
  );
}

export default EditTab;
