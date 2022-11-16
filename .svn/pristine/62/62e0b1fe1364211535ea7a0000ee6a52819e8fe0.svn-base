import request from '@/utils/request'

// 获取基地列表
export function baseListInfo() {
  return request({
    url: "bs/bs_base/findByBs_user_id",
    method: "get"
  })
}
// 根据地块id查询设备列表
export function areaListInfo(data) {
  return request({
    url: 'hd/hd_device/findByRs_facilities_id',
    method: 'get',
    params: data
  })
}

// 管理员获取设备故障列表
export function getRepairList(data) {
  return request({
    url: 'hd/hd_fault_repair/allList',
    method: 'get',
    params: data
  })
}

// 普通用户获取报修记录
export function getUserRepairList(data) {
  return request({
    url: "hd/hd_fault_repair/list",
    method: "get",
    params: data
  })
}

// 普通用户保存故障设备
export function add(data) {
  return request({
    url: "hd/hd_fault_repair/add",
    method: "post",
    data
  })
}
// 普通用户更新故障信息
export function update(data) {
  return request({
    url: "hd/hd_fault_repair/update",
    method: "post",
    data
  })
}

// 管理员获取故障设备组织
export function orgList() {
  return request({
    url: "hd/hd_fault_repair/orgList",
    method: "get"
  })
}

// 管理员获取故障设备基地
export function baseList() {
  return request({
    url: "hd/hd_fault_repair/baseList",
    method: "get"
  })
}

// 管理员获取故障设备的设备类型
export function deviceTypeList() {
  return request({
    url: "hd/hd_fault_repair/deviceTypeList",
    method: "get"
  })
}

// 普通用户获取故障设备基地列表
export function registerBaseList() {
  return request({
    url: "hd/hd_fault_repair/registerBaseList",
    method: "get"
  })
}

// 管理员获取故障报修登记人员列表
export function registerList() {
  return request({
    url: "hd/hd_fault_repair/registerList",
    method: "get"
  })
}

// 获取故障详情
export function getDetailAndImage(data) {
  return request({
    url: "hd/hd_fault_repair/getDetailAndImage",
    method: "get",
    params: data
  })
}

// 管理员处理故障详情
export function handlerInfo(data) {
  return request({
    url: "hd/hd_fault_repair/handlerInfo",
    method: "get",
    params: data
  })
}

// 删除故障图片
export function deleteImage(data) {
  return request({
    url: "hd/hd_fault_repair/deleteImage",
    method: "post",
    data
  })
}

// 删除待处理的故障信息
export function deleteWaitInfo(data) {
  return request({
    url: "hd/hd_fault_repair/deleteWaitInfo",
    method: "post",
    data
  })
}