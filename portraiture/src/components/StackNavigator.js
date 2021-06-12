import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from '../pages/authPage/SplashScreen';
import LoginScreen from '../pages/authPage/LoginScreen';
import RegisterScreen from '../pages/authPage/RegisterScreen';
import HomeTabNavigator from './HomeTabNavigator';
import NewCollectionStack from '../pages/collectionPage/NewCollectionStack';
import Detail from '../pages/collectionPage/Detail';
import Preview from '../pages/collectionPage/Preview';
import EditCollection from '../pages/collectionPage/Edit';
import ChangeTheme from '../pages/collectionPage/EditTheme';
import Privacy from '../pages/collectionPage/Privacy';
import Download from '../pages/collectionPage/Download';
import NewProject from '../pages/projectsPage/NewProject';
import ProjectStack from '../pages/projectsPage/ProjectStack';
import EditProject from '../pages/projectsPage/EditProject';
import NewPackage from '../pages/packagesPage/NewPackage';
import EditPackage from '../pages/packagesPage/EditPackage';
import Classic from '../pages/collectionPage/collectionTheme/Classic';
import DarkMode from '../pages/collectionPage/collectionTheme/DarkMode';
import Minimalist from '../pages/collectionPage/collectionTheme/Minimalist';

import colors from '../../assets/config/colors';

const Stack = createStackNavigator();

export default function AuthStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name='SplashScreen' component={SplashScreen} />
      <Stack.Screen
        options={{headerShown: false}}
        name="RegisterScreen"
        component={RegisterScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="HomeTabNavigator"
        component={HomeTabNavigator}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="NewCollectionStack"
        component={NewCollectionStack}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ProjectStack"
        component={ProjectStack}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Detail"
        component={Detail}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Preview"
        component={Preview}
      />
      <Stack.Screen
        options={{
          headerTintColor: colors.gun,
          headerBackTitle: ' ',
          headerStyle: {backgroundColor: colors.wheat},
        }}
        name="Privacy"
        component={Privacy}
      />
      <Stack.Screen
        options={{
          headerTintColor: colors.gun,
          headerBackTitle: ' ',
          headerStyle: {backgroundColor: colors.wheat},
        }}
        name="Download"
        component={Download}
      />
      <Stack.Screen
        options={{
          title: 'Edit Collection',
          headerTintColor: colors.gun,
          headerBackTitle: ' ',
          headerStyle: {backgroundColor: colors.wheat},
        }}
        name="EditCollection"
        component={EditCollection}
      />
      <Stack.Screen
        options={{
          title: 'Change Theme',
          headerTintColor: colors.gun,
          headerBackTitle: ' ',
          headerStyle: {backgroundColor: colors.wheat},
        }}
        name="ChangeTheme"
        component={ChangeTheme}
      />
      <Stack.Screen
        options={{
          title: 'New Project',
          headerTintColor: colors.gun,
          headerBackTitle: ' ',
          headerStyle: {backgroundColor: colors.wheat},
        }}
        name="NewProject"
        component={NewProject}
      />
      <Stack.Screen
        options={{
          title: 'Edit Project',
          headerTintColor: colors.gun,
          headerBackTitle: ' ',
          headerStyle: {backgroundColor: colors.wheat},
        }}
        name="EditProject"
        component={EditProject}
      />
      <Stack.Screen
        options={{
          title: 'New Package',
          headerTintColor: colors.gun,
          headerBackTitle: ' ',
          headerStyle: {backgroundColor: colors.wheat},
        }}
        name="NewPackage"
        component={NewPackage}
      />
      <Stack.Screen
        options={{
          title: 'Edit Package',
          headerTintColor: colors.gun,
          headerBackTitle: ' ',
          headerStyle: {backgroundColor: colors.wheat},
        }}
        name="EditPackage"
        component={EditPackage}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Classic"
        component={Classic}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="DarkMode"
        component={DarkMode}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Minimalist"
        component={Minimalist}
      />
    </Stack.Navigator>
  );
}
