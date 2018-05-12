import router from './router'
import store from './store'
// import request from '@/utils/request'

import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  console.log('getToken()', getToken())
  if (getToken() && getToken() !== 'undefined') {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const { username, password } = localStorage
      console.log(username, password)
      store.dispatch('Login', { username, password }).then(res => { // 拉取用户信息
        if (to.path.indexOf('/worker_order') >= 0) {
          store.dispatch('getAllOptions', store.getters.id).then().catch(err => {
            console.log(err)
            Message.error('获取用户列表失败')
          })
          next()
        } else {
          console.log(to.path)
          next()
        }
      }).catch(() => {
        store.dispatch('FedLogOut').then(() => {
          Message.error('验证失败,请重新登录')
          next({ path: '/login' })
        })
      })
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
    // console.log(store)
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
