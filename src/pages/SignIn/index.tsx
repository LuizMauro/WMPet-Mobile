import React from "react";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container, Title } from "./styles";

const SignIn: React.FC = () => {
  return (
    <Container>
      <Title>Faça seu Login</Title>
      <Input icon="mail" name="email" placeholder="E-mail" />
      <Input icon="lock" name="password" placeholder="Sua senha" />
      <Button onPress={() => {}}>Entrar</Button>
    </Container>
  );
};

export default SignIn;
