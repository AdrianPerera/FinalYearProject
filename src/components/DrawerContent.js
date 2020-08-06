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
    <DrawerContentScrollView>
      <View style={{}}>
        <DrawerItem
          icon={({focused, color, size}) => (
            <Icon
              style={{marginRight: -3}}
              name="list-alt"
              size={size}
              color={focused ? '#3eb708' : '#442b2b'}
            />
          )}
          label="Details"
          onPress={() => {
            props.navigation.navigate('landingTab');
          }}
        />

        <DrawerItem
          icon={({focused, size}) => (
            <Icon
              style={{marginRight: 3, marginLeft: 3}}
              name="user"
              size={size}
              color={focused ? '#3eb708' : '#442b2b'}
            />
          )}
          label="Profile"
          onPress={() => {
            props.navigation.navigate('profileTab');
          }}
        />

        <DrawerItem
          icon={({focused, size}) => (
            <Icon
              style={{marginRight: -3}}
              name="envelope"
              size={size}
              color={focused ? '#3eb708' : '#442b2b'}
            />
          )}
          label="Messages"
          onPress={() => {
            props.navigation.navigate('messagesTab');
          }}
        />

        <DrawerItem
          icon={({focused, size}) => (
            <Icon
              style={{marginRight: -3}}
              name="money"
              size={size}
              color={focused ? '#3eb708' : '#442b2b'}
            />
          )}
          label="Payments"
          onPress={() => {
            props.navigation.navigate('paymentsTab');
          }}
        />
      </View>

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
