import React from "react";
import { ThemeProvider } from "styled-components";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import defaultTheme from "./src/global/styles/theme";
import { Routes } from "./src/routes";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./src/context/AuthContext";
import { LoadingSplash } from "./src/components/LoadingSplash";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  // if (!fontsLoaded) return <AppLoading />;

  return (
    <ThemeProvider theme={defaultTheme}>
      {!fontsLoaded ? (
        <LoadingSplash />
      ) : (
        <AuthProvider>
          <StatusBar style="light" />
          <Routes />
        </AuthProvider>
      )}
    </ThemeProvider>
  );
}
