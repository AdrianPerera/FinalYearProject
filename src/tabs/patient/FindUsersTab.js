import React, { useEffect, useState } from 'react';
import {
    Container,
    Header,
    Body,
    Title,
    Right,
    Left,
    Text,
    Button
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, FlatList, Settings } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


function FindUserTab({ route, navigation }) {
    const [token, setToken] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [carers, setCarers] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);

    const fetchDetails = async () => {
        try {
            const token = await AsyncStorage.getItem('@auth_token');
            if (token === null) {
                console.log('token null');
            }
            setToken(token);
            getUsers(token);
        } catch (e) {
            console.log("token error: " + e);
        }
    }

    const getSentRequests = async (token) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Token " + token);
        myHeaders.append("Content-Type", "application/json");
        var requestOption = {
            method: 'GET',
            headers: myHeaders,
        };
        await fetch('https://prevelcer.herokuapp.com/api/outgoing_requests/', requestOption)
            .then((response) => response.json())
            .then((sentRequests) => {
                var reducedmap = sentRequests.map(a => a.receiver_name)
                console.log(reducedmap);
                setSentRequests(reducedmap);
            }).catch((error) => console.log('sent Requests ', error));
    }

    const getUsers = async (token) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Token " + token);
        myHeaders.append("Content-Type", "application/json");
        var requestOption = {
            method: 'GET',
            headers: myHeaders,
        };

        await fetch('https://prevelcer.herokuapp.com/api/community/Doctor', requestOption)
            .then((response) => response.json())
            .then((doctorList) => {
                setDoctors(doctorList.results);
            }).catch((error) => console.log('Doctor list', error));

        await fetch('https://prevelcer.herokuapp.com/api/community/Carer', requestOption)
            .then((response) => response.json())
            .then((carerList) => {
                setCarers(carerList.results);
            }).catch((error) => console.log('carer list ', error));
        getSentRequests(token);
    }

    const sendFriendRequest = async (username) => {
        console.log(username);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Token " + token);
        myHeaders.append("Content-Type", "application/json");
        var data = JSON.stringify({
            "receiver": username
        })
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: data,
            redirect: 'follow',
        };

        await fetch('https://prevelcer.herokuapp.com/api/friend_request/', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
            }).catch((error) => console.log('friend request error', error));
        getSentRequests(token);
    }

    const cancelFriendRequest = async (username) => {
        console.log(username);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Token " + token);
        myHeaders.append("Content-Type", "application/json");
        var data = JSON.stringify({
            "username": username
        })
        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: data,
            redirect: 'follow',
        };

        await fetch('https://prevelcer.herokuapp.com/api/unfriend/', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
            }).catch((error) => console.log('friend request error', error));
        getSentRequests(token);
    }

    useEffect(() => {
        fetchDetails();
    }, [])

    return (
        <Container>
            <Header>
                <Left>
                    <Button
                        style={{ width: 50, justifyContent: 'center' }}
                        onPress={() => navigation.toggleDrawer()}>
                        <Icon name="reorder" style={{ fontSize: 30, color: 'white' }} />
                    </Button>
                </Left>
                <Body>
                    <Title style={{ textTransform: 'capitalize' }}>Find and Assign</Title>
                </Body>
                <Right />
            </Header>

            <View style={{ margin: 15 }}>
                <Text style={styles.categoryText}><Icon name="user-md" style={{ fontSize: 20, color: 'blue' }} />  DOCTORS </Text>
                <FlatList
                    data={doctors}
                    keyExtractor={(item) => item.username}
                    renderItem={({ item }) =>
                        <View style={styles.listCard}>
                            <Text style={styles.font}>{item.first_name + " " + item.last_name} </Text>

                            <View style={{ flex: 1 }}>
                                {sentRequests.indexOf(item.username) < 0 ?
                                    <Button
                                        onPress={() => sendFriendRequest(item.username)}
                                        small
                                        primary
                                        style={styles.button}>
                                        <Text>Add</Text>
                                    </Button> :
                                    < Button
                                        onPress={() => cancelFriendRequest(item.username)}
                                        small
                                        danger
                                        style={styles.button}>
                                        <Text>Cancel</Text>
                                    </Button>
                                }
                            </View>
                        </View>
                    }

                />
                <Text style={styles.categoryText}><Icon name="heartbeat" style={{ fontSize: 20, color: 'blue' }} /> CARERS</Text>
                <FlatList
                    data={carers}
                    keyExtractor={(item) => item.username}
                    renderItem={({ item }) =>
                        <View style={styles.listCard}>
                            <Text style={styles.font}>{item.first_name + " " + item.last_name} </Text>
                            <View style={{ flex: 1 }}>
                                {sentRequests.indexOf(item.username) < 0 ?
                                    <Button
                                        onPress={() => sendFriendRequest(item.username)}
                                        small
                                        primary
                                        style={styles.button}>
                                        <Text>Add</Text>
                                    </Button> :
                                    < Button
                                        onPress={() => cancelFriendRequest(item.username)}
                                        small
                                        danger
                                        style={styles.button}>
                                        <Text>Cancel</Text>
                                    </Button>
                                }
                            </View>
                        </View>
                    }

                />
            </View>
        </Container>
    );


}

export default FindUserTab;

const styles = StyleSheet.create({
    font: {
        flex: 2,
        color: "#000099",
        fontWeight: 'bold'
    },
    categoryText: { marginTop: 15, fontWeight: 'bold', color: "#1372d2a6" }
    ,
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    button: {
        alignSelf: 'flex-end',
        borderRadius: 8,
        width: 100,
        justifyContent: 'center'
    }
    ,
    listCard: {
        margin: 5,
        flexDirection: 'row',
        padding: 5,
        borderTopWidth: 0.75,
        borderTopColor: "grey"
    }

});