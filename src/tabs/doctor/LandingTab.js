import React, { useEffect, useState, useRef } from 'react';
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
  View,
  Form,
  Item,

} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Animated, Alert, StyleSheet, Image } from 'react-native';
import Img from '../../images/profile_pic.png';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LandingTab({ route, navigation }) {
  const { param } = route.params;
  param.isLoggedIn = true;
  const [toggleImageMenu, setToggleImagemenu] = useState(false);
  const [fileUri, setFileUri] = useState(null);


  const logOutHandler = () => {
    Alert.alert('Log out?', 'You are about to Log out!', [
      { text: 'Cancel', style: 'cancel', onPress: () => { } },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: () => {
          param.isLoggedIn = false;
          navigation.reset({
            index: 0,
            routes: [{ name: 'auth' }],
          });
        },
      },
    ]);
  };

  //hardware backbutton prevent going back
  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      if (param.isLoggedIn) {
        e.preventDefault();
        logOutHandler();
      }
    }),
      fetchImagePath();
  }, []);

  const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

    useEffect(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }
      ).start();
      Animated.spring(fadeAnim, {
        toValue: 1,
        tension: 7,
        friction: 2,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }, [fadeAnim])

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
          bottom: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [15, 0],
          }),

        }}
      >
        {props.children}
      </Animated.View>
    );
  }
  const storeImagePath = async (fileUri) => {
    try {
      await AsyncStorage.setItem('@img_path', fileUri);
      console.log("store path: " + fileUri);
      setToggleImagemenu(!toggleImageMenu);
    } catch (error) {
      console.log("store path error: " + error);
    }
  }

  const fetchImagePath = async () => {
    try {
      const path = await AsyncStorage.getItem('@img_path');
      console.log("fetch path: " + path);
      if (path != null) {
        setFileUri(path);
      } else {
        setFileData(null);
      }

    } catch (error) {
      console.log('fetchpath error');
    }

  }


  const cameraLanch = () => {
    let cameraOptions = {
      includeBase64: true,
      saveToPhotos: true,
      saveToPhotos: true
    }
    launchCamera(cameraOptions, (response) => {

      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let assets = response.assets;
        setFileUri(assets[0].uri);
        storeImagePath(assets[0].uri);
      }
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
        let assets = response.assets;
        setFileUri(assets[0].uri);
        storeImagePath(assets[0].uri);
      }
    });
  }

  const deleteImage = async () => {
    try {
      setFileUri(null);
      await AsyncStorage.removeItem('@img_path');
      setToggleImagemenu(!toggleImageMenu);
    } catch (error) {
      console.log("DP delete error: " + error);
    }

  }

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
          <Title style={{ textTransform: 'capitalize' }}>Doctor</Title>
        </Body>
        <Right />
      </Header>

      <View>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            {fileUri != null ?
              <Image
                style={styles.avatar}
                source={{ uri: fileUri }}
              />
              :
              <Image
                style={styles.avatar}
                source={Img}
              />
            }
            <Button small style={styles.profilePicEditBtn} onPress={() => setToggleImagemenu(!toggleImageMenu)}>
              <Icon name="camera" style={{ fontSize: 15, color: '#b5b4b4db' }} />
            </Button>
            {toggleImageMenu ?
              <FadeInView>
                <Item style={{ justifyContent: 'center' }}>
                  <Button small style={styles.cameraButton} onPress={() => chooseImage()}>
                    <Icon name="photo" style={styles.buttonIcon} />
                    <Text style={{ color: "#a7a7a7" }} >Choose Image</Text>
                  </Button>
                  <Button small style={styles.cameraButton} onPress={() => cameraLanch()}>
                    <Icon name="camera" style={styles.buttonIcon} />
                    <Text style={{ color: "#a7a7a7" }}>Camera</Text>
                  </Button>
                  {fileUri != null ?
                    <Button small style={{
                      margin: 5, borderRadius: 5, borderColor: "white",
                      borderWidth: 1.5, paddingHorizontal:5,
                      height: 33
                    }} danger onPress={() => deleteImage()}>
                      <Icon name="trash" style={{ fontSize: 15, color: 'white' }} />
                    </Button>
                    :
                    null

                  }
                </Item>


              </FadeInView>

              : null
            }
            <Text style={{ fontWeight: 'bold', fontSize: 35, color: 'white' }}>
              {param.username}{' '}
            </Text>
          </View>

        </View>
      </View>

      <Content style={{ padding: 20 }}>
        <Card
          style={{
            height: 300,
            justifyContent: 'flex-start',
            borderRadius: 5,
          }}>
          <CardItem>
            <Body>
              <Text>Full Name: </Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Institution : </Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Age: </Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Specilizations: </Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Age: </Text>
            </Body>
          </CardItem>
        </Card>
        <View style={{ margin: 15 }}>
          <Button
            primary
            block
            style={{ alignSelf: 'center', padding: 5, borderRadius: 5 }}>
            <Text>Edit Details</Text>
            <Icon
              name="edit"
              style={{ fontSize: 30, color: 'white' }}
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          </Button>
        </View>
      </Content>
    </Container>
  );
}

export default LandingTab;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00BFFF',
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
  profilePicEditBtn: {
    borderRadius: 18,
    paddingHorizontal: 8,
    height: 35,
    position: 'absolute',
    right: 125, top: 115,
    borderWidth: 1.5,
    borderColor: '#b5b4b4db',
    backgroundColor: 'white',

  },
  cameraButton:
  {
    margin: 5,
    borderRadius: 5,
    borderColor: "#a7a7a7",
    borderWidth: 1.5,
    backgroundColor: 'white',
    padding: 1,
    height: 33
  },
  buttonIcon: { fontSize: 15, color: '#a7a7a7', paddingLeft: 10, paddingVertical: 2, marginRight: -5 }


});
