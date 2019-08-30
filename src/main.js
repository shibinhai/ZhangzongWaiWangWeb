import Vue from 'vue'
import App from './App'
import {router} from './router'
import filters from './utils/filters'

import './common.scss'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Http from './utils/http'
import 'font-awesome/css/font-awesome.min.css'
import axios from 'axios'

Vue.prototype.axios = axios
Vue.use(Http)
Vue.use(iView)
Vue.config.productionTip = false
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
