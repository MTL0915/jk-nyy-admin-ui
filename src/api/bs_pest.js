import request from '@/utils/request'

export function getPestCascader() {
  return request({
    url: 'bs_pest/getPestCascader',
    method: 'get'
  })
}

export function get(id) {
  return request({
    url: 'bs_pest/get',
    method: 'get',
    params:{
      id:id
    }
  })
}

