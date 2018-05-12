<template>
  <div class="container">
    <div class="content">
      <el-form label-position="right" :rules="rules"  size="mini" label-width="120px">
        <h5 class="class-title">客户设置</h5>
        <el-row class="pt20">
          <el-col :span="2" offset="22">
            <el-button type="primary" @click="addCustomerDialog = true" size="small">添加客户</el-button>
          </el-col>
        </el-row>

        <el-table :data="groupTableData" stripe style="width: 100%">
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
            prop="group"
            label="所属项目组">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="128">
            <template slot-scope="scope">
              <el-button @click="showDetail()" type="text" size="small">编辑</el-button>
              <el-button @click="showDetail()" type="text" size="small">添加子类</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row class="pt30">
          <el-col :span="9" offset="14">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="1000">
            </el-pagination>
          </el-col>
        </el-row>


        <el-dialog class="add-user-dialog"  :visible.sync="addCustomerDialog">
          <el-form :model="addCustomerForm" size="small" label-width="120px">
            <el-row class="pt20">
              <el-col span="24">
                <el-form-item label="上级部门">
                  <el-select v-model="addCustomerForm.upper" placeholder="请选择">
                    <el-option label="无" value="无"></el-option>
                    <el-option label="策略中心" value="策略中心"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col span="24">
                <el-form-item label="客户/车型名称">
                  <el-input v-model="addCustomerForm.name" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="24">
                <el-form-item label="品牌类型">
                  <el-select v-model="addCustomerForm.type" placeholder="请选择">
                    <el-option label="无" value="无"></el-option>
                    <el-option label="策略中心" value="策略中心"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col span="24">
                <el-form-item label="所属项目组">
                  <el-select v-model="addCustomerForm.group" placeholder="请选择">
                    <el-option label="无" value="无"></el-option>
                    <el-option label="策略中心" value="策略中心"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col span="24">
                <el-form-item label="状 态">
                  <el-select v-model="addCustomerForm.status" placeholder="请选择">
                    <el-option
                      v-for="item in status_options"
                      :key="item.key"
                      :label="item.label"
                      :value="item.key">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col span="22">
                <el-form-item label="备 注">
                  <el-input type="textarea" v-model="addCustomerForm.remark" placeholder="填写备注信息"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="pt20">
              <el-col :span="6" offset="9">
                <el-button type="primary" @click="confirmAdd" size="medium" style="width: 120px">确 认</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-dialog>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'customerset',
    data() {
      return {
        addCustomerForm: {
          upper: '',
          name: '',
          status: '',
          group: '',
          type: ''
        },
        groupTableData: [
          {
            id: '1',
            name: '策略中心',
            addTime: '2018-04-01',
            status: '正常',
            group: '无',
            type: '自主品牌'
          },
          {
            id: '2',
            name: 'L--技术组',
            addTime: '2018-04-02',
            status: '正常',
            group: '客户中心-C1组',
            type: '合资品牌'
          }
        ],
        addCustomerDialog: false
      }
    },
    methods: {
      confirmAdd() {
        // ...
        this.addCustomerDialog = false
      },
      showDetail() {
        this.addCustomerDialog = true
      }
    },
    computed: {
      ...mapGetters([
        'uid', 'status_options'
      ])
    }

  }
</script>

<style scoped lang="stylus">
  .add-pos-dialog .el-form
    padding: 0 30px
  .add-pos-dialog .el-input, .add-pos-dialog .el-select
    width: 100%
  .add-user-dialog .el-input
    width: 80%
</style>
