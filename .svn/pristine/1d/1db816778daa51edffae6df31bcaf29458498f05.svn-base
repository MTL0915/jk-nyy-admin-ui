import request from '@/utils/request'


// 根据組織id获取基地列表
export function baseListByOrgId(params,bs_org_id, need_geometry) {
  return request({
    // url: '/bs/bs_base/findByBs_user_id',
    url: "/bs/bs_base/findMapBaseByBs_user_id",
    method: 'get',
    params
  })
}

// 根据組織id获取基地列表可以选择是否包含几何参数
export function baseListByOrgIds(bool = false) {
  return request({
    url: '/bs/bs_base/findByBs_user_id',
    method: 'get',
    params: {
      need_geometry: bool
    }
  })
}

// 根据地块id获取摄像头列表
export function getSxtListByDkId(dkid) {
  return request({
    url: '/hd/sxt/getSxtList',
    method: 'get',
    params: {
      rs_facilities_id: dkid
    }
  })
}

// 根据地块id查询地块
export function getDkInfoByDkId(dkid) {
  return request({
    url: '/rs/rs_facilities/get',
    method: 'get',
    params: {
      rs_facilities_id: dkid
    }
  })
}

// 根据地块id查询设备列表
export function getSbByDkId(dkid) {
  return request({
    url: '/hd/hd_device/findByRs_facilities_id',
    method: 'get',
    params: {
      rs_facilities_id: dkid
    }
  })
}

// 获取设备传感器数据
export function selectSensorData(dkid) {
  return request({
    url: '/hd/hd_device_sensor/selectSensorData',
    method: 'get',
    params: {
      rs_facilities_id: dkid
    }
  })
}

//获得地块信息
export function getFacilitiesDetails(dkid) {
  return request({
    url: "/rs/rs_facilities/getFacilitiesDetails",
    method: "get",
    params: {
      rs_facilities_id: dkid
    }
  });
}


// 根据设备id获取下面的传感器信息
export function getSensorByDeviceId(deviceId) {
  return request({
    url: "/hd/hd_device_sensor/findByHd_device_id",
    method: "get",
    params: {
      device_id: deviceId
    }
  });
}

// 获取预警信息内容
export function getWarnByBaseId(baseId) {
  return request({
    url: "/health/baseSensorWarnInfo",
    method: "get",
    params: {
      bs_base_id: baseId
    }
  });
}

// 获取地块列表呈现信息 用于左侧地块列表呈现
export function getMyFacilitiesList(baseId) {
  return request({
    url: "/app/home/myFacilities",
    method: "get",
    params: {
      bs_base_id: baseId
    }
  });
}

export function getDevicesByUser (data){
  return request({
    url: "http://"+process.env.DOMAIN+"/iot/api/v1.0.0/device/userDevices",
    method: "post",
    data 
  });
}

// 根据用户获取所有的设备信息
export function getDeviceByUser(data) {
  return request({
    url: "http://"+process.env.DOMAIN+"/iot/api/v1.0.0/device/userSimpleDevices",
    method: "post",
    data 
  });
}



//根据设备id获取设备运行日志
export function getDeviceRunLogListByh_id(id,type,startPosition,maxResult) {
	var h_id = id;
	if( !h_id ) {
		console.log("未指明设备");
		return;
	};
	return request({
	  url: '/hd/device/getDeviceRunLogListByh_id',
	  method: 'get',
    params: {
      h_id: h_id, 
      startPosition:startPosition || 0, 
      maxResult:maxResult || 10,
      type: type
    }
	})
}

// 获取设备或者基地分布的行政区域菜单内容
export function findMapBaseShiAreaByBs_user_id(data) {
  return request({
    url: "/bs/bs_base/findMapBaseShiAreaByBs_user_id",
    method: "get",
  });
}


// 根据用户组织id获取设备状态数量
export function userDevicesStatus(data) {
  return request({
    url: "http://"+process.env.DOMAIN+"/iot/api/v1.0.0/device/userDevicesCustomStatus",
    method: "post",
    data: {}
  });
}

// 根据用户组织id获取设备在各个市县中的分布数量汇总数据
export function userMapDeviceShiArea(data) {
  return request({
    url: "http://"+process.env.DOMAIN+"/iot/api/v1.0.0/device/userMapDeviceShiArea",
    method: "post",
    data: {}
  });
}