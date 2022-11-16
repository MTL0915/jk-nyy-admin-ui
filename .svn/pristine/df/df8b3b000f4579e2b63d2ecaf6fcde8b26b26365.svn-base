import request from '@/utils/request'

export function findByHd_device_id(hd_device_id) {
  var params = new URLSearchParams()
  params.append('hd_device_id', hd_device_id)
  return request({
    url: 'hd/hd_device_strategy/findByHd_device_id',
    method: 'get',
    params
  })
}

export function deleteById(strategy_id) {
  var params = new URLSearchParams()
  params.append('id', strategy_id)
  return request({
    url: '/strategy/deleteById',
    method: 'get',
    params
  })
}

export function updateStatus(strategy_id, status) {
  var params = new URLSearchParams()
  params.append('id', strategy_id)
  params.append('status', status)
  return request({
    url: '/strategy/updateStatus',
    method: 'get',
    params
  })
}

export function addCommonStrategy(data) {
  return request({
    url: '/strategy/add/common',
    method: 'post',
    data
  })
}

export function updateCommonStrategy(data) {
  return request({
    url: '/strategy/update/common',
    method: 'post',
    data
  })
}

export function find(data) {
  var params = new URLSearchParams()
  for (const d in data) {
    if (data[d]) {
      params.append(d, data[d])
    }
  }
  return request({
    url: '/strategy/find',
    method: 'get',
    params
  })
}

export function get(id) {
  var params = new URLSearchParams()
  params.append('id', id)
  return request({
    url: '/strategy/get',
    method: 'get',
    params
  })
}


export function getSensorMonitor(id) {
  var params = new URLSearchParams()
  params.append('hd_device_sensor_id', id)
  return request({
    url: '/strategy/sensorMonitor/get',
    method: 'get',
    params
  })
}

export function addOrUpdateSensorMonitor(data) {
  return request({
    url: '/strategy/sensorMonitor/addOrUpdate',
    method: 'post',
    data
  })
}


export function getSensorZSStrategy(hd_device_id) {
  var params = new URLSearchParams()
  params.append('hd_device_id', hd_device_id)
  return request({
    url: '/strategy/getSensorZSStrategy',
    method: 'get',
    params
  })
}

export function addOrUpdateSensorZSStrategy(data) {
  return request({
    url: '/strategy/addOrUpdateSensorZSStrategy',
    method: 'post',
    data
  })
}