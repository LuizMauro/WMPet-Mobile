import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Icon from "react-native-vector-icons/MaterialIcons";
import { darken } from "polished";
import {
  CardBox,
  CardImageBox,
  CardTitle,
  CardDescription,
  CardButton,
  CardText,
} from "./styles";

import DOG from "../../../assets/dog_teste.jpg";
import { colors } from "../../styles/colors";

export interface CardProps {
  ID: string;
  //Picture: string;
  Name: string;
  Race: string;
  Species: boolean;
  To: string;
}

const AnimalCard: React.FC<CardProps> = ({ ID, Name, Race, Species, To }) => {
  const navigation = useNavigation();

  return (
    <CardBox>
      <CardImageBox
        source={DOG}
        resizeMode="cover"
        imageStyle={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
      ></CardImageBox>
      <CardDescription>
        <CardText>
          <CardTitle> Tipo: {Species ? "Cachorro" : "Gato"} </CardTitle>
          <CardTitle> Raça: {Race} </CardTitle>
          <CardTitle> Nome: {Name} </CardTitle>
        </CardText>
        <CardButton
          style={{
            borderTopWidth: 1,
            borderTopColor: darken("0.1", colors.fontColorCard),
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate(To)}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardTitle>Visualizar</CardTitle>
            <Icon size={20} name="navigate-next"></Icon>
          </TouchableOpacity>
        </CardButton>
      </CardDescription>
    </CardBox>
  );
};

export default AnimalCard;
