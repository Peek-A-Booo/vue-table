<template>
  <div
    ref="table"
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
      ]"
  >
    <div class="vue-table__container" :class="{ 'vue-table__loading': loading }">
      <div
        ref="header"
        class="vue-table__header-wrapper"
        :style="headerStyle"
        @scroll="handleHeaderScroll"
      >
        <table-header :data="calcData" :colgroup="cols" :columns="calcColumns" />
      </div>
      <div
        ref="body"
        class="vue-table__body-wrapper"
        :style="bodyStyles"
        @scroll="handleBodyScroll"
      >
        <table-body
          ref="bodyTable"
          :colgroup="cols"
          :columns="calcColumns"
          :data="calcData"
          :row-class="rowClass"
        >
          <template v-for="(col,index) in slotList" v-slot:[col.slot]="scope">
            <slot :row="scope.row" :name="col.slot" />
          </template>
        </table-body>
        <div class="vue-table__placeholder" v-if="!calcData || !calcData.length">
          <p class="vue-table__empty-description">{{emptyText || ''}}</p>
        </div>
      </div>
    </div>
    <div class="vue-table__mask" v-if="loading">
      <div class="vue-table__mask-spin">
        <svg
          t="1578994306310"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3833"
          width="40"
          height="40"
        >
          <path
            d="M938.688 512A426.688 426.688 0 1 1 512 85.312a21.312 21.312 0 0 0 0-42.688A469.312 469.312 0 1 0 981.312 512a21.312 21.312 0 1 0-42.624 0z"
            p-id="3834"
            fill="#1890ff"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBody";
import mixins from "./util/mixins";

