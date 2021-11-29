import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { CheckboxProps } from "expo-checkbox";

import {
  Error,
  CheckBox,
  Text,
  Container,
  OptionsWrapper,
  Label,
} from "./styles";
import { View } from "react-native";
import { useTheme } from "styled-components/native";
import { TextArea } from "../TextArea";

interface Props extends Omit<CheckboxProps, "onValueChange"> {
  control: Control;
  name: string;
  options: string[];
  label?: string;
  outros?: boolean;
  errors?: {
    [key: string]: any;
  };
  onValueChange?: (value: string) => void;
}

type OnChangeControlerType = (...args: any[]) => void;

export function Checkbox({
  label,
  control,
  name,
  options,
  outros,
  errors,
  ...rest
}: Props) {
  const {
    colors: { primary, text },
  } = useTheme();

  const [wasOutrosCheck, setWasOutrosCheck] = useState(false);

  return (
    <Container>
      {label && <Label>{label}</Label>}
      {errors?.[name] && <Error>{errors[name].message}</Error>}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={{ paddingBottom: 12 }}>
            {options.map((op) => (
              <OptionsWrapper key={op}>
                <CheckBox
                  {...rest}
                  key={`${op}-check`}
                  color={op === value ? primary : text}
                  value={op === value}
                  onValueChange={(_value) => {
                    rest.onValueChange?.(op);
                    onChange(op);
                    outros && setWasOutrosCheck(false);
                  }}
                />
                <Text key={`${op}-text`}>{String(op)}</Text>
              </OptionsWrapper>
            ))}
            {outros && (
              <OptionsWrapper>
                <CheckBox
                  {...rest}
                  color={"outros" === value ? primary : text}
                  value={"outros" === value}
                  onValueChange={(_value) => {
                    rest.onValueChange?.("outros");
                    onChange("outros");
                    setWasOutrosCheck(true);
                  }}
                />
                <Text>Outros</Text>
              </OptionsWrapper>
            )}
          </View>
        )}
        name={name}
      />
      {wasOutrosCheck && <TextArea control={control} name={`${name}_obs`} />}
    </Container>
  );
}
