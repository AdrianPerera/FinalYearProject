import React from 'react';
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
    Button, Badge,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function MessagesTab({route,navigation}) {
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
                    <Title style={{textTransform: 'capitalize'}}>Messages</Title>
                </Body>
                <Right>
                    <Icon name='envelope' style={{fontSize: 30, color: '#e4e213'}}/>

                </Right>
            </Header>
        </Container>


    );


}