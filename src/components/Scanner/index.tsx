import React, { ReactNode } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { StyleSheet } from "react-native";

import {
  Container,
  Focused,
  LayerBottom,
  LayerCenter,
  LayerLeft,
  LayerRight,
  LayerTop,
} from "./styles";

interface ScannerProps {
  children?: ReactNode;
}

function Scanner({ children }: ScannerProps) {
  return (
    <Container
      onBarCodeScanned={(scan) => {
        alert(scan.data);
        console.log(scan);
      }}
      style={StyleSheet.absoluteFillObject}
      barCodeTypes={["qr"]}
      accessibilityElementsHidden
    >
      <LayerTop />
      <LayerCenter>
        <LayerLeft />
        <Focused />
        <LayerRight />
      </LayerCenter>
      <LayerBottom />
      {/* {children} */}
    </Container>
  );
}

export default Scanner;
