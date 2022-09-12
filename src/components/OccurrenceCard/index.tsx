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
  Alert,
} from "./styles";

interface CardChamadoProps {
  data?: FeedItem;
  onPress?: () => void;
}

function CardChamado({ data, onPress }: CardChamadoProps) {
  const time = data?.time && new Date(data.time as any);
  const time_str = time ? `${time.getHours()}:${time.getMinutes()}` : "URGENTE";

  const isAlert = !data?.time;
  const [showText, setShowText] = useState(!isAlert);

  useEffect(() => {
    if (isAlert) {
      const interval = setInterval(() => {
        setShowText((showText) => !showText);
      }, 360);
      return () => clearInterval(interval);
    }
  }, [showText]);
  return (
    <Container onPress={onPress}>
      <Content type={data?.type}>{data?.local}</Content>
      <Footer>
        <DescriptionContainer
          style={{
            opacity: showText ? 1 : 0,
            alignItems: isAlert ? "baseline" : "center",
          }}
        >
          {isAlert ? <Alert /> : <ClockIcon />}
          <SubDescription alert={isAlert}>{time_str}</SubDescription>
        </DescriptionContainer>
        <DescriptionContainer style={{ justifyContent: "flex-end" }}>
          <FloorIcon />
          <SubDescription numberOfLines={1}>
            {data?.piso.replace(/\s|\n/g, " ")}
          </SubDescription>
        </DescriptionContainer>
      </Footer>
    </Container>
  );
}

export default CardChamado;
