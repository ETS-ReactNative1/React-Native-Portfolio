import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Splash from './Splash';
import Login from './Login';
import HomeTabNavigator from '../HomeScreen/HomeTabNavigator'

const Stack = createStackNavigator();

function App() {
  return (
    <Stack.Navigator initialRouteName='Splash'>
      <Stack.Screen options={{headerShown:false}} name="Splash" component={Splash} />
      <Stack.Screen options={{headerShown:false}} name="Login" component={Login} />
      <Stack.Screen options={{headerShown:false,gestureEnabled:false}} name="HomeTabNavigator" component={HomeTabNavigator} />
    </Stack.Navigator>
  );
}

export default App;
