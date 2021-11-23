import React, { ReactNode } from 'react';
import theme from '../../global/styles/theme';



import { Container } from './styles';

interface ButtonProps {
  children: ReactNode;
  onPress?: () => void
  bgColor: keyof typeof theme.colors
}

function Button({ children, bgColor, onPress }: ButtonProps) {
  return (
    <Container bgColor={bgColor} onPress={onPress} >
      {children}
    </Container>
  );
};

export default Button;
