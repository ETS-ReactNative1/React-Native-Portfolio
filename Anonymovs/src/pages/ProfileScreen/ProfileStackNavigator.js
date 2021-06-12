import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Profile from './Profile'
import AboutApp from './AboutApp'
import AboutMe from './AboutMe'

const Stack = createStackNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator initialRouteName='Profile'>
      <Stack.Screen options={{headerShown:false}} name="Profile" component={Profile} />
      <Stack.Screen options={{headerShown:false}} name="AboutApp" component={AboutApp} />
      <Stack.Screen options={{headerShown:false}} name="AboutMe" component={AboutMe} />
    </Stack.Navigator>
  );
}

export default HomeStackNavigator;
