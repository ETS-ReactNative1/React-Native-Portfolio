import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import ProfileScreen from '../screenPage/profilePage/ProfileScreen';
import MyReview from '../screenPage/profilePage/MyReview';
const Stack = createStackNavigator();

export default function HomeStackNavigator({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
