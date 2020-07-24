import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const Presentation = (props) => {
  return (
    <View>
      {props.list.names.map((item, index) => (
        <TouchableOpacity 
        key={item.id} 
        onPress={() => alert(item.name)}
        style={styles.listitem}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Presentation;

const styles = StyleSheet.create({
  myState: {
    marginTop: 20,
    textAlign: 'center',
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },

  listitem: {
    padding: 10,
    marginTop: 3,
    backgroundColor: '#d9f9b1',
    alignItems: 'center',
  },
});
