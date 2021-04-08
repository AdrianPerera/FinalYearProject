import React, { useEffect, useState } from 'react';
import {
    Container,
    Header,
    Body,
    Title,
    Right,
    Left,
    Text,
    Button,
    Row
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


function FindUserTab({ route, navigation }) {
    const [token, setToken] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [carers, setCarers] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    const [connected, setConnected] = useState([]);
    const [incomingRequests, setIncomingRequests] = useState([]);
    const [incomingRequestsMap, setIncomingRequestsMap] = useState([]);
    const [loadingSpinner, setLoadingSpinner] = useState(false);




    const fetchDetails = async () => {
        try {
            const token = await AsyncStorage.getItem('@auth_token');
            if (token === null) {
                console.log('token null');
            }
            setToken(token);
            getUsers(token);
            setLoadingSpinner(true);
        } catch (e) {
            console.log("token error: " + e);
        }
    }



    const getUsers = async (token) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Token " + token);
        myHeaders.append("Content-Type", "application/json");
        var requestOption = {
            method: 'GET',
            headers: myHeaders,
        };


        await fetch('https://prevelcer.herokuapp.com/api/show_friends/', requestOption)
            .then((response) => response.json())
            .then((conn) => {
                var reducedmap = conn.map(a => a.username)
                console.log("all friends", reducedmap);
                setConnected(reducedmap);
            }).catch((error) => console.log('Connected list', error));

        await fetch('https://prevelcer.herokuapp.com/api/outgoing_requests/', requestOption)
            .then((response) => response.json())
            .then((sentRequests) => {
                var reducedmap = sentRequests.map(a => a.receiver_name)
                setSentRequests(reducedmap);
                setLoadingSpinner(false);
            }).catch((error) => console.log('sent Requests ', error));
        await fetch('https://prevelcer.herokuapp.com/api/friend_request/', requestOption)
            .then((response) => response.json())
            .then((friendRequests) => {
                var map = friendRequests.map(a => a.sender_name)
                setIncomingRequestsMap(map);
                setIncomingRequests(friendRequests);
                console.log('incoming requests map' + map);
            }).catch((error) => console.log('incoming friendlist', error));

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


        setLoadingSpinner(false);

    }

    const sendFriendRequest = async (username) => {
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
                result
                // console.log(result);
            }).catch((error) => console.log('friend request error', error));
        getUsers(token);
    }

    const cancelFriendRequest = async (receiver) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Token " + token);
        myHeaders.append("Content-Type", "application/json");
        var data = JSON.stringify({
            "receiver": receiver
        })
        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: data,
            redirect: 'follow',
        };

        await fetch('https://prevelcer.herokuapp.com/api/friend_request/', requestOptions)
            .then((response) => response.json())
            .then((result) => { result }).catch((error) => console.log('friend request error', error));
        getUsers(token);
    }

    const unfriend = async (username) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Token " + token);
        myHeaders.append("Content-Type", "application/json");
        var data = JSON.stringify(
            { "username": username }
        );
        var requestOptionUnfriend = {
            method: 'DELETE',
            headers: myHeaders,
            body: data
        };

        await fetch('https://prevelcer.herokuapp.com/api/unfriend/', requestOptionUnfriend)
            .then((response) => response.json())
            .then((unfriend) => {
                // console.log(unfriend);
            }).catch((error) => console.log('unfriend error', error));
        getUsers(token);
    }

    const acceptFriendRequest = async (username) => {

        var id = incomingRequests[incomingRequestsMap.indexOf(username)].id;
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Token " + token);
        myHeaders.append("Content-Type", "application/json");
        var data = JSON.stringify(
            { "id": id }
        );
        var requestsOptionsAccept = {
            method: 'POST',
            headers: myHeaders,
            body: data
        };
        await fetch('https://prevelcer.herokuapp.com/api/accept_request/', requestsOptionsAccept)
            .then((response) => response.json())
            .then((unfriend) => {
                // console.log(unfriend);
            }).catch((error) => console.log('unfriend error', error));
        getUsers(token);
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
                <Right>
                    <Button
                        style={{ width: 50, justifyContent: 'center' }}
                        onPress={() => getUsers(token)}>
                        <Icon name="refresh" style={{ fontSize: 25, color: 'yellow' }} />
                    </Button>
                </Right>
            </Header>

            <View style={{ margin: 15 }}>
                {loadingSpinner ? (
                    <ActivityIndicator
                        size={60}
                        color="chartreuse"
                        style={styles.activityInd}
                    />
                ) : null}

                <Text style={styles.categoryText}><Icon name="user-md" style={{ fontSize: 20, color: 'blue' }} />  DOCTORS </Text>
                <FlatList
                    data={doctors}
                    keyExtractor={(item) => item.username}
                    renderItem={({ item }) =>
                        <View style={styles.listCard}>
                            <Text style={styles.font}>{item.first_name + " " + item.last_name} </Text>

                            {incomingRequestsMap.indexOf(item.username) < 0 ?

                                <View style={{ flex: 1 }}>
                                    {connected.indexOf(item.username) < 0 ?
                                        sentRequests.indexOf(item.username) < 0 ?
                                            <Button
                                                onPress={() => sendFriendRequest(item.username)}
                                                small
                                                primary
                                                style={styles.button}>
                                                <Text style={styles.buttonFont}>Add</Text>
                                            </Button>
                                            :
                                            < Button
                                                onPress={() => cancelFriendRequest(item.username)}
                                                small
                                                danger
                                                style={styles.button}>
                                                <Text style={styles.buttonFont}>Cancel</Text>
                                            </Button>
                                        :
                                        <Text style={styles.connectedText}>Connected</Text>
                                    }

                                </View>
                                :
                                <View>
                                    <View style={{ flex: 1 }}>
                                        <Button
                                            onPress={() => acceptFriendRequest(item.username)}
                                            small
                                            primary
                                            style={styles.button}>
                                            <Text style={styles.buttonFont}>Accept</Text>
                                        </Button>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Button
                                            onPress={() => unfriend(item.username)}
                                            small
                                            danger
                                            style={styles.button}>
                                            <Text style={styles.buttonFont}>Delete</Text>
                                        </Button>
                                    </View>

                                </View>

                            }
                        </View>
                    }

                />
                <Text style={styles.categoryText}><Icon name="heartbeat" style={{ fontSize: 20, color: 'blue' }} /> CARERS</Text>
                <FlatList
                    data={carers}
                    keyExtractor={(item) => item.username}
                    renderItem={({ item }) =>
                        <View style={styles.listCard}>
                            {incomingRequestsMap.indexOf(item.username) < 0 ?
                                <Text style={styles.font}>{item.first_name + " " + item.last_name} </Text>
                                :
                                <Text style={{ flex: 1, color: "#000099", fontWeight: 'bold' }}>
                                    {item.first_name + " " + item.last_name}</Text>
                            }

                            {incomingRequestsMap.indexOf(item.username) < 0 ?

                                <View style={{ flex: 1 }}>
                                    {connected.indexOf(item.username) < 0 ?
                                        sentRequests.indexOf(item.username) < 0 ?
                                            <Button
                                                onPress={() => sendFriendRequest(item.username)}
                                                small
                                                primary
                                                style={styles.button}>
                                                <Text style={styles.buttonFont}>Add</Text>
                                            </Button>
                                            :
                                            < Button
                                                onPress={() => cancelFriendRequest(item.username)}
                                                small
                                                danger
                                                style={styles.button}>
                                                <Text style={styles.buttonFont}>Cancel</Text>
                                            </Button>
                                        :
                                        <Text style={styles.connectedText}>Connected</Text>
                                    }

                                </View>
                                :

                                <View style={{ flex: 1,flexDirection:"row",justifyContent:'flex-end' }}>
                                    <Button
                                        onPress={() => acceptFriendRequest(item.username)}
                                        small
                                        warning
                                        style={{
                                            alignSelf: 'flex-end',
                                            borderRadius: 8,
                                            width: 80,
                                            justifyContent: 'center',
                                            marginRight:10
                                        }}>
                                        <Text style={styles.buttonFont}>Accept</Text>
                                    </Button>

                                    <Button
                                        onPress={() => unfriend(item.username)}
                                        small
                                        danger
                                        style={{
                                            alignSelf: 'flex-end',
                                            borderRadius: 8,
                                            width: 80,
                                            justifyContent: 'center'
                                        }}>
                                        <Text style={styles.buttonFont}>Delete</Text>
                                    </Button>
                                </View>
                            }
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
    categoryText: {
        marginTop: 15, fontWeight: 'bold', color: "#1372d2a6"
    },
    buttonFont: { fontSize: 12 },
    container: {
        flex: 1,
        paddingTop: 22
    },
    connectedText: {
        alignSelf: 'flex-end',
        paddingRight: 12,
        justifyContent: 'center',
        color: '#0000008c'
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    button: {
        alignSelf: 'flex-end',
        borderRadius: 8,
        width: 80,
        justifyContent: 'center'
    }
    ,
    listCard: {
        margin: 5,
        flexDirection: 'row',
        padding: 5,
        borderTopWidth: 0.75,
        borderTopColor: "grey"
    },
    activityInd: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
});