import request from "@/utils/request";


export function listByHd_device_parent_id(data) {
  return request({
    url: "/hd/hd_device/listByHd_device_parent_id",
    method: "get",
    params: data
  });
}


export function getAttributeByDeviceByHdDeviceId(id){
  return request({
      url: "/hd/hd_device_attribute/getAttributeByDevice",
      method: 'get',
      params: {
          hd_device_id: id
      }
  })
}
export function addOrUpdateAttribute(data){
  return request({
      url: "/hd/hd_device_attribute/addOrUpdateAttribute",
      method: 'post',
      data
  })
}

export function getDeviceRunLogListByh_id(data) {
  return request({
    url: "/hd/device/getDeviceRunLogListByh_id",
    method: "get",
    params: data
  });
}

//阀门开关时间记录
export function valveSwitchTimeRecord(data) {
  return request({
    url: "/hd/hd_device_run_log/valveSwitchTimeRecord",
    method: "get",
    params: data
  });
}

//阀门每天运行总时间
export function getEverydaySwitchTime(data) {
  return request({
    url: "/hd/hd_device_run_log/getEverydaySwitchTime",
    method: "get",
    params: data
  });
}

export function getDeviceRunLogOperatorList(data) {
  return request({
    url: "/hd/device/getDeviceRunLogOperatorList",
    method: "get",
    params: data
  });
}

export function findUserDeviceRelevance(data) {
  return request({
    url: "/hd/hd_device/findUserDeviceRelevance",
    method: "post",
    params: data
  });
}

export function deviceStateStatisticsByBase(data) {
  return request({
    url: "/hd/hd_device/deviceStateStatisticsByBase",
    method: "get",
    params: data
  });
}

export function queryDeviceTree(data) {
  return request({
    url: "/hd/hd_device/queryDeviceTree",
    method: "get",
    params: data
  });
}

export function getNetDevicesByBs_base_id(data) {
  return request({
    url: "/hd/hd_device/getNetDevicesByBs_base_id",
    method: "get",
    params: data
  });
}

export function deviceList(data) {
  return request({
    url: "/hd/hd_device/deviceList",
    method: "get",
    params: data
  });
}

export function checkDeviceValidity(data) {
  return request({
    url: "/hd/hd_device/checkDeviceValidity",
    method: "get",
    params: data
  });
}
export function addDevice(data) {
  return request({
    url: "/hd/hd_device/addDevice",
    method: "get",
    params: data
  });
}

export function addSubDevice(data) {
  return request({
    url: "/hd/hd_device/addSubDevice",
    method: "get",
    params: data
  });
}

export function deleteDevice(data) {
  return request({
    url: "/hd/hd_device/deleteDevice",
    method: "get",
    params: data
  });
}

export function getDetailById(data) {
  return request({
    url: "/hd/hd_device/getDetailById",
    method: "get",
    params: data
  });
}

export function updaFactoryDeviceToDevice(data) {
  return request({
    url: "/hd/hd_device/updaFactoryDeviceToDevice",
    method: "get",
    params: data
  });
}

export function findBases(data) {
  return request({
    url: "/bs/bs_base/findBasesByBs_org_id",
    method: "get",
    params: data
  });
}

export function getFacilities(data) {
  return request({
    url: "/rs/rs_facilities/getFacilitiesByBs_base_id",
    method: "get",
    params: data
  });
}
// 含设备的地块列表
export function getGroupFacilities(data) {
  return request({
    url: "/rs/rs_facilities/getGroupFacilitiesByBs_base_id",
    method: "get",
    params: data
  });
}

// 含摄像头的地块列表
export function getGroupFacilitiesByVideo(data) {
  return request({
    url: "/rs/rs_facilities/getGroupFacilitiesByVideo",
    method: "get",
    params: data
  });
}

// 设备类型管理-查询设备类型
export function getDevicesType(data) {
  return request({
    url: "/hd/hd_device/getDevicesType",
    method: "get",
    params: data
  });
}

// 设备类型管理-根据设备类型ID获取设备型号列表
export function findDeviceModel(data) {
  return request({
    url: "/hd/hd_device/findDeviceModelByHd_device_type_id",
    method: "get",
    params: data
  });
}

