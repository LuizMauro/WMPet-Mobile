import styled from "styled-components/native";
import { Platform } from "react-native";
import { colors } from "../../../styles/colors";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === "android" ? 150 : 40}px;

  background: ${colors.bgDefault};
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #535353;
  margin: 64px 0 24px;
  font-weight: bold;
`;

export const BackToSiginButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #3c9ce9;
  border-top-width: 1px;
  border-color: #3c9ce9;
  padding: 20px 0;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const BackToSiginButtonText = styled.Text`
  color: #fbffff;
  font-size: 16px;
  margin-left: 10px;
`;
