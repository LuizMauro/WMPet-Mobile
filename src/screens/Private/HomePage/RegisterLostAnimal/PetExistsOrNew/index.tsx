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

  console.log(params);

  return (
    <Container>
      <ViewHorizontal>
        <ButtonChoice
          onPress={() => navigate.navigate("Pet-exists", { params })}
        >
          <Text>Existente</Text>
        </ButtonChoice>
        <ButtonChoice
          onPress={() =>
            navigate.navigate("Register-Animal-Search", { params })
          }
        >
          <Text>Novo</Text>
        </ButtonChoice>
      </ViewHorizontal>
    </Container>
  );
};

export default PetExistsOrNew;
