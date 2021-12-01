import React from "react";
import { useChamadosContext } from "../../context/chamados-context";
import { ChamadoType } from "../../context/chamados-context/types";

import CardChamado from "../CardChamado";

import { Container, Label, ListaDeChamados } from "./styles";

interface CallsListProps {
  handleOpenModal: (id: string) => void;
}

function CallsList({ handleOpenModal }: CallsListProps) {
  const { chamadosAtivos } = useChamadosContext();

  return (
    <Container>
      <Label>Chamados</Label>
      <ListaDeChamados
        data={chamadosAtivos}
        renderItem={({ item }) => {
          const { id, ...data } = item as ChamadoType;
          return (
            <CardChamado data={data} onPress={() => handleOpenModal(id)} />
          );
        }}
        keyExtractor={(item) => item?.id}
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
}

export default CallsList;
