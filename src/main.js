import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import { errorHandler } from '@/utils'
import '@/plugins/moment'
import '@/plugins/vuelidate'
import '@/plugins/vuetify'

Vue.config.productionTip = false
Vue.config.errorHandler = errorHandler

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
