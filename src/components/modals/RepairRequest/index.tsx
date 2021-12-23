import React, { useEffect } from "react";
import axios from "axios";
import Modal from "react-native-modal";

import { getOccurenceData, OccurrencesType } from "../../../utils/occurrences";
import Button from "../../Button";

import {
  Container,
  TimeContainer,
  TimeIcon,
  TimeInfo,
  StatisWrapper,
  AlertIcon,
  StatusText,
  ButtonWrapper,
  AceptIcon,
  AceptText,
  Text,
  LoadIndicatorContainer,
  Header,
  InfoItem,
} from "./styles";
import { useNavigation } from "../../../context/use-navigation";
import { getTimeString } from "../../../utils/getTimeString";
import { LoadIndicator } from "../../LoadIndicator";
import {
  ElevatorIcon,
  Info,
  InfoIcon,
  MapIcon,
  WCIcon,
} from "../../BasicInfosGrid/styles";
import { useAsyncMemo } from "../../../hooks/useAsyncMemo";

interface RepairRequestModalProps {
  visible: boolean;
  onRequestClose: () => void;
  id: string;
}
const delay = async (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

export function RepairRequestModal({
  id,
  visible,
  onRequestClose,
}: RepairRequestModalProps) {
  const navigation = useNavigation();
  const { loading, result } = useAsyncMemo(
    async () => {
      return await getOccurenceData(id);
    },
    [id]
  );


  const data = result?.data;

  useEffect(() => {
    return onRequestClose
  }, []);
  
  async function handleAceptChamado() {
    console.log(data)
    const url = `http://miimo.a4rsolucoes.com.br/apis/registro/?API=${data?.mac}&VALOR=3`
    await axios.get(url);
    onRequestClose?.();
    navigation?.navigate("Chamado", { id, data });
  }

  return (
    <Modal
      isVisible={visible}
      onDismiss={onRequestClose}
      onBackdropPress={loading ? undefined : onRequestClose}
      style={
        loading
          ? undefined
          : {
              padding: 0,
              margin: 0,
              justifyContent: "flex-end",
            }
      }
    >
      {loading ? (
        <LoadIndicatorContainer>
          <LoadIndicator loading />
          <Text>Carregando...</Text>
        </LoadIndicatorContainer>
      ) : (
        <Container>
          <Header>
            <TimeContainer>
              <TimeIcon />
              <TimeInfo>{data && getTimeString(data.created_at)}</TimeInfo>
            </TimeContainer>
            <StatisWrapper type={data?.type}>
              <AlertIcon />
              <StatusText>{data && OccurrencesType[data.type]}</StatusText>
            </StatisWrapper>
          </Header>
          <InfoItem>
            <MapIcon />
            <Info>{data?.local}</Info>
          </InfoItem>
          <InfoItem>
            <ElevatorIcon />
            <Info>{data?.piso}</Info>
          </InfoItem>
          <InfoItem>
            <WCIcon />
            <Info>{data?.banheiro}</Info>
          </InfoItem>
          <InfoItem>
            <InfoIcon name="toilet" />
            <Info>{data?.box}</Info>
          </InfoItem>
          <ButtonWrapper>
            <Button bgColor="sucess" onPress={handleAceptChamado}>
              <AceptIcon />
              <AceptText>Aceitar</AceptText>
            </Button>
          </ButtonWrapper>
        </Container>
      )}
    </Modal>
  );
}
