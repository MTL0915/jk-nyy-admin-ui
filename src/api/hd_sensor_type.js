import request from '@/utils/request'

export function updateSensorConfigJson(hd_sensor_type_id){
  var data = {"hd_sensor_type_id":hd_sensor_type_id};
  return request({
    url: '/hd/hd_sensor_type/updateSensorConfigJson',
    method: 'get',
    params: data
  })
}

// 获取基地下的传感器类型（包含传感器数量）
export function getSensorTypeByBase(data) {
  return request({
    url: '/hd/hd_sensor_type/getSensorTypeByBase',
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
    url: '/hd/hd_sensor_type/add',
    method: 'post',
    data: param
  })
}

export function update(data) {
  const param = new FormData() // 创建form对象
  for (const d in data) {
    if (data[d] !== undefined) {
      param.append(d, data[d])
    }
  }
  return request({
    url: '/hd/hd_sensor_type/update',
    method: 'post',
    data: param
  })
}

export function deleteById(data) {
  return request({
    url: '/hd/hd_sensor_type/deleteById',
    method: 'get',
    params: data
  })
}

export function find(data) {
  return request({
    url: '/hd/hd_sensor_type/find',
    method: 'get',
    params: data
  })
}
