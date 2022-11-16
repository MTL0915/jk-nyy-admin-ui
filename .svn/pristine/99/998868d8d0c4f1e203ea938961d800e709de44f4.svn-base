import request from '@/utils/request'

export function addSensorTrigger(data) {
  const param = new FormData() // 创建form对象
  for (const d in data) {
    if (data[d]) {
      param.append(d, data[d])
    }
  }
  return request({
    url: '/hd/hd_trigger/addSensorTrigger',
    method: 'post',
    data: param
  })
}

export function getSensorTrigger(data) {
  return request({
    url: '/hd/hd_trigger/getSensorTrigger',
    method: 'get',
    params: data
  })
}
