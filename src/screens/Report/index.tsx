import React from "react";

import { ReportScreenProps } from "../../routes/types";
import { Dropdown } from "../../components/Form/Dropdow";
import {
  BackButton,
  ButtonsText,
  ButtonsWrapper,
  Container,
  Form,
  SendButton,
} from "./styles";
import { Header, Title } from "../../components/Header";
import { StatusBar } from "expo-status-bar";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { getToolsList } from "../../utils/getToolsList";
import { Checkbox } from "../../components/Form/CheckBox";
import { ScrollView } from "react-native";
import { api } from "../../services/api";

interface FormData {
  tools: string;
  problem: string;
}

const schema = Yup.object().shape({
  tools: Yup.string().required(
    "Defina a ferramenta utilizada para solução do problema"
  ),
  type: Yup.string().required("Defina o problema apresentado"),
});

export function ReportScreen({ route, navigation }: ReportScreenProps) {
  const ferramentas = getToolsList();
  const { user } = useAuth();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleSendReport(form: FormData) {
    try {
      const report = {
        ...form,
        date: new Date().toISOString(),
        id: route.params.id,
        usr_id: user.id,
      };
  
      await api.post('/events/close', report)
      navigation.popToTop()
      
    } catch(error) {
      console.log(error)
      alert('Não foi possivel enviar o relátorio...')
    }
  }

  return (
    <Container>
      <StatusBar style="light" />
      <Header bg="sucess">
        <Title>Relátorio</Title>
      </Header>
      <ScrollView style={{ flex: 1 }}>
        <Form>
          <Checkbox
            control={control}
            name="type"
            label="Qual o problema apresentado?"
            outros
            errors={errors}
            options={[
              "Entupimento",
              "Entupimento com transbordamento",
              "Vazamento de água",
            ]}
          />
          <Dropdown
            control={control}
            name="tools"
            placeholder="Ferramenta utilizada"
            error={errors}
            data={ferramentas.map((tool) => ({
              label: tool.name,
              value: tool.name,
            }))}
          />
          <ButtonsWrapper>
            <SendButton onPress={handleSubmit(handleSendReport)}>
              <ButtonsText>Enviar!</ButtonsText>
            </SendButton>
            <BackButton onPress={navigation.goBack}>
              <ButtonsText>Voltar</ButtonsText>
            </BackButton>
          </ButtonsWrapper>
        </Form>
      </ScrollView>
    </Container>
  );
}
