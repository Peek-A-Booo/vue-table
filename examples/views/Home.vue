<template>
  <div class="home">
    <el-button size="mini">124</el-button>
    <input type="checkbox" disabled v-model="asd">
    <el-card>
      <vue-table
          height="+665"
          border
          :loading="loading"
          :columns="columns"
          :data="list">
      </vue-table>
    </el-card>
    <button @click="test">测试按钮2</button>
  </div>
</template>

<script>

  export default {
    name: 'home',
    data() {
      return {
        asd: false,
        loading: false,
        columns: [
          {
            type: 'select',
            width: 60,
          },
          {
            key: 'id',
            label: 'id',
            align: 'center',
          },
          {
            key: 'name',
            label: 'name',
            align: 'center',
          },
          {
            label: 'status',
            slot: 'statusShow',
            align: 'center',
          },
          {
            key: 'language',
            label: '语言',
            align: 'center',
          },
          {
            key: 'status',
            label: '状态',
            slot: 'status',
            align: 'center',
          },
          {
            label: '修改状态',
            width: 100,
            slot: 'statusSure',
            align: 'center',
          },
          {
            key: 'open_time',
            label: '开服时间',
            slot: 'open_time',
            width: 150,
            align: 'center',
          },
          {
            label: '修改开服时间',
            slot: 'timeSure',
            width: 110,
            align: 'center',
          },
          {
            key: 'weight',
            label: '权值',
            slot: 'weight',
            width: 120,
            align: 'center',
          },
          {
            label: '修改权值',
            slot: 'weightSure',
            width: 80,
            align: 'center',
          },
        ],
        list: [],
      }
    },
    mounted() {
      // setTimeout(_ => {
      this.list = [
        {
          "weight": 0,
          "status": 0,
          "open_time": 1568764800,
          "node": "dr2_logic1@10.0.0.10",
          "name": "S1",
          "language": "chinese",
          "id": 1,
          "open_time_copy": 1568764800000,
          "status_copy": 0
        },
        {
          "weight": 0,
          "status": 2,
          "open_time": 1574294400,
          "node": "dr2_logic2@10.0.0.10",
          "name": "S2",
          "language": "chinese",
          "id": 2,
          "open_time_copy": 1574294400000,
          "status_copy": 2
        },
        {
          "weight": 0,
          "status": 0,
          "open_time": 1501545600,
          "node": "dr2_logic3@10.0.10.108",
          "name": "S3",
          "language": "chinese",
          "id": 3,
          "open_time_copy": 1501545600000,
          "status_copy": 0
        },
        {
          "weight": 0,
          "status": 0,
          "open_time": 1501545600,
          "node": "dr2_logic4@10.0.8.5",
          "name": "S4",
          "language": "chinese",
          "id": 4,
          "open_time_copy": 1501545600000,
          "status_copy": 0
        },
        {
          "weight": 0,
          "status": 0,
          "open_time": 1545696000,
          "node": "dr2_logic5@10.0.8.4",
          "name": "S5",
          "language": "chinese",
          "id": 5,
          "open_time_copy": 1545696000000,
          "status_copy": 0
        },
        {
          "weight": 0,
          "status": 0,
          "open_time": 1568764800,
          "node": "dr2_logic6@10.0.0.10",
          "name": "S6",
          "language": "chinese",
          "id": 6,
          "open_time_copy": 1568764800000,
          "status_copy": 0
        },
        {
          "weight": 0,
          "status": 0,
          "open_time": 1545955200,
          "node": "dr2_logic7@10.0.0.10",
          "name": "S7",
          "language": "chinese",
          "id": 7,
          "open_time_copy": 1545955200000,
          "status_copy": 0
        },
        {
          "weight": 0,
          "status": 0,
          "open_time": 1501545600,
          "node": "dr2_logic9@10.0.0.10",
          "name": "S9",
          "language": "chinese",
          "id": 9,
          "open_time_copy": 1501545600000,
          "status_copy": 0
        },
        // {
        //   "weight": 0,
        //   "status": 0,
        //   "open_time": 1543276800,
        //   "node": "dr2_logic10@10.0.0.10",
        //   "name": "S10",
        //   "language": "chinese",
        //   "id": 10,
        //   "open_time_copy": 1543276800000,
        //   "status_copy": 0
        // },
        // {
        //   "weight": 0,
        //   "status": 0,
        //   "open_time": 1555891200,
        //   "node": "dr2_logic11@10.0.0.10",
        //   "name": "S11",
        //   "language": "chinese",
        //   "id": 11,
        //   "open_time_copy": 1555891200000,
        //   "status_copy": 0
        // },
        // {
        //   "weight": 0,
        //   "status": 0,
        //   "open_time": 1555891200,
        //   "node": "dr2_logic12@10.0.10.203",
        //   "name": "S12",
        //   "language": "chinese",
        //   "id": 12,
        //   "open_time_copy": 1555891200000,
        //   "status_copy": 0
        // },
        // {
        //   "weight": 0,
        //   "status": 0,
        //   "open_time": 1571011200,
        //   "node": "dr2_logic13@10.0.10.159",
        //   "name": "S13",
        //   "language": "chinese",
        //   "id": 13,
        //   "open_time_copy": 1571011200000,
        //   "status_copy": 0
        // },
        // {
        //   "weight": 0,
        //   "status": 0,
        //   "open_time": 1572393600,
        //   "node": "dr2_logic16@10.0.0.10",
        //   "name": "S16",
        //   "language": "chinese",
        //   "id": 16,
        //   "account": "huxb",
        //   "open_time_copy": 1572393600000,
        //   "status_copy": 0
        // },
        // {
        //   "weight": 0,
        //   "status": 0,
        //   "open_time": 1574726400,
        //   "node": "ad_dev-ad_logic-21@10.0.0.10",
        //   "name": "S21",
        //   "language": "chinese",
        //   "id": 21,
        //   "account": "huxb",
        //   "open_time_copy": 1574726400000,
        //   "status_copy": 0
        // },
        // {
        //   "weight": 0,
        //   "status": 0,
        //   "open_time": 1576195200,
        //   "node": "ad_dev-ad_logic-26@10.0.0.10",
        //   "name": "S26",
        //   "language": "english",
        //   "id": 26,
        //   "account": "huxb",
        //   "open_time_copy": 1576195200000,
        //   "status_copy": 0
        // },
        // {
        //   "weight": 0,
        //   "status": 1,
        //   "open_time": 1575158400,
        //   "name": "测试",
        //   "language": "chinese",
        //   "id": 77,
        //   "open_time_copy": 1575158400000,
        //   "status_copy": 1
        // },
        // {
        //   "weight": 0,
        //   "status": 0,
        //   "open_time": 1576108800,
        //   "name": "S10000",
        //   "language": "english",
        //   "id": 10000,
        //   "account": "huxb",
        //   "open_time_copy": 1576108800000,
        //   "status_copy": 0
        // },
        // {
        //   "weight": 0,
        //   "status": -1,
        //   "open_time": 1576713600,
        //   "name": "S20000",
        //   "language": "chinese",
        //   "id": 20000,
        //   "account": "huxb",
        //   "open_time_copy": 1576713600000,
        //   "status_copy": -1
        // }
      ]
      // })
    },
    methods: {
      test() {
        // this.loading = !this.loading
        this.list = JSON.parse(JSON.stringify(this.list)).slice(0, 3)
      },
      handleRow(row, index) {
        return ''
      },

      handleSelectChange(e) {
        console.log(e, 'e')
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
