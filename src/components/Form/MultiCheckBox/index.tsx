import React from "react";
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
import genId from "../../../utils/genID";

interface Props extends Omit<CheckboxProps, "onValueChange"> {
  control: Control;
  name: string;
  options: string[];
  label?: string;
  errors?: {
    [key: string]: any;
  };
  onValueChange?: (value: string) => void;
}

export function MultiCheckbox({
  label,
  control,
  name,
  options,
  errors,
  ...rest
}: Props) {
  const {
    colors: { primary, text },
  } = useTheme();

  return (
    <Container>
      {label && <Label>{label}</Label>}
      {errors?.[name] && <Error>{errors[name].message}</Error>}
      <Controller
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <View style={{ paddingBottom: 12 }}>
            {options.map((op) => (
              <OptionsWrapper key={genId()}>
                <CheckBox
                  {...rest}
                  color={!!value?.includes(op) ? primary : text}
                  value={!!value?.includes(op)}
                  onValueChange={(_value) => {
                    const newValue = _value ? 
                      [...value, op] : value?.filter(v => v !== op) ?? []
                    rest.onValueChange?.(newValue);
                    onChange(newValue);
                  }}
                />
                <Text>{String(op)}</Text>
              </OptionsWrapper>
            ))}
          </View>
        )}
        name={name}
      />
    </Container>
  );
}
