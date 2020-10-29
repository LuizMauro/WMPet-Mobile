import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Teste from "../../pages/PrivatesPages/teste";
import Teste2 from "../../pages/PrivatesPages/teste2";

const StackNavigation = createStackNavigator();

export const SearchAnimalsRoutes = () => {
  return (
    <StackNavigation.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <StackNavigation.Screen name="Lista Animais" component={Teste} />
      <StackNavigation.Screen name="Detalhes" component={Teste2} />
    </StackNavigation.Navigator>
  );
};
