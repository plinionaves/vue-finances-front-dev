import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import pt from 'vuetify/es5/locale/pt'
import colors from 'vuetify/es5/util/colors'
import 'vuetify/src/stylus/app.styl'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify, {
  iconfont: 'md',
  lang: {
    locales: { pt },
    current: 'pt'
  },
  theme: {
    primary: colors.teal.darken1,
    accent: colors.indigo.darken1,
    info: colors.blue,
    error: colors.pink.darken2,
    success: colors.teal.lighten1,
    warning: colors.purple.darken1
  }
})
