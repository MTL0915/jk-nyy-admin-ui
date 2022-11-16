import request from '@/utils/request'

export function get(data) {
  return request({
    url: '/rs/rsFacilitiesPut',
    method: 'get',
    params:data
  })
}

export function add(data) {
  return request({
    url: '/rs/rsFacilitiesPut',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: '/rs/rsFacilitiesPut/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: '/rs/rsFacilitiesPut',
    method: 'put',
    data
  })
}