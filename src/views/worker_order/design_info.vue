<template>
  <div class="container">
    <div class="content">
      <h3>创意工单：内部单号：{{orderid}}</h3>
      <el-form label-position="right" :model="order" size="mini" label-width="120px">
        <h5 class="class-title">基本信息：</h5>
        <el-row>
          <el-col :span="12">
            <el-form-item label="工单名称" required prop="order.o_name">
              <el-input v-model="order.o_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属客户" required prop="order.o_client">
              <el-select v-model="order.o_client" filterable placeholder="请选择">
                <el-option
                  v-for="item in client"
                  :key="item.id"
                  :label="item.c_name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="项目单号" required prop="order.o_number">
              <el-input v-model="order.o_number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="下单人" required prop="order.o_create_user">
              <el-select v-model="order.o_create_user" filterable placeholder="请选择" style="width: 100%">
                <el-option
                  v-for="item in member"
                  :key="item.id"
                  :label="item.u_name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="项目费用" required prop="order.o_cost">
              <el-input v-model="order.o_cost"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户状态" required prop="order.c_status">
              <el-select v-model="order.c_status" placeholder="请选择">
                <el-option
                  v-for="item in client_status_options"
                  :key="item.key"
                  :label="item.label"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目负责人" required prop="order.principal">
              <el-select v-model="order.principal" filterable placeholder="请选择" style="width: 100%">
                <el-option
                  v-for="item in member"
                  :key="item.id"
                  :label="item.u_name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工单状态" required prop="order.project">
              <el-input v-model="order.project"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="其他收件人" required prop="order.email_user">
              <el-select v-model="order.email_user" multiple filterable placeholder="请选择" style="width: 100%">
                <el-option
                  v-for="item in member"
                  :key="item.id"
                  :label="item.u_name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="其他抄送人" required prop="order.email_copy">
              <el-select v-model="order.email_copy" multiple filterable placeholder="请选择" style="width: 100%">
                <el-option
                  v-for="item in member"
                  :key="item.id"
                  :label="item.u_name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <h5 class="class-title">设计要求：</h5>
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目背景" required prop="order.work_context">
              <el-input v-model="order.work_context" type="textarea"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="广告任务" required prop="order.advertis_work">
              <el-input v-model="order.advertis_work" type="textarea"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Slogan 及文案" required prop="order.work_slogan">
              <el-input v-model="order.work_slogan" type="textarea"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创意执行元素" required prop="order.advertis_eleme">
              <el-input v-model="order.advertis_eleme" type="textarea"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创意 VI 标准" required prop="order.advertis_vi_eleme">
              <el-input v-model="order.advertis_vi_eleme" type="textarea"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="其他补充" required prop="order.remark">
              <el-input v-model="order.remark" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <h5 class="class-title">作业内容：</h5>
        <el-row>
          <el-table
            :data="works"
            border
            style="width: 100%">
            <el-table-column
              fixed
              prop="type"
              label="作业名称">
            </el-table-column>
            <el-table-column
              fixed
              prop="work_type"
              label="类型">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ (function(){
                    const myType = scope.row.work_type && jobtype.find(function (item) {
                      return item.id === scope.row.work_type
                    })
                    return myType ? myType.job_type : ''
                  })()
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="num"
              label="数量">
            </el-table-column>
            <el-table-column
              prop="execute"
              label="执行人">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.execute && scope.row.execute.map(function (item) {
                  return item.name
                }).join(", ") }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="order_time"
              label="下单时间">
            </el-table-column>
            <el-table-column
              prop="finish_time"
              label="提交时间">
            </el-table-column>
            <el-table-column
              prop="urgency_level"
              label="紧急程度">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.urgency_level && urgency.find(function (item) {
                  return item.key === scope.row.urgency_level
                }).label }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <h3 class="class-title">审核意见：</h3>
        <el-row>
          <el-input v-model="check_info" type="textarea"></el-input>
        </el-row>
        <el-row class="oprate-btns">
          <el-col :offset="7" :span="10">
            <el-button type="success" disabled>修改</el-button>
            <el-button type="primary" @click="checkOrder(1)">通过</el-button>
            <el-button type="danger" @click="checkOrder(2)">退回</el-button>
            <el-button @click="">返回</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import TaskList from './task_list.vue'
  export default {
    name: 'designInfo',
    data() {
      return {
        order: {},
        works: [],
        check_info: ''
      }
    },
    computed: {
      ...mapGetters([
        'uid', 'client', 'member', 'jobtype', 'client_status_options', 'urgency'
      ]),
      orderid() {
        return this.$router.history.current.query.id
      }
    },
    components: {
      TaskList
    },
    mounted() {
      console.log('mounted')
      this.$store.dispatch('getProjectInfo', { user: this.uid, id: this.orderid }).then(res => {
        const { order, works } = res.data
        this.$set(this, 'order', order)
        this.$set(this, 'works', works)
      })
    },
    methods: {
      checkOrder(check) {
        this.$store.dispatch('checkOrder', { type: 1, id: this.orderid, uid: this.uid, status: check, check_info: this.check_info }).then(res => {
          console.log('审核工单 after', res)
          if (res && res.msg === 'success') {
            this.$message({
              message: '审核成功！',
              type: 'success'
            })
            this.$router.push('/worker_order/list')
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  .annotation-text
    font-size: 14px
    line-height: 24px
    color: #999
  .editor
    width: 100%
    background: #fff
  .bottom-btns
    width: 120px
  .class-title
    margin-bottom: 10px
    margin-top: 10px
  .oprate-btns
    padding-top: 20px
    & .el-button
      width: 20%
</style>
