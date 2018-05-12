import { jobTypeSetting, executionTypeSetting } from '@/api/setting'

const setting = {
  actions: {
    getTypeList: ({ commit }, args) => {
      return new Promise((resolve, reject) => {
        jobTypeSetting('getTypeList', args).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 作业类型设置
    getJobTypeList: ({ commit }, args) => {
      return new Promise((resolve, reject) => {
        jobTypeSetting('getJobTypeList', args).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    createJobType: ({ commit }, args) => {
      return new Promise((resolve, reject) => {
        jobTypeSetting('createJobType', args).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateJobType: ({ commit }, args) => {
      return new Promise((resolve, reject) => {
        jobTypeSetting('updateJobType', args, args.id).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getJobTypeDetail: ({ commit }, args) => {
      return new Promise((resolve, reject) => {
        jobTypeSetting('getJobTypeDetail', args, args.id).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 执行内容设置
    getExecutionTypeList: ({ commit }, args) => {
      return new Promise((resolve, reject) => {
        executionTypeSetting('getExecutionTypeList', args).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    createExecutionType: ({ commit }, args) => {
      return new Promise((resolve, reject) => {
        executionTypeSetting('createExecutionType', args).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateExecutionType: ({ commit }, args) => {
      return new Promise((resolve, reject) => {
        executionTypeSetting('updateExecutionType', args, args.id).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getExecutionTypeDetail: ({ commit }, args) => {
      return new Promise((resolve, reject) => {
        executionTypeSetting('getExecutionTypeDetail', args, args.id).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default setting
