import request from '@/utils/request'

export function find(data) {
  var params = new URLSearchParams()
  for (const d in data) {
    if (data[d]) {
      params.append(d, data[d])
    }
  }
  return request({
    url: '/hd/hd_device_property/find',
    method: 'post',
    params
  })
}

export function del(hd_device_property_id) {
  var params = new URLSearchParams()
  params.append('hd_device_property_id', hd_device_property_id)
  return request({
    url: '/hd/hd_device_property/deleteById',
    method: 'post',
    params
  })
}
export function update(data) {
  var params = new URLSearchParams()
  for (const d in data) {
    if (data[d]) {
      params.append(d, data[d])
    }
  }
  return request({
    url: '/hd/hd_device_property/update',
    method: 'post',
    params
  })
}

export function add(data) {
  var params = new URLSearchParams()
  for (const d in data) {
    if (data[d]) {
      params.append(d, data[d])
    }
  }
  return request({
    url: '/hd/hd_device_property/add',
    method: 'post',
    params
  })
}

export function getDevicePropertyData(data) {
  var params = new URLSearchParams()
  for (const d in data) {
    if (data[d]) {
      params.append(d, data[d])
    }
  }
  return request({
    url: '/hd/hd_device_property/getDevicePropertyData',
    method: 'get',
    params
  })
}

export function getHourData(data) {
  var params = new URLSearchParams()
  for (const d in data) {
    if (data[d]) {
      params.append(d, data[d])
    }
  }
  return request({
    url: '/hd/hd_device_property/getHourData',
    method: 'get',
    params
  })
}

export function getDayData(data) {
  var params = new URLSearchParams()
  for (const d in data) {
    if (data[d]) {
      params.append(d, data[d])
    }
  }
  return request({
    url: '/hd/hd_device_property/getDayData',
    method: 'get',
    params
  })
}
