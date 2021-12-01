import styled from 'styled-components/native';
import { ChamadoType } from '../../context/chamados-context/types';
import { FlatListProps } from "react-native";

export const Container = styled.View`
  flex: 1;
  padding: 17px 24px;
  padding-bottom: 0px;
  width: 100%;
`;

export const ListaDeChamados = styled.FlatList<FlatListProps<ChamadoType>>`
  width: 100%;
  margin: 16px 0;
  
`

export const Label = styled.Text`
  color: ${props => props.theme.colors.title};
  font-family: ${({theme}) => theme.fonts.regular};
`
