import React from "react";
import { KeyboardAvoidingView, ScrollView, View, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Form } from "@unform/mobile";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Icon from "react-native-vector-icons/Feather";

import {
  Container,
  Title,
  BackToSiginButton,
  BackToSiginButtonText,
} from "./styles";

const SignUp: React.FC = () => {
  const navigation = useNavigation();
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
            <Form onSubmit={() => {}}>
              <Input
                icon="user"
                name="name"
                placeholder="Nome completo"
                autoCorrect={false}
                autoCapitalize="none"
              />
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
                secureTextEntry
              />
            </Form>

            <Button onPress={() => {}}>Criar conta</Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSiginButton onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fbffff" />
        <BackToSiginButtonText>Voltar para login</BackToSiginButtonText>
      </BackToSiginButton>
    </>
  );
};

export default SignUp;
