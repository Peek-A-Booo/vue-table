<template>
  <div
      class="vue-table"
      :style="styles"
      :class="[
        wrapperClass,
        {
          'vue-table-scrollbar': showVerticalScrollBar,
          'vue-table-bordered': border,
          'vue-table-single-bottom': !this.height,
          'vue-table__no-data': !data || !data.length,
          'vue-table__no-data-min-height': !this.height,
        },
        'vue-table-' + tableSize,
      ]">
    <div class="vue-table__container" :class="{ 'vue-table__loading': loading }">
      <div
          class="vue-table__header-wrapper" ref="header"
          :style="headerStyle"
          @scroll="handleHeaderScroll">
        <table-header :colgroup="cols" :columns="calcColumns"/>
      </div>
      <div
          class="vue-table__body-wrapper" ref="body"
          :style="bodyStyle"
          @scroll="handleBodyScroll">
        <table-body :colgroup="cols" :columns="calcColumns" :data="data" ref="bodyTable">
          <template v-for="col in slotList" v-slot:[col.slot]="scope">
            <slot :row="scope.row" :name="col.slot"/>
          </template>
        </table-body>
        <div class="vue-table__placeholder" v-if="!data || !data.length">
          <p class="vue-table__empty-description">{{emptyText || 'No Data'}}</p>
        </div>
      </div>
    </div>
    <div class="vue-table__mask" v-if="loading">
      <div class="vue-table__mask-spin">
        <svg t="1578994306310" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="3833" width="40" height="40">
          <path
              d="M938.688 512A426.688 426.688 0 1 1 512 85.312a21.312 21.312 0 0 0 0-42.688A469.312 469.312 0 1 0 981.312 512a21.312 21.312 0 1 0-42.624 0z"
              p-id="3834" fill="#1890ff"></path>
        </svg>
      </div>
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

      border: {
        type: Boolean,
        default: false,
      },

      //是否展示index
      index: {
        type: Boolean,
        default: false,
      },

      size: {
        validator(value) {
          return ['default', 'small', 'mini'].includes(value)
        },
        default: 'default',
      },

      emptyText: String,

      loading: {
        type: Boolean,
        default: false,
      },
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

      tableSize() {
        return this.$SIZE || this.size
      },

      wrapperClass() {
        return [
          {
            hide: !this.ready
          }
        ]
      },

      styles() {
        let style = {}
        if (this.tableBodyHeight) {
          // console.log(this.tableBodyHeight, 'this.tableBodyHeight')
        }
        return style
      },

      headerStyle() {
        let style = {}
        if (this.showVerticalScrollBar) {
          style.overflow = 'scroll'
          style.marginBottom = '-15px'
          style.paddingBottom = 0
        }
        return style
      },

      bodyStyle() {
        let style = {}
        if (this.tableBodyHeight) {
          if (this.totalWidth > this.tableWidth) style.overflowX = 'scroll'
          if (this.height) {
            //因为配置了一个margin-bottom : -15px，所以要 -15
            let headerHeight = this.$refs.header.offsetHeight - (this.showVerticalScrollBar ? 15 : 0)
            let tableHeight = this.$refs.bodyTable.$el.offsetHeight
            style.height = this.$height(this.height, headerHeight)
            if ((tableHeight + headerHeight) > parseInt(this.height)) {
              this.showVerticalScrollBar = true
              style.overflowY = 'scroll'
            } else {
              this.showVerticalScrollBar = false
            }
          }
        } else {
          this.showVerticalScrollBar = false
        }
        return style
      },

      calcColumns() {
        let columns = JSON.parse(JSON.stringify(this.columns))
        if (this.index) columns.unshift({
          label: '#',
          width: 50,
          type: 'index',
          align: 'center'
        })
        return columns
      },
    },

    watch: {
      data: {
        handler() {
          this.handleResize()
        },
        deep: true,
      },

      calcColumns() {         //修改列数时重新计算
        this.handleResize()
      },
    },

    methods: {
      /**
       * 根据不同情况来设定table的width和height以及出现滚动条的情况
       * */
      handleResize() {
        //判断width
        let width = this.width || this.$el.offsetWidth
        let groups = JSON.parse(JSON.stringify(this.calcColumns))
        let totalWidth = 0
        let noSetWidthCount = 0
        groups.forEach(item => {
          if (item.width) {
            item.width = parseInt(item.width)
            totalWidth += item.width
          } else {
            noSetWidthCount++
          }
        })
        this.totalWidth = totalWidth
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
      // window.removeEventListener('resize', this.handleResize)
    }
  }
</script>

<style lang="scss">
  @import "./styles/index";

  .hide {
    opacity: 0;
  }
</style>
