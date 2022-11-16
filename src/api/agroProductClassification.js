import request from '@/utils/request'
import { initData } from './data'

export function getAgroProductClassificationCascader() {
  return request({
    url: 'api/getAgroProductClassificationCascader',
    method: 'get'
  })
}

export function getParentLevel(code) {
  return request({
    url: 'api/getParentLevel',
    method: 'get',
    params:{
      "code":code
    }
  })
}

export function getParentLevelById(id) {
  return request({
    url: 'api/getParentLevelById',
    method: 'get',
    params:{
      "id":id
    }
  })
}

export function add(data) {
  return request({
    url: 'api/agroProductClassification',
    method: 'post',
    data
  })
}

export function addOrEdit(data) {
  const param = new FormData() // 创建form对象
  for (const d in data) {
    if (data[d] !== null) {
      param.append(d, data[d])
    }
  }
  return request({
    url: 'api/agroProductClassification/addOrEdit',
    method: 'post',
    data: param
  })
}

export function del(id) {
  return request({
    url: 'api/agroProductClassification/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/agroProductClassification',
    method: 'put',
    data
  })
}
