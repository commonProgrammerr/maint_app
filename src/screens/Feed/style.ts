import styled, { css } from "styled-components/native";

import { Feather } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { StatusBar } from "react-native";
import { imageB64 } from "./image";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  padding: 16px 18px;
  padding-top: ${18 + (StatusBar.currentHeight || 0)}px;
  background-color: ${(props) => props.theme.colors.primary};
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;


const imageSizeC = 120 / 45;
const imageSize = 50;

export const LogoImage = styled.Image.attrs({
  source: { uri: imageB64 },
  resizeMode: 'center'
})`
  height: ${imageSize}px;
  width: ${imageSizeC * imageSize}px;
  align-self: center;
`;

export const Icon = styled(Feather as any)`
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.shape};
  /* padding: 6px; */
`;

export const MenuButton = styled(DrawerToggleButton)`
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.text};
  /* padding-left: 11px; */
`;
