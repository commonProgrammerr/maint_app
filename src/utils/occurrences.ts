import { api, FeedItem, SearchDTO } from "../services/api";

export enum OccurrencesType {
  REPARO = 1,
  SUPORT = 2,
  FINALIZADO = 0,
  MAINT = 3,
}

export function OccurrencesType2String(data: FeedItem) {
  switch (data.type) {
    case OccurrencesType.REPARO:
      return "Entupimento";
    case OccurrencesType.SUPORT:
      return data.request_by ? `${data.request_by} está solicitando apoio` : "Pedido de apoio";
    case OccurrencesType.FINALIZADO:
      return "Fechado";
    case OccurrencesType.MAINT:
      return "Manutenção";
    default:
      return "???????";
  }
}

export function getOccurenceData(id: number) {
  return api.post<SearchDTO>("/events/search/", {
    id,
  });
}
