import { lighten } from 'polished'

export default {
  colors: {
    primary: "#353536",

    secondary: '#ff872C',
    secondary_light: lighten(0.3, '#ff872C'),

    sucess: '#12A454',
    sucess_light: lighten(0.5, '#12A454'),

    attention: '#E83F5B',
    attention_light: lighten(0.5, '#E83F5B'),

    shape: '#fff',
    text: '#969cb2',
    title: '#363f5f',
    background: '#F0F2F5',
    transparent: '#0000'
  },

  fonts: {
    regular: 'Poppins_400Regular',
    medium: 'Poppins_500Medium',
    bold: 'Poppins_700Bold',
  }
}