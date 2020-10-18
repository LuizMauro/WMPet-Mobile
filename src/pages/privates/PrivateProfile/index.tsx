import React from "react";
import { FloatingAction } from "react-native-floating-action";

import {
  Container,
  Header,
  PhotoUser,
  DataUser,
  NameUser,
  Content,
  TextDataUser,
  ListAnimals,
  ItemListAnimal,
} from "./styles";

import { colors } from "../../../styles/colors";

interface Animal {
  id: number;
  name: string;
}

const DATA: Animal[] = [
  {
    id: 1,
    name: "First Item",
  },
  {
    id: 2,
    name: "Second Item",
  },
  {
    id: 3,
    name: "Third Item",
  },
  {
    id: 1,
    name: "First Item",
  },
  {
    id: 1,
    name: "First Item",
  },
  {
    id: 2,
    name: "Second Item",
  },
  {
    id: 3,
    name: "Third Item",
  },
  {
    id: 1,
    name: "First Item",
  },
  {
    id: 1,
    name: "First Item",
  },
  {
    id: 2,
    name: "Second Item",
  },
  {
    id: 3,
    name: "Third Item",
  },
  {
    id: 1,
    name: "teste",
  },
];

const PrivateProfile: React.FC = () => {
  const renderHeader = () => {
    return (
      <Container>
        <Header>
          <PhotoUser></PhotoUser>
          <NameUser> Nome do Arrombado </NameUser>
        </Header>
        <DataUser style={{ elevation: 1 }}>
          <TextDataUser>teste isso aqui</TextDataUser>
        </DataUser>
        <Content></Content>
      </Container>
    );
  };
  return (
    <>
      <ListAnimals
        ListHeaderComponent={renderHeader}
        data={DATA}
        renderItem={(item) => (
          <ItemListAnimal>
            <TextDataUser> {item.item.name} </TextDataUser>
          </ItemListAnimal>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <FloatingAction color={colors.laranja} />
    </>
  );
};

export default PrivateProfile;
