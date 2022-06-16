import { RFValue } from 'react-native-responsive-fontsize'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import styled, { css } from 'styled-components/native'

export const Container = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  flex: 1;
  margin-top: 20px;
  margin-bottom: 50px;
  min-height: ${RFValue(70)}px;
  width: 100%;
  `;

export const GridCollumn = styled.View`
  align-items: flex-start;
  /* justify-content: space-around; */
  `;

export const GridItem = styled.View`
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  padding: 2px 6px;
`;

const infoIconsStyle = css`
  font-size: ${RFValue(22)}px;
  color: ${(props) => props.theme.colors.title};
  margin-right: 8px;
`;

export const InfoIcon = styled(FontAwesome5)`
  ${infoIconsStyle}
  font-size: ${RFValue(18)}px;
`;
export const MapIcon = styled(FontAwesome5).attrs({
  name: 'map-marker-alt'
})`
  ${infoIconsStyle}
  font-size: ${RFValue(16)}px;
`;
export const ElevatorIcon = styled(MaterialCommunityIcons).attrs({
  name: "elevator-passenger",
})`
  ${infoIconsStyle}
  margin-left: -3.5px;
`;
export const BuildingLocale = styled(MaterialCommunityIcons).attrs({
  name: "office-building-marker",
})`
  ${infoIconsStyle}
  margin-left: -3.5px;
`;
export const WCIcon = styled(FontAwesome5).attrs({
  name: "restroom",
})`
  ${infoIconsStyle}
  font-size: ${RFValue(16)}px;
  margin-left: -3.5px;
`;
export const Info = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.title};
  line-height: ${RFValue(20)}px;
  align-items: flex-end;
  /* max-width: 80%; */
  text-align: center;
`;