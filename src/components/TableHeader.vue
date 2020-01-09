<template>
  <table
      class="vue-table__header"
      :style="{
        width: width + 'px',
      }"
      cellspacing="0"
      cellpadding="0"
      border="0">
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
        // width: 'auto',
      }
    },
    methods: {},
    created() {
      // console.log(JSON.parse(JSON.stringify(this.colgroup)), 'group')
    },
    mounted() {

      // console.log(this.$refs.table_header.clientWidth, '当前宽度')
      // console.log(this.$parent.$el.clientWidth, '父组件宽度')

      // this.width = parseFloat(window.getComputedStyle(this.$refs.table_header).width)
    }
  }
</script>

<style scoped>

</style>
