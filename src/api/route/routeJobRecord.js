import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/routeJobRecord',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/routeJobRecord/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/routeJobRecord',
    method: 'put',
    data
  })
}
