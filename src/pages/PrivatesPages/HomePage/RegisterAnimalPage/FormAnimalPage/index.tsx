import React from "react";
import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

interface IParamsRoute {
  position: {
    latitude: number;
    longitude: number;
  };
}

const FormAnimal: React.FC = () => {
  return <View />;
};

export default FormAnimal;
