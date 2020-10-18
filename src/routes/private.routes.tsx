import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";

import Home from "../pages/privates/home";
import { SearchAnimalsRoutes } from "./searchAnimals";
import { ProfileRoutes } from "./Profile";

import { darken } from "polished";
import { colors } from "../styles/colors";

const BottomNavigation = createBottomTabNavigator();

const PrivateRoutes: React.FC = () => (
  <NavigationContainer independent={true}>
    <BottomNavigation.Navigator
      tabBarOptions={{
        tabStyle: { backgroundColor: colors.azul, elevation: 1 },
        labelStyle: { fontSize: 14 },
        iconStyle: {
          color: "red",
          fontSize: 24,
          backgroundColor: "red",
        },
        activeTintColor: colors.laranja,
        inactiveTintColor: darken("0.2", "#fff"),
      }}
    >
      <BottomNavigation.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <BottomNavigation.Screen
        name="Animais perdidos"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="pets" size={size} color={color} />
          ),
        }}
        component={SearchAnimalsRoutes}
      />

      <BottomNavigation.Screen
        name="Perfil"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" size={size} color={color} />
          ),
        }}
        component={ProfileRoutes}
      />
    </BottomNavigation.Navigator>
  </NavigationContainer>
);

export default PrivateRoutes;
