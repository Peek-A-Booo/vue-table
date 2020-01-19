import Vue from 'vue'
import App from './App.vue'
import router from './router'
import  Ele from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import Table from '../src'

Vue.use(Table,{size:'mini'})
Vue.use(Ele)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
