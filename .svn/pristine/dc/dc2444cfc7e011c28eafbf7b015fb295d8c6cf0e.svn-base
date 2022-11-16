import request from '@/utils/request'
import { initData } from './data'

export function add(data) {
  return request({
    url: 'api/agroProductBreed',
    method: 'post',
    data
  })
}

export function findByAgroProductClassificationId(agroProductClassificationId){
  var params = {
    agroProductClassification:agroProductClassificationId,
    size:1000
  }
  return initData("api/agroProductBreed",params)
}

export function del(id) {
  return request({
    url: 'api/agroProductBreed/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/agroProductBreed',
    method: 'put',
    data
  })
}

export function addOrEdit(data) {
  const param = new FormData() // 创建form对象
  for (const d in data) {
    if (data[d]) {
      param.append(d, data[d])
    }
  }
  return request({
    url: 'api/agroProductBreed/addOrEdit',
    method: 'post',
    data: param
  })
}