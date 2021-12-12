import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FeedScreen } from "../screens/Feed";
import { ChamadoScreen } from "../screens/Chamado";
import { ReportScreen } from "../screens/Report";
import { AuthScreen } from "../screens/Auth";

const { Screen, Navigator } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Feed" component={FeedScreen} />
      <Screen name="Chamado" component={ChamadoScreen} />
      <Screen name="Report" component={ReportScreen} />
    </Navigator>
  );
}
