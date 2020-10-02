import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../pages/privates/home";

const Private = createStackNavigator();

const PrivateRoutes: React.FC = () => (
  <Private.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: "#f0f4ff" },
    }}
  >
    <Private.Screen name="Home" component={Home} />
  </Private.Navigator>
);

export default PrivateRoutes;
