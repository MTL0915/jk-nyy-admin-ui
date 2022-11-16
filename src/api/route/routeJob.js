import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/routeJob',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/routeJob/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/routeJob',
    method: 'put',
    data
  })
}
