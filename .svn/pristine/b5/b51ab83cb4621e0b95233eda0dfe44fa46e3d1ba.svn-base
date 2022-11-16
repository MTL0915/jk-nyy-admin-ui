import request from '@/utils/request'
import { initData } from './data'

export function add(data) {
  return request({
    url: 'api/agroProductCycle',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/agroProductCycle/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/agroProductCycle',
    method: 'put',
    data
  })
}

export function findByAgroProductClassificationId(agroProductClassificationId){
  var params = {
    agroProductClassification:agroProductClassificationId,
    size:1000
  }
  return initData("api/agroProductCycle",params)
}

export function find(params){
  return initData("api/agroProductCycle",params)
}

export function addOrEdit(data) {
  const param = new FormData() // 创建form对象
  for (const d in data) {
    if (data[d]) {
      param.append(d, data[d])
    }
  }
  return request({
    url: 'api/agroProductCycle/addOrEdit',
    method: 'post',
    data: param
  })
}