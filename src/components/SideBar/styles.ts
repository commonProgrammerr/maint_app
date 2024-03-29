import { Feather } from "@expo/vector-icons";
import { lighten } from "polished";
import { ReactNode } from "react";
import { StatusBar } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 0 ${RFValue(14)}px;
  padding-bottom: ${RFValue(8)}px;
  background-color: ${(props) => lighten(0.1, props.theme.colors.primary)};
`;

// const imageSizeC = 120 / 45;
// const imageSize = 72;

// export const SideMenuProfileIcon = styled.Image`
//   resize: center;
//   height: ${imageSize}px;
//   width: ${imageSizeC * imageSize}px;
//   align-self: center;
//   margin-top: ${RFValue(10) + (StatusBar.currentHeight ?? 0)};
//   /* padding: 20% 50%; */
// `;

export const Icon = styled(Feather as any)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.shape};
  margin-right: 8px;
`

export const Item = styled.View`
  flex-direction: row;
  align-items: center;

`;

export const ItemText = styled.Text`
  font-size: ${RFValue(19)}px;
  color: ${({ theme }) => theme.colors.shape};
`;

export const CopyRight = styled.Text`
  font-size: ${RFValue(10)}px;
  text-align: right;
  color: ${(props) => props.theme.colors.opaque};
`;


export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${RFValue(10) + (StatusBar.currentHeight ?? 0)}px;
  `
export const Photo = styled.Image`
  width: ${RFValue(55)}px;
  height: ${RFValue(55)}px;
  border-radius: 10px;
  background-color: ${props => props.theme.colors.background};

  `
export const User = styled.View`
  margin-left: 17px;
  `
export const UserGreeting = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.background};
  `
export const UserName = styled.Text`
font-family: ${({ theme }) => theme.fonts.bold};
color: ${({ theme }) => theme.colors.background};
`
