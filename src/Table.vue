<template>
  <div
      ref="table"
      class="vue-table"
      :style="{
        width: width || 'auto',
      }">
    <div class="vue-table__header-wrapper">
      <table-header :colgroup="cols" :columns="columns"/>
    </div>
    <div class="vue-table__body-wrapper">
      <table-body :colgroup="cols" :columns="columns" :data="data">
        <template v-for="(col,index) in slotList" v-slot:[col.slot]="scope">
          <slot :row="scope.row" :name="col.slot"/>
        </template>
      </table-body>
    </div>
  </div>
</template>

<script>

  import TableHeader from './components/TableHeader'
  import TableBody from './components/TableBody'

  export default {
    name: "VueTable",

    components: {TableHeader, TableBody},

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
      width: [String, Number],
    },

    computed: {
      cols() {
        let width = this.width || this.clientWidth
        if (!width) return []
        let groups = JSON.parse(JSON.stringify(this.columns))
        let totalWidth = 0, noSetWidthCount = 0
        groups.forEach(item => {
          if (item.width) {
            item.width = parseFloat(item.width)
            totalWidth += item.width
          } else {
            noSetWidthCount++
          }
        })
        if (noSetWidthCount) {
          if ((width - totalWidth) >= 80 * noSetWidthCount) {
            groups.forEach(item => {
              if (!item.width) item.width = (width - totalWidth) / noSetWidthCount
            })
          } else {
            groups.forEach(item => {
              if (!item.width) item.width = 80
            })
          }
        }
        return groups
      },
      slotList() {
        return JSON.parse(JSON.stringify(this.columns)).filter(item => item.slot)
      },
    },

    data() {
      return {
        test: 0,
        clientWidth: null,
        name: 'color',
      }
    },

    created() {
      // console.log(JSON.parse(JSON.stringify(this.columns)), 'columns')
      // console.log(JSON.parse(JSON.stringify(this.data)), 'data')
    },

    methods: {
      setClientWidth() {
        this.clientWidth = this.$refs.table.clientWidth
      },
    },

    mounted() {
      this.setClientWidth()
      window.addEventListener('resize', this.setClientWidth)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.setClientWidth)
    }
  }
</script>

<style lang="scss">
  @import "./styles/index";
</style>
