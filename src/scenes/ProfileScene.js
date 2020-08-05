import React, {Component} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MessagesTab from '../tabs/MessagesTab';
import PaymentTab from '../tabs/PaymentTab';
import ProfileTab from '../tabs/ProfileTab';
import LandingTab from '../tabs/LandingTab';
import {DrawerContent} from '../components/DrawerContent';

function ProfileScene({route}) {
  const Drawer = createDrawerNavigator();
  const {param} =route.params.params;

  if(param.selected==='patient'){
    return (
    
      <Drawer.Navigator 
        backBehavior="history"
        drawerType="front"
        minSwipeDistance={70}
        initialRouteName="landingTab"
        drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="landingTab" component={LandingTab} />
        <Drawer.Screen name="profileTab" component={ProfileTab} />
        <Drawer.Screen name="messagesTab" component={MessagesTab} />
        <Drawer.Screen name="paymentsTab" component={PaymentTab} />
      </Drawer.Navigator>
        
      );
    }
  
  if(param.selected==='doctor'){
    return ( 
      null
      //Navigator to return if Doctor is logged in
    );
  }
  if(param.selected==='caretaker'){
    return (null
      //Navigatro to return if caretaker is logged in 
      );
  }
  
}

export default ProfileScene;
