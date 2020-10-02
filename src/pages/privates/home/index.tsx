import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { useAuth } from "../../../hooks/auth";

const home: React.FC = () => {
  const { signOut } = useAuth();
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
