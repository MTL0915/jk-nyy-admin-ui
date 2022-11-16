import request from '@/utils/request'

// 获取地块类型中传感器类型的配置列表
export function getFacilitiestypeSensortypeList (data) {
  return request({
    url: '/rs/rs_facilities_type/getFacilitiestypeSensortypeList',
    method: 'get',
    params: data
  })
}

// 读取列表
export function getList (data) {
  return request({
    url: '/rs/rs_facilities_type/find',
    method: 'get',
    params: data
  })
}

// 删除
export function deleteById (data) {
  return request({
    url: '/rs/rs_facilities_type/deleteById',
    method: 'get',
    params: data
  })
}

// 批量删除
export function deleteFacilitieTypes (data) {
  return request({
    url: '/rs/rs_facilities_type/batchDelete',
    method: 'get',
    params: data
  })
}

// add
export function add (data) {
  const param = new FormData() // 创建form对象
  for (const d in data) {
    if (data[d]) {
      param.append(d, data[d])
    }
  }
  console.log('data == ', data)
  return request({
    url: '/rs/rs_facilities_type/add',
    method: 'post',
    data: param
  })
}

// edit
export function update (data) {
  const param = new FormData() // 创建form对象
  for (const d in data) {
    if (data[d]) {
      param.append(d, data[d])
    }
  }
  console.log('data == ', data)
  return request({
    url: '/rs/rs_facilities_type/update',
    method: 'post',
    data: param
  })
}
