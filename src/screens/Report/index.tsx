import { Feather } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import * as Yup from "yup";
import { Checkbox } from "../../components/Form/CheckBox";
import { Dropdown } from "../../components/Form/Dropdow";
import { Header, Title } from "../../components/Header";
import { useAuth } from "../../context/AuthContext";
import { ReportScreenProps } from "../../routes/types";
import { api } from "../../services/api";
import { getToolsList } from "../../utils/getToolsList";
import { OccurrencesType } from "../../utils/occurrences";
import {
  BackButton,
  ButtonsText,
  ButtonsWrapper,
  Container,
  Form,
  PhontoButton,
  Scroll,
  SendButton,
} from "./styles";

interface FormData {
  tools: string;
  problem: string;
}

const confirm_fields = [
  {
    name: "papel",
    label: "Reposição de papel",
  },
  {
    name: "toalhas",
    label: "Reposição da toalha",
  },
  {
    name: "sabao",
    label: "Reposição do sabão",
  },
  {
    name: "sanitario",
    label: "Limpeza dos sanitarios",
  },
  {
    name: "mictorio",
    label: "Limpeza dos mictórios",
  },
  {
    name: "lavador",
    label: "Limpeza dos lavadores",
  },
  {
    name: "espelhos",
    label: "Limpeza dos espelhos",
  },
  {
    name: "chao",
    label: "Limpeza do chão",
  },
  {
    name: "lixo",
    label: "Retirada do lixo",
  },
];

export function ReportScreen({ route, navigation }: ReportScreenProps) {
  const ferramentas = getToolsList();
  const { user } = useAuth();
  const { id, data } = route.params;
  const isMaintContext = data.type === OccurrencesType.MAINT;

  const schema = Yup.object().shape({
    tools: isMaintContext
      ? Yup.string()
      : Yup.string().required(
          "Defina a ferramenta utilizada para solução do problema"
        ),
    type: Yup.string().required("Defina o problema apresentado"),
    ...(isMaintContext
      ? confirm_fields.reduce((p, c) => {
          p[c.name] = Yup.string().required(`Faltou aqui!`);
          return p;
        }, {} as Record<string, any>)
      : {}),
  });

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
        id,
        usr_id: user.id,
        zone_id: user.grupe_id,
      };
      console.log(report);

      await api.post("/events/close", report);
      navigation.popToTop();
    } catch (error) {
      console.log(error);
      alert("Não foi possivel enviar o relátorio...");
    }
  }

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
  };

  const takePicture = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);
  };

  return (
    <Container>
      <StatusBar style="light" />
      <Header bg="sucess">
        <Title>Relátorio</Title>
      </Header>
      <Form>
        <Scroll style={{ flex: 1 }}>
          <Checkbox
            control={control}
            style={{
              marginTop: 12,
            }}
            name="type"
            label={
              isMaintContext ? "Atividade" : "Qual o problema apresentado?"
            }
            errors={errors}
            outros={!isMaintContext}
            defaultValue={isMaintContext ? "Manutenção preventiva" : undefined}
            options={
              isMaintContext
                ? ["Manutenção preventiva"]
                : [
                    "Entupimento",
                    "Entupimento com transbordamento",
                    "Vazamento de água",
                  ]
            }
          />
          {!isMaintContext && (
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
          )}
          {!isMaintContext && (
            <Title style={{ marginBottom: 20, marginTop: 100 }} color="title">
              Outras Atividades
            </Title>
          )}
          {confirm_fields.map((fld) => (
            <Checkbox
              key={fld.name}
              control={control}
              errors={errors}
              {...fld}
              options={["Realizada", "Não realizada"]}
            />
          ))}
        </Scroll>
      </Form>
      <ButtonsWrapper>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginBottom: 16,
          }}
        >
          <PhontoButton onPress={takePicture}>
            <Feather size={RFValue(18)} color="white" name="camera" />
          </PhontoButton>
          <PhontoButton onPress={pickImage}>
            <Feather size={RFValue(18)} color="white" name="folder-plus" />
          </PhontoButton>
        </View>
        <SendButton onPress={handleSubmit(handleSendReport)}>
          <ButtonsText>Enviar!</ButtonsText>
        </SendButton>
        <BackButton onPress={navigation.goBack}>
          <ButtonsText>Voltar</ButtonsText>
        </BackButton>
      </ButtonsWrapper>
    </Container>
  );
}
