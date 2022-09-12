import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
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
  MenuButton,
} from "./style";
import { FeedsList } from "../../components/FeedList";
import { RepairRequestModal } from "../../components/modals/RepairRequest";
import { FeedScreenProps } from "../../routes/types";
import { useAuth } from "../../context/AuthContext";
import { useFeed } from "../../context/FeedContext";
import { NetworkContextProvider } from "../../context/NetworkContext";

export function FeedScreen({ navigation }: FeedScreenProps) {
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);
  function handleCloseModal() {
    setSelectedId(undefined);
  }
  function handleOpemModal(id: number) {
    setSelectedId(id);
  }
  const { user, logout } = useAuth();
  const { loading } = useFeed();

  const imageSizeC = 120 / 45;
  const imageSize = 66;
  return (
    <Container>
      <StatusBar style="light" />
      <Header>
        <UserWrampper>
          <UserInfo>
            <Photo
              source={{
                uri: user.photo,
              }}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>{user.name}</UserName>
            </User>
          </UserInfo>
        </UserWrampper>
        <MenuButton tintColor="#fff">
          <Icon name="menu" />
        </MenuButton>
      </Header>
      <NetworkContextProvider reloadTrigger={loading}>
        <FeedsList handleOpenModal={handleOpemModal} />
      </NetworkContextProvider>
      <RepairRequestModal
        id={selectedId || 0}
        visible={!!selectedId}
        onRequestClose={handleCloseModal}
      />
    </Container>
  );
}
