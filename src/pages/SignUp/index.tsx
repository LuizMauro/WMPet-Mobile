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
import api from "../../services/api";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Icon from "react-native-vector-icons/Feather";

import {
  Container,
  Title,
  BackToSiginButton,
  BackToSiginButtonText,
} from "./styles";

interface SignInFormData {
  email: string;
  password: string;
  nome: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const { signIn } = useAuth();

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          nome: Yup.string()
            .required("Nome obrigatório")
            .min(3, "Minimo 6 caracteres"),
          email: Yup.string()
            .required("Email obrigatório")
            .email("Digite um e-mail válido"),
          password: Yup.string()
            .required("Senha obrigatória")
            .min(6, "Minimo 6 caracteres"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.post("/users", {
          useName: data.nome,
          useEmail: data.email,
          usePassword: data.password,
        });

        if (response.data.useID) {
          Alert.alert("Boa!", "Conta criada com sucesso!");
          navigation.goBack();
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert("Ops...", "Ocorreu algum problema!");
      }
    },
    [signIn]
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
              <Title>Crie sua conta</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input icon="user" name="nome" placeholder="Seu Nome" />
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
              Cadastrar
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSiginButton onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fbffff" />
        <BackToSiginButtonText>Voltar</BackToSiginButtonText>
      </BackToSiginButton>
    </>
  );
};

export default SignUp;
