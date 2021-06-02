import React, { useState } from 'react';
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  Right,
  Left,
  Text,
  Button,
  Input,
  Label,
  List,
  ListItem,
} from 'native-base';
import { RadioButton, Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from '../../styles/EditTabStyles';

function EditTab({ navigation }) {
  const [value, setValue] = useState('male');

  const [ans, setAns] = useState('no');

  const [diabetes, set_Diabetes_Checked] = useState(false);

  const [high_blood_pressure, set_High_Blood_Pressure_Checked] = useState(
    false,
  );

  return (
    <Container>
      <Header>
        <Left>
          <Button
            style={{ width: 50, justifyContent: 'center' }}
            onPress={() => navigation.toggleDrawer()}>
            <Icon name="reorder" style={{ fontSize: 30, color: 'white' }} />
          </Button>
        </Left>
        <Body>
          <Title style={{ textTransform: 'capitalize' }}>Edit My Profile</Title>
        </Body>
        <Right>
          <Icon name="user" style={{ fontSize: 30, color: 'white' }} />
        </Right>
      </Header>

      <Content>
        <List>
          <ListItem itemHeader first style={{ marginBottom: -50 }}>
            <Label style={styles.formLabel}>Name in Full</Label>
          </ListItem>
          <ListItem>
            <Input
              style={styles.formItem}
              placeholder="Eg: Buddhini Edirisinghe"
            />
          </ListItem>

          <ListItem itemHeader first style={{ marginBottom: -50 }}>
            <Label style={styles.formLabel}>NIC Number</Label>
          </ListItem>
          <ListItem>
            <Input style={styles.formItem} placeholder="Eg: 968460595v" />
          </ListItem>

          <ListItem itemHeader first style={{ marginBottom: -20 }}>
            <Label style={styles.formLabel}>Gender</Label>
          </ListItem>
          <ListItem>
            <RadioButton.Group
              onValueChange={(value) => setValue(value)}
              value={value}>
              <RadioButton value="male" />
              <Text>Male</Text>

              <RadioButton value="female" />
              <Text>Female</Text>
            </RadioButton.Group>
          </ListItem>

          <ListItem itemHeader first style={{ marginBottom: -50 }}>
            <Label style={styles.formLabel}>Age</Label>
          </ListItem>
          <ListItem>
            <Input
              style={styles.formItem}
              placeholder="Enter your age in years"
            />
          </ListItem>

          <ListItem itemHeader first style={{ marginBottom: -50 }}>
            <Label style={styles.formLabel}>Weight</Label>
          </ListItem>
          <ListItem>
            <Input
              style={styles.formItem}
              placeholder="Enter your weight in kg"
            />
          </ListItem>

          <ListItem itemHeader first style={{ marginBottom: -20 }}>
            <Label style={styles.formLabel}>Presence of Ulcers</Label>
          </ListItem>
          <ListItem>
            <RadioButton.Group
              style={styles.formItem}
              onValueChange={(value) => setAns(value)}
              value={ans}>
              <RadioButton value="yes" />
              <Text>Yes</Text>

              <RadioButton value="no" />
              <Text>No</Text>
            </RadioButton.Group>
          </ListItem>

          <ListItem itemHeader first style={{ marginBottom: -20 }}>
            <Label style={styles.formLabel}>
              Select if you have any of the following Diseases
            </Label>
          </ListItem>

          <ListItem>
            <Checkbox
              status={diabetes ? 'checked' : 'unchecked'}
              onPress={() => {
                set_Diabetes_Checked(!diabetes);
              }}
            />
            <Body>
              <Text>Diabetes</Text>
            </Body>

            <Checkbox
              status={high_blood_pressure ? 'checked' : 'unchecked'}
              onPress={() => {
                set_High_Blood_Pressure_Checked(!high_blood_pressure);
              }}
            />
            <Body>
              <Text>High Blood Pressure</Text>
            </Body>
          </ListItem>
        </List>
        <Button primary block>
          <Text>Save</Text>
        </Button>
      </Content>
    </Container>
  );
}

export default EditTab;
