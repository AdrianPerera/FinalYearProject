import React from 'react';
import { FlatList,View,SafeAreaView } from "react-native";
import {
    Container,
    Header,
    Body,
    Title,
    Content,
    Card,
    CardItem,
    Badge,
    Right,
    Left,
    Text,
    Button,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {DataTable} from "react-native-paper";
import {SafeAreaFrameContext} from "react-native-safe-area-context";

export default function PatientsTab({navigation}) {
    const DATA = [
        {
            id: '1',
            name: 'Magnus Carlsen',
        },
        {
            id: '2',
            name: 'Judit Polgar',
        },
        {
            id: '3',
            name: 'John Constantine',
        },
        {
            id: '4',
            name: 'John Constantine',
        },
        {
            id: '5',
            name: 'John Constantine',
        },
        {
            id: '6',
            name: 'John Constantine',
        },
        {
            id: '7',
            name: 'John Constantine',
        },
        {
            id: '8',
            name: 'John Constantine',
        },
        {
            id: '9',
            name: 'John Constantine',
        },{
            id: '10',
            name: 'John Constantine',
        },{
            id: '11',
            name: 'John Constantine',
        },{
            id: '12',
            name: 'John Constantine',
        },{
            id: '13',
            name: 'John Constantine',
        },
    ];

    const renderThis=({item})=>(
        <View style={{margin:15,flexDirection:'row'}}>
            <Text style={{flex:1}}>Patient {item.id} </Text>
            <Text style={{flex:2}}>{item.name} </Text>
            <View style={{flex:1}}>
                <Button small success style={{alignSelf:'flex-end'}}><Text>View</Text></Button>
            </View>
        </View>
    );


    return (
        <Container>
            <Header>
                <Left>
                    <Button>
                        <Icon
                            name="reorder"
                            style={{fontSize: 30, color: 'white'}}
                            onPress={() => {
                                navigation.toggleDrawer();
                            }}
                        />
                    </Button>
                </Left>
                <Body>
                    <Title style={{textTransform: 'capitalize'}}>Patients</Title>
                </Body>
                <Right>
                    <Icon name='hospital-o' style={{fontSize: 30, color: '#dff604',marginRight:5}} />
                </Right>
            </Header>


                <SafeAreaView>
                    <FlatList data={DATA}
                              renderItem={renderThis}
                              keyExtractor={item=> item.id}
                              numColumns={1}
                    />
                </SafeAreaView>
        </Container>
    );
}

