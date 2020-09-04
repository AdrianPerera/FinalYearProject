import React, {Component} from 'react';
//import react in our code.
import {
  StyleSheet,
  View,
  Modal,
  FlatList,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';


export default class MessagesTab extends Component {
  state = {
    modalVisible: false,
    modalBody: '',
    modalTopic: '',
    dataSource: [
      {
        message: {
          token: '4ed48743-7372-41d5-9ce1-4ce532b9d5da',
          notification: {
            topic: 'Lodovico Gammon',
            body: 'Vision-oriented radical infrastructure',
          },
        },
      },
      {
        message: {
          token: 'e86336e6-2a36-4c16-a69b-7810a5d811b2',
          notification: {
            topic: 'Katine Eberst',
            body: 'Ergonomic dedicated help-desk',
          },
        },
      },
      {
        message: {
          token: '7a1eba9e-389c-4d26-8eac-70dcfbd2d139',
          notification: {
            topic: 'Vanna Gaukrodge',
            body: 'Universal full-range infrastructure',
          },
        },
      },
      {
        message: {
          token: '079dede2-9809-4196-90ea-5a0506f60b5a',
          notification: {
            topic: 'Saleem MacCollom',
            body: 'Visionary radical methodology',
          },
        },
      },
      {
        message: {
          token: '75e8f6d7-a8ea-4a04-9a98-07326df08b58',
          notification: {
            topic: 'Jeniffer Quimby',
            body: 'Persevering asynchronous time-frame',
          },
        },
      },
    ],
  };

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
    // Alert.alert(rowData.message.notification.body);
    this.setState({modalBody: rowData.message.notification.body});
    this.setState({modalTopic:rowData.message.notification.topic})
    this.setState({modalVisible: true});
  }

  upButtonHandler = () => {
    //OnCLick of Up button we scrolled the list to top
    this.ListView_Ref.scrollToOffset({offset: 0, animated: true});
  };

  downButtonHandler = () => {
    //OnCLick of down button we scrolled the list to bottom
    this.ListView_Ref.scrollToEnd({animated: true});
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}>
          <View>
            <View>
              <Text>{this.state.modalBody}</Text>
              <Text>{this.state.modalTopic}</Text>
              <TouchableHighlight
                onPress={() => this.setState({modalVisible: false})}>
                <Text>Hide Modal </Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <FlatList
          data={this.state.dataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          ref={(ref) => {
            this.ListView_Ref = ref;
          }}
          renderItem={({item}) => (
            <TouchableHighlight
              style={styles.rowViewContainer}
              onPress={this.GetListViewItem.bind(this, item)}>
              <Text>{item.message.notification.topic}</Text>
            </TouchableHighlight>
          )}
        />
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
