import styled from "styled-components/native";

import { RectButton } from "react-native-gesture-handler";

//laranja : #f9965f
// cor para dentro do laranja #fbffff

//azul: #3c9ce9

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  background: #f9965f;
  border-radius: 10px;
  margin-top: 10px;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fbffff;
  font-family: "Roboto";
  font-size: 18px;
`;
