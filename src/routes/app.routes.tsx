import React from "react";

import { FeedScreen } from "../screens/Feed";
import { ChamadoScreen } from "../screens/Chamado";
import { ReportScreen } from "../screens/Report";
import { SocketProvider } from "../context/SocketContext";
import { FeedProvider } from "../context/FeedContext";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

import { SideBar } from "../components/SideBar";

function DefaultStack({ navigation }: any) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Feed" component={FeedScreen} />
      <Stack.Screen name="Chamado" component={ChamadoScreen} />
      <Stack.Screen name="Report" component={ReportScreen} />
    </Stack.Navigator>
  );
}

export function AppRoutes() {
  return (
    <SocketProvider>
      <FeedProvider>
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
          }}
          drawerContent={(props) => <SideBar {...props} />}
        >
          <Drawer.Screen name="default" component={DefaultStack} />
        </Drawer.Navigator>
      </FeedProvider>
    </SocketProvider>
  );
}
