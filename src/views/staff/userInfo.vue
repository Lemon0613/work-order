<template>
  <div class="container">
    <h3 class="title">用户信息</h3>
    <el-form labelWidth="100px" size="small">
      <el-row>
        <el-col :span="10" :offset="7">
          <el-form-item label="姓名：">
            <el-input v-model="userInfo.name" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="7">
          <el-form-item label="邮箱：">
            <el-input v-model="userInfo.email" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="7">
          <el-form-item label="电话：">
            <el-input v-model="userInfo.phone" :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="7">
          <el-form-item label="性别：">
            <el-select v-model="userInfo.sex" placeholder="请选择" :disabled="disabled" style="width: 100%;">
              <el-option value="男">男</el-option>
              <el-option value="女">女</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="7">
          <el-form-item label="生日：">
            <el-date-picker style="width: 100%;"
              v-model="userInfo.birthday"
              type="date"
              :disabled="disabled"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="7">
          <el-form-item label="部门分组：">
            <el-select v-model="userInfo.partment" :disabled="disabled" placeholder="请选择" style="width: 100%;">
              <el-option value="男">男</el-option>
              <el-option value="女">女</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="7">
          <el-form-item label="职位：">
            <el-select v-model="userInfo.position" :disabled="disabled" placeholder="请选择" style="width: 100%;">
              <el-option value="男">男</el-option>
              <el-option value="女">女</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="7">
          <el-form-item label="角色：">
            <el-select v-model="userInfo.role" :disabled="disabled" placeholder="请选择" style="width: 100%;">
              <el-option value="男">男</el-option>
              <el-option value="女">女</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="7">
          <el-form-item label="入职时间：">
            <el-date-picker style="width: 100%;"
              v-model="userInfo.entry_time"
              type="date"
              :disabled="disabled"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="7">
          <el-form-item label="状态：">
            <el-select v-model="userInfo.status" :disabled="disabled" placeholder="请选择" style="width: 100%;">
              <el-option value="男">男</el-option>
              <el-option value="女">女</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="7">
          <el-form-item label="状态：">
            <el-select v-model="userInfo.status" :disabled="disabled" placeholder="请选择" style="width: 100%;">
              <el-option value="男">男</el-option>
              <el-option value="女">女</el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'userInfo',
    data() {
      console.log(this.$store.getters)
      return {
        userInfo: {},
        disabled: true
      }
    },
    computed: {
      ...mapGetters([
        'uid'
      ])
    },
    mounted() {
      this.$store.dispatch('getUserInfoById', { uid: this.uid }).then(res => {
        const { data } = res
        console.log(data)
        this.$set(this, 'userInfo', data)
      }).catch(err => {
        console.log(err)
        this.$message({
          message: err,
          type: 'error'
        })
      })
    }
  }
</script>
<style>
  .title{
    text-align: center;
    margin: 20px;
  }
</style>
