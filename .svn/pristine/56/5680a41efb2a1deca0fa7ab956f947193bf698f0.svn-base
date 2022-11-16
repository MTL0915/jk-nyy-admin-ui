import request from '@/utils/request'

export function copyFactoryDevice(data) {
  return request({
    url: '/hd/hd_factory_device/copyFactoryDevice',
    method: 'get',
    params: data
  })
}

export function serverList(data) {
  return request({
    url: '/hd/hd_factory_device/serverList',
    method: 'get',
    params: data
  })
}

export function find(data) {
  return request({
    url: '/hd/hd_factory_device/find',
    method: 'get',
    params: data
  })
}

export function findHd_factory_deviceByTypeHardware(data) {
  return request({
    url: '/hd/hd_factory_device/findHd_factory_deviceByTypeHardware',
    method: 'get',
    params: data
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
    url: '/hd/hd_factory_device/add',
    method: 'post',
    data: param
  })
}

export function update(data) {
  const param = new FormData() // 创建form对象
  for (const d in data) {
    if (data[d]) {
      param.append(d, data[d])
    }
  }
  return request({
    url: '/hd/hd_factory_device/update',
    method: 'post',
    data: param
  })
}

export function deleteById(data) {
  return request({
    url: '/hd/hd_factory_device/deleteById',
    method: 'get',
    params: data
  })
}

export function batchDelete(data) {
  return request({
    url: '/hd/hd_factory_device/batchDelete',
    method: 'get',
    params: data
  })
}
