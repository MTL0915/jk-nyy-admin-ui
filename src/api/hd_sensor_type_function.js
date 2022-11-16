import request from '@/utils/request'

export function sensorTypeFunctionList(data) {
  return request({
    url: '/hd/hd_sensor_type_function/sensorTypeFunctionList',
    method: 'get',
    params: data
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
    url: '/hd/hd_sensor_type_function/addOrEdit',
    method: 'post',
    data: param
  })
}


export function findByHd_device_id(data) {
  return request({
    url: '/hd/hd_sensor_type_function/findByHd_device_id',
    method: 'get',
    params: data
  })
}

export function deleteById(id) {
  return request({
    url: '/hd/hd_sensor_type_function/deleteById',
    method: 'get',
    params: {
      id:id
    }
  })
}
