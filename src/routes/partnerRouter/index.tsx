import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PrivateProfile from "../../screens/Private/PrivateProfilePage";

const StackNavigation = createStackNavigator();

export const PartnerRoutes = () => {
  return (
    <StackNavigation.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackNavigation.Screen name="partners" component={PrivateProfile} />
    </StackNavigation.Navigator>
  );
};
