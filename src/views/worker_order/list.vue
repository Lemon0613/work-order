<template>
  <div class="my-work">
    <div class="work-form">
      <el-row :gutter="20">
        <el-col :span="3" :offset="21">
          <el-dropdown @command="jump">
            <el-button type="primary">
              立即下单<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="/worker_order/design">创意工单</el-dropdown-item>
              <el-dropdown-item command="/worker_order/copywriter">文案工单</el-dropdown-item>
              <el-dropdown-item command="/worker_order/technical_order">技术工单</el-dropdown-item>
              <el-dropdown-item>Flash工单</el-dropdown-item>
              <el-dropdown-item>媒介执行单</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="开始时间">
              <el-date-picker type="date" placeholder="选择日期" style="width: 100%;" v-model="form.date1"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结束时间">
              <el-date-picker type="date" placeholder="选择日期" style="width: 100%;" v-model="form.date1"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="工单类型">
              <el-select v-model="form.region1" placeholder="请选择类型">
                <el-option label="创意工单" value="chuangyi"></el-option>
                <el-option label="技术工单" value="jishu"></el-option>
                <el-option label="文案工单" value="wenan"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="客户">
              <el-select v-model="form.region2" placeholder="请选择客户">
                <el-option label="长安马自达" value="mazida"></el-option>
                <el-option label="奇瑞新能源" value="qirui"></el-option>
                <el-option label="一汽丰田" value="fengtian"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="工单状态">
              <el-select v-model="form.region3" placeholder="请选择状态">
                <el-option label="首轮" value="first"></el-option>
                <el-option label="修改" value="modify"></el-option>
                <el-option label="再创意" value="agagin"></el-option>
                <el-option label="完成" value="over"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="执行状态">
              <el-select v-model="form.region4" placeholder="请选择状态">
                <el-option label="未确认" value="first"></el-option>
                <el-option label="执行中" value="modify"></el-option>
                <el-option label="已完结" value="agagin"></el-option>
                <el-option label="停滞" value="over"></el-option>
                <el-option label="取消" value="over"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item>
              <el-button type="primary" @click="onSubmit">筛选</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="work-table">
      <el-table
        :data="projectList"
        border
        stripe
        style="width: 100%">
        <el-table-column
          prop="number"
          label="项目号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="工单名称">
        </el-table-column>
        <el-table-column
          prop="w_type"
          label="类型"
          width="80">
        </el-table-column>
        <el-table-column
          prop="w_status"
          label="工单状态"
          width="80">
        </el-table-column>
        <el-table-column
          prop="client"
          label="客户"
          width="120">
        </el-table-column>
        <el-table-column
          prop="creater"
          label="下单人"
          width="70">
        </el-table-column>
        <el-table-column
          prop="w_num"
          label="作业数量"
          width="80">
        </el-table-column>
        <el-table-column
          prop="addtime"
          label="下单日期"
          width="95">
        </el-table-column>
        <el-table-column
          prop="exec_status"
          label="执行状态"
          width="80">
        </el-table-column>
        <el-table-column
          label="操作"
          width="290">
          <template slot-scope="scope">
            <el-button @click="showDetail(scope)" type="primary" size="small" plain>查看</el-button>
            <el-button type="success" size="small" plain>复制</el-button>
            <el-button type="warning" size="small" plain>修改</el-button>
            <el-button type="danger" size="small" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="work-btns">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-button type="primary" size="small">再创意</el-button>
          <el-button type="primary" size="small">修改单</el-button>
          <el-button type="primary" size="small">完稿单</el-button>
        </el-col>
        <el-col :span="10" :offset="6" v-if="projectPageCount > 0">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handleClick"
            :current-page.sync="currentPage"
            :page-count="projectPageCount">
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'list',
    data() {
      return {
        isRouter: true,
        form: {
          name: '',
          region1: '',
          region2: '',
          region3: '',
          region4: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        currentPage: 1
      }
    },
    mounted() {
      console.log('mounted')
      this.handleClick(0)
    },
    computed: {
      ...mapGetters([
        'uid',
        'projectList',
        'projectPageCount'
      ])
    },
    methods: {
      onSubmit() {
        console.log('submit!')
        this.handleClick()
      },
      showDetail(scope) {
        console.log(scope)
        this.$router.push('/worker_order/design_info?id=' + scope.row.o_id)
      },
      handleClick(page) {
        this.$store.dispatch('getProjectList', { user: this.uid, page }).then(res => {
          this.currentPage = page
          console.log('handleClick', res, this.projectList)
        })
      },
      jump(url) {
        console.log(url)
        this.$router.push(url)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .my-work
    width: 100%
    min-width: 960px
    max-width: 1500px
    .work-form
      display: table
      width: 90%
      margin: 0 auto
      position: relative
      .el-form
        padding-top: 10px
    .work-table, .work-btns
      width: 90%
      margin: 0 auto
      padding-top: 30px
      padding-bottom: 50px
    .work-table .el-table__header-wrapper table
      background: #f5f7fa
</style>
