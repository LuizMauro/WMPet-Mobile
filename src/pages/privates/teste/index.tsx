import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const teste: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Lista animais</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Detalhes")}>
        <Text>Detalhes de 1 animal</Text>
      </TouchableOpacity>
    </View>
  );
};

export default teste;
