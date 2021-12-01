import { TextArea } from './../../Form/TextArea'
import styled, { css } from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { FontAwesome5 } from "@expo/vector-icons";

import { GestureHandlerRootView } from "react-native-gesture-handler";


export const Container = styled(GestureHandlerRootView)`
  background-color: ${(props) => props.theme.colors.shape};
  padding: 16px 24px;
  padding-bottom: 26px;
  border-radius: ${RFPercentage(23)}px;
  min-height: ${RFPercentage(54.7)}px;
`;

export const ButtonText = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.shape};
`;

export const FormContainer = styled.ScrollView`
  flex: 1;
  margin-bottom: 15px;
`

export const Textarea = styled(TextArea)`
  background-color: ${({theme}) => theme.colors.background};
`