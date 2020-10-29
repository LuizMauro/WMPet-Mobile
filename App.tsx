import { StatusBar } from "expo-status-bar";
import React from "react";
import Application from "./src/App";
import { NavigationContainer } from "@react-navigation/native";
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Application />
    </NavigationContainer>
  );
}
