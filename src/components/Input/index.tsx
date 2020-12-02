import React, { useEffect, useRef, useState, useCallback } from "react";
import { TextInputProps, Text } from "react-native";
import { useField } from "@unform/core";

import { Container, TextInput, IconStyle } from "./styles";

interface InputProps extends TextInputProps {
  name: string;
  icon?: string;
}

interface IInputValueReference {
  value: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  const inputElementRef = useRef<any>(null);
  const { registerField, defaultValue = "", fieldName, error } = useField(name);
  const inputValueRef = useRef<IInputValueReference>({ value: defaultValue });
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

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
    <>
      <Container isFocused={isFocused} isErrored={!!error}>
        {icon && (
          <IconStyle
            name={icon}
            size={20}
            color={isFocused || isFilled ? "#3c9ce9" : "#666"}
          />
        )}

        <TextInput
          ref={inputElementRef}
          selectionColor="#3c9ce9"
          {...rest}
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChangeText={(value) => {
            inputValueRef.current.value = value;
          }}
        />
        <Text style={{ color: "#c53030" }}> {error} </Text>
      </Container>
    </>
  );
};

export default Input;
