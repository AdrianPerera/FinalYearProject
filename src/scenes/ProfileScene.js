import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MessagesTab from '../tabs/MessagesTab';
import PaymentTab from '../tabs/PaymentTab';
import ProfileTab from '../tabs/ProfileTab';
import LandingTab from '../tabs/LandingTab';
import Icon from 'react-native-vector-icons/FontAwesome';
import {DrawerContent} from '../components/DrawerContent';

function ProfileScene() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      backBehavior="history"
      drawerType="front"
      minSwipeDistance={70}
      initialRouteName="landingTab"
      drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="landingTab" component={LandingTab} />
      <Drawer.Screen name="profileTab" component={ProfileTab} />
      <Drawer.Screen name="messageTab" component={MessagesTab} />
      <Drawer.Screen name="paymentsTab" component={PaymentTab} />
    </Drawer.Navigator>
  );
}

export default ProfileScene;
