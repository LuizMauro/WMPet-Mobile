import React, { useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { FloatingAction } from "react-native-floating-action";

import { useAuth } from "../../../hooks/auth";
import api from "../../../services/api";

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

import { IBasicAnimals } from "../../../@interfaces/BasicAnimal";

const PrivateProfile: React.FC = () => {
  const { navigate } = useNavigation();
  const { user, signOut } = useAuth();
  const [myAnimals, setMyAnimals] = useState<IBasicAnimals[]>([]);

  useEffect(() => {
    console.log("chamou");
    loadMyAnimals();
  }, []);

  const loadMyAnimals = async () => {
    await api
      .get(`animals/${user.useID}`)
      .then((response) => {
        console.log(response.data);
        setMyAnimals(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        data={myAnimals}
        renderItem={(item) => (
          <Container>
            <AnimalCard
              ID={item.item.aniID}
              Name={item.item.aniName}
              Race={item.item.racID.racDescription}
              Species={item.item.aniSpecies}
              Photo={item.item.photos[0].picPath}
              To={"Detalhes"}
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
