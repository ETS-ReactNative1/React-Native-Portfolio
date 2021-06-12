import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ProjectDetail from '../projectsPage/ProjectDetail';
import Rundown from '../projectsPage/Rundown';
import Invoice from '../projectsPage/Invoice';
import NewInvoice from '../projectsPage/NewInvoice';
import AddPackage from '../projectsPage/AddPackage';
import SelectPackage from '../projectsPage/SelectPackage';
import InvoiceDetail from '../projectsPage/InvoiceDetail';

const Stack = createStackNavigator();

export default function NewColelctionStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown:false}} name="ProjectDetail" component={ProjectDetail}/>
      <Stack.Screen options={{headerShown:false}} name="Rundown" component={Rundown}/>
      <Stack.Screen options={{headerShown:false}} name="Invoice" component={Invoice}/>
      <Stack.Screen options={{headerShown:false}} name="NewInvoice" component={NewInvoice}/>
      <Stack.Screen options={{headerShown:false}} name="InvoiceDetail" component={InvoiceDetail}/>
      <Stack.Screen options={{headerShown:false}} name="AddPackage" component={AddPackage}/>
      <Stack.Screen options={{headerShown:false}} name="SelectPackage" component={SelectPackage}/>
    </Stack.Navigator>
  );
}
