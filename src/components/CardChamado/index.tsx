import React from "react";
import { useChamadosContext } from "../../context/chamados-context";
import { ChamadosTypes } from "../../context/chamados-context/types";

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
  data: {
    type: ChamadosTypes
    piso: string;
    local: string;
    box: number;
    time: string;
  };
  onPress?: () => void
}

function CardChamado({
  data,
  onPress,
}: CardChamadoProps) {

  return (
    <Container onPress={onPress}>
      <Header>Piso {data.piso} </Header>
      <Content chamadoType={data.type}>
        {data.local}
      </Content>
      <Footer>
        <DescriptionContainer>
          <Icon name="toilet" />
          <SubDescription>Box {data.box}</SubDescription>
        </DescriptionContainer>
      </Footer>
    </Container>
  );
}

export default CardChamado;
