import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import MessagesTab from '../tabs/patient/MessagesTab';
import PaymentTab from '../tabs/patient/PaymentTab';
import ProfileTab from '../tabs/patient/ProfileTab';
import LandingTab from '../tabs/patient/LandingTab';
import careLandingTab from '../tabs/caretaker/LandingTab';
import careMessagesTab from '../tabs/caretaker/MessagesTab';
import carePatientsTab from '../tabs/caretaker/PatientsTab';
import Icon from 'react-native-vector-icons/FontAwesome';
import DrawerContent from '../components/DrawerContent';


function ProfileScene({route}) {
    const Drawer = createDrawerNavigator();
    const {param} = route.params.params;

    if (param.selected === 'patient') {
        return (
            <Drawer.Navigator
                drawerContent={props => <DrawerContent {...props} />}
                backBehavior="history"
                drawerType="front"
                minSwipeDistance={70}
                initialRouteName="landingTab">
                <Drawer.Screen name="landingTab" component={LandingTab}
                               options={{
                                   title: 'Profile Details',
                                   drawerIcon: ({focused, size}) => (
                                       <Icon style={{marginRight: -3}} name="list-alt" size={size}
                                             color={focused ? '#4544ca' : '#442b2b'}
                                       />
                                   ),
                               }}
                />
                <Drawer.Screen name="profileTab" component={ProfileTab} options={{
                    title: ' My Profile', drawerIcon: ({focused, size}) => (
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

    if(param.selected==='caretaker'){
        return (
            <Drawer.Navigator
                drawerContent={props => <DrawerContent {...props} />}
                backBehavior="history" drawerType="front" minSwipeDistance={70} initialRouteName="landingTab">
                <Drawer.Screen name='landingTab' component={careLandingTab} options={{
                    title: 'Details',
                    drawerIcon: ({focused, size}) => (
                        <Icon style={{marginRight: -3}} name="list-alt" size={size}
                              color={focused ? '#4544ca' : '#442b2b'}
                        />
                    ),

                }} />

                <Drawer.Screen
                    name="messagesTab" component={careMessagesTab}
                    options={{title: 'Messages', drawerIcon: ({focused, size}) => (
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
                    name="patientsTab" component={carePatientsTab}
                    options={{title: 'Patients List', drawerIcon: ({focused, size}) => (
                            <Icon
                                style={{marginRight: 1,marginLeft:3}}
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
