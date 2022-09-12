import React from "react";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";

import {
  Container,
  CopyRight,
  Icon,
  Item,
  ItemText,
  SideMenuProfileIcon,
} from "./styles";
import { imageB64 } from "../../screens/Feed/image";
import Constants from "expo-constants";
import { View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useFeed } from "../../context/FeedContext";

export function SideBar(props: DrawerContentComponentProps) {
  const { logout } = useAuth();
  const { clear } = useFeed();

  return (
    <Container>
      <SideMenuProfileIcon source={{ uri: imageB64 }} />
      <DrawerContentScrollView {...props}>
        {/* <DrawerItem
          label={(props) => <ItemText>Configurações</ItemText>}
          icon={() => <Icon name="settings" />}
          onPress={console.log}
        /> */}
        <DrawerItem
          label={(props) => (
            <Item>
              <Icon name="rotate-cw" />
              <ItemText>Limpar</ItemText>
            </Item>
          )}
          onPress={clear}
        />
        <DrawerItem
          label={(props) => (
            <Item>
              <Icon name="log-out" />
              <ItemText>Sair</ItemText>
            </Item>
          )}
          onPress={logout}
        />
      </DrawerContentScrollView>
      <CopyRight>v{Constants.manifest?.version}</CopyRight>
    </Container>
  );
}
