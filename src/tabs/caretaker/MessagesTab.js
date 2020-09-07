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
            topic: 'notification 1',
            body: [
              {patient: 'patient1', posture: 'posture1', time: '00:00:00'},
              {patient: 'patient2', posture: 'posture2', time: '00:00:00'},
              {patient: 'patient3', posture: 'posture1', time: '00:00:00'},
            ],
          },
        },
      },
      {
        message: {
          token: '4ed48743-7372-41d5-9ce1-4ce532b9d5da',
          notification: {
            topic: 'notification 2',
            body: [
              {patient: 'patient1', posture: 'posture1', time: '00:00:00'},
              {patient: 'patient2', posture: 'posture2', time: '00:00:00'},
              {patient: 'patient3', posture: 'posture3', time: '00:00:00'},
            ],
          },
        },
      },
      {
        message: {
          token: '4ed48743-7372-41d5-9ce1-4ce532b9d5da',
          notification: {
            topic: 'notification 3',
            body: [
              {patient: 'patient1', posture: 'posture1', time: '00:00:00'},
              {patient: 'patient2', posture: 'posture2', time: '00:00:00'},
              {patient: 'patient3', posture: 'posture3', time: '00:00:00'},
            ],
          },
        },
      },
    ],
  };

  OpenModal(rowData) {
    // Alert.alert(rowData.message.notification.body);
    this.setState({modalBody: rowData.message.notification.body});
    this.setState({modalTopic: rowData.message.notification.topic});
    this.setState({modalVisible: true});
  }

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
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}>
            <View
              style={{
                borderColor: '#DDCCCC',
                borderWidth: 1,
                margin: 5,
                flexDirection: 'row',
                padding: 10,
              }}>
              <View style={{flex: 7, flexDirection: 'row'}}>
                <Text style={{fontSize: 20}}>{this.state.modalTopic}</Text>
              </View>

              <View style={{flex: 1}}>
                <Button
                  style={{justifyContent: 'center', alignSelf: 'flex-end'}}
                  danger
                  small
                  width={30}
                  onPress={() => this.setState({modalVisible: false})}>
                  <Icon name="remove" style={{fontSize: 20, color: 'white'}} />
                </Button>
              </View>
            </View>
            <View
              style={{marginTop: 20, marginLeft: 10, justifyContent: 'center'}}>
              <FlatList
                data={this.state.modalBody}
                keyExtractor={(item, index) => index.toString()}
                ref={(ref) => {
                  this.ListView_Ref = ref;
                }}
                renderItem={({item}) => {
                  
                  const setImage=(posture)=>{
                    const postures = {
                      posture1: require('../../images/postures/posture1.jpg'),
                      posture2: require('../../images/postures/posture2.jpg'),
                      posture3: require('../../images/postures/posture3.jpg') ,
                    }
                    return postures[posture];
                  }
              

                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        marginBottom: 5,
                        marginRight: 10,
                        padding: 10,
                        borderColor: 'black',
                        borderWidth: 1,
                      }}>
                      <Text style={{flex: 1}}>{item.patient}</Text>
                      <View style={{flex: 1}}>
                        <Text>{item.posture}</Text>
                        <Image
                          style={{
                            width: 100,
                            height: 100,
                            alignSelf: 'flex-start',
                          }}
                          source={setImage(item.posture)}
                        />
                      </View>
                      <Text style={{flex: 1}}>{item.time}</Text>
                    </View>
                  );
                }}
              />
            </View>
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
                <Text style={{fontWeight: 'bold'}}>
                  {' '}
                  {item.message.notification.topic}
                </Text>
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
    marginBottom: 3,
    padding: 10,
    borderBottomColor: 'grey',
    borderWidth: 1,
  },
});
