import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../assets/config/Colors';

import HomeStackNavigator from './HomeStackNavigator';
import ProfileStackNavigator from '../ProfileScreen/ProfileStackNavigator';
import Favorite from '../FavoriteScreen/Favorite';
import {useSelector} from 'react-redux';

const Tab = createMaterialBottomTabNavigator();

export default function HomeTabNavigator() {
  const {favorites} = useSelector(state => state.allReducers);
  return (
    <Tab.Navigator
      initialRouteName="HomeStackNavigator"
      activeColor={Colors.active}
      barStyle={{backgroundColor: Colors.background}}>
      <Tab.Screen
        name="HoHomeStackNavigatorme"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarLabel: 'Favorite',
          tabBarBadge: favorites.length,
          tabBarIcon: ({color}) => (
            <Icon name="heart" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStackNavigator"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Icon name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
