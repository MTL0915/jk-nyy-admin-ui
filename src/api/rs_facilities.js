import request from '@/utils/request'

export function vegetablesList (data) {
  return request({
    url: '/rs/rs_facilities_aps/vegetablesList',
    method: 'get',
    params: data
  })
}

export function soilManureList (data) {
  return request({
    url: '/rs/rs_facilities/soilManureList',
    method: 'get',
    params: data
  })
}

export function apsAddOrEdit (data) {
  return request({
    url: '/rs/rs_facilities_aps/addOrEdit',
    method: 'post',
    params: data
  })
}

export function apsDelete (data) {
  return request({
    url: '/rs/rs_facilities_aps/delete',
    method: 'get',
    params: data
  })
}

export function apsGet (data) {
  return request({
    url: '/rs/rs_facilities_aps/get',
    method: 'get',
    params: data
  })
}

export function apsList (data) {
  return request({
    url: '/rs/rs_facilities_aps/list',
    method: 'post',
    params: data
  })
}

export function find (data) {
  return request({
    url: '/rs/rs_facilities/find',
    method: 'get',
    params: data
  })
}

export function getBaseUserNotInFacilities (data) {
  return request({
    url: '/rs/rs_facilities/getBaseUserNotInFacilities',
    method: 'get',
    params: data
  })
}

export function updateFacilitiesConfigJsonInteger (data) {
  return request({
    url: '/rs/rs_facilities/updateFacilitiesConfigJsonInteger',
    method: 'get',
    params: data
  })
}

export function getFacilitiesUserByFacilitiesId (data) {
  return request({
    url: '/rs/rs_facilities/getFacilitiesUserByFacilitiesId',
    method: 'get',
    params: data
  })
}

export function deleteById (data) {
  return request({
    url: '/rs/rs_facilities/deleteById',
    method: 'get',
    params: data
  })
}

export function add (data) {
  const param = new FormData() // 创建form对象
  for (const d in data) {
    if (data[d]) {
      param.append(d, data[d])
    }
  }
  return request({
    url: '/rs/rs_facilities/add',
    method: 'post',
    data: param
  })
}

//地块列表
export function facilitiesList (data) {
  return request({
    url: '/rs/rs_facilities/facilitiesList',
    method: 'get',
    params: data
  })
}

export function findByBs_base_id (data) {
  return request({
    url: '/rs/rs_facilities/findByBs_base_id',
    method: 'get',
    params: data
  })
}
// 获取包含地块且分组后的地块
export function getGroupFacilities (data) {
  return request({
    url: '/rs/rs_facilities/getGroupFacilitiesByBs_base_id',
    method: 'get',
    params: data
  })
}

// 含设备的地块列表
export function getGroupFacilitiesByDevice (data) {
  return request({
    url: '/rs/rs_facilities/getGroupFacilitiesByDevice',
    method: 'get',
    params: data
  })
}

// 含摄像头的地块列表
export function getGroupFacilitiesByVideo (data) {
  return request({
    url: '/rs/rs_facilities/getGroupFacilitiesByVideo',
    method: 'get',
    params: data
  })
}

// 获取基地下的地块（包含传感器数量）
export function getFacilitiesByBase (data) {
  return request({
    url: '/rs/rs_facilities/getFacilitiesByBase',
    method: 'get',
    params: data
  })
}

// 根据基地ID获取地块(生产档案数量)
export function getFacilitiesCountArchive (data) {
  return request({
    url: '/rs/rs_facilities/getFacilitiesCountArchive',
    method: 'get',
    params: data
  })
}

// 根据id获取地块信息
export function getById (data) {
  return request({
    url: '/rs/rs_facilities/get',
    method: 'get',
    params: data
  })
}
