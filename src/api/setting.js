import request from '@/utils/request'

// 作业类型接口配置
const jobTypeSettingAPI = {
  // 作业类型列表
  getJobTypeList: 'api/v1/Jobtype/jobTypeList',
  // 获取作业所属类型选项
  getTypeList: 'api/v1/Jobtype/typeList',
  // 新增作业类型
  createJobType: 'api/v1/Jobtype/createJobType',
  // 编辑作业类型
  updateJobType: 'api/v1/Jobtype/updateJobType/job/',
  // 查看作业类型详情
  getJobTypeDetail: 'api/v1/Jobtype/jobTypeDetail/job/'
}

// 执行内容类型接口配置
const executionTypeSettingAPI = {
  // 执行内容列表
  getExecutionTypeList: 'api/v1/Execution/jobTypeList',
  // 新增执行内容
  createExecutionType: 'api/v1/Execution/createJobType',
  // 编辑执行内容
  updateExecutionType: 'api/v1/Execution/updateJobType/job/',
  // 查看执行内容详情
  getExecutionTypeDetail: 'api/v1/Execution/jobTypeDetail/job/'
}

function jobTypeSetting(fnName, args, id) {
  console.log(fnName, args, id)
  return request({
    url: id ? jobTypeSettingAPI[fnName] + id : jobTypeSettingAPI[fnName],
    method: 'post',
    data: args
  })
}

function executionTypeSetting(fnName, args, id) {
  console.log(fnName, args, id)
  return request({
    url: id ? executionTypeSettingAPI[fnName] + id : executionTypeSettingAPI[fnName],
    method: 'post',
    data: args
  })
}

export { jobTypeSetting, executionTypeSetting }
