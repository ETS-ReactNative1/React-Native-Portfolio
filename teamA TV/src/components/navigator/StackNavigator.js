import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from '../screenPage/loginPage/SplashScreen';
import LoginScreen from '../screenPage/loginPage/LoginScreen';
import RegisterScreen from '../screenPage/loginPage/RegisterScreen';
import TabNavigator from '../navigator/TabNavigator';
import DetailScreen from '../screenPage/homePage/DetailScreen';
import MyReview from '../screenPage/profilePage/MyReview';

const Stack = createStackNavigator();

export default function StackNavigator({navigation}) {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen
        options={{gestureEnabled: false}}
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen
        options={{gestureEnabled: false}}
        name="TabNavigator"
        component={TabNavigator}
      />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'My Review',
          headerBackTitle: false,
          headerTintColor: '#FE024E',
        }}
        name="MyReview"
        component={MyReview}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
