import {
  getUserInfoById,
  departmentManage
} from '@/api/staff'
const staff = {
  actions: {
    getUserInfoById({ commit }, args) {
      return new Promise((res, rej) => {
        getUserInfoById(args.uid).then(response => {
          res(response)
        }).catch(err => {
          rej(err)
        })
      })
    },
    getAllDepartment({ commit }, args) {
      return new Promise((res, rej) => {
        departmentManage('getAllDepartment', args).then(response => {
          res(response)
        }).catch(err => {
          rej(err)
        })
      })
    },
    getAllDepartmentRoot({ commit }, args) {
      return new Promise((res, rej) => {
        departmentManage('getAllDepartmentRoot', args).then(response => {
          res(response)
        }).catch(err => {
          rej(err)
        })
      })
    },
    getDepartmentStatus({ commit }) {
      return new Promise((res, rej) => {
        departmentManage('getDepartmentStatus').then(response => {
          res(response)
        }).catch(err => {
          rej(err)
        })
      })
    },

    createSubDepartment({ commit }, args) {
      return new Promise((res, rej) => {
        departmentManage('createSubDepartment', args).then(response => {
          res(response)
        }).catch(err => {
          rej(err)
        })
      })
    },
    updateDepartment({ commit }, args) {
      return new Promise((res, rej) => {
        departmentManage('updateDepartment', args).then(response => {
          res(response)
        }).catch(err => {
          rej(err)
        })
      })
    },
    getDepartmentInfo({ commit }, args) {
      return new Promise((res, rej) => {
        departmentManage('getDepartmentInfo', args).then(response => {
          res(response)
        }).catch(err => {
          rej(err)
        })
      })
    },

    createDepartment({ commit }, args) {
      return new Promise((res, rej) => {
        departmentManage('createDepartment', args).then(response => {
          res(response)
        }).catch(err => {
          rej(err)
        })
      })
    },
    updateSubDepartment({ commit }, args) {
      return new Promise((res, rej) => {
        departmentManage('updateSubDepartment', args).then(response => {
          res(response)
        }).catch(err => {
          rej(err)
        })
      })
    },
    getSubDepartmentInfo({ commit }, args) {
      return new Promise((res, rej) => {
        departmentManage('getSubDepartmentInfo', args).then(response => {
          res(response)
        }).catch(err => {
          rej(err)
        })
      })
    }
  }
}

export default staff
