import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import theme from '../../global/styles/theme'

interface HeaderProps {
  bg?: keyof typeof theme.colors;
}

export const Header = styled.View<HeaderProps>`
  width: 100%;
  height: ${RFPercentage(13.92)}px;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 15px;
  
  background-color: ${({theme, bg = 'primary'}) => theme.colors[bg]};
`
export const Title = styled.Text`
  font-size: ${RFValue(20)}px;
  line-height: ${RFValue(33)}px;
  font-family: ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.shape};
  
  `;