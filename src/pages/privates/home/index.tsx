import React, { useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { useAuth } from "../../../hooks/auth";
import { updateLocation } from "../../../utils/updateLocation";

const home: React.FC = () => {
  const { signOut, user } = useAuth();

  const loadLocation = useCallback(async () => {
    await updateLocation(user.useID);
  }, []);

  useEffect(() => {
    loadLocation();
  }, []);

  return (
    <View>
      <Text>Logado</Text>
      <TouchableOpacity onPress={() => signOut()}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

export default home;
