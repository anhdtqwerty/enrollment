import Vue from 'vue'
import App from './App.vue'
import moment from 'moment'
import {inputRules} from '@/plugins/rule'
import PluginHelper from '@/helpers/PluginHelper'
import utils from '@/plugins/utils'
import dialog from '@/plugins/dialog'
import adminDialog from '@/plugins/dialog'
import alert from '@/plugins/alert'
import loading from '@/plugins/loading'
import VueHtmlToPaper from 'vue-html-to-paper'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import VueMask from 'v-mask'

const options = {
  name: '_blank',
  specs: ['fullscreen=yes', 'titlebar=no', 'scrollbars=no'],
  styles: ['@/modules/active-code/PrintActiveCode.css'],
}

Vue.use(VueMask)
Vue.use(
  PluginHelper.create({
    $utils: utils,
    $rules: inputRules,
    $dialog: dialog,
    $adminDialog: adminDialog,
    $alert: alert,
    $loading: loading,
    $baseUrl: process.env.VUE_APP_API_ENDPOINT,
    $moment: moment,
  })
)
Vue.use(VueHtmlToPaper, options)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
