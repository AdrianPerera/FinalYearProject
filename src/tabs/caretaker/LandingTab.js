
import React, {useEffect} from 'react';
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
import {Alert} from "react-native";

export default function LandingTab({route, navigation}) {
    const {param} = route.params;
    param.isLoggedIn=true;
    const logOutHandler = () => {
        Alert.alert('Log out?', 'You are about to Log out!', [
            {text: 'Cancel', style: 'cancel', onPress: () => {}},
            {
                text: 'Log Out',
                style: 'destructive',
                onPress: () => {
                    param.isLoggedIn = false;
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'auth'}],
                    });
                },
            },
        ]);
    };
    useEffect(() =>
        navigation.addListener('beforeRemove', (e) => {
            if (param.isLoggedIn) {
                e.preventDefault();
                logOutHandler();
            }
        }),
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
                    <Title style={{textTransform: 'capitalize'}}>Details</Title>
                </Body>
                <Right/>
            </Header>
        </Container>

    );

}


