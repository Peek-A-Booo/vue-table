<template>
  <table class="vue-table__header">
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
          rowspan="1"
        >
          <div v-if="item.type==='select'" class="vue-table__selection">
            <label
              class="vue-table__checkbox-wrapper"
              :class="{'vue-table__checkbox-wrapper-checked': totalCheck}"
            >
              <span
                class="vue-table__checkbox"
                :class="{
                  'vue-table__checkbox-checked': totalCheck,
                  'vue-table__checkbox-indeterminate': indeterminate
                }"
              >
                <input class="vue-table__checkbox-input" type="checkbox" @change="totalChange" />
                <span class="vue-table__checkbox-inner" />
              </span>
            </label>
          </div>
          <template v-else>{{item.label}}</template>
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
    }
  },

  computed: {
    totalCheck() {
      if (!this.data || !this.data.length) return false;
      return (
        this.data.filter(item => item.vueTableSelectItem).length ===
        this.data.length
      );
    },
    
    indeterminate() {
      if (!this.data || !this.data.length) return false;
      let selectLen = this.data.filter(item => item.vueTableSelectItem).length;
      return selectLen < this.data.length && selectLen > 0;
    }
  },

  data() {
    return {};
  },

  methods: {
    totalChange() {
      let selected = this.data.filter(item => item.vueTableSelectItem).length;
      this.$parent.selectAll(selected === this.data.length);
    }
  }
};
</script>

<style scoped>
</style>
