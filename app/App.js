import React from 'react';
import { useColorScheme, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import MainScreen from "./Components/MainScreen";
import CheckInScreen from "./Components/CheckInScreen";
import CheckOutScreen from "./Components/CheckOutScreen";

const Stack = createStackNavigator();

function App() {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <NavigationContainer>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen name="Welcome" component={MainScreen} />
                <Stack.Screen name="CheckIn" component={CheckInScreen} />
                <Stack.Screen name="CheckOutScreen" component={CheckOutScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
