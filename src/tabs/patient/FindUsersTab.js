import React, { useEffect, useState } from 'react';
import {
    Container,
    Header,
    Body,
    Title,
    Content,
    Card,
    CardItem,
    Right,
    Left,
    Text,
    Button,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


function FindUserTab({ route, navigation }) {
    const [doctors, setDoctors] = useState([]);
    const [carers, setCarers] = useState([]);
    const fetchDetails = async () => {
        try {
            const token = await AsyncStorage.getItem('@auth_token');
            if (token === null) {
                console.log('token null');
            }
            console.log("token " + token);
            getUsers(token);
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

        await fetch('https://prevelcer.herokuapp.com/api/community/Doctor', requestOption)
            .then((response) => response.json())
            .then((result) => {
                setDoctors(result);
                console.log(result);
            }).catch((error) => console.log('Doctor list', error));

        fetch('https://prevelcer.herokuapp.com/api/community/Carer', requestOption)
            .then((response) => response.json())
            .then((result) => {
                setCarers(result);
            }).catch((error) => console.log('carer list ', error));

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

            <View>
                <FlatList
                    data={doctors.results}
                    keyExtractor={(item) => item.username}
                    renderItem={({ item }) =>
                        <View >
                            <Text style={styles.item}>{item.first_name} + {item.last_name}</Text>
                            <Button
                                primary
                                block
                            ><Text>Add</Text></Button>
                        </View>
                    }

                />
                <FlatList
                    data={carers.results}
                    keyExtractor={(item) => item.username}
                    renderItem={({ item }) => <Text style={styles.item}>{item.first_name}</Text>}

                />

                <Text></Text>
                <Text>

                </Text>
            </View>
        </Container>
    );


}

export default FindUserTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});