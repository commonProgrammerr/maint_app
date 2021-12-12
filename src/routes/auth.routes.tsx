import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthScreen } from '../screens/Auth';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes(){
  return(
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="SignIn"
        component={AuthScreen}
      />
    </Navigator>
  )
}