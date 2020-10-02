import styled, { css } from "styled-components/native";
import Icon from "react-native-vector-icons/Feather";

interface IContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<IContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 15px;
  border-width: 2px;
  border-color: #fff;
  flex-direction: row;
  align-items: center;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #3c9ce9;
    `}
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
