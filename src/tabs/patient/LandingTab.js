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
import { Animated, Alert, StyleSheet, Image,FlatList,SafeAreaView } from 'react-native';
import Img from '../../images/profile_pic.png';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LandingTab({ route, navigation }) {
  const { param } = route.params;
  const [token, setToken] = useState(param.auth_token);
  const [phoneNumber, setPhoneNumber] = useState('')
  const [details, setDetails] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [carers, setCarers] = useState([]);
  const [fileUri, setFileUri] = useState(null);
  const [image, setImage] = useState(null);
  const [toggleImageMenu, setToggleImagemenu] = useState(false);
  param.isLoggedIn = true;


  const getUserDetails = async () => {
    var headers = new Headers();
    headers.append("Authorization", "Token " + token);
    headers.append("Content-Type", "application/json");
    var requestOption = {
      method: 'GET',
      headers: headers,
    };

    await fetch('https://prevelcer.herokuapp.com/api/user/', requestOption)
      .then((response) => response.json())
      .then((details) => {
        setDetails(details)
      }).catch((error) => console.log('user details', error));


    await fetch('https://prevelcer.herokuapp.com/api/profile/', requestOption)
      .then((response) => response.json())
      .then((result) => {
        setPhoneNumber(result.phone_number)
      }).catch((error) => console.log('phone number , role', error));



    await fetch('https://prevelcer.herokuapp.com/api/show_connections/Doctor', requestOption)
      .then((response) => response.json())
      .then((doctors) => {
        setDoctors(doctors);
      }).catch((error) => console.log('Doctor retrieve', error));

    await fetch('https://prevelcer.herokuapp.com/api/show_connections/Carer', requestOption)
      .then((response) => response.json())
      .then((carers) => {
        setCarers(carers);
      }).catch((error) => console.log('Doctor retrieve', error));
  }

  const logOutHandler = () => {
    Alert.alert('Log out From Landing Tab?', 'You are about to Log out!', [
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
    getUserDetails();
    fetchImagePath();
    navigation.addListener('beforeRemove', (e) => {
      if (param.isLoggedIn) {
        e.preventDefault();
        logOutHandler();
       
      }
    })
  }, []
  );

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
  const uploadImage = async (fileUri) => {
    try {
      // await AsyncStorage.setItem('@img_path', fileUri);
      // console.log("store path: " + fileUri);
      setToggleImagemenu(!toggleImageMenu);

      let formData = new FormData();
      formData.append('picture', {
        uri: fileUri,
        type: 'image/jpeg',
        name: image.fileName,
      });

      var myHeaders = new Headers();

      myHeaders.append("Authorization", "Token " + param.auth_token);
      myHeaders.append('Content-Type', 'multipart/form-data')
      var requestOption = {
        method: 'POST',
        headers: myHeaders,
        body: formData,
        redirect: 'follow'
      };


      await fetch('https://prevelcer.herokuapp.com/api/profile/', requestOption)
        .then((response) => response.json())
        .then((conn) => {
          console.log(conn);
          fetchImagePath();
        }).catch((error) => console.log('Profile upload error', error));

    } catch (error) {
      console.log("store path error: " + error);
    }
  }

  const fetchImagePath = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + param.auth_token);
    await fetch('https://prevelcer.herokuapp.com/api/profile/', {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    })
      .then((response) => response.json())
      .then((conn) => {
        setFileUri(conn.picture);
        console.log(conn);
      }).catch((error) => console.log('fetchpath error', error));

  }


  const cameraLanch = () => {
    let cameraOptions = {
      includeBase64: true,
      saveToPhotos: true,
      saveToPhotos: true,
      maxWidth: 200,
      maxHeight: 200,
      quality: 0.8
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
        setImage(assets[0]);
        uploadImage(assets[0].uri);
        console.log(assets[0].uri);

      }
    });
  }

  const chooseImage = () => {
    let options = {
      mediaType: 'photo',
      includeBase64: true,
      selectionLimit: 1,
      maxWidth: 200,
      maxHeight: 200,
      quality: 0.8
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
        setImage(assets[0]);
        uploadImage(assets[0].uri);
        console.log(assets[0].uri);
      }
    });
  }

  const deleteImage = async () => {
    try {
      setFileUri(null);
      uploadImage(null);
      setToggleImagemenu(!toggleImageMenu);
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Token " + param.auth_token);
      var requestOption = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
      };

      await fetch('https://prevelcer.herokuapp.com/api/deletepicture/', requestOption)
        .then((response) => response.json())
        .then((conn) => {
          console.log(conn);
          fetchImagePath();
        }).catch((error) => console.log('Connected list', error));

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
          <Title style={{ textTransform: 'capitalize' }}>Patient</Title>
        </Body>
        <Right />
      </Header>

      <View style={styles.container}>
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
            <Button transparent small style={styles.profilePicEditBtn} onPress={() => setToggleImagemenu(!toggleImageMenu)}>
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
                      borderWidth: 1.5, paddingHorizontal: 5,
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
              {details.first_name==null? null: details.first_name+" "+ details.last_name}{' '}
            </Text>
          </View>

        </View>
      </View>

      <Content style={{ padding: 10 }}>
        <Card style={styles.card}>
          <CardItem>
            <Body style={{ flexDirection: 'row' }}>
              <Text style={{ flex: 1 }}> <Icon name="envelope" style={{ fontSize: 20, color: 'black' }} /> </Text>
              <Text style={{ flex: 4 }}>{details.email==null? null: details.email}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body style={{ flexDirection: 'row' }}>
              <Text style={{ flex: 1 }}> <Icon name="phone" style={{ fontSize: 20, color: 'black' }} /> </Text>
              <Text style={{ flex: 4 }}>{phoneNumber==null? null: phoneNumber}</Text>
            </Body>
          </CardItem>

        </Card>

        <Card style={styles.card}>
          <CardItem>
            <Body style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text>
                  <Icon name="user-md" style={{ fontSize: 20, color: '#005affeb' }} />
                </Text>
              </View>
              <SafeAreaView style={{ flex: 4 }}>
                <FlatList
                  horizontal
                  data={doctors}
                  keyExtractor={(item) => item.username}
                  renderItem={({ item }) =>
                    <Text style={{ fontWeight: 'bold', color: 'grey' }}>{item.first_name + " " + item.last_name}</Text>
                  }
                />
              </SafeAreaView>
            </Body>
          </CardItem>
        </Card>

        <Card style={styles.card}>

        <CardItem>
            <Body style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text>
                  <Icon name="heartbeat" style={{ fontSize: 20, color: '#005affeb' }} />
                </Text>
              </View>
              <SafeAreaView style={{ flex: 4 }}>
                <FlatList 
                  horizontal
                  data={carers}
                  keyExtractor={(item) => item.username}
                  renderItem={({ item }) =>
                    <Text style={{fontWeight:'bold',color:'grey'}}>{item.first_name + " " + item.last_name}</Text>
                  }
                />
              </SafeAreaView>
            </Body>
          </CardItem>

        </Card>
        <View style={{ margin: 15 }}>
          <Button
            block
            style={{ alignSelf: 'center', padding: 5, borderRadius: 5 }}
            onPress={() => navigation.navigate('editTab')}>
            <Icon name="edit" style={{ fontSize: 20, color: 'white', paddingLeft: 10 }} />
            <Text>Edit</Text>
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
  card: {
    padding: 5,
    alignItems: 'flex-start',
    borderRadius: 8,
  }
  ,
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
});
