import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import BasicInfosGrid from "../../components/BasicInfosGrid";
import { SuportRequestModal } from "../../components/modals/SuportRequest";
import { useChamadosContext } from "../../context/chamados-context";
import { ChamadosTypes } from "../../context/chamados-context/types";
import { ChamdoScreenProps } from "../../routes/types";

import {
  AlertIcon,
  ButtonsText,
  ButtonsWrapper,
  Container,
  DetailsWrapper,
  EndButton,
  Header,
  LocalDescription,
  PlaceImage,
  ReportButton,
  Title,
} from "./styles";

export function ChamadoScreen({ route, navigation }: ChamdoScreenProps) {
  const image_url =
    "https://www.melhoresdestinos.com.br/wp-content/uploads/2020/09/aeroporto-curitiba-banheiros.jpg";

  const { id } = route.params;
  const { getChamadoData } = useChamadosContext();
  const [dados, setDados] = useState(() => getChamadoData(id));
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleGetTitle(type?: ChamadosTypes) {
    switch (type) {
      case ChamadosTypes.ENTUPIMENTO:
        return "Entupimento";

      case ChamadosTypes.AJUDA:
        return "Requisição de Ajuda";

      default:
        return "??????????";
    }
  }

  return (
    <Container>
      <StatusBar style="light" />
      <Header type={dados?.type}>
        <AlertIcon />
        <Title>{handleGetTitle(dados?.type)}</Title>
      </Header>
      <DetailsWrapper>
        {image_url && <PlaceImage source={{ uri: image_url }} />}
        <BasicInfosGrid
          box={dados!.box}
          piso={dados!.piso}
          local={dados!.local}
          genero={dados!.genero}
        />
        {dados?.description && (
          <LocalDescription>{dados.description}</LocalDescription>
        )}
      </DetailsWrapper>
      <ButtonsWrapper>
        <EndButton onPress={() => navigation.navigate("Report", { id })}>
          <ButtonsText>Finalizar Chamado</ButtonsText>
        </EndButton>
        <ReportButton onPress={() => setIsModalOpen(true)}>
          <ButtonsText>Solicitar Apio</ButtonsText>
        </ReportButton>
      </ButtonsWrapper>
      <SuportRequestModal
        id={id}
        visible={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
    </Container>
  );
}
