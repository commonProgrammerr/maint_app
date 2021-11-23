import React from "react";
import { View } from "react-native";

import Modal from "react-native-modal";
import Button from "../Button";

import {
  Container,
  TimeWrapper,
  TimeIcon,
  TimeInfo,
  StatisWrapper,
  AlertIcon,
  StatusText,
  InfoGrid,
  GridItem,
  InfoIcon,
  Info,
  AceptDeclineWrapperr,
  ElevatorIcon,
  WCIcon,
  GridCollumn,
  AceptIcon,
  AceptText,
  DeclineIcon,
} from "./styles";

interface AceptCallModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  data?: {
    time: string
    status: string
    status_text: string
    local: string
    genero: string
    piso: string
    box: number
  }
}

function AceptCallModal({ isOpen, onRequestClose, data }: AceptCallModalProps) {
  return (
    <Modal
      isVisible={isOpen}
      style={{
        padding: 0,
        margin: 0,
        justifyContent: "flex-end",
      }}
    >
      <Container>
        <TimeWrapper>
          <TimeIcon />
          <TimeInfo>{data?.time}</TimeInfo>
        </TimeWrapper>
        <StatisWrapper status="entupido">
          <AlertIcon />
          <StatusText>{data?.status_text}</StatusText>
        </StatisWrapper>
        <InfoGrid>
          <GridCollumn>
            <GridItem>
              <InfoIcon name="map-marker-alt" />
              <Info>{data?.local}</Info>
            </GridItem>
            <GridItem>
              <WCIcon />
              <Info>{data?.genero}</Info>
            </GridItem>
          </GridCollumn>
          <GridCollumn>
            <GridItem>
              <ElevatorIcon />
              <Info>Piso {data?.piso}</Info>
            </GridItem>
            <GridItem>
              <InfoIcon name="toilet" />
              <Info>Box {data?.box}</Info>
            </GridItem>
          </GridCollumn>
        </InfoGrid>
        <AceptDeclineWrapperr>
          <Button bgColor="sucess">
            <AceptIcon />
            <AceptText>Aceitar</AceptText>
          </Button>
          <Button bgColor="primary" onPress={onRequestClose}>
            <DeclineIcon />
            <AceptText>Recusar</AceptText>
          </Button>
        </AceptDeclineWrapperr>
      </Container>
    </Modal>
  );
}

export default AceptCallModal;
