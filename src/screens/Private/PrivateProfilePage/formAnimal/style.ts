import styled from "styled-components/native";
import { ScrollView, TextInput, StyleSheet } from "react-native";
import { colors } from "../../../../styles/colors";

export const Container = styled(ScrollView)`
  flex: 1;
  background-color: ${colors.bgDefault};
`;

export const Input = styled(TextInput)`
  background-color: #fff;
  border-width: 1px;
  border-color: ${colors.azul};
  border-radius: 15px;
  height: 56px;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const SelectImage = styled.View`
  height: 100px;
  width: 100px;
  border-width: 1px;
  border-color: ${colors.azul};
  justify-content: center;
  align-items: center;
  border-style: dashed;
`;

export const ViewHorizontal = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;

export const SelectInputView = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-top: 10px;
  margin-bottom: 10px;
  border-width: 1px;
  border-radius: 15px;
  border-color: ${colors.azul};
  background-color: #fff;
  margin: 5px;
`;

export const TitleInput = styled.Text`
  color: ${colors.fontColorCard};
  padding: 5px;
  text-align: left;
`;

export const styles = StyleSheet.create({
  imagesInput: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderStyle: "dashed",
    borderColor: colors.azul,
    borderWidth: 1.4,
    borderRadius: 20,
    height: 80,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    margin: 10,
  },
});
