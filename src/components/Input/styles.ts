import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Feather";

export const Container = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 15px;

  flex-direction: row;
  align-items: center;
`;

export const IconStyle = styled(Icon)`
  margin-right: 16px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #535353;
  font-size: 16px;
  font-family: "Roboto";
`;
