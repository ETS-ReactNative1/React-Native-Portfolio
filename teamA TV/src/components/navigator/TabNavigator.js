import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

import HomeStackNavigator from '../navigator/HomeStackNavigator';
import WatchListScreen from '../screenPage/homePage/WatchListScreen';
// import DrawerNavigator from '../navigator/DrawerNavigator';
import ProfileStackNavigator from '../navigator/ProfileStackNavigator';

const Tab = createMaterialBottomTabNavigator();

export default function TabNavigator() {
  const favorites = useSelector(state => state.favoriteReducer.favorites);

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      activeColor="#FE024E"
      barStyle={{backgroundColor: '#ddd', height: 70}}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              style={styles.homeIcon}
              name="home"
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="WatchListScreen"
        component={WatchListScreen}
        options={{
          tabBarLabel: 'Watchlist',
          tabBarBadge: favorites.length,
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              style={styles.reviewIcon}
              name="bookmark"
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStackNavigator"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              style={styles.reviewIcon}
              name="account"
              color={color}
              size={25}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  profileIcon: {
    width: 25,
    height: 25,
  },
  homeIcon: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewIcon: {
    width: 25,
    height: 25,
  },
});
