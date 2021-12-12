import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { InputForm } from "../../components/Form/Input";
import { useAuth } from "../../context/AuthContext";

import {
  ButtonContainer,
  ButtonTetx,
  Container,
  LoginIcon,
  SubmitButton,
  Title,
} from "./styles";

const schema = object().shape({
  login: string()
    .required("Insira seu login para prosseguir"),
  password: string()
    .min(4, "Senha muito curta")
    .required("Insira sua senha para prosseguir"),
});

export function AuthScreen() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { login } = useAuth();

  return (
    <Container>
      <Title>Login</Title>
      <InputForm
        style={{ marginBottom: 24 }}
        name="login"
        control={control}
        error={errors}
        placeholder="login"
      />
      <InputForm
        name="password"
        secureTextEntry
        control={control}
        error={errors}
        placeholder="Senha"
      />
      <ButtonContainer onPress={handleSubmit(login)}>
        <SubmitButton>
          <ButtonTetx>Entrar</ButtonTetx>
          <LoginIcon />
        </SubmitButton>
      </ButtonContainer>
    </Container>
  );
}
