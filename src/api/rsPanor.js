import request from '@/utils/request'

export function sharePanor(data) {
  return request({
    url: 'api/rsPanor/sharePanor',
    method: 'get',
    params: data
  })
}

export function addPanorViewCount(data) {
  return request({
    url: 'api/rsPanor/addPanorViewCount',
    method: 'get',
    params: data
  })
}

export function add(data) {
  return request({
    url: 'api/rsPanor',
    method: 'post',
    data
  })
}

export function get(data) {
  return request({
    url: 'api/rsPanor',
    method: 'get',
    params: data
  })
}

export function del(id) {
  return request({
    url: 'api/rsPanor/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/rsPanor',
    method: 'put',
    data
  })
}

// 添加修改全景图标
export function addOrUpdatePanorIcon(data) {
  return request({
    url: 'api/rsPanor/addOrUpdatePanorIcon',
    method: 'post',
    data
  })
}

// 获取全景图标列表
export function listPanorIcon(data) {
  return request({
    url: 'api/rsPanor/listPanorIcon',
    method: 'get',
    params: data
  })
}