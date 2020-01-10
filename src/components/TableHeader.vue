<template>
  <table
      class="vue-table__header"
      :style="{
        width: width + 'px',
      }">
    <colgroup>
      <col v-for="item in colgroup" :width="item.width">
    </colgroup>
    <thead>
    <tr>
      <th :class="'col'+index" colspan="1" rowspan="1" v-for="(item,index) in columns" :key="index">
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
    //默认锁死宽度80
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
      return {

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
