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
import { api } from "../../../services/api";

interface RepairRequestModalProps {
  visible: boolean;
  onRequestClose: () => void;
  id: string;
}
const delay = async (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

function getTagName(tag: OccurrencesType) {
  switch (tag) {
    case OccurrencesType.MAINT:
      return "Manuntenção";
    case OccurrencesType.SUPORT:
      return "Suporte";
    case OccurrencesType.REPARO:
      return "Reparo";
    default:
      return "Desconhecido";
  }
}

export function RepairRequestModal({
  id,
  visible,
  onRequestClose,
}: RepairRequestModalProps) {
  const navigation = useNavigation();
  const { loading, result, error } = useAsyncMemo(async () => {
    return await getOccurenceData(id);
  }, [id]);

  const data = result?.data;
  useEffect(() => error && console.log(error), [loading, error]);
  useEffect(() => {
    return onRequestClose;
  }, []);

  async function handleAceptChamado() {
    try {
      if (data?.type !== OccurrencesType.MAINT) {
        const url = `http://miimo.a4rsolucoes.com.br/apis/registro/?API=${data?.mac}&VALOR=3`;
        await axios.get(url);
      } else {
        api.post("/acept", {
          id,
          data,
        });
      }
      onRequestClose?.();
      navigation?.navigate("Chamado", { id, data });
    } catch (error) {
      alert("Não foi possivel prosseguir com a operação.");
    }
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
              <StatusText>{data ? getTagName(data.type) : "Error"}</StatusText>
            </StatisWrapper>
          </Header>
          <InfoItem>
            <ElevatorIcon />
            <Info>{data?.piso}</Info>
          </InfoItem>
          <InfoItem>
            <WCIcon />
            <Info>{data?.banheiro}</Info>
          </InfoItem>
          <InfoItem>
            <MapIcon />
            <Info>{data?.local}</Info>
          </InfoItem>
          {data?.type === OccurrencesType.MAINT || (
            <InfoItem>
              <InfoIcon name="toilet" />
              <Info>{data?.box}</Info>
            </InfoItem>
          )}
          <ButtonWrapper>
            <Button bgColor="sucess" onPress={handleAceptChamado}>
              <AceptIcon />
              <AceptText>{"Iniciar Manutenção"}</AceptText>
            </Button>
          </ButtonWrapper>
        </Container>
      )}
    </Modal>
  );
}
