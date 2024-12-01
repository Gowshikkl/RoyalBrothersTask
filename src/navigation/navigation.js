import React, { useEffect, useState } from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/loginScreen';
import SignupScreen from '../screens/signupScreen';
import { useDispatch, useSelector } from 'react-redux';
import { addloading } from '../redux/commonReducer';
import HomeScreen from '../screens/homeScreen';
import DetailScreen from '../screens/detailScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';


const Navigation = () => {
    const Stack = createStackNavigator()
    const [isLoggedIn, setisLoggedIn] = useState(undefined);
    const dispatch = useDispatch()
    useEffect(() => {

        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        const loggedIn = await AsyncStorage.getItem('isLoggedIn');
        setisLoggedIn(loggedIn ?? "false");
    };



    if (isLoggedIn === undefined) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#4CAF50" />
            </View>
        );
    }

    return (

        <NavigationContainer>
            <Stack.Navigator initialRouteName={isLoggedIn == "true" ? "Home" : "Login"} >
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignupScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;