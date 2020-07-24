import React, {Component} from 'react';
import {Animated,View, Text, StyleSheet, Image, ActivityIndicator} from 'react-native';
import Logo from '../images/logo.png';
import {Actions} from 'react-native-router-flux';

const switchToAuth =()=>{
  Actions.replace("auth");
}

export default class LoadingScene extends Component {
  state = {
    LogoAnime: new Animated.Value(0),
    LogoText: new Animated.Value(0),
    loadingSpinner: false,
  };

  componentDidMount() {
    const {LogoAnime,LogoText} = this.state;
    Animated.spring(LogoAnime, {
      toValue: 1,
      tension: 5,
      friction: 1,
      duration: 1000,
      useNativeDriver:false
    }).start();
    Animated.timing(this.state.LogoText,{
        toValue:1,
        duration:1000,
        useNativeDriver:true
    }).start(()=>{
        this.setState({
            loadingSpinner:true,
        })
    });
    setTimeout( switchToAuth,2000);
  }

  render() {
    return (
      <View style={style.container}>
        <Animated.View
          style={{
            opacity: this.state.LogoAnime,
            top: this.state.LogoAnime.interpolate({
              inputRange: [0, 1],
              outputRange: [80, 0],
            }),
          }}>
          <Image source={Logo} style={style.logo} />
          
        </Animated.View>

        <Animated.View 
        style={{opacity:this.state.LogoText}}>
        <Text style={style.logotext}> UlcerNOTE </Text>
        </Animated.View>
        {this.state.LogoText ? <ActivityIndicator size="large" color='white' style={style.activityInd} /> : null }
        
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2974e8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logotext: {
    color: 'white',
    fontFamily: 'GoogleSans-Bold',
    fontSize: 30,
    marginTop: 10,
    fontWeight: '700',
  },
  logo: {
    width: 150,
    height: 150,
  },
  activityInd:{
    position:'absolute',left:0,right:0,bottom:0,top:0,alignItems:"center",justifyContent:"center"
  }

});
