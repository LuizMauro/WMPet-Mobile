import React, { useCallback, useState, useRef } from "react";
import * as Yup from "yup";
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Platform,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";
import * as ImagePicker from "expo-image-picker";

import getValidationErrors from "../../../utils/getValidationErros";
import api from "../../../services/api";

import Input from "../../../components/Input";
import Button from "../../../components/Button";
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
  whatsapp: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const [image, setImage] = useState<string>("");

  const handleSignIn = useCallback(async (data: SignInFormData) => {
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

      const finalData = new FormData();

      finalData.append("useName", data.nome);
      finalData.append("useEmail", data.email);
      finalData.append("usePassword", data.password);
      if (image) {
        finalData.append("photo-user", {
          name: `image.jpg`,
          type: "image/jpg",
          uri: image,
        } as any);
      }

      await api
        .post("/users", finalData)
        .then(async (response) => {
          console.log({
            conDescription: data.whatsapp,
            conType: 0,
            useID: response.data.useID,
          });

          await api
            .post("/contacts", {
              conDescription: data.whatsapp,
              conType: 0,
              useID: response.data.useID,
            })
            .then((response) => {
              Alert.alert("Boa!", "Conta criada com sucesso!");
              navigation.goBack();
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log("aqui", error);
        });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      console.log(err);

      Alert.alert("Ops...", "Ocorreu algum problema!");
    }
  }, []);

  async function handleSelectImage() {
    // Pedindo permissão para acessar a galeria de fotos do dispositivo
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    // Se status diferente de "deu permissão"
    if (status !== "granted") {
      alert("Precisamos de permissão para acessar as suas fotos...");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    // Se o usuário cancelar o upload da imagem
    if (result.cancelled) {
      return;
    }

    const { uri: image } = result;

    setImage(image);
  }

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1, justifyContent: "center" }}
        >
          <Container>
            <View>
              <Title>Crie sua conta</Title>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                borderRadius: 60,
                width: 120,
                height: 120,
                margin: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={handleSelectImage}
            >
              <Image
                source={{
                  uri: image
                    ? image
                    : "https://wpet-images-facul.s3-sa-east-1.amazonaws.com/person.png",
                }}
                style={{ height: 120, width: 120, borderRadius: 60 }}
              />
            </TouchableOpacity>

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
                icon="smartphone"
                name="whatsapp"
                placeholder="Seu Whatsapp para contato"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="phone-pad"
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
