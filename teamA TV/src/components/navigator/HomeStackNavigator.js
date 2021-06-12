import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screenPage/homePage/HomeScreen';
import SearchScreen from '../screenPage/homePage/SearchScreen';
import AllMovies from '../screenPage/homePage/AllMovies';

const Stack = createStackNavigator();

export default function HomeStackNavigator({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          gestureEnabled:false,
          headerShown:false,
          headerLeft: () => null,
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          headerShown:false,
          headerLeft: () => null,
        }}
        name="AllMovies"
        component={AllMovies}
      />
      <Stack.Screen
        options={{
          headerShown:false,
          headerLeft: () => null,
        }}
        name="SearchScreen"
        component={SearchScreen}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
