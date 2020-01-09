<template>
  <table
      class="vue-table__body"
      :style="{
        width: width + 'px'
      }"
      cellspacing="0"
      cellpadding="0"
      border="0">
    <colgroup>
      <col v-for="item in colgroup" :width="item.width">
    </colgroup>
    <tbody>
    <tr class="vue-table__row" v-for="(row,rowIndex) in data" :key="rowIndex">
      <td rowspan="1" colspan="1" v-for="(col,colIndex) in columns" :key="colIndex">
        {{row[col.key]}}
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: "TableBody",

    props: {
      columns: {
        type: Array,
        default: function () {
          return []
        },
      },
      data: {
        type: Array,
        default: function () {
          return []
        }
      },
      colgroup: {
        type: Array,
        default: function () {
          return []
        },
      },
    },

    computed: {
      width() {
        let width = 0
        this.colgroup.forEach(item => {
          width += item.width
        })
        return width
      },
    },

    data() {
      return {}
    },

    methods: {
      $c(data) {
        return JSON.parse(JSON.stringify(data))
      },
    },

    mounted() {
      // console.log(this.$c(this.columns), 'columns')
      // console.log(this.$c(this.data), 'data')
    }
  }
</script>

<style scoped>

</style>
