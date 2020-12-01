import React, { useEffect } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { FloatingAction } from "react-native-floating-action";

import { useAuth } from "../../../hooks/auth";

import AnimalCard, { CardProps } from "../../../components/AnimalCard";
import { colors } from "../../../styles/colors";
import {
  Container,
  Header,
  PhotoUser,
  DataUser,
  NameUser,
  EmailUser,
  Content,
  TextDataUser,
  ListAnimals,
} from "./styles";

import { Text, TouchableOpacity } from "react-native";

import IconPetMarker from "../../../assets/mapa-pet.png";

const DATA: CardProps[] = [
  {
    ID: "1",
    Name: "Bilu",
    Race: "Outros",
    Species: true,
    To: "Detalhes",
  },
  {
    ID: "2",
    Name: "Bilu2",
    Race: "Outros",
    Species: true,
    To: "Detalhes",
  },
  {
    ID: "3",
    Name: "Bilu3",
    Race: "Outros",
    Species: true,
    To: "Detalhes",
  },
  {
    ID: "4",
    Name: "Bilu4",
    Race: "Outros",
    Species: true,
    To: "Detalhes",
  },
];

const PrivateProfile: React.FC = () => {
  const { navigate } = useNavigation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    console.log(user);
  }, []);

  const renderHeader = () => {
    return (
      <Container>
        <Header>
          <PhotoUser source={{ uri: user.usePhoto }} />
          <NameUser> {user.useName} </NameUser>
          <EmailUser> {user.useEmail} </EmailUser>
        </Header>
        <DataUser style={{ elevation: 1 }}>
          <TextDataUser>teste isso aqui</TextDataUser>

          <TouchableOpacity onPress={() => signOut()}>
            <Text>Sair</Text>
          </TouchableOpacity>
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
          <Container>
            <AnimalCard
              ID={item.item.ID}
              Name={item.item.Name}
              Race={item.item.Race}
              To={item.item.To}
              Species={item.item.Species}
            />
          </Container>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <FloatingAction
        color={colors.laranja}
        actions={[
          {
            text: "Adicionar",
            icon: IconPetMarker,
            name: "Adicionar",
            color: colors.azul,
          },
        ]}
        onPressItem={(name) => {
          console.log(name);

          if (name === "Adicionar") {
            navigate("My Pet Form");
          }
        }}
      />
    </>
  );
};

export default PrivateProfile;
