<template>
  <div class="dashboard-container">
    <div class="dashboard-text">{{nowTime}}&nbsp;&nbsp;&nbsp;你好，<span>{{name}}</span></div>
    <el-row :gutter="24" class="pt20">
      <el-col :span="6">
        <el-card class="box-card card1">
          我的工单(10)
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card card2">
          <el-menu text-color="#fff" background-color="#3da4f4" mode="horizontal" router=true>
            <el-submenu index="2">
              <div slot="title" style="font-size: 16px">新建工单</div>
              <el-menu-item index="/work_order/design">创意工单</el-menu-item>
              <el-menu-item index="2-2">技术工单</el-menu-item>
              <el-menu-item index="2-3">文案工单</el-menu-item>
              <el-menu-item index="2-4">Flash工单</el-menu-item>
              <el-menu-item index="2-5">媒介执行单</el-menu-item>
              <el-submenu index="2-6">
                <template slot="title">采购单</template>
                <el-menu-item index="2-6-1">创意采购单</el-menu-item>
                <el-menu-item index="2-6-2">技术采购单</el-menu-item>
                <el-menu-item index="2-6-3">文案采购单</el-menu-item>
                <el-menu-item index="2-6-4">视频采购单</el-menu-item>
                <el-menu-item index="2-6-5">其他采购单</el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card card3">
          我的日报
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card card4">
          提交日报
        </el-card>
      </el-col>
    </el-row>
    <el-row style="padding-top: 100px">
      <el-col :span="24" class="remark-tips">
        <h2>策略中心工单管理系统</h2>
        <p>开发者：百孚思策略中心技术组</p>
        <p>版本号：V0.0.12</p>
        <p>更新日期：2018-04-28</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import util from '@/utils/index'
import ElCol from 'element-ui/packages/col/src/col'

export default {
  components: { ElCol },
  name: 'index',
  data() {
    return {
      nowTime: util.parseTime(new Date(), '{y}年{m}月{d}日'),
      activeIndex: '1'
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ]),
    uname() {
      console.log(this.$store.getters)
      return this.$store.getters.name
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    toNewDesign() {
      this.$router.push({
        path: '../work_order/design'
      })
    }
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus" scoped>
  mainColor = #304156
  textColor = #409EFF
  themeColor1 = #47cac6
  themeColor2 = #3da4f4
  themeColor3 = #f24e6d
  themeColor4 = #ad91e2
  .dashboard-container
    width: 90%
    margin: 0 auto
    .dashboard-text
      padding-top: 60px
      font-size: 18px
      line-height: 30px
      color: mainColor
      & > span
        color: textColor

.dashboard {
  &-container {
    margin: 50px;
    .menu-item-title{
      font-size: 16px;
    }
    .el-card {
      height: 150px;
      line-height: 120px;
      text-align: center;
      cursor: pointer;
      color: #fff;
      .el-menu{
        border: none;
        margin-top: 30px;
        text-align: center;
        .el-submenu{
          width: 100%;
        }
      }
    }
  }
  &-text {
    font-size: 18px;
    line-height: 30px;
    padding-bottom 10px;
  }
}
.main-pro {
  width: 950px;
  margin-top: 30px;
}
.main-pro ul {
  display: flex;
  justify-content: space-between;
}
.main-pro ul li {
  width: 215px;
  text-align: center;
  line-height: 100px;
  height: 100px;
  background: #e5e5e5;
}
.card1 {
  background: themeColor1
}
.card2 {
  background: themeColor2
}
.card3 {
  background: themeColor3
}
.card4 {
  background: themeColor4
}
.box-card {
  transition: all 0.4s;
}
.card1:hover {
  background: #3ab7b7
}
.card2:hover {
  background: #3183c3
}
.card2:hover .el-menu, .card2:hover ul {
  background: #3183c3
}
.card3:hover {
  background: #d93c59
}
.card4:hover {
  background: #8e70c6
}
.remark-tips {
  color: #999
}
.remark-tips h2 {
  font-size: 22px;
  line-height: 40px;
  font-weight: normal;
}
.remark-tips p {
  font-size: 14px;
  line-height: 26px
}
</style>
