import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PrivateProfile from "../../pages/PrivatesPages/PrivateProfilePage";
import FormAnimal from "../../pages/PrivatesPages/PrivateProfilePage/formAnimal";

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
      {/* <StackNavigation.Screen name="Detalhes" component={Teste2} /> */}
    </StackNavigation.Navigator>
  );
};
