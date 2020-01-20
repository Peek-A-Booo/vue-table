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
    <tr
        v-for="(row, rowIndex) in data"
        :key="rowIndex"
        class="vue-table__row"
        :class="[
          rowClass(row, rowIndex),
          {
            'vue-table__body__row-selected': row.vueTableSelectItem,
          },
        ]">
      <td
          v-for="(col,colIndex) in columns"
          :key="colIndex"
          :class="[
            'col' + colIndex,
            {
              'vue-table__body__row-align-center': col.align === 'center',
              'vue-table__body__row-align-right': col.align === 'right',
              'vue-table__body__row-tooltip': col.tooltip,
              'vue-table__selection-column': col.type === 'select',
            },
          ]"
          rowspan="1"
          colspan="1">
        <template v-if="col.slot">
          <slot :row="row" :name="col.slot"/>
        </template>
        <template v-else-if="col.type=== 'select'">
          <div class="vue-table__selection">
            <label
                class="vue-table__checkbox-wrapper"
                :class="{'vue-table__checkbox-wrapper-checked': row.vueTableSelectItem}">
            <span
                class="vue-table__checkbox"
                :class="{'vue-table__checkbox-checked': row.vueTableSelectItem}">
              <input
                  class="vue-table__checkbox-input"
                  type="checkbox"
                  v-model="row.vueTableSelectItem"
                  @change="handleSelect(row, rowIndex)">
              <span class="vue-table__checkbox-inner"/>
            </span>
            </label>
          </div>
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

      rowClass: {
        type: Function,
        default() {
          return ''
        },
      },
    },

    data() {
      return {}
    },

    methods: {
      handleSelect(row, index) {
        this.$parent.selectSingle(JSON.parse(JSON.stringify(row)), index)
      },
    },

  }
</script>

<style scoped>

</style>
