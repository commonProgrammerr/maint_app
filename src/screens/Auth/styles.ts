import { Feather } from '@expo/vector-icons'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 0 24px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(36)}px;
  line-height: ${RFValue(54)}px;
  text-align: center;
  margin-bottom: 24px;
  `


export const ButtonContainer = styled.TouchableOpacity`
  align-self: stretch;
  margin-top: ${RFPercentage(15)}px;
  background-color: ${({ theme }) => theme.colors.select_effect};
  border-radius: 5px;
  `

export const SubmitButton = styled.View`
  flex-direction: row;
  padding: 16px 32px;
  background-color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  `

export const LoginIcon = styled(Feather).attrs({
  name: 'log-in',

})`
  color: ${({ theme }) => theme.colors.shape};
  margin-left: 12px;
  font-size: ${RFValue(20)}px;
  `

export const ButtonTetx = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(16)}px;
    text-align: center;
    `