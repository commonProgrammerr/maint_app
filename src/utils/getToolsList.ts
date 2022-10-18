import axios from "axios"

const tools = [
  { name: 'Bomba de vauco', id: 'bf10c73c' },
  { name: 'Pressurizador de água', id: 'ca3a3706' },
  { name: 'Mangueira desentupidora', id: 'd27f30ec' }
]

export function getTool(id: string) {
  return tools.find(tool => tool.id === id)
}

export async function getToolsList(url = "http://miimo.a4rsolucoes.com.br/apis/tools/") {
  const tools = await axios.post(url, {})
  return tools.data
}