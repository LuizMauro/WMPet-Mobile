import React, { useState, useRef, useEffect } from "react";
import { Text, TouchableOpacity, View, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-community/picker";
import * as Yup from "yup";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";
import * as ImagePicker from "expo-image-picker";

import getValidationErrors from "../../../../utils/getValidationErros";
import api from "../../../../services/api";

import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
// import { useNavigation, useRoute } from "@react-navigation/native";

import {
  Container,
  ViewHorizontal,
  SelectInputView,
  styles,
  TitleInput,
} from "./style";

interface IData {
  nome: string;
  desc: string;
}

interface IFur {
  furID: string;
  furDescription: string;
}

interface ICol {
  colID: string;
  colDescription: string;
}

interface IRac {
  racID: string;
  racDescription: string;
  racType: boolean;
}

const schema = Yup.object().shape({
  aniName: Yup.string().required("obrigatório"),
  aniDescription: Yup.string().required("obrigatório"),
  aniGenre: Yup.string().required("obrigatório"),
  aniSize: Yup.string().required("obrigatório"),
  aniSpecies: Yup.string().required("obrigatório"),
  colID: Yup.string().required("obrigatório"),
  racID: Yup.string().required("obrigatório"),
  furID: Yup.string().required("obrigatório"),
});

const FormAnimal: React.FC = () => {
  const { navigate } = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const [responseFur, setResponseFur] = useState<IFur[]>([]);
  const [responseCol, setResponseCol] = useState<ICol[]>([]);
  const [responseRac, setResponseRac] = useState<IRac[]>([]);
  const [raceFiltred, setRaceFiltred] = useState<IRac[]>([]);

  const [image1, setImage1] = useState<string>("");
  const [image2, setImage2] = useState<string>("");
  const [image3, setImage3] = useState<string>("");
  const [especie, setEspecie] = useState<string>("Cachorro");
  const [genero, setGenero] = useState<string>("M");
  const [size, setSize] = useState<string>("Médio");
  const [color, setColor] = useState<string>("");
  const [race, setRace] = useState<string>("");

  const [fur, setFur] = useState<string>("");

  async function handleSelectImage(positionImage: number) {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== "granted") {
      alert("Ops, precisamos de acesso às suas fotos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }

    const { uri: image } = result;

    if (positionImage === 1) {
      setImage1(image);
    } else if (positionImage === 2) {
      setImage2(image);
    } else {
      setImage3(image);
    }
  }

  async function handleAnimal(data: IData) {
    try {
      formRef.current?.setErrors({});

      const finalData = new FormData();

      finalData.append("aniName", data.nome);
      finalData.append("aniDescription", data.desc);
      finalData.append("aniGenre", genero);
      finalData.append("aniSize", size);
      finalData.append("aniSpecies", especie);
      finalData.append("colID", color);
      finalData.append("racID", race);
      finalData.append("furID", fur);

      await schema.validate(
        {
          aniName: data.nome,
          aniDescription: data.desc,
          aniGenre: genero,
          aniSize: size,
          aniSpecies: especie,
          colID: color,
          racID: race,
          furID: fur,
        },
        {
          abortEarly: false,
        }
      );

      if (image1) {
        finalData.append("images", {
          name: `image1.jpg`,
          type: "image/jpg",
          uri: image1,
        } as any);
      }

      if (image2) {
        finalData.append("images", {
          name: `image2.jpg`,
          type: "image/jpg",
          uri: image2,
        } as any);
      }

      if (image3) {
        finalData.append("images", {
          name: `image3.jpg`,
          type: "image/jpg",
          uri: image3,
        } as any);
      }

      if (!image1 && !image2 && !image3) {
        Alert.alert("Ops...", "Preencha todos os campos!");
        return;
      }

      await api
        .post("/animals", finalData)
        .then((response) => {
          Alert.alert("Sucesso!", "Pet cadastrado!", [
            { text: "Voltar", onPress: () => navigate("profile") },
          ]);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        Alert.alert("Ops...", "Preencha todos os campos!");

        return;
      }

      Alert.alert("Ops...", "Ocorreu algum problema!");
    }
  }

  async function loadCharacteristics() {
    await api
      .get("/races")
      .then((response) => {
        setResponseRac(response.data);
      })
      .catch((err) => console.log(err));

    await api
      .get("/furs")
      .then((response) => {
        setResponseFur(response.data);
      })
      .catch((err) => console.log(err));

    await api
      .get("/colors")
      .then((response) => {
        setResponseCol(response.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    loadCharacteristics();
  }, []);

  function convertEspecie() {
    return especie === "Cachorro" ? true : false;
  }

  useEffect(() => {
    const tipyRace = convertEspecie();
    console.log(tipyRace);
    setEspecie(tipyRace ? "Cachorro" : "Gato");
    const filtred = responseRac.filter((item) => item.racType === tipyRace);
    setRaceFiltred(filtred);
    if (filtred.length > 0) {
      setRace(filtred[0].racID);
    }
  }, [responseRac, especie]);

  return (
    <Container contentContainerStyle={{ padding: 25 }}>
      <Form ref={formRef} onSubmit={handleAnimal}>
        <Container>
          <TitleInput> Nome </TitleInput>
          <Input placeholder="Nome" name="nome" />
        </Container>

        {/* Especie e Genero */}
        <ViewHorizontal>
          <Container>
            <TitleInput> Espécie </TitleInput>
            <SelectInputView>
              <Picker
                selectedValue={especie}
                style={{
                  height: 50,
                  width: "100%",
                }}
                onValueChange={(itemValue, itemIndex) => {
                  setEspecie(itemValue.toString());
                }}
              >
                <Picker.Item label="Cachorro" value="Cachorro" />
                <Picker.Item label="Gato" value="Gato" />
              </Picker>
            </SelectInputView>
          </Container>

          <Container>
            <TitleInput> Genero </TitleInput>
            <SelectInputView>
              <Picker
                selectedValue={genero}
                style={{
                  height: 50,
                  width: "100%",
                  textAlign: "center",
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setGenero(itemValue.toString())
                }
              >
                <Picker.Item label="Macho" value="M" />
                <Picker.Item label="Femea" value="F" />
              </Picker>
            </SelectInputView>
          </Container>
        </ViewHorizontal>
        {/* Especie e Genero */}

        {/* Tamanho e Raça */}
        <ViewHorizontal>
          <Container>
            <TitleInput>Tamanho</TitleInput>
            <SelectInputView>
              <Picker
                selectedValue={size}
                style={{
                  height: 50,
                  width: "100%",
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setSize(itemValue.toString())
                }
              >
                <Picker.Item label="Pequeno" value="Pequeno" />
                <Picker.Item label="Médio" value="Médio" />
                <Picker.Item label="Grande" value="Grande" />
              </Picker>
            </SelectInputView>
          </Container>

          <Container>
            <Container>
              <TitleInput>Raça</TitleInput>
            </Container>
            <SelectInputView>
              <Picker
                selectedValue={race}
                style={{
                  height: 50,
                  width: "100%",
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setRace(itemValue.toString())
                }
              >
                {raceFiltred.map((item) => {
                  return (
                    <Picker.Item
                      key={item.racID}
                      label={item.racDescription}
                      value={item.racID}
                    />
                  );
                })}
              </Picker>
            </SelectInputView>
          </Container>
        </ViewHorizontal>
        {/* Tamanho */}

        {/*  pelo e cor */}
        <ViewHorizontal>
          <Container>
            <TitleInput>Pelo</TitleInput>
            <SelectInputView>
              <Picker
                selectedValue={fur}
                style={{
                  height: 50,
                  width: "100%",
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setFur(itemValue.toString())
                }
              >
                {responseFur.map((item) => (
                  <Picker.Item
                    key={item.furID}
                    label={item.furDescription}
                    value={item.furID}
                  />
                ))}
              </Picker>
            </SelectInputView>
          </Container>

          <Container>
            <TitleInput>Cor</TitleInput>
            <SelectInputView>
              <Picker
                selectedValue={color}
                style={{
                  height: 50,
                  width: "100%",
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setColor(itemValue.toString())
                }
              >
                {responseCol.map((item) => (
                  <Picker.Item
                    key={item.colID}
                    label={item.colDescription}
                    value={item.colID}
                  />
                ))}
              </Picker>
            </SelectInputView>
          </Container>
        </ViewHorizontal>
        {/* Tamanho */}

        {/* Fotos */}
        <Text style={{ color: "#535353", textAlign: "center", marginTop: 20 }}>
          Selecione fotos do seu pet
        </Text>
        <ViewHorizontal>
          <View style={styles.imagesInput}>
            {!!image1 && (
              <TouchableOpacity
                onPress={() => setImage1("")}
                style={{
                  position: "absolute",
                  right: -5,
                  top: -20,
                  height: 30,
                  width: 30,
                  borderRadius: 30,
                  zIndex: 999,
                  backgroundColor: "red",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>X</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => handleSelectImage(1)}>
              {image1 ? (
                <>
                  <Image
                    source={{ uri: image1 }}
                    style={{ height: 70, width: 70 }}
                  />
                </>
              ) : (
                <Text>Foto 1</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.imagesInput}>
            {!!image2 && (
              <TouchableOpacity
                onPress={() => setImage2("")}
                style={{
                  position: "absolute",
                  right: -5,
                  top: -20,
                  height: 30,
                  width: 30,
                  borderRadius: 30,
                  zIndex: 999,
                  backgroundColor: "red",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>X</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => handleSelectImage(2)}>
              {image2 ? (
                <>
                  <Image
                    source={{ uri: image2 }}
                    style={{ height: 70, width: 70 }}
                  />
                </>
              ) : (
                <Text>Foto 2</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.imagesInput}>
            {!!image3 && (
              <TouchableOpacity
                onPress={() => setImage3("")}
                style={{
                  position: "absolute",
                  right: -5,
                  top: -20,
                  height: 30,
                  width: 30,
                  borderRadius: 30,
                  zIndex: 999,
                  backgroundColor: "red",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>X</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => handleSelectImage(3)}>
              {image3 ? (
                <>
                  <Image
                    source={{ uri: image3 }}
                    style={{ height: 70, width: 70 }}
                  />
                </>
              ) : (
                <Text>Foto 3</Text>
              )}
            </TouchableOpacity>
          </View>
        </ViewHorizontal>
        {/* Fotos */}

        <Container>
          <TitleInput>Descrição</TitleInput>
          <Input
            name="desc"
            style={{ height: 120 }}
            placeholder="Descrição sobre o petzin"
            multiline
          />
        </Container>

        <Button onPress={() => formRef.current?.submitForm()}>
          Cadastrar pet
        </Button>
      </Form>
    </Container>
  );
};

export default FormAnimal;
