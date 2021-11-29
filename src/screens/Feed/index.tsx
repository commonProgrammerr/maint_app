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
import CallRequestModal from "../../components/modals/CallRequest";
import { FeedScreenProps } from "../../routes/types";
import Button from "../../components/Button";

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
      <CallRequestModal
        id={selectedId}
        visible={isModalOpen}
        onRequestClose={handleCloseModal}
      />
    </Container>
  );
}
