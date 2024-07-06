import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CheckInOutScreen from './CheckInOutScreen';
import MainScreen from './MainScreen';
import BuildingOccupants from './BuildingOccupants';
import EntriesScreen from './EntriesScreen';
import VisitorCheckInPage from '../components/VisitorCheckInPage';
import QRCodeVisitorInfoPage from "../components/QRCodeVisitorInfoPage";
import CheckoutPage from "../components/CheckoutPage";
import StaffStudentCheckIn from "../components/StaffStudentCheckIn";

const Stack = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options={{headerShown: false}} name="MainScreen" component={MainScreen} />
                <Stack.Screen name="BuildingOccupants" component={BuildingOccupants} />
                <Stack.Screen name="EntriesScreen" component={EntriesScreen} />
                <Stack.Screen
                    name="CheckIn"
                    component={VisitorCheckInPage}
                    options={{ headerShown: false, headerTitle: 'Check In' }}
                />
                <Stack.Screen
                    name="StaffStudentCheckIn"
                    component={StaffStudentCheckIn}
                    options={{ headerShown: false, headerTitle: 'Check In' }}
                />
                <Stack.Screen
                    name="CheckoutPage"
                    component={CheckoutPage}
                    options={{ headerShown: false, headerTitle: 'Check Out' }}
                />
                <Stack.Screen
                    name="Welcome"
                    component={CheckInOutScreen}
                    options={{ headerShown: false, headerTitle: 'Welcome' }}
                />
                <Stack.Screen
                    name="QRCodePage"
                    component={QRCodeVisitorInfoPage}
                    options={{ headerShown: false, headerTitle: 'QR Code Page' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
