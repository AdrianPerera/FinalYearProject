import React, {Component} from 'react';
import {
  Container,
  Body,
  Text,
  Header,
  Left,
  Right,
  Title,
  Tabs,
  Tab,
} from 'native-base';
import ProfileTab from '../tabs/ProfileTab';

class ProfileScene extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.state;
  }

  render() {
    return (
      <Container>
        <Header noLeft hasTabs>
          <Left />
          <Body>
            <Title style={{textTransform: 'capitalize'}}>
              {this.state.selected}
            </Title>
          </Body>
          <Right>
            <Text>{this.state.username}</Text>
          </Right>
        </Header>
      </Container>
    );
  }
}

export default ProfileScene;
