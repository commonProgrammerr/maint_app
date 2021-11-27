import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import { FontAwesome5 } from '@expo/vector-icons'
import { ChamadosTypes } from '../../context/chamados-context/types';

export const Container = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.shape};
  width: 100%;
  height: ${RFValue(128)}px;
  box-shadow: 1px 2px 4px rgba(0,0,0,0.2);
  border-radius: ${RFValue(5)}px;
  padding: 17px 24px;
  padding-bottom: 13px;
  margin-top: 16px;
  flex-direction: column;
  justify-content: space-between;
`;

export const Header = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(14)}px;
`

interface ContentProps {
  chamadoType: ChamadosTypes
}
export const Content = styled.Text<ContentProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(22)}px;
  margin-top: 6px;
  color: ${({ theme, chamadoType }) => {
    switch (chamadoType) {
      case ChamadosTypes.ENTUPIMENTO:
        return theme.colors.attention;

      case ChamadosTypes.AJUDA:
        return theme.colors.secondary;
      default:
        return theme.colors.text + '90';
    }
  }};
  `
export const Footer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 14px;
`
export const SubDescription = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(16)}px;
`
export const DescriptionContainer = styled.View`
  flex-direction: row;
`

export const Icon = styled(FontAwesome5)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
  margin-right: 10px;
`
