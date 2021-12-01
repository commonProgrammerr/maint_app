import React from "react";
import Modal from "react-native-modal";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "../../Button";

import { ButtonText, Container, FormContainer, Textarea } from "./styles";
import { useForm } from "react-hook-form";
import { MultiCheckbox } from "../../Form/MultiCheckBox";

interface CallRequestProps {
  visible: boolean;
  onRequestClose: () => void;
  id: string;
}

interface FormData {
  apoio: string[];
  description: string;
}

const schema = Yup.object().shape({
  apoio: Yup.array(Yup.string()),
  description: Yup.string()
    .required("A descrião é obrigátoria")
    .min(6, "Descrição muito curta"),
});

export function SuportRequestModal({
  id,
  visible,
  onRequestClose,
}: CallRequestProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleSendHelpRequst(data: FormData) {
    console.log(data);
    onRequestClose?.();
  }

  return (
    <Modal
      isVisible={visible}
      style={{
        padding: 0,
        margin: 0,
        justifyContent: "flex-end",
      }}
      onBackButtonPress={onRequestClose}
      onDismiss={onRequestClose}
      onBackdropPress={onRequestClose}
    >
      <Container>
        <FormContainer>
          <MultiCheckbox
            control={control}
            name="apoio"
            label="Qual o tipo de apoio?"
            errors={errors}
            options={[
              "Equipamento",
              "Interdição do sanitário",
              "Equipe de apoio",
            ]}
          />
          <Textarea
            control={control}
            error={errors}
            name="description"
            placeholder="Descreva brevemente o que você precisa"
          />
        </FormContainer>
        <Button
          bgColor="secondary"
          onPress={handleSubmit(handleSendHelpRequst)}
        >
          <ButtonText>Solicitar suporte</ButtonText>
        </Button>
      </Container>
    </Modal>
  );
}
