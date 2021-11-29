import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import Button from '../../components/Button';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;


export const Form = styled.View`
  flex: 1;
  justify-content: space-between;
  width: 100%;
  padding: 24px;
  /* padding-bottom: ${RFPercentage(5)}px; */
  height: ${RFPercentage(95)}px;
`;

export const Fields = styled.View``;

export const ButtonsWrapper = styled.View`
  flex: 1;
  width: 100%;
  justify-content: flex-end;
  
  `
export const ButtonsText = styled.Text`
  font-size: ${RFValue(13.5)}px;
  line-height: ${RFValue(21)}px;
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.shape};
`
export const SendButton = styled(Button).attrs({
  bgColor: 'sucess'
})`
  margin-bottom: 25px;
  `

export const BackButton = styled(Button).attrs({
  bgColor: 'primary'
})`

`