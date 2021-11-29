import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { InputForm } from '../Input'


export const TextArea = styled(InputForm).attrs({
  multiline: true,
  numberOfLines: 5,
  textAlignVertical: 'top'
})`
  font-size: ${RFValue(12)}px;
  min-height: ${RFPercentage(5)}px;
  align-items: flex-start;
  justify-content: flex-start;
`