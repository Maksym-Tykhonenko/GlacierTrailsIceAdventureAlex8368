import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import GlacierTrailsIcadventrecalcl from '../GlacierTrailsIcadventrescrn/GlacierTrailsIcadventrecalcl';
import GlacierTrailsIcadventrecalclSaved from '../GlacierTrailsIcadventrescrn/GlacierTrailsIcadventrecalclSaved';
import GlacierTrailsIcadventrecalclTool from '../GlacierTrailsIcadventrescrn/GlacierTrailsIcadventrecalclTool';
import type {GlacierTrailsIcadventrecalclStackParamList} from '../GlacierTrailsIcadventretypes/glaciertrailsIcadventrecalclnavtypes';

const Stack = createStackNavigator<GlacierTrailsIcadventrecalclStackParamList>();

const GlacierTrailsIcadventrecalclstk = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen
      name="GlacierTrailsIcadventrecalclHome"
      component={GlacierTrailsIcadventrecalcl}
    />
    <Stack.Screen
      name="GlacierTrailsIcadventrecalclSaved"
      component={GlacierTrailsIcadventrecalclSaved}
    />
    <Stack.Screen
      name="GlacierTrailsIcadventrecalclTool"
      component={GlacierTrailsIcadventrecalclTool}
    />
  </Stack.Navigator>
);

export default GlacierTrailsIcadventrecalclstk;
