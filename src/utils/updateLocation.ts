import React, { useState } from "react";
import * as Location from "expo-location";
import api from "../services/api";

// const [longitude, setLongitude] = useState<number>();
// const [latidude, setLatitude] = useState<number>();

// export const exportCoords = () => {
//   return { latitude: latidude, longitude: longitude };
// };

export const getLocation = async () => {
  const { status } = await Location.requestPermissionsAsync();

  if (status != "granted") {
    alert("Permission to access location was denied");
  }
  const location = await Location.getCurrentPositionAsync({});

  // setLongitude(location.coords.longitude);
  // setLatitude(location.coords.latitude);

  return location;
};

export const updateLocation = async (userID: string) => {
  const location = await getLocation();

  await api.put(`users/edit/coordinates/${userID}`, {
    useLatitude: location.coords.latitude,
    useLongitude: location.coords.longitude,
  });
};
