import React from "react";
import { FloatingAction } from "react-native-floating-action";

import { useAuth } from "../../../hooks/auth";

import AnimalCard,{CardProps} from "../../../components/AnimalCard";
import { colors } from "../../../styles/colors";
import {
  Container,
  Header,
  PhotoUser,
  DataUser,
  NameUser,
  EmailUser,
  Content,
  TextDataUser,
  ListAnimals,
} from "./styles";


const DATA: CardProps[] = [
  {
    ID:"1",
    Name:"Bilu",
    Race: "Outros",
    Species: true,
    To: "Detalhes"
  },
  {
    ID:"2",
    Name:"Bilu2",
    Race: "Outros",
    Species: true,
    To: "Detalhes"
  },{
    ID:"3",
    Name:"Bilu3",
    Race: "Outros",
    Species: true,
    To: "Detalhes"
  },{
    ID:"4",
    Name:"Bilu4",
    Race: "Outros",
    Species: true,
    To: "Detalhes"
  },
];

const PrivateProfile: React.FC = () => {

  const {user} = useAuth(); 

  const renderHeader = () => {
    return (
      <Container>
        <Header>
          <PhotoUser></PhotoUser>
          <NameUser> {user.useName} </NameUser>
          <EmailUser> {user.useEmail} </EmailUser>

        </Header>
        <DataUser style={{ elevation: 1 }}>
          <TextDataUser>teste isso aqui</TextDataUser>
        </DataUser>
        <Content></Content>
      </Container>
    );
  };
  return (
    <>
      <ListAnimals
        ListHeaderComponent={renderHeader}
        data={DATA}
        renderItem={(item) => (
          <Container><AnimalCard 
            ID={item.item.ID} 
            Name={item.item.Name} 
            Race={item.item.Race} 
            To={item.item.To} 
            Species={item.item.Species}
             />
             </Container>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <FloatingAction color={colors.laranja} />
    </>
  );
};

export default PrivateProfile;
