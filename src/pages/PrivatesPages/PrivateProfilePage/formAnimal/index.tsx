import React, { useState } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { Picker } from "@react-native-community/picker";
import * as ImagePicker from "expo-image-picker";
import Button from "../../../../components/Button";
// import { useNavigation, useRoute } from "@react-navigation/native";

import {
  Container,
  Input,
  ViewHorizontal,
  SelectInputView,
  styles,
  TitleInput,
} from "./style";

const FormAnimal: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [especie, setEspecie] = useState<string>();
  const [genero, setGenero] = useState<string>();
  const [size, setSize] = useState<string>();

  async function handleSelectImages() {
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
    setImages([...images, image]);
  }

  return (
    <Container contentContainerStyle={{ padding: 25 }}>
      <Container>
        <TitleInput> Nome </TitleInput>
        <Input placeholder="Nome" />
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
              onValueChange={(itemValue, itemIndex) =>
                setEspecie(itemValue.toString())
              }
            >
              <Picker.Item label="Cachorro" value="1" />
              <Picker.Item label="Gato" value="0" />
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
      </ViewHorizontal>
      {/* Tamanho */}

      {/*  pelo e cor */}
      <ViewHorizontal>
        <Container>
          <TitleInput>Pelo</TitleInput>
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
          <TitleInput>Cor</TitleInput>
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
      </ViewHorizontal>
      {/* Tamanho */}

      {/* Fotos */}
      <ViewHorizontal>
        <TouchableOpacity
          style={styles.imagesInput}
          onPress={handleSelectImages}
        >
          <Text style={{ color: "#535353" }}> Selecione fotos do petzin </Text>

          <ViewHorizontal>
            {images.map((image) => (
              <Image
                key={image}
                source={{ uri: image }}
                style={{
                  height: 80,
                  width: 80,
                  margin: 4,
                  backgroundColor: "red",
                }}
              />
            ))}
          </ViewHorizontal>
        </TouchableOpacity>
      </ViewHorizontal>
      {/* Fotos */}

      <Container>
        <TitleInput>Descrição</TitleInput>
        <Input
          style={{ height: 120 }}
          placeholder="Descrição sobre o petzin"
          multiline
        />
      </Container>

      <Button>Cadastrar pet</Button>
    </Container>
  );
};

export default FormAnimal;
