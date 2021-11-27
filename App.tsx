import React from "react";
import AppLoading from "expo-app-loading";
import { ThemeProvider } from "styled-components";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import defaultTheme from "./src/global/styles/theme";
import { ChamadosContextProvider } from "./src/context/chamados-context";
import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./src/routes/app.routes";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <ThemeProvider theme={defaultTheme}>
      <ChamadosContextProvider>
        <StatusBar style="light" />
        <NavigationContainer>
          <AppRoutes />
        </NavigationContainer>
      </ChamadosContextProvider>
    </ThemeProvider>
  );
}
