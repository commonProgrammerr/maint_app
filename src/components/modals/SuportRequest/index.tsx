import React from "react";
import Modal from "react-native-modal";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "../../Button";

import { ButtonText, Container, FormContainer, Textarea } from "./styles";
import { useForm } from "react-hook-form";
import { MultiCheckbox } from "../../Form/MultiCheckBox";
import { api, SearchDTO } from "../../../services/api";
import { OccurrencesType } from "../../../context/chamados-context/types";
import { useAuth } from "../../../context/AuthContext";

interface CallRequestProps {
  visible: boolean;
  onRequestClose: () => void;
  id: string;
  data?: SearchDTO;
}

interface FormData {
  apoio: string[];
  description: string;
}

const schema = Yup.object().shape({
  apoio: Yup.array().min(1, "Escolha ao menos uma opção"),
  description: Yup.string()
    .required("A descrião é obrigátoria")
    .min(6, "Descrição muito curta"),
});

export function SuportRequestModal({
  id,
  visible,
  onRequestClose,
  data,
}: CallRequestProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    user: { grupe_id }
  } = useAuth();
  
  async function handleSendHelpRequst(sumbtData: FormData) {
    console.log(sumbtData);
    const new_description = `(${sumbtData?.apoio?.reduce(
      (p, c) => `${p}, ${c}`
    )}):\n${sumbtData.description}`;
    console.log(new_description);
    await api.post("/events/new", {
      zone_id: grupe_id,
      img_url: data?.img_url,
      type: OccurrencesType.SUPORT,
      description: new_description,
      banheiro: data?.banheiro,
      box: data?.box,
      piso: data?.piso,
      local: data?.local,
    });
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
