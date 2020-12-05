import styled from "styled-components/native";

import { TouchableOpacity } from "react-native";

import { RectButton } from "react-native-gesture-handler";

import { colors } from "../../styles/colors";
//laranja : #f9965f
// cor para dentro do laranja #fbffff

//azul: #3c9ce9

export const CardBox = styled.View`
  background: #fbfbfb;
  border-radius: 10px;
  width: 90%;
  height: 150px;
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  margin-bottom: 5px;
  align-items: center;
  justify-content: space-between;
  elevation: 3;
`;

export const CardImageBox = styled.ImageBackground`
  width: 120px;
  height: 120px;
  margin: 5px;
  border-radius: 60px;
`;

export const CardDescription = styled.View`
  flex-direction: column;
  flex: 1;
  background: #fcfcfc;
`;

export const CardText = styled.View`
  padding: 5px;
  flex: 3;
`;

export const CardTitle = styled.Text`
  font-family: "Roboto";
  color: ${colors.fontColorCard};
  font-size: 15px;
`;

export const CardButton = styled.View`
  width: 40px;
  background: #fff;
  justify-content: center;
  align-items: center;
  height: 100%;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const NameAnimal = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
`;
