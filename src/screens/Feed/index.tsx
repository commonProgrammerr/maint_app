import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Container, Header, Icon, LogoImage, MenuButton } from "./style";
import { FeedsList } from "../../components/FeedList";
import { RepairRequestModal } from "../../components/modals/RepairRequest";
import { FeedScreenProps } from "../../routes/types";
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
  const { loading } = useFeed();

  const imageSizeC = 120 / 45;
  const imageSize = 66;
  return (
    <Container>
      <StatusBar style="light" />
      <Header>
        <LogoImage />
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
