import { NavigationContext } from "@react-navigation/native";
import { useContext } from "react";

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error(
      "This hook, must be used inside a 'Navigation.Provider'!"
    );
  }

  return context; 
}