import styled from 'styled-components/native';
import { FontAwesome5 } from '@expo/vector-icons'
import { OccurrencesType } from './../../utils/occurrences'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Button from '../../components/Button';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  `;

interface HeaderProps {
  type?: OccurrencesType;
}

export const Header = styled.View<HeaderProps>`
  width: 100%;
  height: ${RFPercentage(13.92)}px;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 15px;
  
  background-color: ${(props) => {
    switch (props.type) {
      case OccurrencesType.REPARO:
        return props.theme.colors.attention;
      case OccurrencesType.SUPORT:
        return props.theme.colors.secondary;
      default:
        return props.theme.colors.text;
    }
  }};
`

export const AlertIcon = styled(FontAwesome5).attrs({
  name: "exclamation-circle",
})`
  font-size: ${RFValue(32)}px;
  color: ${(props) => props.theme.colors.shape};
  margin-right: 16px;
  `;

export const Title = styled.Text`
  font-size: ${RFValue(24)}px;
  line-height: ${RFValue(33)}px;
  font-family: ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.shape};  
`;


export const DetailsWrapper = styled.View`
  align-items: flex-start;
  padding: 30px 24px;
  padding-bottom: 0px;
  flex: 1;
  `
export const PlaceImage = styled.Image`
  height: ${RFPercentage(21.18)}px;
  border-radius: 5px;

`
export const LocalDescription = styled.Text`
  min-height: ${RFValue(110)}px;
  background-color: ${props => props.theme.colors.shape};
  padding: 10px 16px;
  border-radius: 5px;
  width: 100%;
`

export const ButtonsWrapper = styled.View`
  flex: 1;
  width: 100%;
  justify-content: flex-end;
  padding: 0 24px;
  padding-bottom: ${RFPercentage(5)}px;
  
  `
export const ButtonsText = styled.Text`
  font-size: ${RFValue(14)}px;
  line-height: ${RFValue(21)}px;
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.shape};
`
export const EndButton = styled(Button).attrs({
  bgColor: 'sucess'
})`
  margin-bottom: 25px;
  `

export const ReportButton = styled(Button).attrs({
  bgColor: 'primary'
})`

`