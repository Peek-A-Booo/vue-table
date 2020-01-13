<template>
  <div
      class="vue-table"
      :class="wrapperClass">
    <div
        class="vue-table__header-wrapper" ref="header"
        :style="headerStyle"
        @scroll="handleHeaderScroll">
      <table-header :colgroup="cols" :columns="columns"/>
    </div>
    <div
        class="vue-table__body-wrapper" ref="body"
        :style="bodyStyle"
        @scroll="handleBodyScroll">
      <table-body :colgroup="cols" :columns="columns" :data="data" ref="bodyTable">
        <template v-for="col in slotList" v-slot:[col.slot]="scope">
          <slot :row="scope.row" :name="col.slot"/>
        </template>
      </table-body>
    </div>
  </div>
</template>

<script>

  import TableHeader from './components/TableHeader'
  import TableBody from './components/TableBody'
  import mixins from './util/mixins'
  import elementResizeDetectorMaker from 'element-resize-detector'

  export default {
    name: "VueTable",

    mixins: [mixins],

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
      height: [String, Number],
    },

    data() {
      return {
        ready: false,
        tableWidth: 0,                    //表格实际宽度
        totalWidth: 0,                    //表格元素实际占的宽度
        tableBodyHeight: 0,               //表格实际高度
        showVerticalScrollBar: false,     //是否会展示表格竖向滚动条
        scrollBarWidth: this.getScrollBarWidth(),
        clientWidth: null,
        cols: [],
      }
    },

    computed: {
      slotList() {
        return JSON.parse(JSON.stringify(this.columns)).filter(item => item.slot)
      },

      wrapperClass() {
        return [
          {
            hide: !this.ready
          }
        ]
      },

      headerStyle() {
        let style = {}
        style.overflow = 'scroll'
        style.marginBottom = '-15px'
        style.paddingBottom = 0
        return style
      },
      bodyStyle() {
        let style = {}
        if (this.tableBodyHeight) {
          console.log(this.totalWidth, 'this.totalWidth')
          console.log(this.tableWidth, 'this.tableWidth')
          if (this.totalWidth > this.tableWidth) style.overflowX = 'scroll'
          if (this.height) {
            let headerHeight = this.$refs.header.offsetHeight
            if ((this.tableBodyHeight - headerHeight) > this.height) {
              this.showVerticalScrollBar = true
              style.maxHeight = this.$height(this.height)
              style.overflowY = 'scroll'
            }
          }
        } else {
          this.showVerticalScrollBar = false
        }
        return style
      },
    },

    watch: {
      data: {
        handler(n) {
          console.log(n, 'new')
        },
        deep: true,
      },
    },

    methods: {
      /**
       * 根据不同情况来设定table的width和height以及出现滚动条的情况
       * */
      handleResize() {
        //判断width
        let width = this.width || this.$el.offsetWidth
        let groups = JSON.parse(JSON.stringify(this.columns))

        let totalWidth = 0
        let noSetWidthCount = 0
        groups.forEach(item => {
          if (item.width) {
            item.width = parseFloat(item.width)
            totalWidth += item.width
          } else {
            noSetWidthCount++
          }
        })
        //暂时没处理无法设置最小宽度的问题
        if (noSetWidthCount) {
          if ((width - totalWidth) >= 80 * noSetWidthCount) {
            // groups.forEach(item => {
            //   if (!item.width) item.width = (width - totalWidth) / noSetWidthCount
            // })
          } else {
            // groups.forEach(item => {
            //   if (!item.width) item.width = 80
            // })
          }
        }
        this.totalWidth = 0
        groups.forEach(item => {
          this.totalWidth += item.width
        })
        this.tableWidth = width
        this.cols = groups
        this.$nextTick(_ => {
          this.tableBodyHeight = this.$refs.body.offsetHeight
        })
      },

      //处理table header和body滚动事件，同步滚动
      handleHeaderScroll() {
        let header = this.$refs.header
        let body = this.$refs.body
        body.scrollLeft = header.scrollLeft
      },
      handleBodyScroll() {
        let header = this.$refs.header
        let body = this.$refs.body
        header.scrollLeft = body.scrollLeft
      },
    },

    mounted() {
      this.handleResize()
      this.$nextTick(() => this.ready = true)
      // window.addEventListener('resize', this.handleResize)


      // this.observer = elementResizeDetectorMaker();
      // this.observer.listenTo(this.$el, this.handleResize);
    }
    ,
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)
    }
  }
</script>

<style lang="scss">
  @import "./styles/index";

  .hide {
    opacity: 0;
  }
</style>
