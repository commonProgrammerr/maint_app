import React, { ReactNode } from "react";
import theme from "../../global/styles/theme";

import { Container } from "./styles";

interface ButtonProps {
  children: ReactNode;
  onPress?: () => void;
  bgColor: keyof typeof theme.colors;
  style?: any;
  disabled?: boolean;
}

function Button({ children, bgColor, onPress, style, disabled }: ButtonProps) {
  return (
    <Container
      bgColor={bgColor}
      onPress={disabled ? undefined : onPress}
      style={style}
      disabled={disabled}
    >
      {children as any}
    </Container>
  );
}

export default Button;
