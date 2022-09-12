import styled, { css } from "styled-components/native";

import { Feather } from '@expo/vector-icons'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { StatusBar } from "react-native";


export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${props => props.theme.colors.background};
`


export const Header = styled.View`
  flex-direction: row;
  padding: 16px 40px;
  padding-left: 18px;
  padding-top: ${18 + (StatusBar.currentHeight || 0)}px;
  background-color: ${props => props.theme.colors.primary};
  align-items: center;
  justify-content: space-between;
`

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
  `
export const Photo = styled.Image`
  width: ${RFValue(55)}px;
  height: ${RFValue(55)}px;
  border-radius: 10px;
  background-color: ${props => props.theme.colors};

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

export const UserWrampper = styled.View`
  width: 100%;
  padding: 0px 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  `

export const Icon = styled(Feather as any)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.shape};
  padding: 6px;

`

export const MenuButton = styled(DrawerToggleButton)`
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.text};
  /* padding-left: 11px; */
`