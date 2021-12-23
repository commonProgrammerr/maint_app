import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image } from "react-native";
import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrampper,
  Icon,
  ExitButton,
} from "./style";
import { FeedsList } from "../../components/FeedList";
import { RepairRequestModal } from "../../components/modals/RepairRequest";
import { FeedScreenProps } from "../../routes/types";
import { useAuth } from "../../context/AuthContext";
import { imageB64 } from "./image";

export function FeedScreen({ navigation }: FeedScreenProps) {
  const [selectedId, setSelectedId] = useState("");
  function handleCloseModal() {
    setSelectedId("");
  }

  function handleOpemModal(id: string) {
    setSelectedId(id);
  }

  const { user, logout } = useAuth();

  return (
    <Container>
      <StatusBar style="light" />
      <Header>
        <UserWrampper>
          <UserInfo>
            
            <Image style={{
              width: 120,
              height: 45
            }} source={{ uri: imageB64 }} />
            {/* <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>{user.name}</UserName>
            </User> */}
          </UserInfo>
          <ExitButton onPress={logout}>
            <Icon name="log-out" />
          </ExitButton>
        </UserWrampper>
      </Header>
      <FeedsList handleOpenModal={handleOpemModal} />
      <RepairRequestModal
        id={selectedId}
        visible={!!selectedId}
        onRequestClose={handleCloseModal}
      />
    </Container>
  );
}
