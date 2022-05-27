import React, { ReactNode, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image } from "react-native";
import { Container } from "./style";
import { imageB64 } from "./image";
import AppLoading from "expo-app-loading";

interface LoadingSplash {
  onFinish?: () => void;
}

export function LoadingSplash(props: LoadingSplash) {
  return (
    <>
      <Container>
        <StatusBar style="light" />
        <Image
          style={{
            width: 120,
            height: 45,
          }}
          source={{ uri: imageB64 }}
        />
      </Container>
      <AppLoading
        startAsync={async () => console.log()}
        onFinish={async () => props.onFinish?.()}
        onError={console.warn}
      />
    </>
  );
}
