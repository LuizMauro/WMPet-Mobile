import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../../screens/Private/HomePage";
import SelectMapPosition from "../../screens/Private/HomePage/RegisterLostAnimal/SelectMapPositionPage";
import FormRegisterAnimals from "../../screens/Private/HomePage/RegisterLostAnimal/FormAnimalPage";
import PetExistsOrNew from "../../screens/Private/HomePage/RegisterLostAnimal/PetExistsOrNew";
import PetExists from "../../screens/Private/HomePage/RegisterLostAnimal/ExistsPet";
import ConfirmPet from "../../screens/Private/HomePage/RegisterLostAnimal/ConfirmPet";

import AnimalPerdidoNotification from "../../screens/Private/AnimalPerdidoDetalhes";
const StackNavigation = createStackNavigator();

export const HomeRouter = () => {
  return (
    <StackNavigation.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackNavigation.Screen name="Mapa" component={Home} />

      <StackNavigation.Screen
        options={{
          headerShown: true,
          headerTitle: "Última localização do pet",
        }}
        name="Select-position-animal"
        component={SelectMapPosition}
      />

      <StackNavigation.Screen
        options={{
          headerShown: true,
          headerTitle: "Pet existente ou novo?",
        }}
        name="Pet-exists-or-new"
        component={PetExistsOrNew}
      />

      <StackNavigation.Screen
        options={{
          headerShown: true,
          headerTitle: "Qual deles está perdido?",
        }}
        name="Pet-exists"
        component={PetExists}
      />

      <StackNavigation.Screen
        options={{ headerShown: true, headerTitle: "Registre o animal" }}
        name="Register-Animal-Search"
        component={FormRegisterAnimals}
      />

      <StackNavigation.Screen
        options={{
          headerShown: true,
          headerTitle: "Já vamos finalizar",
        }}
        name="Confirm-pet"
        component={ConfirmPet}
      />

      <StackNavigation.Screen
        options={{ headerShown: true, headerTitle: "Animal perdido :(" }}
        name="AnimalPerdidoDetalhes"
        component={AnimalPerdidoNotification}
      />

      <StackNavigation.Screen
        options={{ headerShown: true, headerTitle: "Animal perdido :(" }}
        name="AnimalPerdidoNotificacao"
        component={AnimalPerdidoNotification}
      />
    </StackNavigation.Navigator>
  );
};
