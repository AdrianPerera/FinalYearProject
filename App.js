/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import {Router, Scene, Stack} from 'react-native-router-flux';

import LoadingScene from './src/scenes/LoadingScene';
import AuthScene from './src/scenes/AuthScene';
import SignUpScene from './src/scenes/SignUpScene';

class App extends Component{
    
  render(){
    return(
      <Router>
       <Stack key="root">
        <Scene key="loading" component={LoadingScene} initial={true} hideNavBar={true}></Scene>
        <Scene key="auth" component={AuthScene} hideNavBar={true} ></Scene>
        <Scene key="signup" component={SignUpScene} hideNavBar={true} ></Scene>
        </Stack>  
      </Router>

    );
  }

}

export default App;
