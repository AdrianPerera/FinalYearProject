import React, {Component} from 'react';
import {StyleSheet,View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import MessagesTab from '../tabs/MessagesTab';
import PaymentTab from '../tabs/PaymentTab';
import ProfileTab from '../tabs/ProfileTab';
import LandingTab from '../tabs/LandingTab';
import Icon from 'react-native-vector-icons/FontAwesome';



function ProfileScene({navigation}) {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator drawerStyle={style.drawer} backBehavior='initialRoute' drawerType='front' minSwipeDistance={70}>
        <Drawer.Screen name="landingTab" component={LandingTab}  options={{ title:'Profile Details' }} />
        <Drawer.Screen name="profileTab" component={ProfileTab}  options={{ title:  'My Profile'}} />
        <Drawer.Screen name="messagesTab" component={MessagesTab} options={{ title: 'Messages' }} />
        <Drawer.Screen name="paymentsTab" component={PaymentTab}  options={{ title: 'Payments' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default ProfileScene;

const style=StyleSheet.create({
 drawer : {

 }

})
