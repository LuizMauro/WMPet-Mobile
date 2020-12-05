import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { colors } from "../../styles/colors";
import Icon from "react-native-vector-icons/MaterialIcons";

import {
  CardBox,
  CardImageBox,
  CardTitle,
  CardDescription,
  CardButton,
  CardText,
  NameAnimal,
} from "./styles";

export interface CardProps {
  ID: string;
  //Picture: string;
  Name: string;
  Race: string;
  Species: boolean;
  Photo: string;
  To: string;
}

const AnimalCard: React.FC<CardProps> = ({
  ID,
  Name,
  Race,
  Species,
  Photo,
  To,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(To)}>
      <CardBox>
        <CardImageBox
          source={{ uri: Photo }}
          resizeMode="cover"
          imageStyle={{ borderRadius: 60 }}
        ></CardImageBox>
        <CardDescription>
          <CardText>
            <NameAnimal> {Name}</NameAnimal>
            <CardTitle> Tipo: {Species ? "Cachorro" : "Gato"} </CardTitle>
            <CardTitle> Raça: {Race} </CardTitle>
          </CardText>
        </CardDescription>

        <CardButton>
          <Icon size={30} name="navigate-next" color={colors.laranja}></Icon>
        </CardButton>
      </CardBox>
    </TouchableOpacity>
  );
};

export default AnimalCard;
