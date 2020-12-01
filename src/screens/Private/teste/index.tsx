import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import AnimalCard from "../../../components/AnimalCard";
import api from "../../../services/api";

const teste: React.FC = () => {
  const navigation = useNavigation();



  return (
    <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center"}}>

      <AnimalCard ID="1" Name="Bilu" Race="Outros" Species={true} To="Detalhes"/>
    
    </View>
  );
};

export default teste;
