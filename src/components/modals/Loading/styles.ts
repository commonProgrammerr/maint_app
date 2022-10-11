import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  align-self: center;
  
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* padding: 0px 32px; */
  width: ${RFValue(72)}px;
  height: ${RFValue(72)}px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.shape};
`;
