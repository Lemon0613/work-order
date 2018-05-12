<template>
  <el-form :model="form" label-width="120px" size="small">
    <el-row>
      <el-col span="12">
        <el-form-item label="作业名称：">
          <el-input v-model="task.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-col>
      <el-col span="6">
        <el-form-item label="作业类型：">
          <el-select v-model="task.type" placeholder="请选择作业类型">
            <el-option
              v-for="item in jobtype"
              :key="item.id"
              :label="item.job_type"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col span="6">
        <el-form-item label="作业数量：">
          <el-input v-model="task.num" auto-complete="off"></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="执行人：">
          <el-select v-model="task.execute" placeholder="请选择执行人" style="width: 100%">
            <el-option
              v-for="item in member"
              :key="item.id"
              :label="item.u_name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="辅助执行人：">
          <el-select v-model="task.sub_user" placeholder="请选择辅助执行人" style="width: 100%">
            <el-option
              v-for="item in member"
              :key="item.id"
              :label="item.u_name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col span="24">
        <el-form-item label="创意调性：">
          <el-table :data="task.tonality" border="true" @row-click="rowClick">
            <el-table-column
              prop="img"
              label="上传参考图"
              width="150"
              >
              <template slot-scope="scope">
                <el-upload name="img"
                  class="avatar-uploader"
                  :action="action"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :on-remove="handleRemove"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="scope.row.img" :src="action + scope.row.imgSrc" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </template>
            </el-table-column>
            <el-table-column
              prop="intro"
              label="说明：">
              <template slot-scope="scope">
                <el-input type="textarea" v-model="scope.row.intro"></el-input>
              </template>
            </el-table-column>
            <el-table-column width="180"
              prop="op"
              label="操作：">
              <template slot-scope="scope">
                <el-button type="primary" @click="addTonalityToList">添加</el-button>
                <el-button type="danger" @click="removeTonalityFromList(scope.$index)" v-if="task.tonality.length > 1">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-col>
      <el-col span="24">
        <el-form-item label="创意尺寸：">
          <el-input v-model="task.size" type="textarea" auto-complete="off"></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="下单时间：">
          <el-date-picker style="width: 100%"
            v-model="task.order_time"
            type="datetime"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="执行时间：">
          <el-date-picker style="width: 100%"
            v-model="task.exce_time"
            type="datetime"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="提交时间：">
          <el-date-picker style="width: 100%"
            v-model="task.finish_time"
            type="datetime"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col span="12">
        <el-form-item label="发布时间：">
          <el-date-picker style="width: 100%"
            v-model="task.online_time"
            type="datetime"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col span="6">
        <el-form-item label="紧急程度：">
          <el-select v-model="task.urgency" placeholder="请选择紧急程度" style="width: 100%">
            <el-option
              v-for="item in urgency"
              :key="item.key"
              :label="item.label"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col span="6">
        <el-form-item label="出品格式：">
          <el-select v-model="task.layout_type" placeholder="请选择出品格式" style="width: 100%">
            <el-option
              v-for="item in layout_type"
              :key="item.key"
              :label="item.label"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>

<script>
  import { BASE_API } from '../../../config/dev.env.js'
  export default {
    name: 'taskInfo',
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    props: {
      task: {
        type: Object
      },
      jobtype: {
        type: Array
      },
      member: {
        type: Array
      },
      urgency: {
        type: Array
      },
      layout_type: {
        type: Array
      }
    },
    computed: {
      action() {
        const actionURL = (BASE_API + 'api/v1/File/uploadpicture').replace(/"/g, '')
        return actionURL
      }
    },
    methods: {
      rowClick(row, event, index) {
        this.currentRow = row
      },
      handleAvatarSuccess(res, file) {
        const rowIndex = this.task.tonality.findIndex(item => item.key === this.currentRow.key)
        console.log(res)
        if (res.error === 0 && res.data.status === 1) {
          this.$set(this.task.tonality, rowIndex, { ...this.currentRow, img: res.data.id, imgSrc: res.data.path })
          // this.$message({
          //   message: '上传成功',
          //   type: 'success'
          // })
        } else {
          this.$message({
            message: '上传失败',
            type: 'error'
          })
        }
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!')
        }
        this.fileInfo = file
        return isLt2M
      },
      addTonalityToList() {
        this.task.tonality.push({ key: +new Date(), img: 0 })
      },
      removeTonalityFromList(index) {
        this.task.tonality.splice(index, 1)
      }
    }
  }
</script>
