import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import ExpoCheckbox from 'expo-checkbox';
import theme from '../../../global/styles/theme';

export const CheckBox = styled(ExpoCheckbox)`
  margin: 8px;
  border-color: ${({theme}) => theme.colors.primary};
`

export const Container = styled.View`
  width: 100%;
`;

export const OptionsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Text = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text};

`;
export const Label = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.title};

  margin-top: 3px;
  margin-bottom: 4px;
`;

export const Error = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.attention};

  margin: 7px 0;
`;