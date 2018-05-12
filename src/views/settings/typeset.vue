<template>
  <div class="container">
    <div class="content">
      <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="作业类型" name="first">
          <el-form label-position="right" size="mini" label-width="120px">
            <el-row class="pt20">
              <el-col :span="3" :offset="21">
                <el-button type="primary" @click="addworkDialog = true" size="small">添加作业类型</el-button>
              </el-col>
            </el-row>

            <el-table :data="workTableData" stripe style="width: 100%" v-loading="loading">
              <el-table-column
                prop="id"
                label="ID"
                width="60">
              </el-table-column>
              <el-table-column
                prop="job_type"
                label="名 称">
              </el-table-column>
              <el-table-column
                prop="job_pid"
                label="所属类型">
                <template slot-scope="props">
                  {{typeListDict[props.row.job_pid]}}
                </template>
              </el-table-column>
              <el-table-column
                prop="create_time"
                label="添加时间">
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态">
                <template slot-scope="scope">
                  {{{0: '禁用', 1: '正常'}[scope.row.status]}}
                </template>
              </el-table-column>
              <el-table-column
                prop="remark"
                label="备注">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="128">
                <template slot-scope="scope">
                  <el-button @click="editTaskType(scope.row)" type="text" size="small">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row class="pt30">
              <el-col :span="9" :offset="14">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  @current-change='changePage'
                  :total="page_count*10">
                </el-pagination>
              </el-col>
            </el-row>

            <el-dialog class="add-work-dialog"  :visible.sync="addworkDialog">
              <el-form :model="addWorkForm" size="small" label-width="120px">
                <el-row>
                  <el-col :span="22">
                    <el-form-item label="所属类型">
                      <el-select v-model="addWorkForm.job_pid" placeholder="请选择">
                        <el-option
                          v-for="item in typeListArr"
                          :key="item.id"
                          :label="item.typeName"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="22">
                    <el-form-item label="类型名称">
                      <el-input v-model="addWorkForm.job_name" auto-complete="off"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="22">
                    <el-form-item label="状态">
                      <el-select v-model="addWorkForm.status" placeholder="请选择">
                        <el-option label="正常" value="1"></el-option>
                        <el-option label="禁用" value="0"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="22">
                    <el-form-item label="说明">
                      <el-input type="textarea" v-model="addWorkForm.remark" placeholder="填写备注信息"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="pt20">
                  <el-col :span="6" :offset="9">
                    <el-button type="primary" @click="submitJobType" size="medium" style="width: 120px">确 认</el-button>
                  </el-col>
                </el-row>
              </el-form>
            </el-dialog>
          </el-form>
        </el-tab-pane>
        <!--执行内容-->
        <el-tab-pane label="执行内容" name="second">
          <el-form label-position="right" size="mini" label-width="120px">
            <el-row class="pt20">
              <el-col :span="3" :offset="21">
                <el-button type="primary" @click="editExceptionType" size="small">添加执行内容</el-button>
              </el-col>
            </el-row>

            <el-table :data="runTableData" stripe style="width: 100%">
              <el-table-column
                prop="id"
                label="ID"
                width="60">
              </el-table-column>
              <el-table-column
                prop="job_name"
                label="名 称">
              </el-table-column>
              <el-table-column
                prop="create_time"
                label="添加时间">
              </el-table-column>
              <el-table-column
                prop="status"
                label="状 态">
                <template slot-scope="scope">
                  {{{0: '禁用', 1: '正常'}[scope.row.status]}}
                </template>
              </el-table-column>
              <el-table-column
                prop="remark"
                label="备 注">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="128">
                <template slot-scope="scope">
                  <el-button @click="editExceptionType(scope.row)" type="text" size="small">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row class="pt30">
              <el-col :span="9" :offset="14">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  @current-change='changePage'
                  :total="page_count*10">
                </el-pagination>
              </el-col>
            </el-row>

            <el-dialog class="add-run-dialog" :visible.sync="addrunDialog">
              <el-form :model="addRunForm" size="small" label-width="120px">
                <el-row>
                  <el-col :span="22">
                    <el-form-item label="作业名称">
                      <el-input v-model="addRunForm.job_name" auto-complete="off"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="22">
                    <el-form-item label="状 态">
                      <el-select v-model="addRunForm.status" placeholder="请选择">
                        <el-option label="正常" value="1"></el-option>
                        <el-option label="禁用" value="0"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="22">
                    <el-form-item label="说 明">
                      <el-input type="textarea" v-model="addRunForm.remark" placeholder="填写备注信息"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="pt20">
                  <el-col :span="6" :offset="9">
                    <el-button type="primary" @click="submitExceptionType" size="medium" style="width: 120px">确 认</el-button>
                  </el-col>
                </el-row>
              </el-form>
            </el-dialog>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'typeset',
    data() {
      return {
        typeListDict: [],
        loading: true,
        current: 1,
        typeListArr: [],
        page_count: 0,
        activeName: 'first',
        addWorkForm: {
          job_pid: '',
          remark: '',
          status: '',
          job_name: ''
        },
        addRunForm: {
          job_name: '',
          status: '',
          remark: ''
        },
        workTableData: [],
        runTableData: [],
        addworkDialog: false,
        addrunDialog: false
      }
    },
    computed: {
      ...mapGetters([
        'uid'
      ])
    },
    methods: {
      handleSearch(page) {
        this.$set(this, 'loading', true)
        this.$set(this, 'current', page)
        const fnName = this.activeName === 'first' ? 'getJobTypeList' : 'getExecutionTypeList'
        this.$store.dispatch(fnName, { user: this.uid, page }).then(res => {
          this.$set(this, 'loading', false)
          const { data, page_count } = res
          const workTableData = [].concat(data).map(item => {
            const temp = {
              ...item,
              status: item.par_job_type_status,
              remark: item.par_job_type_remark,
              job_name: item.job_type,
              job_pid: item.pid
            }
            return temp
          })
          const runTableData = [].concat(data).map(item => {
            const temp = {
              ...item,
              status: item.execution_status,
              remark: item.execution_remark,
              job_name: item.execution_name
            }
            return temp
          })
          console.log(workTableData)
          this.$set(this, 'workTableData', workTableData)
          this.$set(this, 'runTableData', runTableData)
          this.$set(this, 'page_count', page_count)
        })
      },
      handleClick(tab) {
        this.activeName = tab.name
        this.handleSearch(1)
      },
      getTypeList() {
        this.$store.dispatch('getTypeList', { user: this.uid }).then(res => {
          const { data } = res
          const typeListArr = []
          for (const index in data) {
            typeListArr.push({
              id: index,
              typeName: data[index]
            })
          }
          this.$set(this, 'typeListArr', typeListArr)
          this.$set(this, 'typeListDict', data)
        })
      },
      editTaskType(row) {
        this.$set(this, 'addworkDialog', true)
        this.$set(this, 'addWorkForm', { ...row, status: row.status + '', job_pid: row.job_pid + '' })
      },
      submitJobType() {
        const fnName = this.addWorkForm.id ? 'updateJobType' : 'createJobType'
        this.$store.dispatch(fnName, { ...this.addWorkForm, user: this.uid }).then(res => {
          this.$message({
            message: (this.addWorkForm.id ? '修改' : '新增') + '成功',
            type: 'success'
          })
          this.$set(this, 'addworkDialog', false)
          this.$set(this, 'addWorkForm', {})
          this.$set(this, 'addRunForm', {})
          this.handleSearch(this.current)
        })
      },
      changePage(page) {
        this.handleSearch(page)
      },
      editExceptionType(row = {}) {
        this.$set(this, 'addrunDialog', true)
        this.$set(this, 'addRunForm', { ...row, status: row.status ? row.status + '' : '' })
      },
      submitExceptionType() {
        const fnName = this.addRunForm.id ? 'updateExecutionType' : 'createExecutionType'
        console.log(fnName)
        this.$store.dispatch(fnName, { ...this.addRunForm, user: this.uid }).then(res => {
          this.$message({
            message: (this.addRunForm.id ? '修改' : '新增') + '成功',
            type: 'success'
          })
          this.$set(this, 'addrunDialog', false)
          this.$set(this, 'addRunForm', {})
          this.handleSearch(this.current)
        })
      }
    },
    mounted() {
      this.getTypeList()
      this.handleSearch(1)
    }
  }
</script>

<style scoped lang="stylus">
  .add-work-dialog .el-form, .add-run-dialog .el-form
    padding: 0 30px
  .add-work-dialog .el-input, .add-work-dialog .el-select, .add-run-dialog .el-input, .add-run-dialog .el-select
    width: 100%
</style>
