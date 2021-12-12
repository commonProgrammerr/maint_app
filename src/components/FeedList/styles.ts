import styled from 'styled-components/native';
import { FlatListProps } from "react-native";
import { FeedItem } from '../../services/api';

export const Container = styled.View`
  flex: 1;
  padding: 17px 24px;
  padding-bottom: 0px;
  width: 100%;
`;

export const ListaDeChamados = styled.FlatList<FlatListProps<FeedItem>>`
  width: 100%;
  margin: 16px 0;
  
`

export const Label = styled.Text`
  color: ${props => props.theme.colors.title};
  font-family: ${({theme}) => theme.fonts.regular};
`
