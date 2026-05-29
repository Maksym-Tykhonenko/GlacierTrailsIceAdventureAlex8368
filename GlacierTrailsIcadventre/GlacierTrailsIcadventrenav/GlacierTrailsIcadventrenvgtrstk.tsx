import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import GlacierTrailsIcadventrenvgtrMenu from '../GlacierTrailsIcadventrescrn/GlacierTrailsIcadventrenvgtrMenu';
import GlacierTrailsIcadventrenvgtrRun from '../GlacierTrailsIcadventrescrn/GlacierTrailsIcadventrenvgtrRun';
import type {GlacierTrailsIcadventrenvgtrStackParamList} from '../GlacierTrailsIcadventretypes/glaciertrailsIcadventrenvgtrnavtypes';

const Stack = createStackNavigator<GlacierTrailsIcadventrenvgtrStackParamList>();

const GlacierTrailsIcadventrenvgtrstk = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen
      name="GlacierTrailsIcadventrenvgtrMenu"
      component={GlacierTrailsIcadventrenvgtrMenu}
    />
    <Stack.Screen
      name="GlacierTrailsIcadventrenvgtrRun"
      component={GlacierTrailsIcadventrenvgtrRun}
    />
  </Stack.Navigator>
);

export default GlacierTrailsIcadventrenvgtrstk;
