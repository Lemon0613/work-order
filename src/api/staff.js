import request from '@/utils/request'

// 根据uid获取用户信息
function getUserInfoById(uid) {
  return request({
    url: 'api/v1/user/FindUser',
    method: 'post',
    data: { id: uid }
  })
}

// 部门管理-------------------------------------
const departmentManageAPI = {
  // 获取部门状态
  getDepartmentStatus: 'api/v1/Department/GetDepartmentStatus',
  // 获取所有一级部门
  getAllDepartmentRoot: 'api/v1/Department/GetDepartments',
  // 获取所有部门列表
  getAllDepartment: 'api/v1/Department/GetAll',
  // 增加一级部门
  createDepartment: 'api/v1/Department/CreateDepartment',
  // 获取一级部门详情
  getDepartmentInfo: 'api/v1/Department/FindDepartment',
  // 修改一级部门信息
  updateDepartment: 'api/v1/Department/UpdateDepartment',
  // 增加子部门
  createSubDepartment: 'api/v1/Subdepart/CreateGroup',
  // 修改子部门
  updateSubDepartment: 'api/v1/Subdepart/UpdateGroup',
  // 获取子部门详情
  getSubDepartmentInfo: 'api/v1/Subdepart/FindGroup'
}

function departmentManage(API, args) {
  return request({
    url: departmentManageAPI[API],
    method: 'post',
    data: args
  })
}
// 部门管理-------------------------------------

export {
  getUserInfoById,
  departmentManage
}
