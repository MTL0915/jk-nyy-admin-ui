import request from '@/utils/request'


export function getRolesByBase(data) {
  return request({
    url: 'api/roles/getRolesByBase',
    method: 'get',
    params: data
  })
}

export function getRolesByBaseAndUserid(data) {
  return request({
    url: 'api/roles/getRolesByBaseAndUserid',
    method: 'get',
    params: data
  })
}

export function getSensorListByFacilitiesId2(data) {
  return request({
    url: 'hd/hd_device_sensor/getSensorListByFacilitiesId2',
    method: 'get',
    params: data
  })
}

export function getLevelNum(data) {
  return request({
    url: 'api/roles/getLevelNum',
    method: 'get',
    params: data
  })
}

// 获取所有的Role
export function getAll() {
  return request({
    url: 'api/roles/all',
    method: 'get'
  })
}

export function getRoles(data) {
  return request({
    url: 'api/roles',
    method: 'get',
    params: data
  })
}

export function getRolesByDeptBase(data) {
  return request({
    url: 'api/roles/getRolesByDeptBase',
    method: 'get',
    params: data
  })
}

export function add(data) {
  return request({
    url: 'api/roles',
    method: 'post',
    data
  })
}

export function get(id) {
  return request({
    url: 'api/roles/' + id,
    method: 'get'
  })
}

export function getLevel() {
  return request({
    url: 'api/roles/level',
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'api/roles/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/roles',
    method: 'put',
    data
  })
}

export function editPermission(data) {
  return request({
    url: 'api/roles/permission',
    method: 'put',
    data
  })
}

export function editProduct(data) {
  return request({
    url: 'api/roles/product',
    method: 'put',
    data
  })
}

export function editMenu(data) {
  return request({
    url: 'api/roles/menu',
    method: 'put',
    data
  })
}
