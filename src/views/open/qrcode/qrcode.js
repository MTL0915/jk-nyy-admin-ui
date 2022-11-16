import request from '@/utils/request'

export function getById(id) {
    var params = {}
    params.id = id;
    return request({
      url: '/open/qrcode/getById',
      method: 'get',
      params: params
    })
  }


export function login(id,password) {
    var params = {}
    params.id = id;
    params.password = password
    return request({
      url: '/open/qrcode/login',
      method: 'post',
      params: params
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
    url: '/open/qrcode/save',
    method: 'post',
    data: param
  })
}
