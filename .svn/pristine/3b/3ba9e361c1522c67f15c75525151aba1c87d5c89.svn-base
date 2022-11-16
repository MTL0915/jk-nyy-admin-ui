import request from '@/utils/request'

export function find(data) {
  return request({
    url: '/hd/hd_hardware_version/find',
    method: 'get',
    params: data
  })
}
//重名了 重新增加一个
export function hardwareVersionFind(data) {
  return request({
    url: '/hd/hd_hardware_version/find',
    method: 'get',
    params: data
  })
}

export function add(data) {
  const param = new FormData() // 创建form对象
  for (const d in data) {
    if (data[d]) {
      param.append(d, data[d])
    }
  }
  return request({
    url: '/hd/hd_hardware_version/add',
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
    url: '/hd/hd_hardware_version/update',
    method: 'post',
    data: param
  })
}

export function deleteById(data) {
  return request({
    url: '/hd/hd_hardware_version/deleteById',
    method: 'get',
    params: data
  })
}

export function findChannelConfigByHd_hardware_version_id(data) {
  return request({
    url: '/hd/hd_hardware_version/findChannelConfigByHd_hardware_version_id',
    method: 'get',
    params: data
  })
}

