import React, { useCallback, useEffect, useState } from "react";
import { Text } from "react-native";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { Container } from "./styles";

import api from "../../../../services/api";

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

  return (
    <Container>
      <Text>{partner?.parName}</Text>
      <Text>{partner?.parCNPJ}</Text>
      <Text>{partner?.parCEP}</Text>
      <Text>{partner?.parDistrict}</Text>
      <Text>{partner?.parCity}</Text>

    </Container>
  );
};

export default PartinerDetails;
