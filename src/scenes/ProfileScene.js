import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MessagesTab from '../tabs/MessagesTab';
import PaymentTab from '../tabs/PaymentTab';
import ProfileTab from '../tabs/ProfileTab';
import LandingTab from '../tabs/LandingTab';
import Icon from 'react-native-vector-icons/FontAwesome';


function ProfileScene() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      backBehavior="history"
      drawerType="front"
      minSwipeDistance={70}
      initialRouteName="landingTab">
      <Drawer.Screen
        name="landingTab"
        component={LandingTab}
        options={{
          title: 'Profile Details',
          drawerIcon: ({focused, size}) => (
            <Icon
              style={{marginRight: -3}}
              name="list-alt"
              size={size}
              color={focused ? '#3eb708' : '#442b2b'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="profileTab"
        component={ProfileTab}
        options={{
          title: ' My Profile',
          drawerIcon: ({focused, size}) => (
            <Icon
              style={{marginRight: -3, marginLeft: 3}}
              name="user"
              size={size}
              color={focused ? '#3eb708' : '#442b2b'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="messagesTab"
        component={MessagesTab}
        options={{
          title: 'Messages',
          drawerIcon: ({focused, size}) => (
            <Icon
              style={{marginRight: -3}}
              name="envelope-o"
              size={size}
              color={focused ? '#3eb708' : '#442b2b'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="paymentsTab"
        component={PaymentTab}
        options={{
          title: 'Payments',
          drawerIcon: ({focused, size}) => (
            <Icon
              style={{marginRight: -4}}
              name="money"
              size={size}
              color={focused ? '#3eb708' : '#442b2b'}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default ProfileScene;
