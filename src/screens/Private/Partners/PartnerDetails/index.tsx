import React, { useCallback, useEffect, useState } from "react";
import { Image, Text, Linking, Alert } from "react-native";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { Container, ImagemTopo, ImagemBloco, Dados } from "./styles";

import api from "../../../../services/api";

import ZapIcon from "../../../../assets/whatsapp-icon.png";
import { TouchableOpacity } from "react-native-gesture-handler";
import { string } from "yup";

interface IParams {
  partner: {
    parLongitude: string;
    parLatitude: string;
    parID: string;
    parName: string;
  };
}

interface IPartner {
  parName: string;
  parCNPJ: string;
  parPicture: string;
  parCEP: string;
  parStreet: string;
  parDistrict: string;
  parCity: string;
  parState: string;
  parLongitude: string;
  parLatitude: string;
  parStatus: number;
  parWhatsapp: string;
  parDescription: string;
}

const PartinerDetails: React.FC = () => {
  const route = useRoute();
  const params = route.params as IParams;
  const [partner, setPartner] = useState<IPartner>();
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      setLoading(true);

      const loadDatasPag = async () => {
        const response = await api.get(`/partners/${params.partner.parID}`);
        setPartner(response.data);
      };

      loadDatasPag();
      setLoading(false);

      return () => {
        isActive = false;
      };
    }, [])
  );

  const image = partner?.parPicture;
  const zapURL = `http://api.whatsapp.com/send?phone=${partner?.parWhatsapp}&text=Olá%20${partner?.parName}`;

  const handlePress = useCallback(
    async ({ url: string }) => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(zapURL);
     
      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile     
        await Linking.openURL(zapURL);

      } else {        
        Alert.alert(`Don't know how to open this URL: ${zapURL}`);
      }
    },
    [zapURL]
  );

  return (
    <>
      <ImagemBloco>
        <ImagemTopo source={{ uri: `${image}` }} resizeMode="stretch" />
      </ImagemBloco>

      <Container>
        <Dados>Nome: {partner?.parName}</Dados>
        <Dados>CNPJ: {partner?.parCNPJ}</Dados>
        <Dados>CEP: {partner?.parCEP}</Dados>
        <Dados>Bairro: {partner?.parDistrict}</Dados>
        <Dados>Cidade: {partner?.parCity}</Dados>
        <Dados>Descrição: {partner?.parDescription}</Dados>
        <TouchableOpacity
          onPress={() => {
            handlePress(zapURL);
          }}
        >
          <ImagemTopo
            source={ZapIcon}
            style={{ width: 75, height: 75, alignSelf: "center" }}
          />
        </TouchableOpacity>
      </Container>
    </>
  );
};

export default PartinerDetails;
