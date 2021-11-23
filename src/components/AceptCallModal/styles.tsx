import styled, { css } from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

import { GestureHandlerRootView } from "react-native-gesture-handler";

export const Container = styled(GestureHandlerRootView)`
  background-color: ${(props) => props.theme.colors.shape};
  padding: 16px 24px;
  padding-bottom: 26px;
  border-radius: ${RFPercentage(23)}px;
  min-height: ${RFPercentage(54.7)}px;
`;

export const TimeWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
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
  status: "entupido" | "help";
}

export const StatisWrapper = styled.View<StatusProps>`
  align-self: center;
  margin-top: 20px;
  padding: 18px 32px;
  border-radius: 500px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${(props) => {
    if (props.status === "entupido") {
      return css`
        background-color: ${props.theme.colors.attention};
      `;
    } else if (props.status === "help") {
      return css`
        background-color: ${props.theme.colors.secondary};
      `;
    } else {
      return css`
        background-color: ${props.theme.colors.text};
      `;
    }
  }}
`;
export const AlertIcon = styled(FontAwesome5).attrs({
  name: "exclamation-circle",
})`
  font-size: ${RFValue(36)}px;
  color: ${(props) => props.theme.colors.shape};
  margin-right: 20px;
`;
export const StatusText = styled.Text`
  font-size: ${RFValue(22)}px;
  font-family: ${(props) => props.theme.fonts.bold};
  color: ${(props) => props.theme.colors.shape};
`;
export const InfoGrid = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
  margin-bottom: 50px;
`;

export const GridCollumn = styled.View`
  align-items: flex-start;
  justify-content: space-around;
`;

export const GridItem = styled.View`
  flex-direction: row;
  align-items: center;
`;

const infoIconsStyle = css`
  font-size: ${RFValue(22)}px;
  color: ${(props) => props.theme.colors.title};
  margin-right: 8px;
`;

export const InfoIcon = styled(FontAwesome5)`
  ${infoIconsStyle}
  font-size: ${RFValue(20)}px;
`;
export const ElevatorIcon = styled(MaterialCommunityIcons).attrs({
  name: "elevator-passenger",
})`
  ${infoIconsStyle}
  margin-left: -3.5px;
`;
export const WCIcon = styled(MaterialCommunityIcons).attrs({
  name: "human-male-female",
})`
  ${infoIconsStyle}
  margin-left: -3.5px;
`;
export const Info = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.title};
`;
export const AceptDeclineWrapperr = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
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
