import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { View, Text, Dimensions, ActivityIndicator } from "react-native";

import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Circle,
  Callout,
} from "react-native-maps";
import { FloatingAction } from "react-native-floating-action";

import { useAuth } from "../../../hooks/auth";
import { updateLocation, getLocation } from "../../../utils/updateLocation";
import api from "../../../services/api";

import { Container } from "./styles";

import IconPersonMarker from "../../../assets/mapa-pessoa.png";
import IconPetMarker from "../../../assets/mapa-pet.png";
import { colors } from "../../../styles/colors";

interface ILocation {
  lat: number;
  long: number;
}

interface ISearchAnimal {
  seaLongitude: string;
  seaLatitude: string;
  seaID: string;
  aniID: { aniID: string };
}

const home: React.FC = () => {
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(false);
  const [searchAnimals, setSearchAnimals] = useState<ISearchAnimal[]>([]);
  const [locationCurrent, setLocationCurrent] = useState<ILocation>(
    {} as ILocation
  );
  const { user } = useAuth();

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      setLoading(true);

      const loadDatasPag = async () => {
        await updateLocation(user.useID);
        const currentLocation = await getLocation();

        setLocationCurrent({
          lat: currentLocation.coords.latitude,
          long: currentLocation.coords.longitude,
        });

        const response = await api.get(
          `search-animals/range/${currentLocation.coords.longitude}/${currentLocation.coords.latitude}`
        );

        setSearchAnimals(response.data);
      };

      loadDatasPag();
      setLoading(false);

      return () => {
        isActive = false;
      };
    }, [])
  );

  if ((!locationCurrent.lat && !locationCurrent.long) || loading) {
    return (
      <Container style={{ backgroundColor: colors.bgDefault }}>
        <ActivityIndicator color={colors.laranja} size="large" />
      </Container>
    );
  }

  return (
    <Container>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{
          width: Dimensions.get("window").width / 0.5,
          height: Dimensions.get("window").height / 0.5,
        }}
        initialRegion={{
          latitude: locationCurrent.lat,
          longitude: locationCurrent.long,
          latitudeDelta: 0.004,
          longitudeDelta: 0.004,
        }}
      >
        <Circle
          center={{
            latitude: locationCurrent.lat,
            longitude: locationCurrent.long,
          }}
          radius={2000}
          fillColor="#3c9ce926"
        />
        <Marker
          icon={IconPersonMarker}
          coordinate={{
            latitude: locationCurrent.lat,
            longitude: locationCurrent.long,
          }}
        >
          <Callout tooltip>
            <View style={{ borderRadius: 10 }}>
              <Text> Você está aqui! </Text>
            </View>
          </Callout>
        </Marker>

        {searchAnimals.map((animal: ISearchAnimal, index) => (
          <Marker
            key={index}
            icon={IconPetMarker}
            coordinate={{
              latitude: parseFloat(animal.seaLatitude),
              longitude: parseFloat(animal.seaLongitude),
            }}
          >
            <Callout tooltip>
              <View>
                <Text> {animal.seaLongitude}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <FloatingAction
        color={colors.laranja}
        actions={[
          {
            text: "Animal perdido",
            icon: IconPetMarker,
            name: "perdido",
            color: colors.azul,
          },
          {
            text: "Animal encontrado",
            icon: IconPetMarker,
            name: "encontrado",
            color: colors.azul,
          },
        ]}
        onPressItem={(name) => {
          if (name === "perdido") {
            navigate("Select Animal");
          } else if (name === "encontrado") {
            console.log("encontrado");
          }
        }}
      />
    </Container>
  );
};

export default home;
