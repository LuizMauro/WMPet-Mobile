import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const Auth = createStackNavigator();

//core padrao
//laranja : #f9965f
// cor para dentro do laranja #fbffff

//azul: #3c9ce9
// cor para dentro do azul #fbffff

//fundo do app : #f0f4ff

//cards: #ffffff

//cor da font para o resto do app #535353

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: "#f0f4ff" },
    }}
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
  </Auth.Navigator>
);

export default AuthRoutes;
