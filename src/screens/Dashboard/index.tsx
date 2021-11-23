import React from "react";
import { StatusBar } from "expo-status-bar";

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
} from "./style";
import CallsList from "../../components/calls-list";

export function Dashboard() {
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
          <Icon name="log-out" />
        </UserWrampper>
      </Header>
      <CallsList />
    </Container>
  );
}
