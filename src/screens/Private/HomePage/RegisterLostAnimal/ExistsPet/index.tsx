import React, { useCallback, useState } from "react";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { useAuth } from "../../../../../hooks/auth";
import api from "../../../../../services/api";

import AnimalCard from "../../../../../components/AnimalCard";

import { Container, ListAnimals } from "./styles";

import { IBasicAnimals } from "../../../../../@interfaces/BasicAnimal";

interface IParams {
  position: {
    latitude: number;
    longitude: number;
  };
}

const PrivateProfile: React.FC = () => {
  const { navigate } = useNavigation();
  const { user } = useAuth();
  const [myAnimals, setMyAnimals] = useState<IBasicAnimals[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const route = useRoute();
  const params = route.params as IParams;

  const loadMyAnimals = async () => {
    setRefreshing(true);
    await api
      .get(`animals/${user.useID}`)
      .then((response) => {
        setMyAnimals(response.data);
        setRefreshing(false);
      })
      .catch((error) => {
        setRefreshing(false);
        console.log(error);
      });
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      console.log(params);
      loadMyAnimals();
      return () => {
        isActive = false;
      };
    }, [])
  );

  const goToPage = (id: string) => {
    navigate("Confirm-pet", { id, params });
  };

  return (
    <>
      <ListAnimals
        data={myAnimals}
        refreshing={refreshing}
        onRefresh={loadMyAnimals}
        renderItem={(item) => (
          <Container>
            <AnimalCard
              Name={item.item.aniName}
              Race={item.item.racID.racDescription}
              Species={item.item.aniSpecies}
              Photo={item.item.photos[0].picPath}
              Action={() => goToPage(item.item.aniID)}
            />
          </Container>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
};

export default PrivateProfile;
