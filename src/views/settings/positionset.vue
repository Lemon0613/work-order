<template>
  <div class="container">
    <div class="content">
      <el-form label-position="right" :rules="rules" size="mini" label-width="120px">
        <h5 class="class-title">职位管理</h5>
        <el-row class="pt20">
          <el-col :span="2" offset="22">
            <el-button type="primary" @click="addPositionDialog = true" size="small">添加职位</el-button>
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
            prop="remark"
            label="备 注">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="128">
            <template slot-scope="scope">
              <el-button @click="showDetail()" type="text" size="small">编辑</el-button>
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


        <el-dialog class="add-user-dialog"  :visible.sync="addPositionDialog">
          <el-form :model="addPositionForm" size="small" label-width="120px">
            <el-row>
              <el-col span="24">
                <el-form-item label="职位名称">
                  <el-input v-model="addPositionForm.name" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>

              <el-col span="24">
                <el-form-item label="状 态">
                  <el-select v-model="addPositionForm.status" placeholder="请选择">
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
                  <el-input type="textarea" v-model="addPositionForm.remark" placeholder="填写备注信息"></el-input>
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
    name: 'positionset',
    data() {
      return {
        addPositionForm: {
          upper: '',
          name: '',
          status: '',
          remark: ''
        },
        groupTableData: [
          {
            id: '1',
            name: '总经理',
            addTime: '2018-04-01',
            status: '正常',
            remark: '无'
          },
          {
            id: '2',
            name: 'ECD',
            addTime: '2018-04-02',
            status: '正常',
            remark: '无'
          },
          {
            id: '3',
            name: 'CD',
            addTime: '2018-04-02',
            status: '正常',
            remark: '无'
          },
          {
            id: '4',
            name: '客户总监',
            addTime: '2018-04-02',
            status: '正常',
            remark: '无'
          }
        ],
        addPositionDialog: false
      }
    },
    methods: {
      confirmAdd() {
        // ...
        this.addPositionDialog = false
      },
      showDetail() {
        this.addPositionDialog = true
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
