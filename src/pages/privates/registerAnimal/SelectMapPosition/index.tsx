import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import { getLocation } from "../../../../utils/updateLocation";

import IconPersonMarker from "../../../../assets/mapa-pessoa.png";
import { colors } from "../../../../styles/colors";

const SelectMapPosition: React.FC = () => {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [posistionCurrent, setPositionCurrent] = useState({
    latitude: 0,
    longitude: 0,
  });

  const { navigate } = useNavigation();

  const load = useCallback(async () => {
    const locationCurrent = await getLocation();
    setPositionCurrent(locationCurrent.coords);
  }, []);

  useEffect(() => {
    load();
  }, []);

  if (!posistionCurrent.latitude && !posistionCurrent.longitude) {
    return (
      <View style={{ backgroundColor: colors.bgDefault }}>
        <ActivityIndicator color={colors.laranja} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        onPress={({ nativeEvent }) => setPosition(nativeEvent.coordinate)}
        initialRegion={{
          latitude: posistionCurrent.latitude,
          longitude: posistionCurrent.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {!!position.latitude && (
          <Marker
            icon={IconPersonMarker}
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
          />
        )}
      </MapView>

      {!!position.latitude && (
        <RectButton
          style={styles.nextButton}
          onPress={() => navigate("OrphanageData", { position })}
        >
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },

  mapStyle: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },

  nextButton: {
    alignItems: "center",
    backgroundColor: "#f9965f",
    borderRadius: 20,
    bottom: 40,
    height: 56,
    justifyContent: "center",
    left: 24,
    position: "absolute",
    right: 24,
  },

  nextButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default SelectMapPosition;
