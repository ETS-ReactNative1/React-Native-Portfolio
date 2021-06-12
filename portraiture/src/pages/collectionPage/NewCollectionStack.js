import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Add from './Add';
import Photos from './Photos';
import Theme from './Theme';

import colors from '../../../assets/config/colors';

const Stack = createStackNavigator();

export default function NewColelctionStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: 'Collection Details',
          headerTintColor: colors.gun,
          headerBackTitle: ' ',
          headerStyle: {backgroundColor: colors.wheat},
        }}
        name="Add"
        component={Add}
      />
      <Stack.Screen
        options={{
          title: 'Collection Photos',
          headerTintColor: colors.gun,
          headerBackTitle: ' ',
          headerStyle: {backgroundColor: colors.wheat},
        }}
        name="Photos"
        component={Photos}
      />
      <Stack.Screen
        options={{
          title: 'Select Theme',
          headerTintColor: colors.gun,
          headerBackTitle: ' ',
          headerStyle: {backgroundColor: colors.wheat},
        }}
        name="Theme"
        component={Theme}
      />
    </Stack.Navigator>
  );
}
