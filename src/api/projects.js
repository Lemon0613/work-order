import request from '@/utils/request'

export function createProject(project) {
  return request({
    url: 'api/v1/Design/UpdateDesignOrder',
    method: 'post',
    data: project
  })
}

export function getUserList(userid) {
  return request({
    url: 'api/v1/Order/GetLinkInfo',
    method: 'post',
    data: { user: userid }
  })
}
export function getAllProject(user, page) {
  return request({
    url: 'api/v1/Order/getAllOrders',
    method: 'post',
    data: { user, page }
  })
}

export function getProjectInfo(user, id) {
  return request({
    url: 'api/v1/Design/DesignOrderDetail/order/' + id,
    method: 'post',
    data: { user }
  })
}

export function checkOrder(type, id, args) {
  return request({
    url: 'api/v1/order/checkOrder/orderid/' + id + '/type/' + type,
    method: 'post',
    data: args
  })
}

export function uploadFile(file) {
  return request({
    url: 'api/v1/File/uploadpicture',
    method: 'post',
    data: { file: file }
  })
}
