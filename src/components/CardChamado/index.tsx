import React from "react";
import { useChamadosContext } from "../../context/chamados-context";

import {
  Container,
  Content,
  DescriptionContainer,
  Footer,
  Header,
  Icon,
  SubDescription,
} from "./styles";

interface CardChamadoProps {
  id: string;
  data: {
    piso: string;
    local: string;
    box: number;
    time: string;
  };
}

function CardChamado({
  id,
  data,
}: CardChamadoProps) {
  const { openChamadoModal } = useChamadosContext();

  return (
    <Container onPress={() => openChamadoModal(id)}>
      <Header>Piso {data.piso} </Header>
      <Content>{data.local}</Content>
      <Footer>
        <DescriptionContainer>
          <Icon name="toilet" />
          <SubDescription>Box {data.box}</SubDescription>
        </DescriptionContainer>
        <DescriptionContainer>
          <Icon name="clock" />
          <SubDescription>{data.time}</SubDescription>
        </DescriptionContainer>
      </Footer>
    </Container>
  );
}

export default CardChamado;
