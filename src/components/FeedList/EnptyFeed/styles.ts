import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { imageURI } from "./image";

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  height: ${RFPercentage(70) - 12}px;
  width: 100%;
`;

export const Background = styled.View`
  flex-direction: column;
  align-items: center;
`;

export const BackgroundImage = styled.Image.attrs({
  source: { uri: imageURI },
})`
  width: 150px;
  height: 150px;
`;

export const Label = styled.Text`
  font-size: ${RFValue(24)}px;
  font-family: ${props => props.theme.fonts.medium};
  color: ${props => props.theme.colors.opaque};
  text-align: center;

`
