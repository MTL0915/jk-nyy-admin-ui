import request from '@/utils/request'

export function get(data) {
  return request({
    url: '/rs/rsFacilitiesPlant',
    method: 'get',
    params:data
  })
}

export function add(data) {
  return request({
    url: '/rs/rsFacilitiesPlant',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: '/rs/rsFacilitiesPlant/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: '/rs/rsFacilitiesPlant',
    method: 'put',
    data
  })
}


