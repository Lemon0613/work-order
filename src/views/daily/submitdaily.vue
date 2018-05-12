<template>
  <div class="container">
    <div class="content">
      <h5 class="class-title">日报内容：</h5>
      <el-form ref="form" :model="submitdailylForm" label-width="80px" size="small">
        <el-row class="submitdaily-form">
          <el-col :span="5" >
            <el-form-item label="姓名">
              <el-input v-model="name" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-form-item label="职位">
              <el-input v-model="submitdailylForm.post" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-form-item label="日报日期">
              <el-date-picker type="date" placeholder="选择日期" v-model="submitdailylForm.date" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-form-item label="日报时长">
              <el-input v-model="submitdailylForm.total_time" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row class="submitdaily-table">
        <el-col :span="22" offset="1">
          <el-table :data="submitdailyTable" border style="width: 100%">
            <el-table-column
              prop="order_number"
              label="项目名称">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.order_number && orderDict[scope.row.order_number] }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="work_id"
              label="作业名称">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.work_id && workDict[scope.row.work_id] }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="jobtype"
              label="执行内容">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.jobtype && typeArray.find(function(item){
                  return item.id === scope.row.jobtype
                }).job_type }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="time"
              label="用时">
            </el-table-column>
            <el-table-column
              prop="content"
              label="项目说明">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="removeWorkInfo(scope.$index)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" :offset="21">
          <el-button @click="showSubmitdailyDialog" type="success" size="mini">添加工作内容</el-button>
        </el-col>
      </el-row>
      <el-row class="submitdaily-btns">
        <el-col :span="3" :offset="8">
          <el-button @click="submitDaily" type="primary" size="medium">提交日报</el-button>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-button @click="" type="default" size="medium">取 消</el-button>
        </el-col>
      </el-row>

      <el-dialog title="工作内容" :visible.sync="submitdailyDialog">
        <el-form :model="submitdailyAddForm" size="small" labelWidth="120px">
          <el-row>
            <el-col :span="23">
              <el-form-item label="项目名称">
                <el-select v-model="submitdailyAddForm.order_number" @change="changeWorkArray" placeholder="请选择项目名称" style="width: 100%">
                  <el-option
                    v-for="item in orderArray"
                    :key="item.order"
                    :label="item.order_name"
                    :value="item.order">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="23">
              <el-form-item label="作业名称">
                <el-select v-model="submitdailyAddForm.work_id" placeholder="请选择作业名称" style="width: 100%">
                  <el-option
                    v-for="item in workArray"
                    :key="item.id"
                    :label="item.work_name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="执行内容">
                <el-select v-model="submitdailyAddForm.jobtype" placeholder="请选择内容">
                  <el-option
                    v-for="item in typeArray"
                    :key="item.id"
                    :label="item.job_type"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11" offset="1">
              <el-form-item label="工作时长">
                <el-select v-model="submitdailyAddForm.time" placeholder="请选择时长">
                  <el-option label="0.5" value="0.5"></el-option>
                  <el-option label="1" value="1"></el-option>
                  <el-option label="1.5" value="1.5"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="23">
              <el-form-item label="作业说明">
                <el-input type="textarea" v-model="submitdailyAddForm.content" placeholder="作业执行简要"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="23">
              <el-form-item label="备注">
                <el-input type="textarea" v-model="submitdailyAddForm.remark" placeholder="工作中的问题"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4" :offset="8">
              <el-button @click="addWorkInfo" type="primary" size="medium">添 加</el-button>
            </el-col>
            <el-col :span="3" :offset="1">
              <el-button @click="submitdailyDialog = false" type="default" size="medium">取 消</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'submitdaily',
    data() {
      return {
        typeArray: [],
        submitdailylForm: {
          name: 'liyajun',
          post: '前端开发工程师',
          date: '2018-04-20',
          total_time: 0
        },
        submitdailyTable: [],
        orderArray: [],
        workArray: [],
        orderDict: {},
        workDict: {},
        submitdailyAddForm: {},
        submitdailyDialog: false
      }
    },
    computed: {
      ...mapGetters([
        'uid', 'name'
      ])
    },
    mounted() {
      this.getDailyInfo()
    },
    methods: {
      showSubmitdailyDialog() {
        this.submitdailyDialog = true
      },
      changeWorkArray(v) {
        const orderId = v
        const index = this.orderArray.findIndex(item => item.order === orderId)
        const workArray = index >= 0 ? this.orderArray[index].detail : []
        console.log(workArray)
        this.$set(this, 'workArray', workArray)
      },
      getDailyInfo() {
        this.$store.dispatch('getDailyInfo', this.uid).then(res => {
          console.log(res)
          const { type, work } = res.data
          const orderArray = []
          const orderDict = {}
          const workDict = {}
          for (const key in work) {
            const temp = work[key]
            orderDict[key] = temp.order_name
            orderArray.push(temp)
            for (let subKey = 0; subKey < temp.detail.length; subKey++) {
              workDict[temp.detail[subKey].id] = temp.detail[subKey].work_name
            }
          }
          this.$set(this, 'typeArray', type)
          this.$set(this, 'orderArray', orderArray)
          this.$set(this, 'orderDict', orderDict)
          this.$set(this, 'workDict', workDict)
        })
      },
      addWorkInfo() {
        const temp = Object.assign({}, this.submitdailyAddForm)
        this.submitdailyTable.push(temp)
        this.submitdailylForm.total_time += +temp.time
        this.submitdailyDialog = false
        this.$set(this, 'submitdailyAddForm', {})
      },
      removeWorkInfo(index) {
        this.submitdailyTable.splice(index, 1)
      },
      submitDaily() {
        const daily = { ...this.submitdailylForm, user: this.uid }
        daily.work = this.submitdailyTable
        console.log(daily)
        this.$store.dispatch('submitWork', daily).then(res => {
          console.log(res)
          if (res.error === 0) {
            this.$message({
              message: '提交成功',
              type: 'success'
            })
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .submitdaily-form
    padding: 30px 0
    background: #fff
  .submitdaily-form .el-input input[disabled='disabled']
    background: #ddd
    color: #555
  .submitdaily-table
    padding-bottom: 20px
  .submitdaily-btns
    padding-bottom: 50px
    & .el-button
      width: 120px
</style>
