import styled from "styled-components/native";

import {TouchableOpacity} from "react-native";

import { RectButton } from "react-native-gesture-handler";

import {colors} from "../../styles/colors"
//laranja : #f9965f
// cor para dentro do laranja #fbffff

//azul: #3c9ce9

export const CardBox = styled.View`
  background: ${colors.bgCards};
  border-radius: 10px;
  width: 90%;
  height: 150px;
  display: flex;
  flex-direction:row;
  elevation: 3;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const CardImageBox = styled.ImageBackground`
  width:30%;
  flex:1;
  flex-grow: 1;
  border-radius: 22px;
  
`;


export const CardDescription = styled.View`
 width:70%;
 
 flex-direction: column;
 justify-content: space-around;
`;

export const CardText = styled.View`
padding: 5px;
flex: 3;
`;

export const CardTitle = styled.Text`
  font-family: 'Roboto';
  color: ${colors.fontColorCard};
  font-size: 15px;
 
`;

export const CardButton = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
