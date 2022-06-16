import styled, { css } from 'styled-components/native';
import { SectionListProps } from "react-native";
import { FeedItem } from '../../services/api';

export const Container = styled.View`
  flex: 1;
  padding: 17px 24px;
  padding-top: 8px;
  padding-bottom: 0px;
  width: 100%;
`;

type FeedListProps = SectionListProps<FeedItem, { title: string, data: FeedItem[] }> & { isEmpty: boolean }
export const ListaDeChamados = styled.SectionList<FeedListProps>`
  width: 100%;
  margin: 16px 0;
  flex: 1;
  
`

export const Label = styled.Text`
  color: ${props => props.theme.colors.title}C0;
  font-family: ${({ theme }) => theme.fonts.medium};
  width: 100%;
  background-color: ${props => props.theme.colors.background};
  margin-bottom: 4px;
`
