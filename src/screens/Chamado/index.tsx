import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import BasicInfosGrid from "../../components/BasicInfosGrid";
import { SuportRequestModal } from "../../components/modals/SuportRequest";
import { OccurrencesType } from "../../utils/occurrences";
import { ChamdoScreenProps } from "../../routes/types";
import { BarCodeScanner, PermissionStatus } from "expo-barcode-scanner";
// import { Button, StyleSheet } from "react-native";
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
// import Scanner from "../../components/Scanner";

function handleGetTitle(type?: OccurrencesType) {
  switch (type) {
    case OccurrencesType.REPARO:
      return "Reparo";

    case OccurrencesType.SUPORT:
      return "Suporte";

    case OccurrencesType.MAINT:
      return "Manuntenção";

    default:
      return "??????????";
  }
}

export function ChamadoScreen({ route, navigation }: ChamdoScreenProps) {
  const { id, data } = route.params;
  const image_url = data.img_url;
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [hasPermission, setHasPermission] = useState<boolean>();
  // const [scanned, setScanned] = useState(false);
  // const isMaintContext = data.type === OccurrencesType.MAINT;
  // useEffect(() => {
  //   (async () => {
  //     const { status } = await BarCodeScanner.requestPermissionsAsync();
  //     setHasPermission(status === PermissionStatus.GRANTED);
  //   })();
  // }, []);

  return (
    <>
      <Container>
        <StatusBar style="light" />
        <Header type={data?.type}>
          <AlertIcon />
          <Title>{handleGetTitle(data?.type)}</Title>
        </Header>
        <DetailsWrapper>
          {image_url && <PlaceImage source={{ uri: image_url }} />}
          <BasicInfosGrid
            box={data?.type !== OccurrencesType.MAINT ? data?.box : undefined}
            piso={data?.piso}
            local={data?.local}
            genero={data?.banheiro}
          />
          {data?.description ? (
            <LocalDescription>{String(data?.description)}</LocalDescription>
          ) : null}
        </DetailsWrapper>
        <ButtonsWrapper>
          <EndButton
            onPress={() => navigation.navigate("Report", { id, data })}
            // disabled={isMaintContext}
          >
            <ButtonsText>Finalizar Chamado</ButtonsText>
          </EndButton>
          <ReportButton onPress={() => setIsModalOpen(true)}>
            <ButtonsText>Solicitar Apoio</ButtonsText>
          </ReportButton>
        </ButtonsWrapper>

        <SuportRequestModal
          id={id}
          visible={isModalOpen}
          data={data}
          onRequestClose={() => setIsModalOpen(false)}
        />
      </Container>
      {/* <Scanner>
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      </Scanner> */}
    </>
  );
}
