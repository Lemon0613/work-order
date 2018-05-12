<template>
  <div class="container">
    <div class="content">
      <h5 class="class-title">日报内容：</h5>
      <el-row class="pt30">
        <el-col :span="2" offset="21">
          <el-button type="success" @click="addUser" size="small">添加用户</el-button>
        </el-col>
      </el-row>
      <el-form :model="searchNameForm" label-width="80px" size="small">
        <el-row class="staff-search pt30">
          <el-col :span="6">
            <el-form-item label="姓名">
              <el-autocomplete
                class="inline-input"
                v-model="searchName"
                :fetch-suggestions="queryName"
                placeholder="请输入关键字"
                :trigger-on-focus="false"
                @select="handleSelect"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="6" offset="1">
            <el-form-item label="部门分组">
              <el-select v-model="searchNameForm.part" placeholder="请选择部门">
                <el-option label="策略中心--技术组" value="技术组"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" offset="1">
            <el-form-item label="职位">
              <el-select v-model="searchNameForm.pos" placeholder="请选择职位">
                <el-option label="创意总监" value="创意总监"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2" offset="1">
            <el-button type="primary" @click="" size="medium">搜 索</el-button>
          </el-col>
        </el-row>
      </el-form>

      <el-row class="add-user-table pb50">
        <el-col :span="22" offset="1">
          <el-table :data="addUserTable" border style="width: 100%">
            <el-table-column
              prop="id"
              label="ID"
              width="50">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别">
            </el-table-column>
            <el-table-column
              prop="group"
              label="部门分组">
            </el-table-column>
            <el-table-column
              prop="post"
              label="职位">
            </el-table-column>
            <el-table-column
              prop="email"
              label="邮箱">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="电话">
            </el-table-column>
            <el-table-column
              prop="roles"
              label="角色">
            </el-table-column>
            <el-table-column
              prop="birthday"
              label="生日">
            </el-table-column>
            <el-table-column
              prop="startTime"
              label="入职时间">
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="addUserDialog = true" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row class="dailylist-sort">
        <el-col :span="9" offset="15">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </el-col>
      </el-row>

      <el-dialog class="add-user-dialog" title="添加用户" :visible.sync="addUserDialog">
        <el-form :label-position="labelPosition" label-width="80px" :model="addUserForm" size="small">
          <el-form-item label="姓 名">
            <el-input v-model="addUserForm.name" ></el-input>
          </el-form-item>
          <el-form-item label="邮 箱">
            <el-input v-model="addUserForm.email"></el-input>
          </el-form-item>
          <el-form-item label="电 话">
            <el-input v-model="addUserForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="性 别">
            <el-select v-model="addUserForm.sex" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生 日">
            <el-date-picker type="date" placeholder="选择生日" v-model="addUserForm.birthday"></el-date-picker>
          </el-form-item>
          <el-form-item label="部门分组">
            <el-select v-model="addUserForm.group" placeholder="请选择部门">
              <el-option label="技术组" value="技术组"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职 位">
            <el-select v-model="addUserForm.post" placeholder="请选择职位">
              <el-option label="工程师" value="工程师"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角 色">
            <el-select v-model="addUserForm.roles" multiple placeholder="请选择">
              <el-option
                v-for="item in rolesArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="入职时间">
            <el-date-picker type="date" placeholder="选择时间" v-model="addUserForm.startTime"></el-date-picker>
          </el-form-item>
          <el-form-item label="状 态">
            <el-select v-model="addUserForm.status" placeholder="请选择">
              <el-option label="实习" value="实习"></el-option>
              <el-option label="正式" value="正式"></el-option>
              <el-option label="离职" value="离职"></el-option>
            </el-select>
          </el-form-item>

          <el-row class="add-user-btns">
            <el-col :span="6" offset="6">
              <el-button type="primary" @click="" size="medium">添 加</el-button>
            </el-col>
            <el-col :span="6" offset="1">
              <el-button type="default" @click="addUserDialog = false" size="medium">取 消</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'stafflist',
    data() {
      return {
        addUserForm: {
          name: '',
          email: '',
          phone: '',
          sex: '',
          birthday: '',
          group: '',
          roles: [],
          startTime: '',
          status: ''
        },
        addUserTable: [
          {
            id: '1',
            name: 'Lemon',
            email: 'yajunuse@163.com',
            phone: '18611403613',
            sex: 'man',
            birthday: '1991-06-13',
            group: '技术组',
            post: '前端',
            roles: '管理员',
            startTime: '2017-09-12',
            status: '转正'
          }
        ],

        rolesArr: [
          { value: '选项1', label: '管理员' },
          { value: '选项2', label: '成员' },
          { value: '选项3', label: '全部审核权限' },
          { value: '选项4', label: '工单审核权限' }
        ],
        searchNameForm: {
          part: '',
          pos: ''
        },
        allName: [],
        searchName: '',
        addUserDialog: false,
        labelPosition: 'right'
      }
    },
    methods: {
      addUser() {
        this.addUserDialog = true
      },
      queryName(queryString, cb) {
        const allName = this.allName
        var results = queryString ? allName.filter(this.createFilter(queryString)) : allName
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      createFilter(queryString) {
        return (name) => {
          return (name.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
      },
      loadAllName() {
        return [
          { 'value': '李亚军', 'name': '李亚军' },
          { 'value': '何晶晶', 'name': '何晶晶' }
        ]
      },
      handleSelect(item) {
        console.log(item)
      }
    },
    mounted() {
      this.allName = this.loadAllName()
    }

  }
</script>

<style scoped lang="stylus">
  .add-user-dialog .el-form
    padding: 0 80px
  .add-user-dialog .el-input, .add-user-dialog .el-date-picker, .add-user-dialog .el-select
    width: 100%
  .add-user-btns
    padding-bottom: 20px
  .add-user-btns .el-button
    width: 100px
</style>
