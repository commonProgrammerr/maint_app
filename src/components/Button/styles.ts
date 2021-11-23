import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native';

import theme from '../../global/styles/theme';

interface ButtonStyleProps {
  bgColor: keyof typeof theme.colors
}

export const Container = styled.TouchableOpacity<ButtonStyleProps>`
  background-color: ${props => props.theme.colors[props.bgColor]};
  padding: 16px 32px;
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-width: ${RFValue(160)}px;
`;
