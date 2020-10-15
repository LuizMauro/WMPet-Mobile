import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import Home from "../pages/privates/home";

import { SearchAnimalsRoutes } from "./searchAnimals";
import { ProfileRoutes } from "./Profile";

import { colors } from "../styles/colors";

const BottomNavigation = createBottomTabNavigator();

const PrivateRoutes: React.FC = () => (
  <NavigationContainer independent={true}>
    <BottomNavigation.Navigator
      tabBarOptions={{
        tabStyle: { backgroundColor: colors.azul },
        labelStyle: { color: colors.colorIconMenu, fontSize: 14 },
        iconStyle: {
          color: colors.colorIconMenu,
          fontSize: 24,
        },
      }}
    >
      <BottomNavigation.Screen name="Home" component={Home} />
      <BottomNavigation.Screen
        name="Animais perdidos"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="logo-android" size={size} color={color} />
          ),
        }}
        component={SearchAnimalsRoutes}
      />

      <BottomNavigation.Screen
        name="Perfil"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="logo-android" size={size} color={color} />
          ),
        }}
        component={ProfileRoutes}
      />
    </BottomNavigation.Navigator>
  </NavigationContainer>
);

export default PrivateRoutes;
