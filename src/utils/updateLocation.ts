import * as Location from "expo-location";
import api from "../services/api";
export const updateLocation = async (userID: string) => {
  const { status } = await Location.requestPermissionsAsync();
  if (status != "granted") {
    alert("Permission to access location was denied");
  }
  console.log(userID);

  const location = await Location.getCurrentPositionAsync({});

  await api.put(`users/edit-coordinates/${userID}`, {
    useLatitude: location.coords.latitude,
    useLongitude: location.coords.longitude,
  });
};
