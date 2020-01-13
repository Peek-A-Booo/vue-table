<template>
  <div class="home" style="margin: 20px;">
    <vue-table :columns="columns" :data="list" border height="400">
      <template v-slot:color="scope">
        <button>{{scope.row.color}}</button>
      </template>
    </vue-table>
    <button @click="test">测试按钮</button>
  </div>
</template>

<script>

  export default {
    name: 'home',
    data() {
      return {
        columns: [
          {
            label: '姓名',
            key: 'name',
            width: 180,
          },
          {
            label: '年龄',
            key: 'age',
            width: 100
          },
          {
            label: '性别',
            key: 'gender',
            width: '131px',
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
        ],
      }
    },
    methods: {
      test() {
        this.list = JSON.parse(JSON.stringify(this.list)).slice(0, 3)
      },
    },
  }
</script>
