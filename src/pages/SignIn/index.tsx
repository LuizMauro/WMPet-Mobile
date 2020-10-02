import React, { useCallback, useRef } from "react";
import * as Yup from "yup";
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";

import getValidationErrors from "../../utils/getValidationErros";
import { useAuth } from "../../hooks/auth";

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

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const { singIn } = useAuth();

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required("Email obrigatório")
            .email("Digite um e-mail válido"),
          password: Yup.string().required("Senha obrigatória"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await singIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        console.log(err);

        Alert.alert(
          "Erro na autenticação",
          "Ocorreu um erro ao fazer login, cheque as credenciais."
        );
      }
    },
    [singIn]
  );

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
              <Input
                icon="mail"
                name="email"
                placeholder="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <Input
                icon="lock"
                name="password"
                placeholder="Sua senha"
                secureTextEntry={true}
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
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
