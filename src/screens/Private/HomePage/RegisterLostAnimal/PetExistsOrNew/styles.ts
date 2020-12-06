import styled from "styled-components/native";

import { colors } from "../../../../../styles/colors";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  background: ${colors.bgDefault};
`;

export const ViewHorizontal = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const ButtonChoice = styled.TouchableOpacity`
  height: 150px;
  width: 150px;
  background: ${colors.bgCards};

  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;

  border-width: 1px;
  border-radius: 5px;
  border-color: ${colors.azul};
`;
