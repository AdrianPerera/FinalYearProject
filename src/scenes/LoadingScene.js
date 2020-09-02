import React, {Component, useEffect,useState} from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import Logo from '../images/logo.png';

function LoadingScene({navigation}) {
 
  const LogoAnime= new Animated.Value(0);
  const LogoText= new Animated.Value(0);
  const [loadingSpinner,setLoadingSpinner]= useState(false);
  
  const switchToAuth = () => {
    navigation.replace('auth');
  };

  useEffect(() => {

      Animated.spring(LogoAnime, {
      toValue: 1,
      tension: 5,
      friction: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    Animated.timing(LogoText, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(setLoadingSpinner(true)
    );
    setTimeout(switchToAuth,2000)
  });

  return (
    <View style={style.container}>
      <Animated.View
        style={{
          opacity: LogoAnime,
          top: LogoAnime.interpolate({
            inputRange: [0, 1],
            outputRange: [80, 0],
          }),
        }}>
        <Image source={Logo} style={style.logo} />
      </Animated.View>

      <Animated.View style={{opacity: LogoText}}>
        <Text style={style.logotext}> UlcerNOTE </Text>
      </Animated.View>
      {LogoText ? (
        <ActivityIndicator
          size="large"
          color="white"
          style={style.activityInd}
        />
      ) : null}
    </View>
  );
}

export default LoadingScene;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2974e8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logotext: {
    color: 'white',
<<<<<<< HEAD
   
=======
    
>>>>>>> development
    fontSize: 30,
    marginTop: 10,
    fontWeight: '700',
  },
  logo: {
    width: 150,
    height: 150,
  },
  activityInd: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
