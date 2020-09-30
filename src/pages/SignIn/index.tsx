import React, { useCallback, useRef } from "react";
import { KeyboardAvoidingView, ScrollView, View, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Icon from "react-native-vector-icons/Feather";

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from "./styles";

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const handleSignIn = useCallback((data: object) => {
    console.log(data);
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled
      >
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <Container>
            <View>
              <Title>Faça seu Login</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input icon="mail" name="email" placeholder="E-mail" />
              <Input icon="lock" name="password" placeholder="Sua senha" />
            </Form>

            <Button onPress={() => formRef.current?.submitForm()}>
              Entrar
            </Button>

            <ForgotPassword onPress={() => {}}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => navigation.navigate("SignUp")}>
        <Icon name="log-in" size={20} color="#fbffff" />
        <CreateAccountButtonText>Criar minha conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};

export default SignIn;
