<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <h3 class="index-title">策略中心工单管理系统</h3>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="user-name">
        <p>{{name}}</p>
        <i class="el-icon-caret-bottom"></i>
      </div>
      <div class="avatar-wrapper">
        <!--<img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">-->
        <img class="user-avatar" src="./user.gif">
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/staff/userInfo">
          <el-dropdown-item>个人信息</el-dropdown-item>
        </router-link>
        <!--<router-link class="inlineBlock" to="/setpassword/index">-->
          <!--<el-dropdown-item>修改密码</el-dropdown-item>-->
        <!--</router-link>-->
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">安全退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-badge is-dot >
      <span>
        <svg-icon icon-class="tips" />
      </span>
    </el-badge>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  /*width: calc(100% - 180px);*/
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  background: #FFF;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .user-name {
    float: left;
    height: 50px;
    margin: 0 10px;
    cursor: pointer;
  }
  .user-name i, p {
    display: block;
    float: left;
  }
  .user-name p {
    height: 50px;
    line-height: 50px;
    padding: 0 5px;
    font-size: 16px;
  }
  .user-name i {
    margin-top: 20px;
  }
  .avatar-container {
    width: 150px;
    height: 50px;
    float: right;
    margin-right: 15px;
    .avatar-wrapper {
      width: 36px;
      height: 36px;
      overflow: hidden;
      cursor: pointer;
      border-radius: 20px;
      margin-top: 7px;
      .user-avatar {
        width: 36px;
        height: 36px;
        border-radius: 20px;
      }
    }
  }
  .el-badge {
    width: 20px;
    height: 20px;
    margin-top: 15px;
    margin-right: 10px;
    float: right;
    font-size: 0;
    position: relative;
    cursor: pointer;
  }
  .el-badge span {
    position: absolute;
    top: -12px;
    left: 0;
    display: block;
    font-size: 16px;
  }
  .index-title {
    width: 500px;
    height: 50px;
    float: left;
    line-height: 50px;
    font-size: 20px;
    color: #1e2835;
    margin-left: 20px;
    padding: 0;
    outline: none;
  }
}

</style>

