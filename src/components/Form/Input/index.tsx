import React from "react";
import { TextInputProps } from "react-native";
import { Control, Controller } from "react-hook-form";

import { Input, Error, Container } from "./styles";

interface Props extends TextInputProps {
  control: Control;
  name: string;
  error?: {
    [key: string]: Error;
  };
}

export function InputForm({ control, name, error, ...rest }: Props) {
  return (
    <Container>
      {error?.[name] && <Error>{error[name]?.message}</Error>}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
        name={name}
      />
    </Container>
  );
}
