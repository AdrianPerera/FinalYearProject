import React, {Component} from 'react';
import {
  Container,
  Body,
  Text,
  Header,
  Left,
  Right,
  Title,
 
} from 'native-base';


function ProfileScene ({route,navigation}) {
    const { param } =route.params;

    return (
      <Container>
        <Header noLeft hasTabs>
          <Left />
          <Body>
            <Title style={{textTransform: 'capitalize'}}>
              {param.selected}
            </Title>
          </Body>
          <Right>
            <Text>{param.username}</Text>
          </Right>
        </Header>
      </Container>
    );
  
}

export default ProfileScene;
