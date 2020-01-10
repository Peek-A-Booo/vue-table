/*
* Vue-Table
* Author: liushuxiang19930729@gmial.com
* Github: https://github.com/Peek-A-Booo/vue-table
*/

import table from './Table'

const install = Vue => {
  Vue.component(table.name, table)
}

export {table}

export default install
