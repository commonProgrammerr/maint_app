import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { OccurrencesType } from "../../utils/occurrences";

export const Container = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.shape};
  width: 100%;
  height: ${RFValue(128)}px;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: ${RFValue(5)}px;
  padding: 17px 24px;
  padding-bottom: 13px;
  margin-bottom: 16px;
  flex-direction: column;
  justify-content: space-between;
`;

export const Header = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(14)}px;
`;

interface ContentProps {
  type?: OccurrencesType;
}
export const Content = styled.Text<ContentProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(22)}px;
  margin-top: 6px;
  color: ${({ theme, type }) => {
    switch (type) {
      case OccurrencesType.REPARO:
        return theme.colors.attention;

      case OccurrencesType.SUPORT:
        return theme.colors.secondary;

      case OccurrencesType.MAINT:
        return theme.colors.select_effect;

      default:
        return theme.colors.text + "90";
    }
  }};
`;
export const Footer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-top: 14px;
  justify-content: space-between;
`;

interface SubDescriptionProps {
  alert?: boolean
}

export const SubDescription = styled.Text<SubDescriptionProps>`
  color: ${({ theme, alert }) => alert ? theme.colors.attention_light : theme.colors.text};
  font-family: ${({ theme, alert }) => alert ? theme.fonts.medium : theme.fonts.regular};
  font-size: ${RFValue(16)}px;
  
  `;
export const DescriptionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  max-width: 50%;
  `;

export const FloorIcon = styled(MaterialCommunityIcons as any).attrs({
  name: "elevator-passenger",
})`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
  margin-right: 6px;
`;
export const ClockIcon = styled(FontAwesome5).attrs({
  name: "clock",
})`
  font-size: ${RFValue(19)}px;
  color: ${({ theme, type }) => theme.colors.text};
  margin-right: 8px;
`;
export const Alert = styled(FontAwesome5).attrs({
  name: "exclamation-triangle",
})`
  font-size: ${RFValue(15.75)}px;
  color: ${({ theme, type }) => theme.colors.attention_light};
  margin-right: 8px;
`;
