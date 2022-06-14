import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, View } from "react-native";
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
import { useFeed } from "../../context/FeedContext";

export function FeedScreen({ navigation }: FeedScreenProps) {
  const [selectedId, setSelectedId] = useState("");
  function handleCloseModal() {
    setSelectedId("");
  }

  function handleOpemModal(id: string) {
    setSelectedId(id);
  }
  const [touchs, setTouchs] = useState(0);
  const { user, logout } = useAuth();
  const { clear } = useFeed();

  useEffect(() => {
    if (touchs >= 3) {
      clear();
    } else if (touchs > 0) {
      const timer = setTimeout(() => {
        setTouchs(0);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [touchs]);
  const imageSizeC = 120 / 45;
  const imageSize = 66;
  return (
    <Container>
      <StatusBar style="light" />
      <Header>
        <UserWrampper>
          <UserInfo>
            <View onTouchMove={() => setTouchs((last) => last + 1)}>
              <Image
                style={{
                  width: imageSize * imageSizeC,
                  height: imageSize,
                }}
                source={{ uri: imageB64 }}
              />
            </View>
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
