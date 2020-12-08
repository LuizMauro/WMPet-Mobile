import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PartnersGeral from "../../screens/Private/Partners";
import PartnerDetails from "../../screens/Private/Partners/PartinerDetails";

const StackNavigation = createStackNavigator();

export const PartnerRoutes = () => {
  return (
    <StackNavigation.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackNavigation.Screen name="partners" component={PartnersGeral} />
      <StackNavigation.Screen name="details" component={PartnerDetails} />


    </StackNavigation.Navigator>
  );
};
