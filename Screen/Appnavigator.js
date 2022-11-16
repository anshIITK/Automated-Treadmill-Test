import React from 'react';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MomoLogin from './Login';
import HomeScreen from './HomeScreen';
import SplashScreen from './SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Graphreport from './Graphreport';

const {Navigator,Screen} = createNativeStackNavigator();


const AppNavigator = ()=>(
    <NavigationContainer>
        <Navigator screenOptions={{ headerShown: false }}   >
        <Screen name="MomoLogin" component={MomoLogin}></Screen>

        <Screen name="SplashScreen" component={SplashScreen}></Screen>

        <Screen name="HomeScreen" component={HomeScreen}></Screen>
        <Screen name="Graphreport" component={Graphreport}></Screen>
        

        </Navigator>
    </NavigationContainer>
)

export default AppNavigator;