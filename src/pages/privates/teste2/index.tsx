import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const teste: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Detalhes do animal</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>voltar para lista</Text>
      </TouchableOpacity>
    </View>
  );
};

export default teste;
