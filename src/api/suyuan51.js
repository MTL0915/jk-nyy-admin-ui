import request from '@/utils/request'

export function addFactoryDevice(data){
    var params = new URLSearchParams()
  for (const d in data) {
    if (data[d]) {
      params.append(d, data[d])
    }
  }
  return request({
    url: '/suyuan51/addFactoryDevice',
    method: 'post',
    params
  })
}