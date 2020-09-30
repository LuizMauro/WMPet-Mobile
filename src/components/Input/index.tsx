import React, { useEffect, useRef } from "react";
import { TextInputProps } from "react-native";
import { useField } from "@unform/core";

import { Container, TextInput, IconStyle } from "./styles";

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface IInputValueReference {
  value: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  const inputElementRef = useRef<any>(null);
  const { registerField, defaultValue = "", fieldName, error } = useField(name);
  const inputValueRef = useRef<IInputValueReference>({ value: defaultValue });

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: "value",
      setValue(ref: any, value: string) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = "";
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <IconStyle name={icon} size={20} color="#3c9ce9" />
      <TextInput
        ref={inputElementRef}
        selectionColor="#3c9ce9"
        {...rest}
        defaultValue={defaultValue}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
      />
    </Container>
  );
};

export default Input;
