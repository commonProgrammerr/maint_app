import React, { ReactNode } from 'react';
import theme from '../../global/styles/theme';



import { Container } from './styles';

interface ButtonProps {
  children: ReactNode;
  onPress?: () => void
  bgColor: keyof typeof theme.colors
  style?: any
}

function Button({ children, bgColor, onPress, style }: ButtonProps) {
  return (
    <Container bgColor={bgColor} onPress={onPress} style={style} >
      {children}
    </Container>
  );
};

export default Button;
