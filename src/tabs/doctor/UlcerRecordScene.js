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
  List,
  Text,
  CheckBox,
  Footer,
  Row
} from 'native-base';
import { View, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function UlcerRecordScene({ route, navigation }) {

  const { name, token, username } = route.params;
  const [reportedBy, setReportedBy] = useState("");
  const [site, setSite] = useState("---");
  const [stage, setStage] = useState("---");
  const [duration, setDuration] = useState(0);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [depth, setDepth] = useState(0);
  const [moisture, setMoisture] = useState(0);
  const [margin, setMargin] = useState("---");
  const [edge, setEdge] = useState("---");
  const [edgeColor, setEdgeColor] = useState("");
  const [underminingsChecked, setUnderminingsChecked] = useState(false);
  const [sinustractsChecked, setSinustractsChecked] = useState(false);

  const [floorHealthyChecked, setFloorHealthyChecked] = useState(false);
  const [floorGranulationTissueChecked, setFloorGranulationTissueChecked] = useState(false);
  const [floorSloughChecked, setFloorSloughChecked] = useState(false);
  const [floorNecroticChecked, setFloorNecroticChecked] = useState(false);
  const [floorEscharChecked, setFloorEscharChecked] = useState(false);
  const [floorEpithelialChecked, setFloorEpithelialChecked] = useState(false);

  const [discharge, setDischarge] = useState("---");
  const [dischargeAmount, setDischargeAmount] = useState("---");

  const [skinWarmChecked, setSkinWarmChecked] = useState(false);
  const [skinThickendChecked, setSkinThickendChecked] = useState(false);
  const [skinHyperpigmentedChecked, setSkinHyperpigmentedChecked] = useState(false);
  const [skinHypopignmentedChecked, setSkinHypopignmentedChecked] = useState(false);
  const [skinGangreousChecked, setSkinGangreousChecked] = useState(false);
  const [skinItchingChecked, setSkinItchingChecked] = useState(false);
  const [skinSwellingChecked, setSkinSwellingChecked] = useState(false);

  const [skinSensation, setSkinSensation] = useState("---");
  const [progress, setProgress] = useState("---");

  const [lymphNodesChecked, setLymphNodesChecked] = useState(false);
  const [smellChecked, setSmellChecked] = useState(false);
  const [painChecked, setPainChecked] = useState(false);
  const [filePath, setFilePath] = useState('');
  const [fileData, setFileData] = useState('');
  const [fileUri, setFileUri] = useState('');

  const cameraLanch = () => {
    let cameraOptions = {
      includeBase64: true,
      saveToPhotos: true
    }
    launchCamera(cameraOptions, (response) => {
      console.log("camera response :" + response);
      console.log("camera response :" + JSON.stringify(response));
    });
  }

  const chooseImage = () => {
    let options = {
      mediaType: 'photo',
      includeBase64: true,
      selectionLimit: 1,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        setFilePath(response);
        setFileData(response.data);
        setFileUri(response.uri);
      }
    });

  }



  return (
    <Container>
      <Header noLeft>
        <Left />
        <Body>
          <Title style={{ textTransform: 'capitalize' }}>Add Ulcer Record</Title>
        </Body>
        <Right>
          <Icon name="plus" style={{ fontSize: 25, color: '#e4e213' }} />
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
            <Label style={{ flex: 1 }}>Reported By</Label>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: 100, flex: 1 }}
              placeholder="assigned by"
              placeholderStyle={{ color: '#bfc6ea' }}
              placeholderIconColor="#007aff"
              selectedValue={reportedBy}
              onValueChange={(value) => setReportedBy(value)}>
              <Picker.Item label={username} value={username} />
            </Picker>
          </Item>
          <Item picker inlineLabel>
            <Label style={{ flex: 1 }}>Site</Label>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: 100, flex: 1 }}
              placeholder="assigned by"
              placeholderStyle={{ color: '#bfc6ea' }}
              placeholderIconColor="#007aff"
              selectedValue={site}
              onValueChange={(value) => setSite(value)}>
              <Picker.Item label="Back of Head" value="Back of Head" />
              <Picker.Item label="Forehead " value="Forehead" />
              <Picker.Item label="Right Shoulder" value="Right Shoulder" />
              <Picker.Item label="Left Shoulder" value="Left Shoulder" />
              <Picker.Item label="Right Heel" value="Right Heel" />
              <Picker.Item label="Left Heel" value="Left Heel" />
              <Picker.Item label="Right Elbow" value="Right Elbow" />
              <Picker.Item label="Left Elbow" value="Left Elbow" />
              <Picker.Item label="Right Buttocks" value="Right Buttocks" />
              <Picker.Item label="Left Buttocks" value="Left Buttocks" />
              <Picker.Item label="Right Knee" value="Right Knee" />
              <Picker.Item label="Left Knee" value="Left Knee" />
              <Picker.Item label="Right Hip" value="Right Hip" />
              <Picker.Item label="Left Hip" value="Left Hip" />
              <Picker.Item label="Fingers" value="Fingers" />
              <Picker.Item label="Toes" value="Toes" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </Item>

          <Item picker inlineLabel>
            <Label style={{ flex: 1 }}>Stage</Label>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: 100, flex: 1 }}
              placeholder="assigned by"
              placeholderStyle={{ color: '#bfc6ea' }}
              placeholderIconColor="#007aff"
              selectedValue={stage}
              onValueChange={(value) => setStage(value)}>
              <Picker.Item label="Stage I" value="Stage I" />
              <Picker.Item label="Stage II " value="Stage II" />
              <Picker.Item label="Stage III" value="Stage III" />
              <Picker.Item label="Stage IV" value="Stage IV" />
              <Picker.Item label="Deep Tissue Injury " value="Deep Tissue Injury" />
              <Picker.Item label="Unstaged" value="Unstaged" />
            </Picker>
          </Item>
          <Item inlineLabel>
            <Label>Duration</Label>
            <Input keyboardType="number-pad" onValueChange={value => setDuration(value)}
            />
          </Item>
          <Item inlineLabel>
            <Label>Length</Label>
            <Input keyboardType="number-pad" onValueChange={value => setLength(value)}
            />
          </Item>
          <Item inlineLabel>
            <Label>Width</Label>
            <Input keyboardType="number-pad" onValueChange={value => setWidth(value)}
            />
          </Item>
          <Item inlineLabel>
            <Label>Depth</Label>
            <Input
              keyboardType="number-pad" onValueChange={value => setDepth(value)}
            />
          </Item>
          <Item picker inlineLabel>
            <Label style={{ flex: 1 }}>Margin</Label>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: 100, flex: 1 }}
              placeholder="assigned by"
              placeholderStyle={{ color: '#bfc6ea' }}
              placeholderIconColor="#007aff"
              selectedValue={margin}
              onValueChange={(value) => setMargin(value)}
            >
              <Picker.Item label="---" value="---" />
              <Picker.Item label="Regular" value="Regular" />
              <Picker.Item label="Irregular" value="Irregular" />
            </Picker>

          </Item>
          <Item picker inlineLabel>
            <Label style={{ flex: 1 }}>Edge</Label>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: 50, flex: 1 }}
              placeholder="assigned by"
              placeholderStyle={{ color: '#bfc6ea' }}
              placeholderIconColor="#007aff"
              selectedValue={edge}
              onValueChange={(value) => setEdge(value)}
            >
              <Picker.Item label="---" value="---" />
              <Picker.Item label="Sloping" value="Sloping" />
              <Picker.Item label="Punched Out" value="Punched Out" />
              <Picker.Item label="Roll Out" value="Roll Out" />
              <Picker.Item label="Everted" value="Everted" />
            </Picker>
          </Item>
          <Item inlineLabel>
            <Label>Edge color</Label>
            <Input onValueChange={value => setEdgeColor(value)}
            />
          </Item>
        </Form>

        <ListItem>
          <CheckBox checked={underminingsChecked}
            style={{ fontSize: 30 }}
            onPress={() => setUnderminingsChecked(!underminingsChecked)}
          />
          <Body>
            <Text>Underminings</Text>
          </Body>
        </ListItem>
        <ListItem>
          <CheckBox checked={sinustractsChecked}
            style={{ fontSize: 30 }}
            onPress={() => setSinustractsChecked(!sinustractsChecked)}
          />
          <Body>
            <Text>Sinus tracts</Text>
          </Body>
        </ListItem>

        <List>
          <ListItem itemDivider>
            <Text style={{ fontWeight: 'bold' }}>FLOOR</Text>
          </ListItem>
          <ListItem style={{ marginLeft: 40 }}>
            <CheckBox checked={floorHealthyChecked}
              style={{ fontSize: 30 }}
              onPress={() => setFloorHealthyChecked(!floorHealthyChecked)}
            />
            <Body>
              <Text>Healthy</Text>
            </Body>
          </ListItem>
          <ListItem style={{ marginLeft: 40 }}>
            <CheckBox checked={floorGranulationTissueChecked}
              style={{ fontSize: 30 }}
              onPress={() => setFloorGranulationTissueChecked(!floorGranulationTissueChecked)}
            />
            <Body>
              <Text>Granualation Tissue</Text>
            </Body>
          </ListItem>
          <ListItem style={{ marginLeft: 40 }}>
            <CheckBox checked={floorSloughChecked}
              style={{ fontSize: 30 }}
              onPress={() => setFloorSloughChecked(!floorSloughChecked)}
            />
            <Body>
              <Text>Slough </Text>
            </Body>
          </ListItem>
          <ListItem style={{ marginLeft: 40 }}>
            <CheckBox checked={floorNecroticChecked}
              style={{ fontSize: 30 }}
              onPress={() => setFloorNecroticChecked(!floorNecroticChecked)}
            />
            <Body>
              <Text>Necrotic</Text>
            </Body>
          </ListItem>
          <ListItem style={{ marginLeft: 40 }}>
            <CheckBox checked={floorEscharChecked}
              style={{ fontSize: 30 }}
              onPress={() => setFloorEscharChecked(!floorEscharChecked)}
            />
            <Body>
              <Text>Eschar</Text>
            </Body>
          </ListItem>
          <ListItem style={{ marginLeft: 40 }}>
            <CheckBox checked={floorEpithelialChecked}
              style={{ fontSize: 30 }}
              onPress={() => setFloorEpithelialChecked(!floorEpithelialChecked)}
            />
            <Body>
              <Text>Epithelial</Text>
            </Body>
          </ListItem>
        </List>

        <Form>
          <Item picker inlineLabel>
            <Label style={{ flex: 1 }}>Discharge</Label>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: 50, flex: 1 }}
              placeholder="assigned by"
              placeholderStyle={{ color: '#bfc6ea' }}
              placeholderIconColor="#007aff"
              selectedValue={discharge}
              onValueChange={(value) => setDischarge(value)}
            >
              <Picker.Item label="---" value="---" />
              <Picker.Item label="Serous" value="Serous" />
              <Picker.Item label="Purulent" value="Purulent" />
              <Picker.Item label="Serosanguineous" value="Serosanguineous" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </Item>
          <Item picker inlineLabel>
            <Label style={{ flex: 1 }}>Discharge Amount</Label>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: 50, flex: 1 }}
              placeholder="assigned by"
              placeholderStyle={{ color: '#bfc6ea' }}
              placeholderIconColor="#007aff"
              selectedValue={dischargeAmount}
              onValueChange={(value) => setDischargeAmount(value)}
            >
              <Picker.Item label="---" value="---" />
              <Picker.Item label="Small" value="Small" />
              <Picker.Item label="Medium" value="Medium" />
              <Picker.Item label="Heavy" value="Heavy" />
            </Picker>
          </Item>
        </Form>

        <List>
          <ListItem itemDivider>
            <Text style={{ fontWeight: 'bold' }}>SORROUNDING SKIN</Text>
          </ListItem>
          <ListItem style={{ marginLeft: 40 }}>
            <CheckBox checked={skinWarmChecked}
              style={{ fontSize: 30 }}
              onPress={() => setSkinWarmChecked(!skinWarmChecked)}
            />
            <Body>
              <Text>Warm</Text>
            </Body>
          </ListItem>
          <ListItem style={{ marginLeft: 40 }}>
            <CheckBox checked={skinThickendChecked}
              style={{ fontSize: 30 }}
              onPress={() => setSkinThickendChecked(!skinThickendChecked)}
            />
            <Body>
              <Text>Thickend</Text>
            </Body>
          </ListItem>
          <ListItem style={{ marginLeft: 40 }}>
            <CheckBox checked={skinHyperpigmentedChecked}
              style={{ fontSize: 30 }}
              onPress={() => setSkinHyperpigmentedChecked(!skinHyperpigmentedChecked)}
            />
            <Body>
              <Text>Hyperpigmented </Text>
            </Body>
          </ListItem>
          <ListItem style={{ marginLeft: 40 }}>
            <CheckBox checked={skinHypopignmentedChecked}
              style={{ fontSize: 30 }}
              onPress={() => setSkinHypopignmentedChecked(!skinHypopignmentedChecked)}
            />
            <Body>
              <Text>Hypopignmented </Text>
            </Body>
          </ListItem>
          <ListItem style={{ marginLeft: 40 }}>
            <CheckBox checked={skinGangreousChecked}
              style={{ fontSize: 30 }}
              onPress={() => setSkinGangreousChecked(!skinGangreousChecked)}
            />
            <Body>
              <Text>Gangreous </Text>
            </Body>
          </ListItem>
          <ListItem style={{ marginLeft: 40 }}>
            <CheckBox checked={skinItchingChecked}
              style={{ fontSize: 30 }}
              onPress={() => setSkinItchingChecked(!skinItchingChecked)}
            />
            <Body>
              <Text>Itching </Text>
            </Body>
          </ListItem>
          <ListItem style={{ marginLeft: 40 }}>
            <CheckBox checked={skinSwellingChecked}
              style={{ fontSize: 30 }}
              onPress={() => setSkinSwellingChecked(!skinSwellingChecked)}
            />
            <Body>
              <Text>Swelling </Text>
            </Body>
          </ListItem>

        </List>
        <Form>
          <Item picker inlineLabel>
            <Label style={{ flex: 1, fontWeight: 'bold' }}>Skin Sensation</Label>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: 50, flex: 1 }}
              placeholder="assigned by"
              placeholderStyle={{ color: '#bfc6ea' }}
              placeholderIconColor="#007aff"
              selectedValue={skinSensation}
              onValueChange={(value) => setSkinSensation(value)}
            >
              <Picker.Item label="---" value="---" />
              <Picker.Item label="Good" value="Good" />
              <Picker.Item label="Impaired" value="Impaired" />

            </Picker>
          </Item>
          <ListItem>
            <CheckBox checked={lymphNodesChecked}
              style={{ fontSize: 30 }}
              onPress={() => setLymphNodesChecked(!lymphNodesChecked)}
            />
            <Body>
              <Text>Regional lymph nodes enlarged </Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={smellChecked}
              style={{ fontSize: 30 }}
              onPress={() => setSmellChecked(!smellChecked)}
            />
            <Body>
              <Text>Smell </Text>
            </Body>
          </ListItem>
          <ListItem>
            <CheckBox checked={painChecked}
              style={{ fontSize: 30 }}
              onPress={() => setPainChecked(!painChecked)}
            />
            <Body>
              <Text>Pain </Text>
            </Body>
          </ListItem>
          <Item picker inlineLabel>
            <Label style={{ flex: 1, fontWeight: 'bold' }}>Progress</Label>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: 50, flex: 1 }}
              placeholder="assigned by"
              placeholderStyle={{ color: '#bfc6ea' }}
              placeholderIconColor="#007aff"
              selectedValue={progress}
              onValueChange={(value) => setProgress(value)}
            >
              <Picker.Item label="---" value="---" />
              <Picker.Item label="Improved" value="Improved" />
              <Picker.Item label="No Change" value="No Change" />
              <Picker.Item label="Stable" value="Stable" />
              <Picker.Item label="Declined" value="Declined" />

            </Picker>
          </Item>

          <Item>
            <Label> Image</Label>
            <Button style={{ margin: 5, borderRadius: 7 }} onPress={() => chooseImage()}>
              <Text>Choose File</Text>
            </Button>
            <Button style={{ margin: 5, borderRadius: 7 }} danger onPress={() => cameraLanch()}>
              <Text>Camera</Text>
            </Button>
          </Item>


        </Form>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Button
            onPress={() => saveUlcerRecord()}
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