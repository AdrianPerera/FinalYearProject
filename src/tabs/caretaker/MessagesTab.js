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
import {
  Container,
  Content,
  Body,
  Header,
  Left,
  Right,
  Button,
  Title,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView} from 'react-native-gesture-handler';

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
          height: 1,
          width: '100%',
          backgroundColor: '#000',
        }}
      />
    );
  };

  OpenModal(rowData) {
    // Alert.alert(rowData.message.notification.body);
    this.setState({modalBody: rowData.message.notification.body});
    this.setState({modalTopic: rowData.message.notification.topic});
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
      <Container>
        <Header>
          <Left>
            <Button>
              <Icon
                name="reorder"
                style={{fontSize: 30, color: 'white'}}
                onPress={() => {
                 this.props.navigation.toggleDrawer();
                }}
              />
            </Button>
          </Left>
          <Body>
            <Title style={{textTransform: 'capitalize'}}>Messages</Title>
          </Body>
          <Right />
        </Header>

        <View style={styles.MainContainer}>
          <Modal
            animationType="fade"
            transparent={false}
            visible={this.state.modalVisible}>
            <View
              style={{
                borderColor:'#DDCCCC',
                borderWidth:1,
                backgroundColor: '#00BFFF',
                margin:5,
                flexDirection: 'row',
                padding: 10,
              }}>
              <View style={{flex: 7,flexDirection:'row'}}>
              <Text style={{fontSize: 20}}>{this.state.modalTopic}</Text>
              </View>
             
              <View style={{flex: 1}}>
              <Button style={{justifyContent:'center',alignSelf:'flex-end'}} danger small width={30} onPress={() => this.setState({modalVisible: false})}>
              <Icon
                  name="remove"
                  style={{fontSize: 20,color:'white'}}
                />
              </Button> 
              
              </View>
            </View>
            <ScrollView
              style={{
                flex: 1,
                borderColor: '#DDDDDD',
                borderWidth: 1,
                margin: 5,
                padding: 10,
              }}>
              <Text>{this.state.modalBody}</Text>
            </ScrollView>
            
          </Modal>

          <FlatList
            data={this.state.dataSource}
            keyExtractor={(item, index) => index.toString()}
            ref={(ref) => {
              this.ListView_Ref = ref;
            }}
            renderItem={({item}) => (
              <TouchableHighlight
                activeOpacity={0.2}
                underlayColor="#DDD"
                style={styles.rowViewContainer}
                onPress={this.OpenModal.bind(this, item)}>
                <Text style={{fontWeight:'bold'}}> {item.message.notification.topic}</Text>
              </TouchableHighlight>
            )}
          />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
  },
  rowViewContainer: {
    fontSize: 20,
    marginBottom:3,
    padding: 10,
    borderBottomColor: 'grey',
    borderWidth:1,
  },
});
