import React from "react";
import { Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Container, ButtonChoice, ViewHorizontal } from "./styles";

interface IParams {
  position: {
    latitude: number;
    longitude: number;
  };
}

const PetExistsOrNew: React.FC = () => {
  const navigate = useNavigation();
  const route = useRoute();
  const params = route.params as IParams;

  return (
    <Container>
      <ViewHorizontal>
        <ButtonChoice
          onPress={() => navigate.navigate("Pet-exists", { params })}
        >
          <Text>Existente</Text>
        </ButtonChoice>
        <ButtonChoice>
          <Text>Novo</Text>
        </ButtonChoice>
      </ViewHorizontal>
    </Container>
  );
};

export default PetExistsOrNew;
