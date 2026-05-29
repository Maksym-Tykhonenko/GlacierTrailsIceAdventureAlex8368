import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import GlacierTrailsIcadventrejornl from '../GlacierTrailsIcadventrescrn/GlacierTrailsIcadventrejornl';
import GlacierTrailsIcadventrejornldtl from '../GlacierTrailsIcadventrescrn/GlacierTrailsIcadventrejornldtl';
import type {GlacierTrailsIcadventrejornlStackParamList} from '../GlacierTrailsIcadventretypes/glaciertrailsIcadventrejornlnavtypes';

const Stack = createStackNavigator<GlacierTrailsIcadventrejornlStackParamList>();

const GlacierTrailsIcadventrejornlstk = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen
      name="GlacierTrailsIcadventrejornlHome"
      component={GlacierTrailsIcadventrejornl}
    />
    <Stack.Screen
      name="GlacierTrailsIcadventrejornldtl"
      component={GlacierTrailsIcadventrejornldtl}
    />
  </Stack.Navigator>
);

export default GlacierTrailsIcadventrejornlstk;
