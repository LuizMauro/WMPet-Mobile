import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PrivateProfile from "../../pages/PrivatesPages/Partners";

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
