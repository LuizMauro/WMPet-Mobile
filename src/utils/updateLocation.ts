import * as Location from "expo-location";
import api from "../services/api";

export const getLocation = async () => {
  const { status } = await Location.requestPermissionsAsync();

  if (status != "granted") {
    alert("Permission to access location was denied");
  }
  const location = await Location.getCurrentPositionAsync({});

  return location;
};

export const updateLocation = async (userID: string) => {
  const location = await getLocation();

  await api.put(`users/edit/coordinates/${userID}`, {
    useLatitude: location.coords.latitude,
    useLongitude: location.coords.longitude,
  });
};
