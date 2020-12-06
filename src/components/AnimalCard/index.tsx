import React from "react";
import { TouchableOpacity } from "react-native";

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
  Name: string;
  Race: string;
  Species: boolean;
  Photo: string;
  Action: Function;
}

const AnimalCard: React.FC<CardProps> = ({
  Name,
  Race,
  Species,
  Photo,
  Action,
}) => {
  return (
    <TouchableOpacity onPress={() => Action()}>
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
