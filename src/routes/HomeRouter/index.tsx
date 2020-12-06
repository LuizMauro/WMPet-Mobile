import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../../screens/Private/HomePage";
import SelectMapPosition from "../../screens/Private/HomePage/RegisterAnimalPage/SelectMapPositionPage";
import FormRegisterAnimals from "../../screens/Private/HomePage/RegisterAnimalPage/FormAnimalPage";
import PetExistsOrNew from "../../screens/Private/HomePage/RegisterAnimalPage/PetExistsOrNew";

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
        options={{
          headerShown: true,
          headerTitle: "Última localização do pet",
        }}
        name="Select Animal"
        component={SelectMapPosition}
      />

      <StackNavigation.Screen
        options={{
          headerShown: true,
          headerTitle: "Pet existente ou novo?",
        }}
        name="Pet-exists-or-new"
        component={PetExistsOrNew}
      />

      <StackNavigation.Screen
        options={{ headerShown: true, headerTitle: "Registre o animal" }}
        name="Register Animal"
        component={FormRegisterAnimals}
      />
    </StackNavigation.Navigator>
  );
};
