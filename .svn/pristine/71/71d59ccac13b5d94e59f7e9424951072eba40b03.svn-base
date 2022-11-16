import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/access_token/get',
    method: 'get',
    params: data
  })
}

export function getInfo(loginid) {
  return request({
    url: '/bs/bs_user/getDetailInfoByLoginid',
    method: 'get',
    params: { loginid }
  })
}

export function logout() {
  return request({
    url: '/access_token/remove',
    method: 'get'
  })
}

