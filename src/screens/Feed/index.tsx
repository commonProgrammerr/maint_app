import React, { useState } from "react";
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
import CallsList from "../../components/calls-list";
import { RepairRequestModal } from "../../components/modals/RepairRequest";
import { FeedScreenProps } from "../../routes/types";
import { StatusBar } from "expo-status-bar";

export function FeedScreen({ navigation }: FeedScreenProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedId("");
  }

  function handleOpemModal(id: string) {
    setIsModalOpen(true);
    setSelectedId(id);
  }

  return (
    <Container>
      <StatusBar style="light" />
      <Header>
        <UserWrampper>
          <UserInfo>
            <Photo
              source={{ uri: "https://github.com/commonProgrammerr.png" }}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>André</UserName>
            </User>
          </UserInfo>
          <ExitButton>
            <Icon name="log-out" />
          </ExitButton>
        </UserWrampper>
      </Header>
      <CallsList handleOpenModal={handleOpemModal} />
      <RepairRequestModal
        id={selectedId}
        visible={isModalOpen}
        onRequestClose={handleCloseModal}
      />
    </Container>
  );
}
