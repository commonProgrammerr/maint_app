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
import { OccurrencesProvider } from "./src/context/chamados-context";
import { Routes } from "./src/routes";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./src/context/AuthContext";
import { SocketProvider } from "./src/context/SocketContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <ThemeProvider theme={defaultTheme}>
      <AuthProvider>
        <SocketProvider>
          <OccurrencesProvider>
            <StatusBar style="light" />
            <Routes />
          </OccurrencesProvider>
        </SocketProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
