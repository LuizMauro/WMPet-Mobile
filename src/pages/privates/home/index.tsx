import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";

import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Circle,
  Callout,
} from "react-native-maps";

import { useAuth } from "../../../hooks/auth";
import { updateLocation, getLocation } from "../../../utils/updateLocation";
import { receiveNotifications } from "../../../utils/getTokenNotification";

import { Container } from "./styles";

import IconPersonMarker from "../../../assets/mapa-pessoa.png";
import IconPetMarker from "../../../assets/mapa-pet.png";
import { colors } from "../../../styles/colors";

interface ILocation {
  lat: number;
  long: number;
}

const home: React.FC = () => {
  const [locationCurrent, setLocationCurrent] = useState<ILocation>(
    {} as ILocation
  );
  const { signOut, user } = useAuth();

  const loadLocation = useCallback(async () => {
    await updateLocation(user.useID);
    const currentLocation = await getLocation();

    setLocationCurrent({
      lat: currentLocation.coords.latitude,
      long: currentLocation.coords.longitude,
    });
  }, []);

  useEffect(() => {
    loadLocation();
    receiveNotifications();
  }, []);

  useEffect(() => {}, []);

  if (!locationCurrent.lat && !locationCurrent.long) {
    return (
      <Container>
        <ActivityIndicator color={colors.laranja} size="large" />
      </Container>
    );
  }

  return (
    <Container>
      {/* <Text>Logado</Text>
      <TouchableOpacity onPress={() => signOut()}>
        <Text>Sair</Text>
      </TouchableOpacity> */}

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

        <Marker
          icon={IconPetMarker}
          coordinate={{
            latitude: -22.8092617,
            longitude: -45.1930892,
          }}
        >
          <Callout tooltip>
            <View style={{ borderRadius: 10, width: "auto" }}>
              <Text> AU AUAUAUUUUUU AUUUU!!!</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
    </Container>
  );
};

export default home;
