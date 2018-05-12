<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form">
      <h3 class="title">百孚思工单管理系统</h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="password"></el-input>
          <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
      </el-form-item>
      <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin"> 登 录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        username: 'liyajun',
        password: '123456'
      },
      loading: false,
      pwdType: 'password'
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.loading = true
      this.$store.dispatch('Login', this.loginForm).then((res) => {
        this.$router.push({ path: '/index' })
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus">
  $bg = #2d3a4b
  $dark_gray = #889aa4
  $light_gray = #3e3e3e

  html,body
    margin 0
    padding 0
  .login-container
    position: fixed
    height: 100%
    width:100%
    background-color: $bg
    input:-webkit-autofill
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset
      -webkit-text-fill-color: #fff
    input
      background: transparent
      border: 0px
      -webkit-appearance: none
      border-radius: 0px
      padding: 8px 5px 8px 15px
      color: $light_gray
      height: 46px
    .el-input
      display: inline-block
      height: 46px
      width: 85%

    .svg-container
      padding: 6px 5px 6px 15px
      color: $dark_gray
      vertical-align: middle
      width: 30px
      display: inline-block
      &_login
        font-size: 20px
    .title
      font-size: 26px
      font-weight: 400
      color: #eee
      margin: 0px auto 40px auto
      text-align: center
      font-weight: bold
    .login-form
      position: absolute
      left: 0
      right: 0
      width: 400px
      padding: 35px 35px 15px 35px
      margin: 120px auto
    .el-form-item
      // border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 1)
      border-radius: 5px
      color: #454545
      height: 46px
    .show-pwd
      position: absolute
      right: 10px
      top: 7px
      font-size: 16px
      color: $dark_gray
      cursor: pointer
      user-select:none
    .thirdparty-button
      position: absolute
      right: 35px
      bottom: 28px
    .el-button
      height: 42px
</style>
