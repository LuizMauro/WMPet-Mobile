import React, { useCallback, useState } from "react";
import { Image, Text, Linking, Alert, View, ScrollView } from "react-native";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import { Container, ImagemTopo, ImagemBloco, Dados } from "./styles";

import api from "../../../services/api";

import ZapIcon from "../../assets/whatsapp-icon.png";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";

interface IParams {
  AnimalID: string;
}

interface IAnimal {
  seaDescription: string;
  seaReward: string;
  useID: {
    useID: string;
  };
  aniID: {
    aniDescription: string;
    aniName: string;
    aniGenre: string;
    aniSize: string;
    aniSpecies: string;
    colID: {
      colDescription: string;
    };
    racID: {
      racDescription: string;
    };

    furID: {
      furDescription: string;
    };
  };

  photos: IPhotos[];
}

interface IPhotos {
  picPath: string;
  picStatus: boolean;
  picPrimary: boolean;
}

const PartinerDetails: React.FC = () => {
  const route = useRoute();
  const params = route.params as IParams;
  const [animal, setAnimal] = useState<IAnimal>();
  const [loading, setLoading] = useState(false);
  const [zapzap, setZapZap] = useState("");

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      setLoading(true);

      const loadDatasPag = async () => {
        console.log(params.AnimalID);
        const response = await api.get(`/search-animals/${params.AnimalID}`);
        setAnimal(response.data);

        console.log(response.data.useID.useID);

        const contato = await api.get(`/contacts/${response.data.useID.useID}`);

        console.log(contato.data[0].conDescription);
        setZapZap(contato.data[0].conDescription);
      };

      loadDatasPag();
      setLoading(false);

      return () => {
        isActive = false;
      };
    }, [])
  );

  const zapURL = `http://api.whatsapp.com/send?phone=+55${zapzap}`;

  const handlePress = useCallback(
    async ({ url: string }) => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(zapURL);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        console.log(zapURL);
        await Linking.openURL(zapURL);
      } else {
        Alert.alert(`Don't know how to open this URL: ${zapURL}`);
      }
    },
    [zapURL]
  );

  // const image = partner?.parPicture;

  return (
    <ScrollView>
      {animal?.photos.map((photo, index) => {
        if (photo.picPrimary) {
          return (
            <ImagemBloco key={index}>
              <ImagemTopo
                source={{ uri: `${photo.picPath}` }}
                resizeMode="stretch"
              />
            </ImagemBloco>
          );
        }
      })}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        {animal?.photos.map((photo, index) => {
          return (
            <ImagemTopo
              key={index}
              style={{ width: 100, height: 100, margin: 10 }}
              source={{ uri: `${photo.picPath}` }}
              resizeMode="stretch"
            />
          );
        })}
      </View>

      <Container>
        <Dados>Nome: {animal?.aniID.aniName}</Dados>
        <Dados>Especie: {animal?.aniID.aniSpecies ? "Cachorro" : "Gato"}</Dados>
        <Dados>Genero: {animal?.aniID.aniGenre}</Dados>
        <Dados>Raça: {animal?.aniID.racID.racDescription}</Dados>
        <Dados>Pelo: {animal?.aniID.furID.furDescription}</Dados>
        <Dados>Cor: {animal?.aniID.colID.colDescription}</Dados>
        <Dados>Tamanho: {animal?.aniID.aniSize}</Dados>
        <Dados>Descrição: {animal?.aniID.aniDescription}</Dados>
        <Dados>Como foi perdido: {animal?.seaDescription}</Dados>
        <Dados>
          Recompensa:
          {animal?.seaReward}
        </Dados>
      </Container>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => handlePress(zapURL)}
          style={{
            width: 250,
            height: 50,
            borderRadius: 5,
            backgroundColor: "#25d165",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 50,
          }}
        >
          <Text style={{ color: "#fff" }}>Entre em contato pelo whatsapp</Text>
          <Icon name={"smartphone"} size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PartinerDetails;
