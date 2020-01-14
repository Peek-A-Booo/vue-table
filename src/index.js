/*
* Vue-Table
* Author: liushuxiang19930729@gmial.com
* Github: https://github.com/Peek-A-Booo/vue-table
*/

import table from './Table'

const install = (Vue, config) => {
  if (config) {
    if (config.size && ['default', 'small', 'mini'].includes(config.size)) {
      Vue.prototype.$SIZE = config.size
    }
  }
  Vue.component(table.name, table)
}

export {table}

export default install
