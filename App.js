/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoadingScene from './src/scenes/LoadingScene';
import AuthScene from './src/scenes/AuthScene';
import SignUpScene from './src/scenes/SignUpScene';
import ProfileScene from './src/scenes/ProfileScene';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="loading"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="loading" component={LoadingScene} />
        <Stack.Screen name="auth" component={AuthScene} />
        <Stack.Screen name="signup" component={SignUpScene} />
        <Stack.Screen name="profile" component={ProfileScene} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
