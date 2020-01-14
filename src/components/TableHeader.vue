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
            },
          ]"
          colspan="1"
          rowspan="1">
        {{item.label}}
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
      return {}
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
