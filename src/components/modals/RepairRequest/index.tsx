import React, { useEffect, useState } from "react";
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
  BuildingLocale,
  ElevatorIcon,
  Info,
  InfoIcon,
  MapIcon,
  UserIcon,
  WCIcon,
} from "../../BasicInfosGrid/styles";
import { useAsyncMemo } from "../../../hooks/useAsyncMemo";
import { api, MAINT_URL } from "../../../services/api";
import { useAuthUser } from "../../../context/AuthContext";
interface RepairRequestModalProps {
  visible: boolean;
  onRequestClose: () => void;
  id: number;
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
  const [now, updateCurrentTime] = useState(new Date());
  const { loading, result, error } = useAsyncMemo(async () => {
    return await getOccurenceData(id);
  }, [id]);

  const user = useAuthUser();
  const data = result?.data;
  useEffect(() => error && console.log(error), [loading, error]);
  useEffect(() => {
    return onRequestClose;
  }, []);

  useEffect(() => {
    if (data && visible) {
      const dif = Math.abs(now.getTime() - new Date(data.created_at).getTime());
      const timeout = dif / (60 * 60 * 1000) > 1 ? 60000 : 1000;
      const timer = setTimeout(() => {
        updateCurrentTime(new Date());
      }, timeout);
      return () => clearInterval(timer);
    }
  }, [now, visible, data]);

  async function handleAceptChamado() {
    try {
      await api.post("acept", {
        id,
        user_id: user.id,
      });

      onRequestClose?.();
      navigation?.navigate("Chamado", { id, data });
    } catch (error) {
      console.error(error);
      alert("Não foi possivel prosseguir com a operação.");
    }
  }
  console.log(data);

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
              <TimeInfo>
                {data &&
                  getTimeString(data.data_agendamento ?? data.created_at, now)}
              </TimeInfo>
            </TimeContainer>
            <StatisWrapper type={data?.type}>
              <AlertIcon />
              <StatusText>{data ? getTagName(data.type) : "Error"}</StatusText>
            </StatisWrapper>
          </Header>
          {data?.requestBy && (
            <InfoItem>
              <UserIcon />
              <Info>{data?.requestBy?.nome}</Info>
            </InfoItem>
          )}
          <InfoItem>
            <BuildingLocale />
            <Info>Aeroporto Internacional dos Guararapes</Info>
          </InfoItem>
          {data?.piso && (
            <InfoItem>
              <ElevatorIcon />
              <Info>{data?.piso}</Info>
            </InfoItem>
          )}
          {data?.banheiro && (
            <InfoItem>
              <WCIcon />
              <Info>{data?.banheiro}</Info>
            </InfoItem>
          )}
          {data?.local && (
            <InfoItem>
              <MapIcon />
              <Info>{data?.local}</Info>
            </InfoItem>
          )}
          {data?.box && data?.type !== OccurrencesType.MAINT && (
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
