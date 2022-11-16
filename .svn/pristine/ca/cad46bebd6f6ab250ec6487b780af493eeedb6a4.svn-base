import request from '@/utils/request'

export function getFertigation(data) {
  return request({
    url: '/fertilizer_bucket/findByHd_device_id',
    params: data,
    method: 'get'
  })
}

export function updateFertigation(data) {
  return request({
    url: '/fertilizer_bucket/update',
    data,
    method: 'post'
  })
}

export function deleteFertigation(data) {
  return request({
    url: '/fertilizer_bucket/delete',
    params: data,
    method: 'get'
  })
}

export function addFertigation(data) {
  return request({
    url: 'fertilizer_bucket/add',
    data,
    method: 'post'
  })
}

export function getFertigationSensorID(data) {
  return request({
    url: 'hd/hd_device_sensor/findFertilizerSensorByHd_device_id',
    params: data,
    method: 'get'
  })
}
