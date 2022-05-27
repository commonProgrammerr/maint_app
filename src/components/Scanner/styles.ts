import { BarCodeScanner } from "expo-barcode-scanner";
import { RFPercentage } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled(BarCodeScanner)`
  flex: 1;
  height: 100%;
  z-index: 1000;
`;

export const LayerTop = styled.View`
  flex: 2;
  background-color: rgba(0, 0, 0, 0.4);
`;
export const LayerCenter = styled.View`
  flex: 1;
  flex-direction: row;
`;
export const LayerLeft = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.4);
`;
export const Focused = styled.View`
  flex: 10;
`;
export const LayerRight = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.4);
`;
export const LayerBottom = styled.View`
  flex: 2;
  background-color: rgba(0, 0, 0, 0.4);
`;
