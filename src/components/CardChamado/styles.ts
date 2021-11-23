import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import { FontAwesome5 } from '@expo/vector-icons'

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
export const Content = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.attention};
  font-size: ${RFValue(22)}px;
  margin-top: 6px;
  `
export const Footer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
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
  /* align-items: center; */
`

export const Icon = styled(FontAwesome5)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
  margin-right: 10px;
`
