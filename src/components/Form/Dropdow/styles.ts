import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Dropdown } from 'react-native-element-dropdown';
import theme from '../../../global/styles/theme';

export const DropDown = styled(Dropdown).attrs({
  maxHeight: RFPercentage(20),
  placeholderStyle: {
    fontSize: RFValue(16),
    color: theme.colors.text
  },
  selectedTextStyle: {
    fontSize: RFValue(16),
    color: theme.colors.text,
    marginTop: 0
  }
})`
  width: 100%;
  padding: 16px 18px;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.25);
  color: ${({ theme }) => theme.colors.text_dark};
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  margin-bottom: 8px;
`


export const Container = styled.View`
  width: 100%;
`;

export const Error = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.attention};

  margin: 7px 0;
`;