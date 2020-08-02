import React, {Component} from 'react';
import {StyleSheet,View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MessagesTab from '../tabs/MessagesTab';
import PaymentTab from '../tabs/PaymentTab';
import ProfileTab from '../tabs/ProfileTab';
import LandingTab from '../tabs/LandingTab';



function ProfileScene() {
  const Drawer = createDrawerNavigator();
  return (
      <Drawer.Navigator  backBehavior='history' drawerType='front' minSwipeDistance={70} initialRouteName='landingTab'>
        <Drawer.Screen name="landingTab" component={LandingTab}  options={{ title:'Profile Details' }} />
        <Drawer.Screen name="profileTab" component={ProfileTab}  options={{ title:  'My Profile'}} />
        <Drawer.Screen name="messagesTab" component={MessagesTab} options={{ title: 'Messages' }} />
        <Drawer.Screen name="paymentsTab" component={PaymentTab}  options={{ title: 'Payments' }} />
      </Drawer.Navigator>
  );
}

export default ProfileScene;

