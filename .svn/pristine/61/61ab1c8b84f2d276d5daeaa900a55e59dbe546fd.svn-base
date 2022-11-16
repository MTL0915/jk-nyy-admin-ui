import request from '@/utils/request'

export function getTypeHardware(data) {
  return request({
    url: '/hd/hd_device_type/getTypeHardware',
    method: 'get',
    params: data
  })
}

export function getList(data) {
  return request({
    url: '/hd/hd_device_type/find',
    method: 'get',
    params: data
  })
}

// 获取设备功能列表
export function listDeviceFunctions() {
  return request({
    url: '/hd/hd_device/listDeviceFunctions',
    method: 'get'
  })
}

// add
export function add(data) {
  const param = new FormData() // 创建form对象
  for (const d in data) {
    if (data[d]) {
      param.append(d, data[d])
    }
  }
  return request({
    url: '/hd/hd_device_type/add',
    method: 'post',
    data: param
  })
}

// edit
export function update(data) {
  const param = new FormData() // 创建form对象
  for (const d in data) {
    if (data[d]) {
      param.append(d, data[d])
    }
  }
  return request({
    url: '/hd/hd_device_type/update',
    method: 'post',
    data: param
  })
}

// delete
export function deleteById(data) {
  return request({
    url: '/hd/hd_device_type/deleteById',
    method: 'get',
    params: data
  })
}

