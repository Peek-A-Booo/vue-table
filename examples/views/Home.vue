<template>
  <div class="home">
    <vue-table :columns="columns" :data="list">

    </vue-table>
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
            width: 280
          },
          {
            label: '年龄',
            key: 'age',
          },
          {
            label: '性别',
            key: 'gender',
            width: '431px'
          },
          {
            label: '颜色',
            key: 'color',
            width: '532px'
          },
        ],
        list: [
          {
            name: '2016-05-02',
            age: '王小虎',
            gender: '上海市普陀区金沙江路 1518 弄',
            color: '红色',
          },
          {
            name: '2016-05-02',
            age: '王小虎',
            gender: '上海市普陀区金沙江路 1518 弄',
            color: '绿色',
          },
          {
            name: '2016-05-02',
            age: '王小虎',
            gender: '上海市普陀区金沙江路 1518 弄',
            color: '黄色',
          }
        ],
      }
    },
  }
</script>
