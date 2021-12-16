import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import BasicInfosGrid from "../../components/BasicInfosGrid";
import { SuportRequestModal } from "../../components/modals/SuportRequest";
import { OccurrencesType } from "../../utils/occurrences";
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

function handleGetTitle(type?: OccurrencesType) {
  switch (type) {
    case OccurrencesType.REPARO:
      return "Reparo";

    case OccurrencesType.SUPORT:
      return "Suporte";

    default:
      return "??????????";
  }
}

export function ChamadoScreen({ route, navigation }: ChamdoScreenProps) {
  const image_url =
    "https://www.melhoresdestinos.com.br/wp-content/uploads/2020/09/aeroporto-curitiba-banheiros.jpg";

  const { id, data } = route.params;

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Container>
      <StatusBar style="light" />
      <Header type={data?.type}>
        <AlertIcon />
        <Title>{handleGetTitle(data?.type)}</Title>
      </Header>
      <DetailsWrapper>
        {image_url && <PlaceImage source={{ uri: image_url }} />}
        <BasicInfosGrid
          box={data?.box}
          piso={data?.piso}
          local={data?.local}
          genero={data?.banheiro}
        />
        {data?.description && (
          <LocalDescription>{data?.description}</LocalDescription>
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
        data={data}
        onRequestClose={() => setIsModalOpen(false)}
      />
    </Container>
  );
}
