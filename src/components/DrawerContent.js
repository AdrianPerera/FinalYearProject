import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {
  DrawerItem,
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

function DrawerContent({...props}) {
  function logOutHandler() {
    Alert.alert('Log out?', 'You are about to Log out!', [
      {text: 'Cancel', style: 'cancel', onPress: () => {}},
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: () => {
          props.state.routes[0].params.param.isLoggedIn=false;
          props.navigation.reset({
            index: 0,
            routes: [{name: 'auth'}],
          });
        },
      },
    ]);
  }

/* TODO : Logout button in the Drawer needs double pressing for execution. Find out why */

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

      <View style={{position:'relative'}}>
      <DrawerItem
        icon={({color, size}) => (
          <Icon
            style={{marginRight: -3}}
            name="sign-out"
            size={size}
            color={color}
          />
        )}
        label="Sign Out"
        onPress={() => logOutHandler()}
      />
    </View>
    </DrawerContentScrollView>

    
  );
}

export default DrawerContent;

const styles = StyleSheet.create({});
