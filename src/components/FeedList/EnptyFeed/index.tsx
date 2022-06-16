import React from "react";
import { Label } from "./styles";
import { imageURI } from "./image";
import { Background, BackgroundImage, Container } from "./styles";
import { useNetworkContext } from "../../../context/NetworkContext";
import { NetworkStateType } from "expo-network";
function EnptyFeed() {
  const { isConnected, type } = useNetworkContext();

  return (
    <Container>
      <Background>
        <BackgroundImage
          source={{
            uri: imageURI,
          }}
        />
        <Label>
          {isConnected && type !== NetworkStateType.NONE
            ? "Sem notificações\npor enquanto"
            : "Sem conexão"}
        </Label>
      </Background>
    </Container>
  );
}

export default EnptyFeed;
