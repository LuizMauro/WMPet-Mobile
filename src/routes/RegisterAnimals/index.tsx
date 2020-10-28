import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SelectMapPosition from "../../pages/privates/registerAnimal/SelectMapPosition";
import Home from "../../pages/privates/home";

const StackNavigation = createStackNavigator();

export const RegisterAnimalsAndHome = () => {
  return (
    <StackNavigation.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackNavigation.Screen name="Mapa" component={Home} />
      <StackNavigation.Screen
        options={{ headerShown: true, headerTitle: "Selecione um local" }}
        name="Select Animal"
        component={SelectMapPosition}
      />
    </StackNavigation.Navigator>
  );
};
