import React from "react";
import {
  ChamadoType,
  useChamadosContext,
} from "../../context/chamados-context";

import CardChamado from "../CardChamado";

import { Container, Label, ListaDeChamados } from "./styles";

function CallsList() {
  const { chamadosAtivos } = useChamadosContext();
  return (
    <Container>
      <Label>Chamados</Label>
      <ListaDeChamados
        data={chamadosAtivos}
        renderItem={({ item }) => {
          const { id, ...data } = item as ChamadoType;
          return <CardChamado id={id} data={data} />;
        }}
        // keyExtractor={(item) => item?.id}
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
}

export default CallsList;
