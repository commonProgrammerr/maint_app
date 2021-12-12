import React from "react";
import { FeedItem  } from "../../services/api";

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
  data?: FeedItem
  onPress?: () => void
}

function CardChamado({
  data,
  onPress,
}: CardChamadoProps) {

  return (
    <Container onPress={onPress}>
      <Content type={data?.type}>
        {data?.local}
      </Content>
      <Footer>
        <DescriptionContainer>
          <Icon />
          <SubDescription>{data?.piso}</SubDescription>
        </DescriptionContainer>
      </Footer>
    </Container>
  );
}

export default CardChamado;
