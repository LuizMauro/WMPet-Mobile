import React from "react";
import { TextInputProps } from "react-native";

import { Container, TextInput, IconStyle } from "./styles";

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  return (
    <Container>
      <IconStyle name={icon} size={20} color="#3c9ce9" />
      <TextInput {...rest} />
    </Container>
  );
};

export default Input;
