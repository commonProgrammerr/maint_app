import React, { useEffect, useState } from "react";
import { FeedItem } from "../../services/api";
import { OccurrencesType } from "../../utils/occurrences";

import {
  Container,
  Content,
  DescriptionContainer,
  Footer,
  FloorIcon,
  SubDescription,
  ClockIcon,
} from "./styles";

interface CardChamadoProps {
  data?: FeedItem;
  onPress?: () => void;
}

function CardChamado({ data, onPress }: CardChamadoProps) {
  const time = !!data?.time
    ? new Date(data.time).toLocaleTimeString().slice(0, 5)
    : "agora";

  const isReparo = data?.type === OccurrencesType.REPARO;
  const [showText, setShowText] = useState(!isReparo);

  useEffect(() => {
    if (isReparo) {
      const interval = setInterval(() => {
        setShowText((showText) => !showText);
      }, 360);
      return () => clearInterval(interval);
    }
  }, [showText]);

  return (
    <Container onPress={onPress}>
      <Content type={data?.type}>{showText && data?.local}</Content>
      <Footer>
        <DescriptionContainer>
          <ClockIcon type={data?.type} />
          <SubDescription type={data?.type}>{time}</SubDescription>
        </DescriptionContainer>
        <DescriptionContainer>
          <FloorIcon />
          <SubDescription>{data?.piso}</SubDescription>
        </DescriptionContainer>
      </Footer>
    </Container>
  );
}

export default CardChamado;
