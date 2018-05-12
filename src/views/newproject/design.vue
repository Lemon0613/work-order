<template>
  <div class="container">
    <div class="content">
      <h3 class="project-title">新建创意工单</h3>
      <el-form label-position="right" :rules="rules" :model="projectInfo" size="mini" label-width="120px">
        <h5 class="class-title">基本信息：</h5>
        <el-row>
          <el-col :span="12">
            <el-form-item label="工单名称" required prop="project">
              <el-input v-model="projectInfo.project"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="项目单号" :span="6" required prop="number">
              <el-input v-model="projectInfo.number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="下单人" required prop="creater">
              <el-select v-model="projectInfo.creater" filterable placeholder="请选择" change="">
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
            <el-form-item label="项目负责人" required prop="charger">
              <el-select v-model="projectInfo.charger" filterable placeholder="请选择">
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
            <el-form-item label="客户总监" required prop="director">
              <el-select v-model="projectInfo.director" filterable placeholder="请选择">
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
            <el-form-item label="所属客户" required prop="client">
              <el-select v-model="projectInfo.client" filterable placeholder="请选择">
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
            <el-form-item label="客户状态" required prop="client_status">
              <el-select v-model="projectInfo.client_status" placeholder="请选择">
                <el-option
                  v-for="item in client_status_options"
                  :key="item.key"
                  :label="item.label"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="项目费用" required prop="cost">
              <el-input v-model="projectInfo.cost"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="其他收件人" required prop="receiver">
              <el-select v-model="projectInfo.receiver" filterable placeholder="请选择">
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
            <el-form-item label="其他抄送人" required prop="copy">
              <el-select v-model="projectInfo.copy" filterable placeholder="请选择">
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
        <el-row>
          <el-form-item label="  ">
            <el-checkbox v-model="is_check">无需客户总监审核</el-checkbox>
          </el-form-item>
        </el-row>
        <h5 class="class-title">制作要求：</h5>
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目背景" required prop="context">
              <el-input v-model="projectInfo.context" type="textarea"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="广告任务" required prop="location">
              <el-input v-model="projectInfo.ad_work" type="textarea"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Slogan及文案" required prop="slogan">
              <el-input v-model="projectInfo.slogan" type="textarea"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创意执行元素">
              <el-input v-model="projectInfo.ad_eleme" type="textarea"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创意 VI 标准">
              <el-input v-model="projectInfo.ad_vi_eleme" type="textarea"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="其他补充" prop="remark" required>
              <quill-editor
                v-model="remark"
                ref="myQuillEditor"
                class="editor"
                :options="editorOption" @ready="">
              </quill-editor>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <h5 class="class-title">作业内容：</h5>
      <el-row>
        <el-col :span="24">
          <el-table
            :data="taskList"
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
                <span style="margin-left: 10px">{{ scope.row.order_time && scope.row.order_time.toLocaleString() }}</span>
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
            <el-table-column
              fixed="right"
              label="操作"
              width="150">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">复制</el-button>
                <el-button type="text" size="small">编辑</el-button>
                <el-button type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row style="padding: 20px 0">
        <el-col :span="2" :offset="22">
          <el-button type="success" @click="showAddTaskModal" size="small">添加作业</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="padding-bottom: 50px">
        <el-col :span="3" :offset="8">
          <el-button class="bottom-btns" @click="handleSubmit" type="primary">提交工单</el-button>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-button class="bottom-btns">取 消</el-button>
        </el-col>
      </el-row>

      <!--添加作业弹窗层-->
      <el-dialog title="添加作业" :visible.sync="dialogFormVisible" width="80%">
        <task-info :task="task" :jobType="jobtype"></task-info>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddTask">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { quillEditor } from 'vue-quill-editor'
  import { mapGetters } from 'vuex'
  import ElCol from 'element-ui/packages/col/src/col'
  import ElRow from 'element-ui/packages/row/src/row'
  import TaskInfo from '../worker_order/task_info.vue'

  export default {
    name: 'design',
    data() {
      return {
        task: {},
        taskList: [],
        dialogFormVisible: false,
        editorOption: {},
        options: [],
        projectInfo: {},
        rules: {
          number: [
            { required: true, message: '请输入项目单号', trigger: 'blur' }
          ],
          project: [
            { required: true, message: '请输入工单名称', trigger: 'blur' }
          ],
          charger: [
            { required: true, message: '请输入负责人', trigger: 'blur' }
          ],
          creater: [
            { required: true, message: '请输入下单人', trigger: 'blur' }
          ],
          director: [
            { required: true, message: '请输入客户总监', trigger: 'blur' }
          ],
          client: [
            { required: true, message: '请输入所属客户', trigger: 'blur' }
          ],
          cost: [
            { required: true, message: '请输入项目费用', trigger: 'blur' }
          ],
          client_status: [
            { required: true, message: '请输入客户状态', trigger: 'blur' }
          ],
          receiver: [
            { required: true, message: '请输入邮件收件人', trigger: 'blur' }
          ],
          copy: [
            { required: true, message: '请输入邮件抄送人', trigger: 'blur' }
          ],
          context: [
            { required: true, message: '请输入项目背景', trigger: 'blur' }
          ],
          location: [
            { required: true, message: '请输入产品定位', trigger: 'blur' }
          ],
          target: [
            { required: true, message: '请输入目标人群', trigger: 'blur' }
          ],
          slogan: [
            { required: true, message: '请输入Slogan', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '请输入其他补充', trigger: 'blur' }
          ],
          is_check: [
            { required: true, message: '是否需要客户总监确认', trigger: 'blur' }
          ]
        },
        client_status_options: [
          { key: 1, label: '前期' },
          { key: 2, label: '竞标' },
          { key: 3, label: '已签约' }
        ],
        urgency: [
          { key: '正常' },
          { key: '次要' },
          { key: '重要' },
          { key: '紧急' }
        ],
        layout_type: [
          { key: 'JPG', label: 'JPG' },
          { key: 'GIF', label: 'GIF' },
          { key: 'PSD', label: 'PSD' },
          { key: 'AI', label: 'AI' },
          { key: '其他', label: '其他' }
        ]
      }
    },
    computed: {
      client() {
        return this.$store.getters.options.client
      },
      jobtype() {
        return this.$store.getters.options.jobtype
      },
      member() {
        return this.$store.getters.options.member
      },
      editor() {
        return this.$refs.myQuillEditor.quill
      },
      ...mapGetters([
        'uid'
      ])
    },
    components: {
      TaskInfo,
      ElRow,
      ElCol,
      quillEditor
    },
    methods: {
      handleAddTask() {
        console.log(this.task)
        this.taskList.push({ tonality: [{ img: 0, intro: 'test' }], ...this.task })
        this.dialogFormVisible = false
        this.task = Object.assign({})
      },
      showAddTaskModal() {
        this.dialogFormVisible = true
      },
      changeCreater(v) {
        this.projectInfo.receiver = v
      },
      handleSubmit() {
        const projectObj = {
          user: this.uid,
          orderid: 0,
          is_check: 0,
          remark: '',
          work: this.taskList,
          ...this.projectInfo
        }
        console.log(projectObj)
        if (!projectObj.work || projectObj.work && projectObj.work.length <= 0) {
          this.$message({
            message: '新建工单必须添加作业',
            type: 'error'
          })
          return
        }
        this.$store.dispatch('createProject', projectObj).then(res => {
          console.log('createProject', res)
          this.$message({
            message: '提交成功！',
            type: 'success'
          })
        }).catch(err => {
          console.log('Error: ', err)
        })
      },
      querySearch(queryString, cb) {
        var restaurants = this.restaurants
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
      },
      loadAll() {
        return [
          {
            'value': 'aaa',
            'address': 'aaaaaaaaaaaaaaaa'
          },
          {
            'value': 'bbb',
            'address': 'bbbbbbbbbbbbbb'
          }
        ]
      },
      handleSelect(item) {
        console.log(item)
      }
    },
    mounted() {
      this.restaurants = this.loadAll()
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
</style>
