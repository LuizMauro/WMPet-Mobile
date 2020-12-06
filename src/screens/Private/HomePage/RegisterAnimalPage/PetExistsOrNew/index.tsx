import React from "react";
import { Text } from "react-native";

import { Container, ButtonChoice, ViewHorizontal } from "./styles";

const PetExistsOrNew: React.FC = () => {
  return (
    <Container>
      <ViewHorizontal>
        <ButtonChoice>
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
