import React, { useCallback, useEffect, useState } from "react";
import { Image, Text, Linking, Alert, View } from "react-native";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import { Container, ImagemTopo, ImagemBloco, Dados } from "./styles";

import api from "../../../../services/api";

import ZapIcon from "../../../../assets/whatsapp-icon.png";
import { TouchableOpacity } from "react-native-gesture-handler";

interface IParams {
  aniID: string;
}

interface IAnimal {
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

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      setLoading(true);

      const loadDatasPag = async () => {
        const response = await api.get(`/animals/getAnimalID/${params.aniID}`);
        setAnimal(response.data);
      };

      loadDatasPag();
      setLoading(false);

      return () => {
        isActive = false;
      };
    }, [])
  );

  // const image = partner?.parPicture;

  return (
    <>
      {animal?.photos.map((photo) => {
        if (photo.picPrimary) {
          return (
            <ImagemBloco>
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
        {animal?.photos.map((photo) => {
          return (
            <ImagemTopo
              style={{ width: 100, height: 100, margin: 10 }}
              source={{ uri: `${photo.picPath}` }}
              resizeMode="stretch"
            />
          );
        })}
      </View>

      <Container>
        <Dados>Nome: {animal?.aniName}</Dados>
        <Dados>Especie: {animal?.aniSpecies ? "Cachorro" : "Gato"}</Dados>
        <Dados>Genero: {animal?.aniGenre}</Dados>
        <Dados>Raça: {animal?.racID.racDescription}</Dados>
        <Dados>Pelo: {animal?.furID.furDescription}</Dados>
        <Dados>Cor: {animal?.colID.colDescription}</Dados>
        <Dados>Tamanho: {animal?.aniSize}</Dados>

        <Dados>Descrição: {animal?.aniDescription}</Dados>
      </Container>
    </>
  );
};

export default PartinerDetails;
