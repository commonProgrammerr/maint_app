import React from "react";
import { Control, Controller } from "react-hook-form";
import { DropdownProps } from "react-native-element-dropdown/src/Dropdown/type";

import { DropDown, Error, Container } from "./styles";

interface Props
  extends Omit<
    DropdownProps,
    "labelField" | "valueField" | "onChange" | "data"
  > {
  control: Control;
  name: string;
  error: {
    [key: string]: any
  };
  onChange?: (intem: any) => void;
  data: ItemType[];
}

type ItemType = { label: string; value: string };

export function Dropdown({ control, name, error, ...rest }: Props) {
  const handleChage = (change: (...args: any[]) => void) => (item: any) => {
    rest.onChange?.(item);
    item?.value && change(item.value);
  };
  return (
    <Container>
      {error?.[name] && <Error>{error[name].message}</Error>}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <DropDown
            {...rest}
            labelField="label"
            valueField="value"
            value={value}
            onChange={handleChage(onChange)}
          />
        )}
        name={name}
      />
    </Container>
  );
}
