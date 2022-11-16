import request from '@/utils/request'

export function login(username, password, code, uuid) {
  return request({
    url: 'auth/login',
    method: 'post',
    data: {
      username,
      password,
      code,
      uuid
    }
  })
}

export function phoneLogin(data) {
  return request({
    url: 'auth/phoneLogin',
    method: 'post',
    data
  })
}

export function autoLogin(data) {
  return request({
    url: 'auth/directLogin2',
    method: 'post',
    data
  })
}

export function autoLogin2(data) {
  return request({
    url: 'auth/directLogin2',
    method: 'post',
    params: data
  })
}

export function login2() {
  return request({
    url: 'auth/info',
    method: 'get'
  })
}

export function getInfo() {
  return request({
    url: 'auth/info',
    method: 'get'
  })
}

export function getCodeImg() {
  return request({
    url: 'auth/vCode',
    method: 'get'
  })
}
//获取登录模板信息
export function getCustom(data) {
  return request({
    url: 'custom/base/get',
    method: 'get',
    params: data
  })
}
//获取阅览登录模板信息
export function getCustomView(data) {
  return request({
    url: 'custom/base/getById',
    method: 'get',
    params: data
  })
}


// 获取大屏token
export function getDataViewToken() {
  return request({
    url: 'auth/getDataViewToken',
    method: 'get'
  })
}

//初始化索引（演示时候使用）
export function initIndex() {
  return request({
    url: 'solr/initIndex',
    method: 'get'
  })
}