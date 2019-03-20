import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import pt from 'vuetify/es5/locale/pt'
import 'vuetify/src/stylus/app.styl'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify, {
  iconfont: 'md',
  lang: {
    locales: { pt },
    current: 'pt'
  }
})
