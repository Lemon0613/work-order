import request from '@/utils/request'

export function getDailyWorkList(user) {
  return request({
    url: 'api/v1/Dailywork/getDailyWorkList',
    method: 'post',
    data: { user }
  })
}

export function getDailyInfo(user) {
  return request({
    url: 'api/v1/Dailywork/indexInfo',
    method: 'post',
    data: { user }
  })
}

export function getDailyWorkDetail(user) {
  return request({
    url: 'api/v1/Dailywork/getDailyWorkDetail',
    method: 'post',
    data: { user }
  })
}

export function submitWork(args) {
  console.log(args)
  return request({
    url: 'api/v1/Dailywork/submitWork',
    method: 'post',
    data: args
  })
}

