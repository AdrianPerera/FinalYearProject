import React, {Component} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Text, Drawer} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  DrawerItem,
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {exp} from 'react-native-reanimated';

function DrawerContent({...props}) {
  function logOutHandler() {
    Alert.alert('Log out?', 'You are about to Log out!', [
      {text: 'Cancel', style: 'cancel', onPress: () => {}},
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: () => {
          props.navigation.reset({
            index: 0,
            routes: [{name: 'auth'}],
          });
        },
      },
    ]);
  }

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
