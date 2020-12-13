import { useRoute } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";

// import { Container } from './styles';

interface IParams {
  AnimalID: string;
}

const Notificacao: React.FC = () => {
  const route = useRoute();
  const params = route.params as IParams;
  console.log(params.AnimalID);
  return <View />;
};

export default Notificacao;
