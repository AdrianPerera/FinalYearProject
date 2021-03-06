import React, { useState } from 'react';
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  Form,
  Right,
  Left,
  Picker,
  Item,
  Label,
  Input,
  ListItem,
  Button,
  Textarea,
  Badge,
  Text,
  CheckBox
} from 'native-base';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';



export default function RiskScaleScene({ route, navigation }) {
  const { name, token ,username} = route.params;
  const [assessedBy, setAssessedBy] = useState("");
  const [gender, setGender] = useState("M");
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [sensoryPerception, setSensoryPerception] = useState(0);
  const [moisture, setMoisture] = useState(0);
  const [activity, setActivity] = useState(0);
  const [mobility, setMobility] = useState(0);
  const [nutrition, setNutrition] = useState(0);
  const [friction, setFriction] = useState(0);
  const [diabetesChecked, setDiabetesChecked] = useState(false);
  const [peripheralVascularDiseaseChecked, setPeripheralVascularDiseaseChecked] = useState(false);
  const [cerebralVascularAccident, setCerebralVascularAccident] = useState(false);
  const [hypotension, setHypotension] = useState(false);
  const [hypoalbuminemia, setHypoalbuminemia] = useState(false);
  const [incontinence, setIncontinence] = useState(false);
  const [venusThrombosis, setVenusThrombosis] = useState(false);
  const [comments, setComments] = useState("");
  const [doctors, setDoctors] = useState([]);

  const saveRiskData = async () => {
    const data = JSON.stringify({
      patient: name,
      gender: gender,
      age: age,
      weight: weight,
      height: height,
      sensory_perception: sensoryPerception,
      moisture: moisture,
      activity: activity,
      mobility: mobility,
      nutrition: nutrition,
      friction_shear: friction,
      diabetes_mellitus: diabetesChecked,
      peripheral_vascular_disease: peripheralVascularDiseaseChecked,
      cerebral_vascular_accident: cerebralVascularAccident,
      hypotension: hypotension,
      hypoalbuminemia: hypoalbuminemia,
      incontinence: incontinence,
      venus_thrombosis: venusThrombosis,
      comments: comments
    });

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + token);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: data,
      redirect: 'follow',
    };


    await fetch('https://prevelcer.herokuapp.com/api/show_friends/', requestOptions)
      .then((response) => response.json())
      .then((conn) => console.log("saving success")).catch((error) => console.log('saving error', error));

  }

  return (
    <Container>
      <Header noLeft>
        <Left />
        <Body>
          <Title style={{ textTransform: 'capitalize' }}>Ulcer Risk Scale</Title>
        </Body>
        <Right>
          <Icon name="bed" style={{ fontSize: 25, color: '#e4e213' }} />
        </Right>
      </Header>

      <Content>

        <Form>
          <Item inlineLabel>
            <Label>Patient</Label>
            <Input value={name}
            />
          </Item>
          <Item picker inlineLabel>
            <Label>Assessed By</Label>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: 100 }}
              placeholder="assigned by"
              placeholderStyle={{ color: '#bfc6ea' }}
              placeholderIconColor="#007aff"
              selectedValue={assessedBy}
              onValueChange={(value) => setAssessedBy(value)}>
              <Picker.Item label={username} value={username} />
            </Picker>
          </Item>
          <Item picker inlineLabel>
            <Label>Gender</Label>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: 100 }}
              placeholder="assigned by"
              placeholderStyle={{ color: '#bfc6ea' }}
              placeholderIconColor="#007aff"
              selectedValue={gender}
              onValueChange={(value) => setGender(value)}>
              <Picker.Item label="Male" value="M" />
              <Picker.Item label="Female " value="F" />
              <Picker.Item label="Other" value="O" />
            </Picker>
          </Item>
          <Item inlineLabel>
            <Label>Age</Label>
            <Input keyboardType="number-pad" onValueChange={value => setAge(value)}
            />
          </Item>
          <Item inlineLabel>
            <Label>Weight</Label>
            <Input keyboardType="number-pad" onValueChange={value => setWeight(value)}
            />
          </Item>
          <Item inlineLabel>
            <Label>Height</Label>
            <Input
              keyboardType="number-pad" onValueChange={value => setHeight(value)}
            />
          </Item>
          <Item picker inlineLabel>
            <Label>Sensory Perception</Label>
            <Right>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: 100, }}
                placeholder="assigned by"
                placeholderStyle={{ color: '#bfc6ea' }}
                placeholderIconColor="#007aff"
                selectedValue={sensoryPerception}
                onValueChange={(value) => setSensoryPerception(value)}
              >
                <Picker.Item label="---" value={0} />
                <Picker.Item label="1" value={1} />
                <Picker.Item label="2 " value={2} />
                <Picker.Item label="3" value={3} />
                <Picker.Item label="4" value={4} />
              </Picker>
            </Right>
          </Item>
          <Item picker inlineLabel>
            <Label>Moisture</Label>
            <Right>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: 100, }}
                placeholder="assigned by"
                placeholderStyle={{ color: '#bfc6ea' }}
                placeholderIconColor="#007aff"
                selectedValue={moisture}
                onValueChange={(value) => setMoisture(value)}
              >
                <Picker.Item label="---" value={0} />
                <Picker.Item label="1" value={1} />
                <Picker.Item label="2 " value={2} />
                <Picker.Item label="3" value={3} />
                <Picker.Item label="4" value={4} />
              </Picker>
            </Right>
          </Item>
          <Item picker inlineLabel>
            <Label>Activity</Label>
            <Right>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: 100, }}
                placeholder="assigned by"
                placeholderStyle={{ color: '#bfc6ea' }}
                placeholderIconColor="#007aff"
                selectedValue={activity}
                onValueChange={(value) => setActivity(value)}
              >
                <Picker.Item label="---" value={0} />
                <Picker.Item label="1" value={1} />
                <Picker.Item label="2 " value={2} />
                <Picker.Item label="3" value={3} />
                <Picker.Item label="4" value={4} />
              </Picker>
            </Right>
          </Item>
          <Item picker inlineLabel>
            <Label>Mobility</Label>
            <Right>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: 100, }}
                placeholder="assigned by"
                placeholderStyle={{ color: '#bfc6ea' }}
                placeholderIconColor="#007aff"
                selectedValue={mobility}
                onValueChange={(value) => setMobility(value)}
              >
                <Picker.Item label="---" value={0} />
                <Picker.Item label="1" value={1} />
                <Picker.Item label="2 " value={2} />
                <Picker.Item label="3" value={3} />
                <Picker.Item label="4" value={4} />
              </Picker>
            </Right>
          </Item>
          <Item picker inlineLabel>
            <Label>Nutrition</Label>
            <Right>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: 100, }}
                placeholder="assigned by"
                placeholderStyle={{ color: '#bfc6ea' }}
                placeholderIconColor="#007aff"
                selectedValue={nutrition}
                onValueChange={(value) => setNutrition(value)}
              >
                <Picker.Item label="---" value={0} />
                <Picker.Item label="1" value={1} />
                <Picker.Item label="2 " value={2} />
                <Picker.Item label="3" value={3} />
                <Picker.Item label="4" value={4} />
              </Picker>
            </Right>
          </Item>
          <Item picker inlineLabel>
            <Label>Friction Shear</Label>
            <Right>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: 100, }}
                placeholder="assigned by"
                placeholderStyle={{ color: '#bfc6ea' }}
                placeholderIconColor="#007aff"
                selectedValue={friction}
                onValueChange={(value) => setFriction(value)}
              >
                <Picker.Item label="---" value={0} />
                <Picker.Item label="1" value={1} />
                <Picker.Item label="2 " value={2} />
                <Picker.Item label="3" value={3} />
                <Picker.Item label="4" value={4} />
              </Picker>
            </Right>
          </Item>
        </Form>
        <ListItem>
          <CheckBox checked={diabetesChecked}
            style={{ fontSize: 30 }}
            onPress={() => set_Diabetes_Checked(!diabetesChecked)}
          />
          <Body>
            <Text>Diabetes mellitus</Text>
          </Body>
        </ListItem>
        <ListItem>
          <CheckBox checked={peripheralVascularDiseaseChecked}
            style={{ fontSize: 30 }}
            onPress={() => setPeripheralVascularDiseaseChecked(!peripheralVascularDiseaseChecked)}
          />
          <Body>
            <Text>Peripheral Vascular Disease</Text>
          </Body>
        </ListItem>
        <ListItem>
          <CheckBox checked={cerebralVascularAccident}
            style={{ fontSize: 30 }}
            onPress={() => setCerebralVascularAccident(!cerebralVascularAccident)}
          />
          <Body>
            <Text>Cerebral Vascular Accident</Text>
          </Body>
        </ListItem>
        <ListItem>
          <CheckBox checked={hypotension}
            style={{ fontSize: 30 }}
            onPress={() => setHypotension(!hypotension)}
          />
          <Body>
            <Text>Hypotension</Text>
          </Body>
        </ListItem>
        <ListItem>
          <CheckBox checked={hypoalbuminemia}
            style={{ fontSize: 30 }}
            onPress={() => setHypoalbuminemia(!hypoalbuminemia)}
          />
          <Body>
            <Text>Hypoalbuminemia</Text>
          </Body>
        </ListItem>
        <ListItem>
          <CheckBox checked={incontinence}
            style={{ fontSize: 30 }}
            onPress={() => setIncontinence(!incontinence)}
          />
          <Body>
            <Text>Incontinence</Text>
          </Body>
        </ListItem>
        <ListItem>
          <CheckBox checked={venusThrombosis}
            style={{ fontSize: 30 }}
            onPress={() => setVenusThrombosis(!venusThrombosis)}
          />
          <Body>
            <Text>Venus Thrombosis</Text>
          </Body>
        </ListItem>
        <Form>
          <Textarea regular rowSpan={5} onValueChange={(text) => setComments(text)} bordered placeholder="Insert your comments here" />
        </Form>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Button
            onPress={() => saveRiskData()}
            primary
            style={styles.button}
          >
            <Text>SAVE</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
}
const styles = StyleSheet.create({
  button: { flex: 1, justifyContent: 'center', marginTop: 10 }
});