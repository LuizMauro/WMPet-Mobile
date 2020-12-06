import React from "react";
import { useRoute } from "@react-navigation/native";
import { TouchableOpacity, Text } from "react-native";

import api from "../../../../../services/api";
import { Container } from "./styles";

interface IParams {
  id: string;
  position: {
    latitude: number;
    longitude: number;
  };
}

const ConfirmPet: React.FC = () => {
  const route = useRoute();
  const params = route.params as IParams;
  const Finally = async () => {
    console.log(params);
  };
  return (
    <Container>
      <TouchableOpacity onPress={Finally}>
        <Text>Finalizar</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default ConfirmPet;
