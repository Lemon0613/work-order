<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <sidebar class="sidebar-container"></sidebar>
    <!--<nav-menu class="sidebar-container" :iscollapse="isCollapse" :active="url" :bgcolor="bgcolor"></nav-menu>-->
    <div class="main-container">
      <navbar></navbar>
      <breadcrumb class="breadcrumb"></breadcrumb>
      <app-main></app-main>
      <footer class="footer">北京百孚思广告-策略中心-技术组</footer>
    </div>
  </div>
</template>

<script>
import { Sidebar, AppMain, Navbar } from '@/views/layout/components'
import NavMenu from '@/views/layout/components/NavMenu.vue'
import Breadcrumb from '@/components/Breadcrumb'

// const clientHeight = document.documentElement.clientHeight - 50
const bgcolor = '#304156'

export default {
  name: 'layout',
  data: function() {
    return {
      isCollapse: false,
      bgcolor: bgcolor
    }
  },
  components: {
    NavMenu,
    Navbar,
    Sidebar,
    AppMain,
    Breadcrumb
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    menuWidth() {
      return this.$store.state.app.sidebar.opened ? 200 : 64
    },
    url() {
      return this.$route.path
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/mixin.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100vh;
  width: 100%;
  .logo{
    height: 50px;
    position: fixed;
    background: #304156;
    width: 200px;
    color: #fff;
    font-weight: 800;
    font-size: 20px;
    text-align: center;
    line-height: 50px;
    border-bottom: 1px solid #595959;
  }
}
.breadcrumb {
  width: 100%;
  height: 32px;
  line-height: 32px;
  text-indent: 20px;
  background: #f5f5f5;
}
.footer {
  display: block;
  width: 100%;
  height: 36px;
  line-height: 36px;
  color: #999;
  font-size: 14px;
  padding: 0 20px;
  text-align: right;
  background: #e4e4e4;
  position: fixed;
  bottom: 0;
  right: 0;
}
.el-menu{
  border-right: none
}
</style>
