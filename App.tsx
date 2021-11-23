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
import { Dashboard } from "./src/screens/Dashboard";
import { ChamadosContextProvider } from "./src/context/chamados-context";

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
        <Dashboard />
      </ChamadosContextProvider>
    </ThemeProvider>
  );
}
