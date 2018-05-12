import { getDailyWorkList, getDailyInfo, getDailyWorkDetail, submitWork } from '@/api/daily'

const daily = {
  state: {
    dailyInfo: {}
  },
  mutations: {
    SET_DAYLY_INFO: (state, info) => {
      state.dailyInfo = info
    }
  },
  actions: {
    getDailyWorkList: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        getDailyWorkList(user).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getDailyInfo({ commit }, user) {
      return new Promise((resolve, reject) => {
        getDailyInfo(user).then(res => {
          console.log(res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getDailyWorkDetail({ commit }, user) {
      return new Promise((resolve, reject) => {
        getDailyWorkDetail(user).then(res => {
          console.log(res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    submitWork({ commit }, args) {
      return new Promise((resolve, reject) => {
        delete args.post
        delete args.name
        submitWork(args).then(res => {
          console.log(res)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default daily
