<template>
  <div class="container">
    <div class="content">
      <h5 class="class-title">部门分组</h5>
      <el-row class="pt30">
        <el-col :span="2" :offset="21">
          <el-button type="success" @click="createDepartment" size="small">添加分组</el-button>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="22" offset="1">
          <el-table :data="groupTableData" stripe style="width: 100%" :border='true'>
            <el-table-column type="expand" v-loading="loading">
              <template slot-scope="props">
                <el-table label-position="left" :border='true' :data="props.row.sub" inline class="demo-table-expand"
                          v-if="props.row.sub && props.row.sub.length > 0">
                  <el-table-column
                    prop="group_name"
                    label="部门名称">
                  </el-table-column>
                  <el-table-column
                    prop="create_time"
                    label="添加时间">
                  </el-table-column>
                  <el-table-column
                    prop="status"
                    label="状 态">
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    label="备 注">
                  </el-table-column>
                  <el-table-column
                    prop="op"
                    label="操作">
                    <template slot-scope="scope">
                      <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="id"
              label="ID"
              width="60">
            </el-table-column>
            <el-table-column
              prop="departname"
              label="部门名称">
            </el-table-column>
            <el-table-column
              prop="create_time"
              label="添加时间">
            </el-table-column>
            <el-table-column
              prop="status"
              label="状 态">
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
                <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="createSub(scope.row)" type="text" size="small">添加子类</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <el-row class="pt30">
        <el-col :span="9" :offset="14">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="changePage"
            :total="10 * page_count">
          </el-pagination>
        </el-col>
      </el-row>

      <el-dialog class="add-user-dialog" title="添加分类" :visible.sync="addGroupDialog">
        <el-form :label-position="labelPosition" label-width="80px" :model="addGroupForm" size="small">
          <el-form-item label="上级部门">
            <el-select v-model="addGroupForm.d_id" placeholder="请选择" :disabled="disabledDept">
              <el-option label="无" value="无"></el-option>
              <el-option
                v-for="item in departmentRoot"
                :key="item.id"
                :label="item.department_name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门名称">
            <el-input v-model="addGroupForm.name" ></el-input>
          </el-form-item>
          <el-form-item label="状 态">
            <el-select v-model="addGroupForm.status" placeholder="请选择">
              <el-option
                v-for="item in depStatus"
                :key="item.id"
                :label="item.status"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备 注">
            <el-input type="textarea" v-model="addGroupForm.remark"></el-input>
          </el-form-item>
          <el-row class="pt20">
            <el-col :span="6" :offset="9">
              <el-button type="primary" @click="confirmAdd" size="medium" style="width: 120px">确 认</el-button>
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
    name: 'grouping',
    data() {
      return {
        page_count: 1,
        current: 1,
        departmentRoot: [],
        depStatus: [],
        loading: true,
        disabledDept: false,
        addGroupForm: {
          d_id: '',
          name: '',
          status: '',
          remark: ''
        },
        groupTableData: [],
        addGroupDialog: false,
        labelPosition: 'right'
      }
    },
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    methods: {
      confirmAdd() {
        // ...
        const { d_id } = this.addGroupForm
        const funName = d_id === '无' ? 'Department' : 'SubDepartment'
        const nameKey = funName === 'Department' ? 'departname' : 'groupname'
        const actionName = !this.addGroupForm.id ? 'create' : 'update'
        this.$store.dispatch(actionName + funName, { ...this.addGroupForm, [nameKey]: this.addGroupForm.name }).then(res => {
          this.$message({
            message: (this.addGroupForm.id ? '修改' : '新增') + '成功',
            type: 'success'
          })
          this.handleSearch(this.current)
          this.getDepartmentStatus()
          this.getAllDepartmentRoot()
          this.$set(this, 'addGroupForm', {})
        })
        this.addGroupDialog = false
      },
      handleSearch(pageIndex) {
        this.$set(this, 'loading', true)
        this.$store.dispatch('getAllDepartment', { page: pageIndex || 1 }).then(res => {
          this.$set(this, 'loading', false)
          const { data, page_count } = res
          const groupTableData = data.map(item => {
            item.sub = item.sub.map(subItem => {
              subItem.d_id = item.id
              return subItem
            })
            return item
          })
          this.$set(this, 'groupTableData', groupTableData)
          this.$set(this, 'page_count', page_count)
        }).catch(err => {
          console.log(err)
        })
      },
      getAllDepartmentRoot() {
        const { username, password } = localStorage
        this.$store.dispatch('getAllDepartmentRoot', { username, password, name }).then(res => {
          const { data } = res
          this.$set(this, 'departmentRoot', data)
        })
      },
      changePage(current) {
        this.$set(this, 'current', current)
        this.handleSearch(current)
      },
      getDepartmentStatus() {
        this.$store.dispatch('getDepartmentStatus').then(res => {
          const { data } = res
          const temp = []
          for (const key in data) {
            temp.push({
              id: key,
              status: data[key]
            })
          }
          this.$set(this, 'depStatus', temp)
        })
      },
      edit(row) {
        this.addGroupDialog = true
        const statusId = this.depStatus.find(item => item.status === row.status).id
        this.$set(this, 'addGroupForm', { ...row, status: statusId, name: row.departname || row.group_name, d_id: row.d_id || '无' })
        this.$set(this, 'disabledDept', true)
      },
      createSub(row) {
        this.addGroupDialog = true
        this.$set(this, 'addGroupForm', { d_id: row.id })
        this.$set(this, 'disabledDept', true)
      },
      createDepartment() {
        this.$set(this, 'addGroupForm', { d_id: '无' })
        this.$set(this, 'disabledDept', true)
        this.addGroupDialog = true
      }
    },
    mounted() {
      this.getAllDepartmentRoot()
      this.getDepartmentStatus()
      this.handleSearch(1)
    }

  }
</script>

<style scoped lang="stylus">
  .add-user-dialog .el-form
    padding: 0 30px
  .add-user-dialog .el-input, .add-user-dialog .el-select
    width: 100%
</style>
