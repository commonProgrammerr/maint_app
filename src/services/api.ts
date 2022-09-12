import axios from 'axios'
import { OccurrencesType } from '../utils/occurrences'


// export const SOCKET_BASE_URL = 'http://192.168.230.117:3030'
export const SOCKET_BASE_URL = 'http://192.168.15.31:3030'
// export const SOCKET_BASE_URL = 'https://socketio-teste.herokuapp.com'
export const REST_BASE_URL = SOCKET_BASE_URL
// export const REST_BASE_URL = 'http://miimo.a4rsolucoes.com.br/apis'

export const api = axios.create({
  baseURL: REST_BASE_URL
})

export type FeedItem = {
  id: number
  type: OccurrencesType
  local: string
  piso: string
  time?: string | Date
  request_by?: string
}

export type UserAuthDTO = {
  usr_id: string,
  usr_ph?: string,
  usr_name: string,
  usr_grupo: string,
  usr_status?: string,
  usr_empresa: string
}


export type FeedDTO = {
  page?: number
  feed: FeedItem[]
}

export type SearchDTO = {
  id: string
  img_url?: string
  type: OccurrencesType
  created_at: string
  local: string
  piso: string
  mac: string
  box: string
  banheiro?: string
  description?: string
  payload?: string
  requestBy?: {
    nome: string
  }
}