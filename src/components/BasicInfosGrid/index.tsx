import React from "react";

import {
  Container,
  ElevatorIcon,
  GridCollumn,
  GridItem,
  Info,
  InfoIcon,
  MapIcon,
  WCIcon,
} from "./styles";

interface BasicInfosGridProps {
  local?: string;
  genero?: string;
  piso?: string;
  box?: number | string | boolean;
}

function BasicInfosGrid({ local, genero, piso, box }: BasicInfosGridProps) {
  return (
    <Container>
      <GridCollumn>
        {piso ? (
          <GridItem>
            <ElevatorIcon />
            <Info>{piso}</Info>
          </GridItem>
        ) : null}
        {genero ? (
          <GridItem>
            <WCIcon />
            <Info>{genero}</Info>
          </GridItem>
        ) : null}
        {local ? (
          <GridItem>
            <MapIcon />
            <Info>{local}</Info>
          </GridItem>
        ) : null}
        {box ? (
          <GridItem>
            <InfoIcon name="toilet" />
            <Info>{box}</Info>
          </GridItem>
        ) : null}
      </GridCollumn>
    </Container>
  );
}

export default BasicInfosGrid;
