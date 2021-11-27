import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";

import { useChamadosContext } from '../../../context/chamados-context';
import {
  ChamadosTypes,
  ChamadoType,
} from "../../../context/chamados-context/types";
import BasicInfosGrid from "../../BasicInfosGrid";
import Button from "../../Button";

import {
  Container,
  TimeWrapper,
  TimeIcon,
  TimeInfo,
  StatisWrapper,
  AlertIcon,
  StatusText,
  AceptDeclineWrapperr,
  AceptIcon,
  AceptText,
  DeclineIcon,
} from "./styles";
import { useNavigation } from "../../../context/use-navigation";

interface CallRequestProps {
  visible: boolean;
  onRequestClose: () => void;
  id: string;
}

function CallRequest({ id, visible, onRequestClose }: CallRequestProps) {
  const { getChamadoData } = useChamadosContext();
  const [chamadoData, setChamadoData] = useState<ChamadoType | undefined>(
    undefined
  );

  const navigation = useNavigation();

  useEffect(() => {
    setChamadoData(getChamadoData(id));
  });

  useEffect(() => onRequestClose, [])

  function handleAceptChamado() {
    onRequestClose?.();
    navigation?.navigate('Chamado', { id });
  }

  return (
    <Modal
      isVisible={visible}
      style={{
        padding: 0,
        margin: 0,
        justifyContent: "flex-end",
      }}
    >
      <Container>
        <TimeWrapper>
          <TimeIcon />
          <TimeInfo>{chamadoData?.time}</TimeInfo>
        </TimeWrapper>
        <StatisWrapper type={chamadoData?.type}>
          <AlertIcon />
          <StatusText>
            {chamadoData && ChamadosTypes[chamadoData.type]}
          </StatusText>
        </StatisWrapper>
        <BasicInfosGrid
          box={chamadoData?.box}
          genero={chamadoData?.genero}
          local={chamadoData?.local}
          piso={chamadoData?.piso}
        />
        <AceptDeclineWrapperr>
          <Button bgColor="sucess" onPress={handleAceptChamado}>
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

export default CallRequest;
