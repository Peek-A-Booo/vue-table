<template>
  <table class="vue-table__body">
    <colgroup>
      <template v-for="item in colgroup">
        <col v-if="item.width" :style="{
          width: item.width + 'px',
          minWidth: item.width + 'px',
        }">
        <col v-else style="min-width: 80px">
      </template>
    </colgroup>
    <tbody>
    <tr class="vue-table__row" v-for="(row,rowIndex) in data" :key="rowIndex">
      <td
          v-for="(col,colIndex) in columns"
          :key="colIndex"
          :class="[
            'col' + colIndex,
            {
              'vue-table__body__row-align-center': col.align === 'center',
              'vue-table__body__row-align-right': col.align === 'right',
              'vue-table__body__row-tooltip': col.tooltip
            },
          ]"
          rowspan="1"
          colspan="1">
        <template v-if="col.slot">
          <slot :row="row" :name="col.slot">{{row[col.key]}}</slot>
        </template>
        <template v-else>
          {{col.type === 'index' ? (rowIndex + 1) : row[col.key]}}
        </template>
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

    computed: {},

    data() {
      return {}
    },

    methods: {},

    mounted() {

    }

  }
</script>

<style scoped>

</style>
