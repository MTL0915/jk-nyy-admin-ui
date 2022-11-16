import request from '@/utils/request'

export function addCQDeviceFactory(data){
    var params = new URLSearchParams()
  for (const d in data) {
    if (data[d]) {
      params.append(d, data[d])
    }
  }
  return request({
    url: '/mengchuangyun/addCQDeviceFactory',
    method: 'get',
    params
  })
}