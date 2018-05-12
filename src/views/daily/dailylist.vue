<template>
  <div class="container">
    <div class="content">
      <h5 class="class-title">日报列表：</h5>
      <el-form ref="form" :model="dailylistForm" label-width="80px" size="small">
        <el-row class="dailylist-form">
          <el-col :span="4" offset="1">
            <el-date-picker type="date" placeholder="开始日期" v-model="dailylistForm.dateStart" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-date-picker type="date" placeholder="结束日期" v-model="dailylistForm.dateEnd" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-button type="primary" @click="dailylistSearch">搜索</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="dailylistDown">下载工作日志</el-button>
          </el-col>
          <el-col :span="3" :offset="5">
            <el-button type="success" @click="toSibmitDaily">提交日报</el-button>
          </el-col>
        </el-row>
        <el-row class="dailylist-table">
          <el-col :span="22" offset="1">
            <el-table :data="dailylistTable" border style="width: 100%" v-loading="loading">
              <el-table-column
                prop="id"
                label="ID"
                width="60">
              </el-table-column>
              <el-table-column
                prop="user_name"
                label="姓名">
              </el-table-column>
              <el-table-column
                prop="job_time"
                label="工作日期">
              </el-table-column>
              <el-table-column
                prop="total_time"
                label="工作总时间">
              </el-table-column>
              <el-table-column
                prop="create_time"
                label="提交时间">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-button @click="" type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-form>
      <el-row class="dailylist-sort">
        <el-col :span="9" :offset="15">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="dailylistTable.length">
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'dailylist',
    data() {
      return {
        loading: true,
        dailylistForm: {
          dateStart: '',
          dataEnd: ''
        },
        dailylistTable: []
      }
    },
    mounted() {
      this.dailylistSearch()
    },
    computed: {
      ...mapGetters([
        'uid'
      ])
    },
    methods: {
      dailylistSearch(page) {
        this.$set(this, 'loading', true)
        this.$store.dispatch('getDailyWorkList', this.uid).then(res => {
          this.$set(this, 'loading', false)
          console.log(res.data)
          this.$set(this, 'dailylistTable', res.data)
        })
      },
      dailylistDown() {

      },
      toSibmitDaily() {
        this.$router.push({ path: './submitdaily' })
      }

    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .dailylist-form
    padding: 30px 0
  .dailylist-table
    padding-bottom: 30px
</style>
