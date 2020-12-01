import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignIn from "../screens/Public/SignIn";
import SignUp from "../screens/Public/SignUp";

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
  </Auth.Navigator>
);

export default AuthRoutes;
