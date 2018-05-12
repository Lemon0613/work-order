<template>
  <scroll-bar>
    <h3 class="logo"><router-link to="/">IFORCE</router-link></h3>
    <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  data() {
    return {
    }
  },
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .logo
    width: 100%
    height: 60px
    line-height: 60px
    font-size: 28px
    text-align: center
    color: #FFF
    margin-top: 30px
</style>
