import React, {Component} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Text, Drawer} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

export function DrawerContent(props) {
   function logOutHandler () {
    Alert.alert('Log out?', 'You are about to Log out!', [
      {text: 'Do not leave', style: 'cancel', onPress: () => {}},
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: () => 
        {
            props.navigation.reset({
            index: 0,
            routes: [{name: 'auth'}],
          });
        }

      },
    ]);

  };

  return (
    <View>
      <DrawerContentScrollView {...props}>
        <View style={{}}>
          <Text>Main Content</Text>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section>
        <DrawerItem
          icon={({color, size}) => (
            <Icon
              style={{marginRight: -3}}
              name="list-alt"
              size={size}
              color={color}
            />
          )}
          label="Details"
          onPress={() => {}}
        />
        <DrawerItem
          icon={({color, size}) => (
            <Icon
              style={{marginRight: 3, marginLeft: 3}}
              name="user"
              size={size}
              color={color}
            />
          )}
          label="Profile"
          onPress={() => {}}
        />
        <DrawerItem
          icon={({color, size}) => (
            <Icon
              style={{marginRight: -3}}
              name="envelope"
              size={size}
              color={color}
            />
          )}
          label="Messages"
          onPress={() => {}}
        />
        <DrawerItem
          icon={({color, size}) => (
            <Icon
              style={{marginRight: -3}}
              name="money"
              size={size}
              color={color}
            />
          )}
          label="Payments"
          onPress={() => {}}
        />
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
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({});
