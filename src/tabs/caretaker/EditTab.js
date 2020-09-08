import React from 'react';
import {
  Container,
  Header,
  Body,
  Title,
  Right,
  Left,
  Text,
  Button,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from '../../styles/EditTabStyles';

export default function EditTab({navigation}) {
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

      <Content>
        <Card>
          <CardItem>
            <List>
              <ListItem itemHeader first style={{marginBottom: -50}}>
                <Label style={styles.formLabel}>Name in Full</Label>
              </ListItem>
              <ListItem>
                <Input
                  style={styles.formItem}
                  placeholder="Eg: Helik Tribuwan"
                />
              </ListItem>

              <ListItem itemHeader first style={{marginBottom: -50}}>
                <Label style={styles.formLabel}>Registration ID</Label>
              </ListItem>
              <ListItem>
                <Input style={styles.formItem} placeholder="Eg: 2390" />
              </ListItem>

              <ListItem itemHeader first style={{marginBottom: -50}}>
                <Label style={styles.formLabel}>Email Address</Label>
              </ListItem>
              <ListItem>
                <Input
                  style={styles.formItem}
                  placeholder="Eg: heliktrbuwan995@gmail.com"
                />
              </ListItem>

              <ListItem itemHeader first style={{marginBottom: -50}}>
                <Label style={styles.formLabel}>Phone Number</Label>
              </ListItem>
              <ListItem>
                <Input style={styles.formItem} placeholder="Eg: 0710311885" />
              </ListItem>

              <ListItem itemHeader first style={{marginBottom: -50}}>
                <Label style={styles.formLabel}>Working Hours</Label>
              </ListItem>
              <ListItem>
                <Input style={styles.formItem} placeholder="Eg: 8hours" />
              </ListItem>

              <ListItem itemHeader first style={{marginBottom: -50}}>
                <Label style={styles.formLabel}>Patients now handling</Label>
              </ListItem>
              <ListItem>
                <Input style={styles.formItem} placeholder="Eg: De Silva" />
              </ListItem>
            </List>
          </CardItem>
          <CardItem>
            <Button primary block style={{flex: 1}}>
              <Text>Save</Text>
            </Button>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
}
