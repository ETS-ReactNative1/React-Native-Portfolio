import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../../assets/config/colors';

import HomeStack from '../pages/homePage/HomeStack';
import CollectionScreen from '../pages/collectionPage/CollectionScreen';
import PackageScreen from '../pages/packagesPage/PackageScreen';
import ProjectScreen from '../pages/projectsPage/ProjectScreen';

const Tab = createMaterialBottomTabNavigator();

export default function HomeTabNavigator({navigation}) {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      activeColor={colors.primary}
      shifting={false}
      barStyle={{backgroundColor: '#E5E5E5',height:70,}}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="home-variant"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CollectionScreen"
        component={CollectionScreen}
        options={{
          tabBarLabel:'Collections',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="image" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="ProjectScreen"
        component={ProjectScreen}
        options={{
          tabBarLabel: 'Projects',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="briefcase-variant"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="PackageScreen"
        component={PackageScreen}
        options={{
          tabBarLabel: 'Packages',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="folder" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
