<template>
  <el-row>
    <el-col :span="24">
      <el-table
        :data="data"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="type"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="num"
          label="数量">
        </el-table-column>
        <el-table-column
          prop="execute"
          label="执行人">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.execute && member.find(function (item) {return item.id===scope.row.execute}).u_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="order_time"
          label="下单时间">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.order_time && scope.row.order_time.toLocaleString() }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="finish_time"
          label="提交时间">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.finish_time && scope.row.finish_time.toLocaleString() }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="urgency"
          label="紧急程度">
        </el-table-column>
        <!--<el-table-column-->
          <!--fixed="right"-->
          <!--label="操作"-->
          <!--width="150">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button @click="handleClick(scope.row)" type="text" size="small">复制</el-button>-->
            <!--<el-button type="text" size="small">编辑</el-button>-->
            <!--<el-button type="text" size="small">删除</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'taskList',
    data() {
      return {
        projectInfo: {}
      }
    },
    computed: {
      ...mapGetters([
        'uid', 'client', 'member', 'jobtype', 'client_status_options'
      ]),
      orderid() {
        return this.$router.history.current.query.id
      }
    },
    components: {
    },
    props: {
      data: {
        type: Array
      }
    }
  }
</script>
