<template>
  <div class="container">
    <div class="content">
      <h5 class="class-title">角色管理</h5>
      <el-row class="pt30">
        <el-col :span="2" offset="21">
          <el-button type="success" @click="addRolesDialog = true" size="small">添加角色</el-button>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="22" offset="1">
          <el-table :data="rolesTableData" border stripe style="width: 100%">
            <el-table-column
              prop="id"
              label="ID"
              width="60">
            </el-table-column>
            <el-table-column
              prop="name"
              label="名 称">
            </el-table-column>
            <el-table-column
              prop="addTime"
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
              width="100">
              <template slot-scope="scope">
                <el-button @click="" type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>

        </el-col>
      </el-row>

      <el-row class="pt30">
        <el-col :span="9" offset="14">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </el-col>
      </el-row>

      <el-dialog class="add-roles-dialog" title="添加角色" :visible.sync="addRolesDialog">
        <el-form :model="addRolespForm" size="small">
          <el-row>
            <el-col :span="14">
              <el-form-item label="角色名称:">
                <el-input v-model="addRolespForm.name" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" offset="1">
              <el-form-item label="状 态">
                <el-select v-model="addRolespForm.status" placeholder="请选择">
                  <el-option label="正常" value="正常"></el-option>
                  <el-option label="禁用" value="禁用"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="权限设置:">
                <span style="padding: 0 8px"> 工单系统</span>
                <el-switch v-model="addRolespForm.delivery1"></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16" offset="2">
              <el-checkbox-group v-model="addRolespForm.type">
                <el-checkbox label="下单" name="type"></el-checkbox>
                <el-checkbox label="查看所有工单" name="type"></el-checkbox>
                <el-checkbox label="编辑工单" name="type"></el-checkbox>
                <el-checkbox label="审核工单" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-col>
            <el-col :span="6">
              <el-select v-model="addRolespForm.typeContain" placeholder="请选择" size="mini">
                <el-option label="审核创意工单" value="审核创意工单"></el-option>
                <el-option label="审核技术工单" value="审核技术工单"></el-option>
                <el-option label="审核文案工单" value="审核文案工单"></el-option>
                <el-option label="审核Flash工单" value="审核Flash工单"></el-option>
                <el-option label="审核采购单" value="审核采购单"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row class="pt10">
            <el-col :span="20" offset="3">
              <el-form-item label="">
                <span style="padding-right: 8px;">统计系统</span>
                <el-switch v-model="addRolespForm.delivery2"></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16" offset="2">
              <el-checkbox-group v-model="addRolespForm.type2">
                <el-checkbox label="工单统计" name="type"></el-checkbox>
                <el-checkbox label="日报统计" name="type"></el-checkbox>
                <el-checkbox label="导出统计数据" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-row>
          <el-form-item label="备 注:" class="pt10">
            <el-input type="textarea" v-model="addRolespForm.remark" style="width: 80%"></el-input>
          </el-form-item>
          <el-row class="pt20">
            <el-col :span="6" offset="9">
              <el-button type="primary" @click="confirmRoles" size="medium" style="width: 120px">确 认</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'roles-manage',
    data() {
      return {
        addRolespForm: {
          name: '',
          status: '',
          delivery1: false,
          delivery2: false,
          type: [],
          type2: [],
          typeContain: '',
          typeContain2: '',
          remark: ''
        },
        rolesTableData: [
          {
            id: '1',
            name: '管理员',
            addTime: '2018-04-01',
            status: '正常',
            remark: '所有权限'
          },
          {
            id: '2',
            name: '工单审核人员',
            addTime: '2018-04-02',
            status: '正常',
            remark: '带有审核权限的人员'
          },
          {
            id: '3',
            name: '普通成员',
            addTime: '2018-04-03',
            status: '正常',
            remark: '只有正常下单，查看和执行的人员'
          }
        ],
        addRolesDialog: false
      }
    },
    methods: {
      confirmRoles() {
        // ...
        this.addRolesDialog = false
      }
    }

  }
</script>

<style scoped lang="stylus">
  .add-roles-dialog .el-input, .add-roles-dialog .el-select
    width: 60%
</style>
