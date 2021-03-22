import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    icons: {
      font: true,
      icons: 'md',
    },
    themes: {
      light: {
        primary: '#0084FF',
        secondary: '#424242',
        accent: '#0D327F',
        error: '#FF1D30',
        info: '#3E3E3C',
        success: '#4BCA81',
        warning: '#FFC107',
        title: '#797979',
        admin: '#0D47A1',
        'dark-gray': '#D2D3DB',
      },
    },
  },
})
