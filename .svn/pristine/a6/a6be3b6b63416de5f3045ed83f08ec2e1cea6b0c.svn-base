import request from '@/utils/request'

export function add(data) {
  // const param = new FormData() // 创建form对象
  // for (const d in data) {
  //   if (data[d]) {
  //     param.append(d, data[d])
  //   }
  // }
  return request({
    url: 'hd/hd_device_strategy/add',
    method: 'post',
    data
  })
}

export function findByHd_device_id(hd_device_id) {
  var params = new URLSearchParams()
  params.append('hd_device_id', hd_device_id)
  return request({
    url: 'hd/hd_device_strategy/findByHd_device_id',
    method: 'get',
    params
  })
}

export function find(startPosition, maxResult) {
  var params = new URLSearchParams()
  params.append('startPosition', startPosition)
  params.append('maxResult', maxResult)
  return request({
    url: '/hd/hd_device_strategy/find',
    method: 'get',
    params
  })
}

export function getOrgBaseFacilitiesDevices() {
  return request({
    url: '/hd/hd_device/getOrgBaseFacilitiesDevices',
    method: 'get'
  })
}

export function deleteById(id) {
  var params = new URLSearchParams()
  params.append('id', id)
  return request({
    url: 'hd/hd_device_strategy/deleteById',
    method: 'get',
    params
  })
}

export function get(id) {
  var params = new URLSearchParams()
  params.append('id', id)
  return request({
    url: 'hd/hd_device_strategy/get',
    method: 'get',
    params
  })
}

export function addAlarmStrategy(data) {
  return request({
    url: "strategy/addAlarmStrategy",
    method: "post",
    data
  })
}

export function strategyDetail(data) {
  return request({
    url: "strategy/get",
    method: "get",
    params: data
  })
}

export function strategyUpdate(data) {
  return request({
    url: "strategy/update/common",
    method: "post",
    data
  })
}

export function batchUpdateStatus(data) {
  return request({
    url: "strategy/batchUpdateStatus",
    method: "get",
    params: data
  })
}

export function batchDeleteById(data) {
  return request({
    url: "strategy/batchDeleteById",
    method: "get",
    params: data
  })
}