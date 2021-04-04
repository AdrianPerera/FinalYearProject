import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MessagesTab from '../tabs/patient/MessagesTab';
import PaymentTab from '../tabs/patient/PaymentTab';
import EditTab from '../tabs/patient/EditTab';
import LandingTab from '../tabs/patient/LandingTab';

import careLandingTab from '../tabs/caretaker/LandingTab';
import careEditTab from '../tabs/caretaker/EditTab';
import careMessagesTab from '../tabs/caretaker/MessagesTab';
import carePatients from '../tabs/caretaker/PatientsTab';
import carePatientView from '../tabs/caretaker/PatientViewTab';

import doctorLandingTab from '../tabs/doctor/LandingTab';
import doctorMessagesTab from '../tabs/doctor/MessagesTab';
import doctorPatients from '../tabs/doctor/PatientsTab';
import doctorPatientView from '../tabs/doctor/PatientViewTab';

import Icon from 'react-native-vector-icons/FontAwesome';
import DrawerContent from '../components/DrawerContent';

function carePatientStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator 
      initialRouteName="carePatientsScene"
      screenOptions={{headerShown: false,animationEnabled:'true'}}>
      <Stack.Screen name="carePatientsScene" component={carePatients} />
      <Stack.Screen name="patientViewScene" component={carePatientView} />
    </Stack.Navigator>
  );
}

function doctorPatientStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator 
      initialRouteName="doctorPatientsScene"
      screenOptions={{headerShown: false,animationEnabled:'true'}}>
      <Stack.Screen name="doctorPatientsScene" component={doctorPatients} />
      <Stack.Screen name="patientViewScene" component={doctorPatientView} />
    </Stack.Navigator>
  );
}

function ProfileScene({route}) {
  const Drawer = createDrawerNavigator();
  const {param} = route.params.params;

  if (param.selected === '1') {
    return (
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        backBehavior="history"
        drawerType="front"
        minSwipeDistance={70}
        initialRouteName="landingTab">
        <Drawer.Screen
          name="landingTab"
          component={LandingTab}
          options={{
            title: 'Profile Details',
            drawerIcon: ({focused, size}) => (
              <Icon
                style={{marginRight: -3}}
                name="list-alt"
                size={size}
                color={focused ? '#4544ca' : '#442b2b'}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="editTab"
          component={EditTab}
          options={{
            title: ' Edit My Profile',
            drawerIcon: ({focused, size}) => (
              <Icon
                style={{marginRight: -3, marginLeft: 3}}
                name="user"
                size={size}
                color={focused ? '#4544ca' : '#442b2b'}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="messagesTab"
          component={MessagesTab}
          options={{
            title: 'Messages',
            drawerIcon: ({focused, size}) => (
              <Icon
                style={{marginRight: -3}}
                name="envelope-o"
                size={size}
                color={focused ? '#4544ca' : '#442b2b'}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="paymentsTab"
          component={PaymentTab}
          options={{
            title: 'Payments',
            drawerIcon: ({focused, size}) => (
              <Icon
                style={{marginRight: -4}}
                name="money"
                size={size}
                color={focused ? '#4544ca' : '#442b2b'}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  }

  if (param.selected === '2' ) {
    return (
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        backBehavior="history"
        drawerType="front"
        minSwipeDistance={70}
        initialRouteName="landingTab">
        <Drawer.Screen
          name="landingTab"
          component={careLandingTab}
          options={{
            title: 'Details',
            drawerIcon: ({focused, size}) => (
              <Icon
                style={{marginRight: -3}}
                name="list-alt"
                size={size}
                color={focused ? '#4544ca' : '#442b2b'}
              />
            ),
          }}
        />




        <Drawer.Screen
          name="editTab"
          component={careEditTab}
          options={{
            title: ' Edit My Profile',
            drawerIcon: ({focused, size}) => (
              <Icon
                style={{marginRight: -3, marginLeft: 3}}
                name="user"
                size={size}
                color={focused ? '#4544ca' : '#442b2b'}
              />
            ),
          }}
        />



        <Drawer.Screen
          name="messagesTab"
          component={careMessagesTab}
          options={{
            title: 'Messages',
            drawerIcon: ({focused, size}) => (
              <Icon
                style={{marginRight: -3}}
                name="envelope"
                size={size}
                color={focused ? '#4544ca' : '#442b2b'}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="carePatientStack"
          component={carePatientStack}
          options={{
            title: 'Patients List',
            drawerIcon: ({focused, size}) => (
              <Icon
                style={{marginRight: 1, marginLeft: 3}}
                name="hospital-o"
                size={size}
                color={focused ? '#4544ca' : '#442b2b'}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  }

  if (param.selected === '3' ) {
    return (
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        backBehavior="history"
        drawerType="front"
        minSwipeDistance={70}
        initialRouteName="landingTab">
        <Drawer.Screen
          name="landingTab"
          component={doctorLandingTab}
          options={{
            title: 'Details',
            drawerIcon: ({focused, size}) => (
              <Icon
                style={{marginRight: -3}}
                name="list-alt"
                size={size}
                color={focused ? '#4544ca' : '#442b2b'}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="messagesTab"
          component={doctorMessagesTab}
          options={{
            title: 'Messages',
            drawerIcon: ({focused, size}) => (
              <Icon
                style={{marginRight: -3}}
                name="envelope"
                size={size}
                color={focused ? '#4544ca' : '#442b2b'}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="doctorPatientStack"
          component={doctorPatientStack}
          options={{
            title: 'Patients List',
            drawerIcon: ({focused, size}) => (
              <Icon
                style={{marginRight: 1, marginLeft: 3}}
                name="hospital-o"
                size={size}
                color={focused ? '#4544ca' : '#442b2b'}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  }

}

export default ProfileScene;