// 设备传感器管理-删除传感器
export function deleteSensor(data) {
  return request({
    url: "/hd/hd_device_sensor/deleteSensor",
    method: "get",
    params: data
  });
}

export function allListSensorType(data) {
  return request({
    url: "/hd/hd_device_sensor/allListSensorType",
    method: "get",
    params: data
  });
}

export function getWsenDataByHd_device_id(data) {
  return request({
    url: "/hd/device/getWsenDataByHd_device_id",
    method: "get",
    params: data
  });
}

export function getInnerDetailById(data) {
  return request({
    url: "/hd/hd_device/getInnerDetailById",
    method: "get",
    params: data
  });
}

export function getUserListByDevice(data) {
  return request({
    url: "/hd/hd_device/getUserListByDevice",
    method: "get",
    params: data
  });
}
// 根据基地id获取所有设备信息
export function findByBs_base_id(data) {
  return request({
    url: "/hd/hd_device/findByBs_base_id",
    method: "get",
    params: data
  });
}

//获得地块信息
export function getFacilitiesDetails(data) {
  return request({
    url: "/rs/rs_facilities/getFacilitiesDetails",
    method: "get",
    params: data
  });
}

export function selectSensorData2(data) {
  return request({
    url: "/hd/hd_device_sensor/selectSensorData2",
    method: "get",
    params: data
  });
}


export function getDayWsenDataBySensorId(data) {
  return request({
    url: "/nyy/admin/hd/hd_device_sensor/getDayWsenDataBySensorId",
    method: "get",
    params: data
  });
}

export function valveOpenTimeSort(data) {
  return request({
    url: "/hd/hd_device_run_log/valveOpenTimeSort",
    method: "get",
    params: data
  });
}

export function getDeviceUserPermissionByUser_id(user_id) {
  return request({
    url: "/hd/hd_device/getDeviceUserPermissionByUser_id",
    method: "get",
    params: {
      "user_id": user_id
    }
  });
}

export function getDeviceUserPermissionByNowUser() {
  return request({
    url: "/hd/hd_device/getDeviceUserPermissionByNowUser",
    method: "get"
  });
}

//灌溉计划
//取消停灌一次
export function cancelStopIrrigationOnce(data) {
  return request({
    url: "/irrigation/cancelStopIrrigationOnce",
    method: "get",
    params: data
  });
}

//停灌一次
export function stopIrrigationOnce(data) {
  return request({
    url: "/irrigation/stopIrrigationOnce",
    method: "get",
    params: data
  });
}

//删除灌溉计划
export function deleteById(data) {
  return request({
    url: "/strategy/deleteById",
    method: "get",
    params: data
  });
}

//开始灌溉计划
export function startDeviceIrrigationPlan(data) {
  return request({
    url: "/irrigation/startDeviceIrrigationPlan",
    method: "get",
    params: data
  });
}

//停止灌溉计划
export function stopDeviceIrrigationPlan(data) {
  return request({
    url: "/irrigation/stopDeviceIrrigationPlan",
    method: "get",
    params: data
  });
}

//灌溉计划列表
export function listDeviceIrrigationPlan(data) {
  return request({
    url: "/irrigation/listDeviceIrrigationPlan",
    method: "get",
    params: data
  });
}

//获取已配置拓扑图阀门
export function facilitiesAfterMap(data) {
  return request({
    url: "/irrigation/deviceRs_facilitiesAfterMap",
    method: "get",
    params: data
  });
}

//获取肥桶数据
export function irrigationFT(data) {
  return request({
    url: "/irrigation/findByHd_device_id",
    method: "get",
    params: data
  });
}

//保存计划
export function addDeviceIrrigationPlan(data) {
  return request({
    url: "/irrigation/addDeviceIrrigationPlan",
    method: "post",
    data
  });
}

//更新计划
export function updateDeviceIrrigationPlan(data) {
  return request({
    url: "/irrigation/updateDeviceIrrigationPlan",
    method: "post",
    data
  });
}
