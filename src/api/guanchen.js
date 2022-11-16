import request from '@/utils/request'

export function addCJDeviceFactory(data){
    var params = new URLSearchParams()
  for (const d in data) {
    if (data[d]) {
      params.append(d, data[d])
    }
  }
  return request({
    url: '/guanchen/addCJDeviceFactory',
    method: 'get',
    params
  })
}

export function addCDDeviceFactory(data){
  var params = new URLSearchParams()
  for (const d in data) {
    if (data[d]) {
      params.append(d, data[d])
    }
  }
  return request({
    url: '/guanchen/addCDDeviceFactory',
    method: 'get',
    params
  })
}

export function addQCDeviceFactory(data){
  var params = new URLSearchParams()
  for (const d in data) {
    if (data[d]) {
      params.append(d, data[d])
    }
  }
  return request({
    url: '/guanchen/addQCDeviceFactory',
    method: 'get',
    params
  })
}

export function addQXDeviceFactory(data){
  var params = new URLSearchParams()
  for (const d in data) {
    if (data[d]) {
      params.append(d, data[d])
    }
  }
  return request({
    url: '/guanchen/addQXDeviceFactory',
    method: 'get',
    params
  })
}
