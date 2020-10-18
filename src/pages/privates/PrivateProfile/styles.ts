import styled from "styled-components/native";
import { FlatList } from "react-native";

import { colors } from "../../../styles/colors";

export const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.bgDefault};
`;

export const Header = styled.View`
  justify-content: center;
  align-items: center;

  height: 250px;
  width: 100%;
  background-color: ${colors.azul};
`;

export const PhotoUser = styled.View`
  height: 120px;
  width: 120px;
  border-radius: 60px;

  background-color: #000;
`;

export const NameUser = styled.Text`
  margin: 5px;
  color: ${colors.colorFontBGAzul};
  font-size: 16px;
`;

export const DataUser = styled.View`
  height: 200px;
  width: 85%;

  position: absolute;

  top: 200px;

  border-radius: 10px;
  background-color: #fff;
  padding: 10px;
`;

export const TextDataUser = styled.Text`
  color: #000;
  font-size: 14px;
`;

export const Content = styled.View`
  min-height: 200px;
`;

interface Animal {
  id: number;
  name: string;
}

export const ItemListAnimal = styled.View`
  height: 60px;
  background-color: red;
  margin: 0 10px 0 10px;
`;

export const ListAnimals = styled(FlatList as new () => FlatList<Animal>)`
  flex-grow: 1;
`;
