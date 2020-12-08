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
import { MapConfig } from "../../../utils/MapConfig";

import { Container } from "./styles";
import IconPersonMarker from "../../../assets/mapa-pessoa.png";
import IconPartner from "../../../assets/Icon.png";
import { colors } from "../../../styles/colors";
import { TouchableOpacity } from "react-native-gesture-handler";


interface ILocation {
  lat: number;
  long: number;
}

interface IPartner {
  parLongitude: string;
  parLatitude: string;
  parID: string;
  parName: string;
}

const home: React.FC = () => {
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(false);
  const [partner, setPartner] = useState<IPartner[]>([]);
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
          `partners/range/${currentLocation.coords.longitude}/${currentLocation.coords.latitude}`
        );
                  
        setPartner(response.data);
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

  const Redirect = (partner : IPartner) => {
    navigate("details", {partner: partner});
  }

  return (
    <Container>
      <MapView
       
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
        provider={PROVIDER_GOOGLE}
        customMapStyle={MapConfig}
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

        {partner.map((partner: IPartner, index) => (
          <Marker
            key={index}
            icon={IconPartner}
            coordinate={{
              longitude: parseFloat(partner.parLongitude),

              latitude: parseFloat(partner.parLatitude),
            }}
            onCalloutPress={()=> Redirect(partner)}
          >
            <Callout tooltip >
              <View style={{borderRadius: 10}}>
                  <Text>{partner.parName}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      
    </Container>
  );
};

export default home;