<template>
  <div style="padding: 100px">
    <h3>接口数据测试</h3>
    <br>
    <el-button type="primary" @click="getData">GET请求</el-button>
    <el-button type="primary" @click="postData">POST请求</el-button>
    <br>
    <div >{{userData}}</div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'system',
    data() {
      return {
        userData: ''
      }
    },
    methods: {
      getData() {
        axios.get('http://scpm.demo.iforce-media.com/api/v1/Order/GetLinkInfo', {
          params: {
            userId: '01'
          }
        }).then((res) => {
          this.userData = res.data
          console.log(res)
        }).catch((err) => {
          console.log('error', err)
        })
      },
      postData() {
        axios.post(
          'http://scpm.demo.iforce-media.com/api/v1/Order/GetLinkInfo',
          {
            userId: '02'
          },
          {
            headers: {
              token: 'test'
            }
          }
        ).then(res => {
          this.userData = res.data
          console.log(res)
        })
      }
    }
  }
</script>

<style scoped>

</style>
