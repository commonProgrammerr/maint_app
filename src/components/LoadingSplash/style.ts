import styled from "styled-components/native";

import { Feather } from '@expo/vector-icons'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.primary};
`


