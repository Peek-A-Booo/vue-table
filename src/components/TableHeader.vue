<template>
  <table class="vue-table__header">
    <colgroup>
      <template v-for="item in colgroup">
        <col v-if="item.width" :style="{
          width: item.width + 'px',
          minWidth: item.width + 'px',
        }">
        <col v-else style="min-width: 80px">
      </template>
    </colgroup>
    <thead>
    <tr>
      <th
          v-for="(item, index) in columns"
          :key="index"
          :class="[
            'col' + index,
            {
              'vue-table__header-align-center': item.align === 'center',
              'vue-table__header-align-right': item.align === 'right',
              'vue-table__selection-column': item.type === 'select',
            },
          ]"
          colspan="1"
          rowspan="1">
        <div v-if="item.type==='select'" class="vue-table__selection">
          <label
              class="vue-table__checkbox-wrapper"
              :class="{'vue-table__checkbox-wrapper-checked': totalCheck}">
            <span
                class="vue-table__checkbox"
                :class="{'vue-table__checkbox-checked': totalCheck}">
              <input class="vue-table__checkbox-input" v-model="totalCheck" type="checkbox">
              <span class="vue-table__checkbox-inner"/>
            </span>
          </label>
        </div>
        <template v-else>
          {{item.label}}
        </template>
      </th>
    </tr>
    </thead>
  </table>
</template>

<script>
  export default {
    name: "TableHeader",

    props: {
      columns: {
        type: Array,
        default: function () {
          return []
        },
      },

      colgroup: {
        type: Array,
        default: function () {
          return []
        },
      },
    },

    data() {
      return {
        totalCheck: false,
      }
    },

    methods: {},

    created() {

    },
    mounted() {

    }
  }
</script>

<style scoped>

</style>
