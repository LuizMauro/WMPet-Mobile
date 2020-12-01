import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../../screens/Private/HomePage";
import SelectMapPosition from "../../screens/Private/HomePage/RegisterAnimalPage/SelectMapPositionPage";
import FormRegisterAnimals from "../../screens/Private/HomePage/RegisterAnimalPage/FormAnimalPage";

const StackNavigation = createStackNavigator();

export const HomeRouter = () => {
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

      <StackNavigation.Screen
        options={{ headerShown: true, headerTitle: "Registre o animal" }}
        name="Register Animal"
        component={FormRegisterAnimals}
      />
    </StackNavigation.Navigator>
  );
};
