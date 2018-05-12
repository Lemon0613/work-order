<template>
  <scroll-bar>
    <h3 class="logo"><router-link v-show="showLogo" to="/">IFORCE</router-link></h3>
  <el-menu
    class="el-menu-vertical-demo"
    text-color="#fff"
    active-text-color="#409EFF"
    :unique-opened="true"
    :style="{borderRight:'none'}"
    :router={isRouter}
    :defaultActive="active"
    :backgroundColor="bgcolor"
    :collapse="iscollapse">
    <el-menu-item :index="'/'">
      <i class="el-icon-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
      <el-menu-item :index="item.path" v-if="!item.children || item.children.length == 0">
        <i :class="item.meta&&item.meta.icon"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
      <template
        v-for="item in routes"
        v-if="!item.hidden">
        <el-menu-item :index="item.path" v-if="!item.children || item.children.length == 0">
          <i :class="item.meta&&item.meta.icon"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>

        <el-menu-item :index="item.path+'/'+item.children[0].path" v-if="item.children && item.nochildren">
          <i :class="item.meta&&item.meta.icon"></i>
          <span slot="title">{{item.children[0].name}}</span>
        </el-menu-item>

        <el-submenu :index="item.path" v-else>
          <template slot="title">
            <i :class="item.meta&&item.meta.icon"></i>
            <span slot="title">{{item.name}}</span>
          </template>
          <template v-for="sub in item.children" v-if="!sub.hidden">
            <i :class="sub.meta&&sub.meta.icon"></i>
            <el-menu-item :index="item.path+'/'+sub.path">{{sub.name}}</el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </scroll-bar>
</template>

<script>
  import ScrollBar from '@/components/ScrollBar'

  export default {
    name: 'NavMenu',
    data: function() {
      return {
        isRouter: true,
        showLogo: true
      }
    },
    components: {
      ScrollBar
    },
    computed: {
      routes() {
        return this.$router.options.routes
      }
    },
    props: {
      iscollapse: {
        type: Boolean
      },
      bgcolor: {
        type: String
      },
      active: {
        type: String
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
