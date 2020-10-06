import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import Home from "../pages/privates/home";

import { SearchAnimalsRoutes } from "./searchAnimals";

const BottomNavigation = createBottomTabNavigator();

const PrivateRoutes: React.FC = () => (
  <NavigationContainer independent={true}>
    <BottomNavigation.Navigator
      tabBarOptions={{
        tabStyle: { backgroundColor: "#3c9ce9" },
        labelStyle: { color: "#fbffff", fontSize: 14 },
        iconStyle: { color: "#fbffff", fontSize: 24, backgroundColor: "red" },
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
    </BottomNavigation.Navigator>
  </NavigationContainer>
);

export default PrivateRoutes;
