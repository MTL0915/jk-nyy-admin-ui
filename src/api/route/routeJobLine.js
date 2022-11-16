import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/routeJobLine',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/routeJobLine/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/routeJobLine',
    method: 'put',
    data
  })
}
