export enum OccurrencesType {
  REPARO = 1,
  SUPORT = 2,
  FINALIZADO = 0
}


export function OccurrencesType2String(type: OccurrencesType) {
  switch (type) {
    case OccurrencesType.REPARO:
      return "Entupimento";
    case OccurrencesType.SUPORT:
      return "Pedido de apoio";
    case OccurrencesType.FINALIZADO:
      return "Fechado";
    default:
      return "???????";
  }
}