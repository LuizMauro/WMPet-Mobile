import React from "react";
import { ScrollView, FlatList } from "react-native";
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
];

const PrivateProfile: React.FC = () => {
  return (
    <>
      <ScrollView>
        <Container>
          <Header>
            <PhotoUser></PhotoUser>
            <NameUser> Nome do Arrombado </NameUser>
          </Header>
          <DataUser>
            <TextDataUser>teste isso aqui</TextDataUser>
          </DataUser>
          <Content>
            <ListAnimals
              data={DATA}
              renderItem={(item) => (
                <TextDataUser> {item.item.name} </TextDataUser>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </Content>
        </Container>
      </ScrollView>

      <FloatingAction color={colors.laranja} />
    </>
  );
};

export default PrivateProfile;
