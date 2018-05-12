<template>
  <div class="container">
    <div class="content">
      <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="邮件发送设置" name="first">
          <el-form label-position="right" :rules="rules" size="mini" label-width="120px">
            <el-row class="pt20">
              <el-col :span="3" offset="21">
                <el-button type="primary" @click="addemailDialog = true" size="small">添加设置</el-button>
              </el-col>
            </el-row>

            <el-table :data="emailTableData" stripe style="width: 100%">
              <el-table-column
                prop="id"
                label="ID"
                width="60">
              </el-table-column>
              <el-table-column
                prop="type"
                label="工单类型">
              </el-table-column>
              <el-table-column
                prop="to"
                label="默认接收人">
              </el-table-column>
              <el-table-column
                prop="copy"
                label="默认抄送人">
              </el-table-column>
              <el-table-column
                prop="addTime"
                label="添加时间">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="128">
                <template slot-scope="scope">
                  <el-button @click="" type="text" size="small">编辑</el-button>
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

            <el-dialog class="add-work-dialog"  :visible.sync="addemailDialog">
              <el-form :model="addEmailForm" size="small" label-width="120px">
                <el-row>
                  <el-col >
                    <el-form-item label="工单类型">
                      <el-select v-model="addEmailForm.type" placeholder="请选择">
                        <el-option label="创意工单" value="创意工单"></el-option>
                        <el-option label="技术工单" value="技术工单"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="默认收件人">
                      <el-input v-model="addEmailForm.to" auto-complete="off"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="默认抄送人">
                      <el-input v-model="addEmailForm.copy" auto-complete="off"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="22">
                    <el-form-item label="说 明">
                      <el-input type="textarea" v-model="addEmailForm.remark" placeholder="填写备注信息"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="pt20">
                  <el-col :span="6" offset="9">
                    <el-button type="primary" @click="" size="medium" style="width: 120px">确 认</el-button>
                  </el-col>
                </el-row>
              </el-form>
            </el-dialog>
          </el-form>
        </el-tab-pane>
        <!--邮件模板-->
        <el-tab-pane label="邮件模板" name="second">
          <el-form label-position="right" :rules="rules" size="mini" label-width="120px">
            <el-row class="pt20">
              <el-col :span="3" offset="21">
                <el-button type="primary" @click="addmoduleDialog = true" size="small">添加邮件模板</el-button>
              </el-col>
            </el-row>

            <el-table :data="moduleTableData" stripe style="width: 100%">
              <el-table-column
                prop="id"
                label="ID"
                width="60">
              </el-table-column>
              <el-table-column
                prop="spot"
                label="节 点">
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
                  <el-button @click="" type="text" size="small">编辑</el-button>
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

            <el-dialog class="add-module-dialog"  :visible.sync="addmoduleDialog">
              <el-form :model="addModuleForm" size="small" label-width="120px">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="选择节点">
                      <el-select v-model="addModuleForm.spot" placeholder="请选择">
                        <el-option label="创意工单-开始执行" value="1"></el-option>
                        <el-option label="技术工单-开始执行" value="2"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="邮件主题">
                      <el-input v-model="addModuleForm.theme" auto-complete="off"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="22">
                    <el-form-item label="特殊资源">
                      <el-radio-group v-model="addModuleForm.type">
                        <el-radio label="文本内容"></el-radio>
                        <el-radio label="HTML 邮件内容"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="22">
                    <el-form-item label="说 明">
                      <el-input type="textarea" v-model="addModuleForm.remark" placeholder="填写备注信息"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="pt20">
                  <el-col :span="6" offset="9">
                    <el-button type="primary" @click="" size="medium" style="width: 120px">确 认</el-button>
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
  export default {
    name: 'typeset',
    data() {
      return {
        activeName: 'first',
        addEmailForm: {
          type: [],
          to: '',
          copy: '',
          remark: ''
        },
        addModuleForm: {
          spot: [],
          theme: '',
          tyoe: [],
          status: ''
        },
        emailTableData: [
          {
            id: '1',
            type: '创意工单',
            to: '莉莉/子博',
            copy: '张召宇',
            addTime: '2018-04-02'
          },
          {
            id: '2',
            type: '技术工单',
            to: '谢祯强',
            copy: '莉莉/子博',
            addTime: '2018-04-03'
          }
        ],
        moduleTableData: [
          {
            id: '1',
            spot: '创意工单-开始执行',
            addTime: '2018-04-01',
            status: '正常',
            remark: '无'
          },
          {
            id: '2',
            spot: '技术工单-开始执行',
            addTime: '2018-04-01',
            status: '正常',
            remark: '无'
          }
        ],
        addemailDialog: false,
        addmoduleDialog: false
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .add-work-dialog .el-form, .add-module-dialog .el-form
    padding: 0 30px
  .add-work-dialog .el-input, .add-work-dialog .el-select, .add-module-dialog .el-input, .add-module-dialog .el-select
    width: 100%
</style>
