import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PrivateProfile from "../../screens/Private/PrivateProfilePage";
import FormAnimal from "../../screens/Private/PrivateProfilePage/formAnimal";
import AnimalDetalhes from "../../screens/Private/PrivateProfilePage/DetailsAnimal";
const StackNavigation = createStackNavigator();

export const ProfileRoutes = () => {
  return (
    <StackNavigation.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackNavigation.Screen name="profile" component={PrivateProfile} />
      <StackNavigation.Screen
        options={{ headerShown: true, title: "Novo Pet" }}
        name="My Pet Form"
        component={FormAnimal}
      />
      <StackNavigation.Screen
        options={{ headerShown: true, title: "Detalhes" }}
        name="AnimalDetails"
        component={AnimalDetalhes}
      />
      {/* <StackNavigation.Screen name="Detalhes" component={Teste2} /> */}
    </StackNavigation.Navigator>
  );
};
