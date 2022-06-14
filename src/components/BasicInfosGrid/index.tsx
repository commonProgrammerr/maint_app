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
        <GridItem>
          <ElevatorIcon />
          <Info>{piso}</Info>
        </GridItem>
        <GridItem>
          <WCIcon />
          <Info>{genero}</Info>
        </GridItem>
        <GridItem>
          <MapIcon />
          <Info>{local}</Info>
        </GridItem>
        {box && (
          <GridItem>
            <InfoIcon name="toilet" />
            <Info>{box}</Info>
          </GridItem>
        )}
      </GridCollumn>
    </Container>
  );
}

export default BasicInfosGrid;