export default {
  name: "VueTable",

  mixins: [mixins],

  components: { TableHeader, TableBody },

  props: {
    columns: {
      type: Array,
      default: function() {
        return [];
      }
    },

    data: {
      type: Array,
      default: function() {
        return [];
      }
    },

    width: [String, Number],

    height: [String, Number],

    border: {
      type: Boolean,
      default: false
    },

    //是否展示index
    index: {
      type: Boolean,
      default: false
    },

    size: {
      validator(value) {
        return ["default", "small", "mini"].includes(value);
      },
      default: "default"
    },

    emptyText: String,

    loading: {
      type: Boolean,
      default: false
    },

    rowClass: {
      type: Function,
      default() {
        return "";
      }
    }
  },

  data() {
    return {
      ready: false,
      calcData: this.getData(),
      tableWidth: 0, //表格实际宽度
      totalWidth: 0, //表格元素实际占的宽度
      tableBodyHeight: 0, //表格实际高度
      showVerticalScrollBar: false, //是否会展示表格竖向滚动条
      scrollBarWidth: this.getScrollBarWidth(),
      clientWidth: null,
      cols: [],
      styles: {},
      bodyStyles: {},
      resizeTimeout: null
    };
  },

  computed: {
    slotList() {
      return JSON.parse(JSON.stringify(this.columns)).filter(item => item.slot);
    },

    tableSize() {
      return this.$SIZE || this.size;
    },

    wrapperClass() {
      return [
        {
          hide: !this.ready
        }
      ];
    },

    //判断是否要开启resize事件,在未设置高度或者设置定高时，则关闭resize事件提升页面效率
    autoResize() {
      let height = String(this.height);
      if (this.height && (height.includes("+") || height.includes("calc")))
        return true;
      return false;
    },

    headerStyle() {
      let style = {};
      if (this.showVerticalScrollBar) {
        style.overflow = "scroll";
        style.marginBottom = "-15px";
        style.paddingBottom = 0;
      }
      return style;
    },

    bodyStyle() {
      let style = {};
      if (this.tableBodyHeight) {
        if (this.totalWidth > this.tableWidth) style.overflowX = "scroll";
        if (this.height) {
          //分两种情况判断，正常配置的height或者是calc的height
          //头部高度,表格内容高度(两种情况都会用到此高度)
          let headerHeight =
            this.$refs.header.offsetHeight -
            (this.showVerticalScrollBar ? 15 : 0);
          if (!this.autoResize) {
            let tableHeight = this.$refs.bodyTable.$el.offsetHeight;
            style.height = parseInt(this.height) - headerHeight + "px";
            if (headerHeight + tableHeight > parseInt(this.height)) {
              this.showVerticalScrollBar = true;
              style.overflowY = "scroll";
            } else {
              this.showVerticalScrollBar = false;
            }
          } else {
            style.height = this.tableBodyHeight;
            this.$nextTick(_ => {
              let bodyHeight = this.$refs.body.offsetHeight;
              let tableHeight = this.$refs.bodyTable.$el.offsetHeight;
              if (tableHeight > bodyHeight) {
                this.showVerticalScrollBar = true;
                style.overflowY = "scroll";
              }
            });
          }
        }
      } else {
        this.showVerticalScrollBar = false;
      }
      return style;
    },

    calcColumns() {
      let columns = JSON.parse(JSON.stringify(this.columns));
      if (this.index)
        columns.unshift({
          label: "#",
          width: 50,
          type: "index",
          align: "center"
        });
      return columns;
    }
  },

  watch: {
    data: {
      handler() {
        this.calcData = this.getData();
        this.$nextTick(_ => {
          this.handleResize();
        });
      },
      deep: true
    },

    height() {
      this.handleResize();
    },

    calcColumns() {
      //修改列数时重新计算
      this.handleResize();
    },

    showVerticalScrollBar() {
      this.$nextTick(_ => {
        this.handleResize();
      });
    }
  },

  methods: {
    //转化数据
    getData() {
      let data = JSON.parse(JSON.stringify(this.data));
      if (this.columns.find(item => item.type === "select")) {
        data.forEach(item => (item.vueTableSelectItem = false));
      }
      return data;
    },

    /**
     * 根据不同情况来设定table的width和height以及出现滚动条的情况
     * */
    handleResize() {
      //判断width
      let width = this.width || this.$el.offsetWidth;
      let groups = JSON.parse(JSON.stringify(this.calcColumns));
      let totalWidth = 0;
      let noSetWidthCount = 0;
      groups.forEach(item => {
        if (item.width) {
          item.width = parseInt(item.width);
          totalWidth += item.width;
        } else {
          noSetWidthCount++;
        }
      });
      this.totalWidth = totalWidth;
      //暂时没处理无法设置最小宽度的问题
      if (noSetWidthCount) {
        if (width - totalWidth >= 80 * noSetWidthCount) {
          // groups.forEach(item => {
          //   if (!item.width) item.width = (width - totalWidth) / noSetWidthCount
          // })
        } else {
          // groups.forEach(item => {
          //   if (!item.width) item.width = 80
          // })
        }
      }
      this.tableWidth = width;
      this.cols = groups;
      if (!this.ready) {
        this.setStyles();
        this.$nextTick(_ => {
          this.setBodyStyle();
          this.ready = true;
        });
      } else {
        this.setBodyStyle();
      }
    },

    timeoutHandleResize() {
      if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(_ => {
        this.handleResize();
      }, 30);
    },

    setStyles() {
      let style = {};
      if (this.height) style.height = this.$h(this.height);
      this.styles = style;
    },

    setBodyStyle() {
      let style = {};
      if (this.totalWidth > this.tableWidth) style.overflowX = "scroll";
      if (this.height) {
        let totalHeight = this.$el.offsetHeight;
        let headerHeight =
          this.$refs.header.offsetHeight -
          (this.showVerticalScrollBar ? 15 : 0);
        let tableHeight = this.$refs.bodyTable.$el.offsetHeight;
        if (!this.autoResize) {
          style.height = parseInt(this.height) - headerHeight + "px";
          if (headerHeight + tableHeight > parseInt(this.height)) {
            this.showVerticalScrollBar = true;
            style.overflowY = "scroll";
          } else {
            this.showVerticalScrollBar = false;
          }
        } else {
          style.height = totalHeight - headerHeight + "px";
          if (tableHeight > totalHeight - headerHeight) {
            this.showVerticalScrollBar = true;
            style.overflowY = "scroll";
          } else {
            this.showVerticalScrollBar = false;
          }
        }
      } else {
        this.showVerticalScrollBar = false;
      }
      this.bodyStyles = style;
    },

    //处理table header和body滚动事件，同步滚动
    handleHeaderScroll() {
      let header = this.$refs.header;
      let body = this.$refs.body;
      body.scrollLeft = header.scrollLeft;
    },

    handleBodyScroll() {
      let header = this.$refs.header;
      let body = this.$refs.body;
      header.scrollLeft = body.scrollLeft;
    },

    selectSingle() {
      let selectList = JSON.parse(JSON.stringify(this.calcData)).filter(
        item => item.vueTableSelectItem
      );
      selectList.forEach(item => {
        delete item.vueTableSelectItem;
      });
      this.$emit("select-change", selectList);
    },

    selectAll(val) {
      this.calcData.forEach(item => (item.vueTableSelectItem = !val));
      this.$emit(
        "select-change",
        val ? [] : JSON.parse(JSON.stringify(this.data))
      );
      this.$emit(
        "select-all",
        val ? [] : JSON.parse(JSON.stringify(this.data))
      );
    },

    clearSelection() {
      this.calcData.forEach(item => {
        item.vueTableSelectItem = false;
      });
    }
  },

  mounted() {
    this.handleResize();
    //只有在需要resize的情况下，才开始监听事件，避免性能损耗
    if (this.autoResize) {
      window.addEventListener("resize", this.timeoutHandleResize);
    }
  },

  beforeDestroy() {
    if (this.autoResize)
      window.removeEventListener("resize", this.timeoutHandleResize);
  }
};
</script>

<style lang="scss">
@import "./styles/index";

.hide {
  opacity: 0;
}
</style>
