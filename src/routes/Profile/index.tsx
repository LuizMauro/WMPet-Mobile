import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PrivateProfile from "../../pages/privates/PrivateProfile";

const StackNavigation = createStackNavigator();

export const ProfileRoutes = () => {
  return (
    <StackNavigation.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackNavigation.Screen name="profile" component={PrivateProfile} />
      {/* <StackNavigation.Screen name="Detalhes" component={Teste2} /> */}
    </StackNavigation.Navigator>
  );
};
