export enum ChamadosTypes {
  ENTUPIMENTO,
  AJUDA,
  FINALIZADO
}

export interface ChamadoType {
  id: string;
  piso: string;
  local: string;
  box: number;
  time: string;
  image_url?: string;
  description?: string;
  genero: string
  type: ChamadosTypes
}


