<template>
  <table class="vue-table__body" ref="tableBody">
    <colgroup>
      <template v-for="(item,index) in colgroup">
        <col
          v-if="item.width"
          :key="index"
          :style="{
          width: item.width + 'px',
          minWidth: item.width + 'px',
        }"
        />
        <col v-else :key="index" style="min-width: 80px" />
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
        ]"
      >
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
          colspan="1"
          @mouseenter="e=>handleEnter(e, row)"
          @mouseleave="e=>handleLeave(e, row)"
        >
          <template v-if="col.slot">
            <slot :row="row" :name="col.slot" />
          </template>
          <template v-else-if="col.type=== 'select'">
            <div class="vue-table__selection">
              <label
                class="vue-table__checkbox-wrapper"
                :class="{'vue-table__checkbox-wrapper-checked': row.vueTableSelectItem}"
              >
                <span
                  class="vue-table__checkbox"
                  :class="{'vue-table__checkbox-checked': row.vueTableSelectItem}"
                >
                  <input
                    class="vue-table__checkbox-input"
                    type="checkbox"
                    v-model="row.vueTableSelectItem"
                    @change="handleSelect(row, rowIndex)"
                  />
                  <span class="vue-table__checkbox-inner" />
                </span>
              </label>
            </div>
          </template>
          <template v-else>{{col.type === 'index' ? (rowIndex + 1) : row[col.key]}}</template>
        </td>
      </tr>
    </tbody>
    <div
      class="vue-table__tooltip_show"
      @mouseenter="handleTooltipEnter"
      @mouseleave="handleTooltipLeave"
      :style="styles"
    >{{tooltip}}
      <div class="vue-table__tooltip_popper"></div>
    </div>
  </table>
</template>

<script>
export default {
  name: "TableBody",

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

    colgroup: {
      type: Array,
      default: function() {
        return [];
      }
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
      //tooltip使用变量
      initX: "",
      initY: "",
      styles: {
        left: 0,
        top: 0,
        display: "none"
      },
      tooltip: "",
      tooltipTimeout: null
    };
  },

  mounted() {
    let table = this.$refs.tableBody.getBoundingClientRect();
    this.initX = table.x;
    this.initY = table.y;
  },

  methods: {
    handleSelect(row, index) {
      this.$parent.selectSingle(JSON.parse(JSON.stringify(row)), index);
    },

    //处理
    handleEnter(e, row) {
      if (e.target.className.includes("vue-table__body__row-tooltip")) {
        let styles = e.target.getBoundingClientRect();
        let scrollWidth = e.target.scrollWidth;
        let computedStyle = window.getComputedStyle(e.target);
        //+20是因为padding总宽度为20px
        let trueWidth = parseFloat(computedStyle.width) + 20;
        if (scrollWidth > trueWidth) {
          if (this.tooltipTimeout) {
            clearTimeout(this.tooltipTimeout);
            this.tooltipTimeout = null;
          }
          this.styles.left = styles.x - this.initX + "px";
          this.styles.top = styles.y - this.initY - 45 + "px";
          this.tooltip = e.target.innerHTML;
          this.styles.display = "block";
        }
      }
    },

    handleLeave(e, row) {
      this.tooltipTimeout = setTimeout(_ => {
        this.styles.display = "none";
      }, 100);
    },

    handleTooltipEnter() {
      if (this.tooltipTimeout) {
        clearTimeout(this.tooltipTimeout);
        this.tooltipTimeout = null;
      }
      this.styles.display = "display";
    },

    handleTooltipLeave() {
      this.styles.display = "none";
    }
  }
};
</script>

<style scoped>
</style>
