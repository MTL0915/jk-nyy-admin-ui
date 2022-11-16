import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/rsSceneHotspot',
    method: 'post',
    data
  })
}

export function get(data) {
  return request({
    url: 'api/rsSceneHotspot',
    method: 'get',
    data
  })
}

export function getBySceneId(id) {
  return request({
    url: 'api/rsSceneHotspot?rsPanorScene=' + id,
    method: 'get',
  })
}

export function del(id) {
  return request({
    url: 'api/rsSceneHotspot/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/rsSceneHotspot',
    method: 'put',
    data
  })
}
