import { createProject, getUserList, getAllProject, getProjectInfo, checkOrder, uploadFile } from '@/api/projects'

const project = {
  state: {
    projectInfo: {},
    projectList: [],
    options: {},
    projectPageCount: 1,
    projectInfoSearch: {}
  },

  mutations: {
    SET_PROJECT: (state, projectInfo) => {
      state.projectInfo = projectInfo
    },
    ADD_PROJECT_TO_LIST: (state, projectInfo) => {
      state.projectList.push(projectInfo)
    },
    SET_OPTIONS: (state, options) => {
      state.options = options
    },
    SET_PROJECT_LIST: (state, list) => {
      state.projectList = list
    },
    SET_PROJECT_PAGE_COUNT: (state, count) => {
      state.projectPageCount = count
    },
    SET_PROJECT_INFO: (state, data) => {
      state.projectInfoSearch = data
    }
  },

  actions: {
    createProject({ commit }, project) {
      return new Promise((resolve, reject) => {
        createProject(project).then(res => {
          console.log('create project', res)
          commit('SET_PROJECT', res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getAllOptions({ commit }, userid) {
      return new Promise((resolve, reject) => {
        getUserList(userid).then(res => {
          console.log('GetAllOptions', res)
          const { data } = res
          commit('SET_OPTIONS', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getProjectList({ commit }, args) {
      return new Promise((resolve, reject) => {
        return getAllProject(args.user, args.page).then(res => {
          const { data, page_count } = res
          commit('SET_PROJECT_LIST', data)
          commit('SET_PROJECT_PAGE_COUNT', page_count)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    getProjectInfo({ commit }, args) {
      return new Promise((resolve, reject) => {
        return getProjectInfo(args.user, args.id).then(res => {
          const { data: { order }} = res
          order.principal = order.principal && order.principal.id
          order.o_create_user = order.o_create_user && order.o_create_user.id
          order.o_client = order.o_client && order.o_client.id
          order.email_user = order.email_user && order.email_user.map(item => item.id)
          order.email_copy = order.email_copy && order.email_copy.map(item => item.id)

          commit('SET_PROJECT_INFO', order)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    checkOrder({ commit }, args) {
      return checkOrder(args.type, args.id, {
        user: args.uid,
        status: args.status,
        check_info: args.check_info
      }).then(res => {
        console.log('checkOrder', res)
      }).catch(err => {
        console.log(err)
      })
    },
    uploadFile({ commit }, args) {
      return new Promise((resolve, reject) => {
        return uploadFile(args.file).then(res => {
          console.log('uploadFile', res)
          resolve(res)
        }).catch(err => {
          console.log('store Error: ', err)
          reject(err)
        })
      })
    }
  }
}

export default project
