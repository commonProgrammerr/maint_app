import { SearchDTO } from './../services/api'
import { NativeStackScreenProps } from '@react-navigation/native-stack'


export type RootStackParamList = {
  Feed: undefined;
  Chamado: { id: string, data: SearchDTO };
  Report: { id: string };
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