import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './Home'
import Detail from './Detail'

const Stack = createStackNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen options={{headerShown:false}} name="Home" component={Home} />
      <Stack.Screen options={{headerShown:false}} name="Detail" component={Detail} />
    </Stack.Navigator>
  );
}

export default HomeStackNavigator;
