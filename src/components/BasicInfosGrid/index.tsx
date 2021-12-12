import React from "react";

import { Container, ElevatorIcon, GridCollumn, GridItem, Info, InfoIcon, MapIcon, WCIcon } from "./styles";

interface BasicInfosGridProps {
  local?: string;
  genero?: string;
  piso?: string;
  box?: number;
}

function BasicInfosGrid({ local, genero, piso, box }: BasicInfosGridProps) {
  return (
    <Container>
      <GridCollumn>
        <GridItem>
          <MapIcon />
          <Info>{local}</Info>
        </GridItem>
        <GridItem>
          <WCIcon />
          <Info>{genero}</Info>
        </GridItem>
      </GridCollumn>
      <GridCollumn>
        <GridItem>
          <ElevatorIcon />
          <Info>{piso}</Info>
        </GridItem>
        <GridItem>
          <InfoIcon name="toilet" />
          <Info>Box {box}</Info>
        </GridItem>
      </GridCollumn>
    </Container>
  );
}

export default BasicInfosGrid;
