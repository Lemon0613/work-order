import request from '@/utils/request'

export function login(name, password) {
  // console.log(name, password)
  return request({
    url: 'api/v1/Login/login',
    method: 'post',
    data: {
      name,
      password
    }
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
