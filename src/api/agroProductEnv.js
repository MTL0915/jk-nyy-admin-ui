import request from '@/utils/request'
import { initData } from './data'

export function add(data) {
  return request({
    url: 'api/agroProductEnv',
    method: 'post',
    data
  })
}

export function batchDel(ids) {
  return request({
    url: 'api/agroProductEnv/batchDel',
    method: 'post',
    data:ids
  })
}

export function findByAgroProductCycleId(agroProductCycleId){
  var params = {
    agroProductCycle:agroProductCycleId,
    size:1000
  }
  return initData("api/agroProductEnv",params)
}

export function del(id) {
  return request({
    url: 'api/agroProductEnv/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/agroProductEnv',
    method: 'put',
    data
  })
}

export function addOrEdit(data) {
  return request({
    url: 'api/agroProductEnv/addOrEdit',
    method: 'post',
    data
  })
}