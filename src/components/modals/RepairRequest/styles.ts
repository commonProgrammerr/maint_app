import styled, { css } from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { FontAwesome5 } from "@expo/vector-icons";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { OccurrencesType } from "../../../utils/occurrences";

export const Container = styled(GestureHandlerRootView)`
  background-color: white;
  padding: 16px;
  padding-bottom: 26px;
  border-radius: ${RFPercentage(23)}px;
  min-height: ${RFPercentage(54.7)}px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 46px;
`

export const TimeContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding: 8px 12px;
`;
export const TimeIcon = styled(FontAwesome5).attrs({
  name: "clock",
})`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
  margin-right: 10px;
`;
export const TimeInfo = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(16)}px;
`;

interface StatusProps {
  type?: OccurrencesType;
}

export const StatisWrapper = styled.View<StatusProps>`
  padding: 8px 12px;
  border-radius: 25px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${(props) => {
    switch (props.type) {
      case OccurrencesType.REPARO:
        return css`
          background-color: ${props.theme.colors.attention};
        `;
      case OccurrencesType.SUPORT:
        return css`
          background-color: ${props.theme.colors.secondary};
        `;
      case OccurrencesType.MAINT:
        return css`
          background-color: ${props.theme.colors.select_effect};
        `;
      default:
        return css`
          background-color: ${props.theme.colors.text};
        `;
    }
  }}
`;
export const AlertIcon = styled(FontAwesome5).attrs({
  name: "exclamation-circle",
})`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.shape};
  margin-right: 10px;
`;
export const StatusText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${(props) => props.theme.colors.shape};
`;
export const ButtonWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  margin-top: 6px;
  justify-content: flex-end;
`;

export const AceptText = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.shape};
`;
export const AceptIcon = styled(FontAwesome5).attrs({
  name: "check-circle",
})`
  font-size: ${RFValue(24)}px;
  color: ${(props) => props.theme.colors.shape};
  margin-right: 12px;
`;
export const DeclineIcon = styled(FontAwesome5).attrs({
  name: "times-circle",
})`
  font-size: ${RFValue(24)}px;
  color: ${(props) => props.theme.colors.shape};
  margin-right: 12px;
`;

export const LoadIndicatorContainer = styled.View`
  align-self: center;
  flex-direction: column;
  padding: 14px 24px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.shape};
`
export const Text = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.text_dark};
`

export const InfoItem = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-top: 12px;
  padding-left: 16px;
  
`;