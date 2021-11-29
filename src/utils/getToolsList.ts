const tools = [
  { name: 'Bomba de vauco', id: 'bf10c73c' },
  { name: 'Pressurizador de água', id: 'ca3a3706' },
  { name: 'Mangueira desentupidora', id: 'd27f30ec' }
]

export function getTool(id:string) {
  return tools.find(tool => tool.id === id)
}

export function getToolsList(url?: string) {

  return tools
}