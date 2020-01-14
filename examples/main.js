import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Table from '../src'

Vue.use(Table, {size: 'mini'})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
