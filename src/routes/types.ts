import { SearchDTO } from "./../services/api";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Feed?: { payload?: any };
  Chamado: { id: string; data: SearchDTO; payload?: any };
  Report: { id: string; data: SearchDTO; payload?: any };
};

export type FeedScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Feed"
>;
export type ChamdoScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Chamado"
>;
export type ReportScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Report"
>;
