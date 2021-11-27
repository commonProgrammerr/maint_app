import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = {
  Feed: undefined;
  Chamado: { id: string };
  Report: { id: string };
  Help: { id: string };
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
export type HelpScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Help"
>;