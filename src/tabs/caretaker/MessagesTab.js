import React, { Component } from 'react';
//import react in our code.

import {
  StyleSheet,
  View,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
//import all the components we are going to use.

export default class Mynewproject extends Component {
  constructor(props) {
    super(props);
    //Preparing the data for the ListView
    this.state = {
      dataSource: [
        'Chinkara',
        'MotorsForce',
        'MotorsIPMLHindustan',
        'Mahindra',
        'Reva',
        'Electric',
        'VehiclesMaruti',
        'Suzuki',
        'IndiaOpel',
        'IndiaPremier',
        'LtdSan',
        'StormSML',
        'IsuzuStandardTara',
        'InternationalTata',
        'Motor',
        'Chinkara',
        'MotorsForce',
        'MotorsIPMLHindustan',
        'Mahindra',
        'Reva',
        'Electric',
        'VehiclesMaruti',
        'Suzuki',
        'IndiaOpel',
        'IndiaPremier',
        'LtdSan',
        'StormSML',
        'IsuzuStandardTara',
        'InternationalTata',
        'Motor',
      ]
    };
  }

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#000',
        }}
      />
    );
  };

  GetListViewItem(rowData) {
    Alert.alert(rowData);
  }

  upButtonHandler = () => {
    //OnCLick of Up button we scrolled the list to top
    this.ListView_Ref.scrollToOffset({ offset: 0,  animated: true });
  };

  downButtonHandler = () => {
    //OnCLick of down button we scrolled the list to bottom
    this.ListView_Ref.scrollToEnd({ animated: true });
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <FlatList
          data={this.state.dataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          ref={(ref) => {
            this.ListView_Ref = ref;
          }}
          renderItem={({ item }) => (
            <Text
              style={styles.rowViewContainer}
              onPress={this.GetListViewItem.bind(this, item)}>
              {item}
            </Text>
          )}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={this.downButtonHandler}
          style={styles.downButton}>
          <Image
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/arrow_down.png',
            }}
            style={styles.downButtonImage}

          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={this.upButtonHandler}
          style={styles.upButton}>
          <Image
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/arrow_up.png',
            }}
            style={styles.upButtonImage}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    paddingTop: 40,
  },
  rowViewContainer: {
    fontSize: 18,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  upButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 70,
  },
  upButtonImage: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },
  downButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    top: 70,
  },
  downButtonImage: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },
});