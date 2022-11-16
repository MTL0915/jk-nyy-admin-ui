import request from '@/utils/request'

export function addCJDeviceFactory(data){
    var params = new URLSearchParams()
  for (const d in data) {
    if (data[d]) {
      params.append(d, data[d])
    }
  }
  return request({
    url: '/onenet/addCJDeviceFactory',
    method: 'get',
    params
  })
}