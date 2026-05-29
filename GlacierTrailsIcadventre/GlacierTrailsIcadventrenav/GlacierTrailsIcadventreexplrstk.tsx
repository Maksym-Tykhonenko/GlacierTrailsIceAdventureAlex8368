import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import GlacierTrailsIcadventreexplr from '../GlacierTrailsIcadventrescrn/GlacierTrailsIcadventreexplr';
import GlacierTrailsIcadventreexplrdtl from '../GlacierTrailsIcadventrescrn/GlacierTrailsIcadventreexplrdtl';
import {GlacierTrailsIcadventreexplrSavedProvider} from '../GlacierTrailsIcadventrescrn/GlacierTrailsIcadventreexplrsavedctx';
import type {GlacierTrailsIcadventreexplrStackParamList} from '../GlacierTrailsIcadventretypes/glaciertrailsIcadventreexplrnavtypes';

const GlacierTrailsIcadventreexplrStack =
  createStackNavigator<GlacierTrailsIcadventreexplrStackParamList>();

const GlacierTrailsIcadventreexplrstk = () => {
  return (
    <GlacierTrailsIcadventreexplrSavedProvider>
      <GlacierTrailsIcadventreexplrStack.Navigator screenOptions={{headerShown: false}}>
        <GlacierTrailsIcadventreexplrStack.Screen
          name="GlacierTrailsIcadventreexplrHome"
          component={GlacierTrailsIcadventreexplr}
        />
        <GlacierTrailsIcadventreexplrStack.Screen
          name="GlacierTrailsIcadventreexplrdtl"
          component={GlacierTrailsIcadventreexplrdtl}
        />
      </GlacierTrailsIcadventreexplrStack.Navigator>
    </GlacierTrailsIcadventreexplrSavedProvider>
  );
};

export default GlacierTrailsIcadventreexplrstk;
