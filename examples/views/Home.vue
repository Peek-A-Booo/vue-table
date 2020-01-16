<template>
  <div class="home">
    <vue-table
        height="+400" border
        :loading="loading"
        :columns="columns"
        :data="list"
        :row-class="handleRow">
      <template v-slot:color="scope">
        <button class="button">
          <span>{{scope.row.color}}</span>
        </button>
      </template>
    </vue-table>
    <button @click="test">测试按钮2</button>
  </div>
</template>

<script>

  export default {
    name: 'home',
    data() {
      return {
        loading: false,
        columns: [
          {
            label: '姓名',
            key: 'name',
            tooltip: true,
          },
          {
            label: '年龄12阿撒发sd看剧',
            key: 'age',
            width: 100,
          },
          {
            label: '性别',
            key: 'gender',
            width: '131px',
            tooltip: true,
          },
          {
            label: '颜色',
            key: 'color',
            slot: 'color',
          },
        ],
        list: [
          {
            name: '2016-05-022016-05-022016-05-02',
            age: '王小虎',
            gender: '上海市普陀区金沙江路 1518 弄',
            color: '红色',
          },
          {
            name: '2016-06-03',
            age: '王小虎',
            gender: '上海市普陀区金沙江路 1518 弄',
            color: '绿色',
          },
          {
            name: '2016-07-04',
            age: '王小虎',
            gender: '上海市普陀区金沙江路 1518 弄',
            color: '黄色',
          },
          {
            name: '2016-05-022016-05-022016-05-02',
            age: '王小虎',
            gender: '上海市普陀区金沙江路 1518 弄',
            color: '红色',
          },
          {
            name: '2016-06-03',
            age: '王小虎',
            gender: '上海市普陀区金沙江路 1518 弄',
            color: '绿色',
          },
          {
            name: '2016-07-04',
            age: '王小虎',
            gender: '上海市普陀区金沙江路 1518 弄',
            color: '黄色',
          },
          {
            name: '2016-05-022016-05-022016-05-02',
            age: '王小虎',
            gender: '上海市普陀区金沙江路 1518 弄',
            color: '红色',
          },
          // {
          //   name: '2016-06-03',
          //   age: '王小虎',
          //   gender: '上海市普陀区金沙江路 1518 弄',
          //   color: '绿色',
          // },
          // {
          //   name: '2016-07-04',
          //   age: '王小虎',
          //   gender: '上海市普陀区金沙江路 1518 弄',
          //   color: '黄色',
          // },
          // {
          //   name: '2016-05-022016-05-022016-05-02',
          //   age: '王小虎',
          //   gender: '上海市普陀区金沙江路 1518 弄',
          //   color: '红色',
          // },
          // {
          //   name: '2016-06-03',
          //   age: '王小虎',
          //   gender: '上海市普陀区金沙江路 1518 弄',
          //   color: '绿色',
          // },
          // {
          //   name: '2016-07-04',
          //   age: '王小虎',
          //   gender: '上海市普陀区金沙江路 1518 弄',
          //   color: '黄色',
          // },
        ],
      }
    },
    methods: {
      test() {
        // this.loading = !this.loading
        this.list = JSON.parse(JSON.stringify(this.list)).slice(0, 3)
      },
      handleRow(row, index) {
        return ''
      },
    },
  }
</script>
<style>
  .vue-table__row.test_css {
      background: #409eff !important;
  }
</style>
<style scoped lang="scss">
  .button {
    padding: 7px 15px;
    font-size: 12px;
    border: 1px solid #409eff;
    background: #409eff;
    color: #ffffff;
    border-radius: 3px;
    outline: none;
    cursor: pointer;
  }


</style>
