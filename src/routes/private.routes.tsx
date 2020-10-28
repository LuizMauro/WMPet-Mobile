import React from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { RegisterAnimalsAndHome } from "./RegisterAnimals";
import { SearchAnimalsRoutes } from "./searchAnimals";
import { ProfileRoutes } from "./Profile";

import { colors } from "../styles/colors";

import IconMap from "../assets/menu-mapa.png";
import IconSearch from "../assets/menu-procurase.png";
import IconParceiros from "../assets/menu-parceiros.png";
import IconPets from "../assets/menu-meuspets.png";

const BottomNavigation = createBottomTabNavigator();

const PrivateRoutes: React.FC = () => (
  <NavigationContainer independent={true}>
    <BottomNavigation.Navigator
      tabBarOptions={{
        inactiveBackgroundColor: colors.azul,
        style: { height: 60 },
        tabStyle: { elevation: 1 },
        labelStyle: { fontSize: 11, marginBottom: 3 },
        activeBackgroundColor: colors.laranja,
        inactiveTintColor: "#fff",
        activeTintColor: "#fff",
      }}
    >
      <BottomNavigation.Screen
        name="Mapa"
        component={RegisterAnimalsAndHome}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={IconMap}
              style={{ height: 30, width: 26 }}
              height={0}
              width={0}
            />
          ),
        }}
      />
      <BottomNavigation.Screen
        name="Procura-se"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={IconSearch}
              style={{ height: 30, width: 30 }}
              height={0}
              width={0}
            />
          ),
        }}
        component={SearchAnimalsRoutes}
      />

      <BottomNavigation.Screen
        name="Meus pets"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={IconPets}
              style={{ height: 29, width: 32 }}
              height={0}
              width={0}
            />
          ),
        }}
        component={SearchAnimalsRoutes}
      />

      <BottomNavigation.Screen
        name="Parceiros"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={IconParceiros}
              style={{ height: 30, width: 30 }}
              height={0}
              width={0}
            />
          ),
        }}
        component={ProfileRoutes}
      />
    </BottomNavigation.Navigator>
  </NavigationContainer>
);

export default PrivateRoutes;
