import request from '@/utils/request'
// import { requestForm } from '@/utils/requestForm'
/* eslint-disable */
function deb(info) {
  
}

// 修改基地信息
/* 因为接口的特殊性
 * 此接口无效 采用form表单提交
 * */
function update_jidiInfo(data) {
  return request({
    url: '/bs/bs_base/update',
    method: 'post',
    params: data
  })
}

// 根据用户获取基地列表
function get_jidiByUserId(data = {}, call) {
  if (!data.bs_user_id) {
    console.log('未指明用户')
    return
  }
  return request({
    url: '/bs/bs_base/findByBs_user_id',
    method: 'get',
    params: data
  }).then(function(event) {
    call && call(event)
  })
}

// 根据用户获取基地详细内容
function get_jidiInfoByUserId(data = {}, call) {
  if (!data.bs_user_id) {
    console.log('未指明用户');
    return
  }
  return request({
    url: '/bs/bs_base/findByBs_user_id',
    method: 'get',
    params: data
  }).then(function(event) {
    call && call(event)
  })
}

// 根据基地id获取基地内部的地块
function getDKByJDId(data = {}, call) {
  if (!data.bs_base_id) {
    console.log('未指明基地')
    return
  }
  return request({
    url: '/rs/rs_facilities/findByBs_base_id',
    method: 'get',
    params: data
  }).then(function(event) {
    call && call(event)
  })
}

// 根据地块id更新地块
function update_DK(data = {}, call) {
  if (!data.rs_facilities_id) {
    console.log('未指明地块')
    return
  }
  return request({
    url: '/rs/rs_facilities/update',
    method: 'get',
    params: data
  }).then(function(event) {
    call && call(event)
  })
}

// 发现设备
function addDevice(data, call) {
  // 用户id
  if (!data.bs_user_id) {
    console.log('发现设备需要指明用户')
    return
  }
  // 设备序列号
  if (!data.device_id) {
    console.log('发现设备需要指明设备序列号')
    return
  }
  // 地块id
  if (!data.rs_facilities_id) {
    console.log('发现设备需要指明地块')
    return
  }
  // 设备验证码
  if (!data.verification_code) {
    console.log('发现设备需要设备验证码')
    return
  }

  request({
    url: '/hd/hd_device/addDevice',
    method: 'get',
    params: data
  }).then(function(event) {
    call && call(event)
  })
}

// 查询设备
function queryDevice(data, call) {
  request({
    url: '/hd/hd_device/deviceList',
    method: 'get',
    params: data
  }).then(function(event) {
    call && call(event)
  })
}


// 修改设备信息
function editAndSave(data) {
  request({
    url: '/hd/hd_device/editAndSave',
    method: 'post',
    params: data
  }).then(function(event) {
    call && call(event)
  })
}

// 根据id查询基地
function getJDById(id, call) {
  // 基地id不能为空
  if (!id) {
    return
  }
  request({
    url: '/bs/bs_base/getById',
    method: 'get',
    params: { bs_base_id : id }
  }).then(function(event) {
    call && call(event)
  })
}

var ajax = {}

// 查询地块类型接口
ajax.findFacilitieTypeList = function(data, call) {
  request({
    url: '/rs/rs_facilities_type/find',
    method: 'get'
  }).then(function(event) {
    call && call(event)
  })
}

// 根据组织获取基地列表
ajax.findBasesByBs_org_id = function(data = {}, call) {
  if (!data.bs_org_id) {
    console.log('未指明用户')
    return
  }
  return request({
    url: '/bs/bs_base/findBasesByBs_org_id',
    method: 'get',
    params: data
  }).then(function(event) {
    call && call(event)
  })
}

// 根据组织获取基地列表
ajax.findBasesDetailByBs_org_id = function(data = {}, call) {
  if (!data.bs_org_id) {
    console.log('未指明组织');
    return
  }
  return request({
    url: '/bs/bs_base/findBasesDetailByBs_org_id',
    method: 'get',
    params: data
  }).then(function(event) {
    call && call(event)
  })
}

ajax.getBasesByUser = function(data = {},call){
	var bs_user_id = data.bs_user_id;
	if( !bs_user_id ) {
		console.log("未指明用户");
		return;
	};
	return request({
	  url: '/bs/bs_base/findByBs_user_id',
	  method: 'get',
	  params: {bs_user_id: bs_user_id}
	}).then(function(event) {
	  call && call(event)
	})
}

ajax.getBasesDetailByUser = function(data = {},call){
	var bs_user_id = data.bs_user_id;
	if( !bs_user_id ) {
		console.log("未指明用户");
		return;
	};
	return request({
	  url: '/bs/bs_base/findByBs_user_id',
	  method: 'get',
	  params: { bs_user_id: bs_user_id }
	}).then(function(event) {
	  call && call(event)
	})
}

ajax.getWsenDataByHd_device_id = function(data = {},call){
	var hd_device_id = data.hd_device_id;
	if( !hd_device_id ) {
		console.log("未指明设备");
		return;
	};
	return request({
	  url: '/hd/device/getWsenDataByHd_device_id',
	  method: 'get',
	  params: {hd_device_id: hd_device_id , maxResult : 1}
	}).then(function(event) {
	  call && call(event)
	})
}

ajax.getFacilitiesByBs_base_id = function(data = {},call){
	var bs_base_id = data.bs_base_id;
	if( !bs_base_id ) {
		console.log("未指明设备");
		return;
	};
	return request({
	  url: '/rs/rs_facilities/findByBs_base_id',
	  method: 'get',
	  params: {bs_base_id: bs_base_id }
	}).then(function(event) {
	  call && call(event)
	})
}

// 根据用户id获取地块id
ajax.getFacilitiesIDByUser = function(data = {},call){
	var bs_user_id = data.bs_user_id;
	if( !bs_user_id ) {
		console.log("未指明设备");
		return;
	};
	return request({
	  url: '/rs/rs_facilities/getFacilitiesIDByUser',
	  method: 'get',
	  params: {bs_user_id: bs_user_id }
	}).then(function(event) {
	  call && call(event)
	})
}

//根据地块id获取地块信息
ajax.getFacilitiesByid = function(id,call){
	var rs_facilities_id = id;
	if( !rs_facilities_id ) {
		console.log("未指明设备");
		return;
	};
	return request({
	  url: '/rs/rs_facilities/get',
	  method: 'get',
	  params: {rs_facilities_id: rs_facilities_id }
	}).then(function(event) {
	  call && call(event)
	})
}

//根据地块id获取设备运行日志
ajax.getDeviceRunLogListByr_id = function(id,startPosition,maxResult,call){
	var r_id = id;
	if( !r_id ) {
		console.log("未指明地块");
		return;
	};
	return request({
	  url: '/hd/device/getDeviceRunLogListByr_id',
	  method: 'get',
	  params: {r_id: r_id, startPosition:startPosition, maxResult:maxResult}
	}).then(function(event) {
	  call && call(event)
	})
}

//根据设备id获取设备运行日志
ajax.getDeviceRunLogListByh_id = function(id,startPosition,maxResult,call){
	var h_id = id;
	if( !h_id ) {
		console.log("未指明设备");
		return;
	};
	return request({
	  url: '/hd/device/getDeviceRunLogListByh_id',
	  method: 'get',
	  params: {h_id: h_id, startPosition:startPosition, maxResult:maxResult}
	}).then(function(event) {
	  call && call(event)
	})
}





// 测试测试
ajax.getLiveVideoList2 = function(id,call){
  // base_id org_id
	var facilities_id = id;
	if( !facilities_id ) {
		console.log("未指明地块");
		return;
	};
	return request({
	  url: '/hd/hd_device/getLiveVideoList',
	  method: 'get',
	  params: {rs_facilities_id: facilities_id  }
	}).then(function(event) {
	  call && call(event)
	})
}
/*************
//根据地块获取视频组的接口
ajax.getLiveVideoList2 = function(id,call){
  // base_id org_id
	var facilities_id = id;
	if( !facilities_id ) {
		console.log("未指明地块");
		return;
	};
	return request({
	  url: '/hd/hd_device/getLiveVideoList2',
	  method: 'get',
	  params: {facilities_id: facilities_id }
	}).then(function(event) {
	  call && call(event)
	})
}
 */

//根据地块获取设备控制按钮
ajax.getSwitchSensorsByRs_facilities_id = function(id,call){
  // base_id org_id
	var facilities_id = id;
	if( !facilities_id ) {
		console.log("未指明地块");
		return;
	};
	return request({
    // url: 'http://192.168.33.170:8000/nyy/admin/hd/hd_device_sensor/getSwitchSensorsByRs_facilities_id',
	  url: '/hd/hd_device_sensor/getSwitchSensorsByRs_facilities_id',
	  method: 'get',
	  params: {rs_facilities_id: facilities_id }
	}).then(function(event) {
	  call && call(event)
	})
}
ajax.getYingShiToken = function(call){
	return request({
	  url: '/hd/hd_device/getYingShiToken',
    method: 'get',
	  params: {}
	}).then(function(event) {
	  call && call(event)
	})
}

//根据地块获取设备信息及设备传感器数据
ajax.getValueSensorsByRs_facilities_id = function(id,call){
  // base_id org_id
	var facilities_id = id;
	if( !facilities_id ) {
		console.log("未指明地块");
		return;
	};
	return request({
	  url: '/hd/hd_device_sensor/getValueSensorsByRs_facilities_id',
    method: 'get',
    // 40288ad26c88ee49016c8e03e7b10002
	  params: {rs_facilities_id: facilities_id }
	}).then(function(event) {
	  call && call(event)
	})
}

//根據傳感器id获取历史数据
ajax.getWsenDataBySensorId = function(id,call){
  // base_id org_id
	var SensorId = id;
	return request({
	  url: '/hd/hd_device_sensor/getWsenDataBySensorId',
    method: 'get',
    // 40288ad26c88ee49016c8e03e7b10002
	  params: { hd_device_sensor_id:SensorId,maxResult:50 }
	}).then(function(event) {
	  call && call(event)
	})
}

//根據傳感器id获取历史数据
ajax.getDetailById = function(hd_device_id,call){
	return request({
	  url: "hd/hd_device/getDetailById",
    method: 'get',
    // 40288ad26c88ee49016c8e03e7b10002
	  params: { hd_device_id:hd_device_id }
	}).then(function(event) {
	  call && call(event)
	})
}

ajax.deleteDevice = function(hd_device_id, call){
  return request({
	  url: "hd/hd_device/deleteDevice", 
    method: 'get',
	  params: { hd_device_id:hd_device_id }
	}).then(function(event) {
	  call && call(event)
	})
}

// 根据地块id删除地块
ajax.deleteDKById = function(id, call){
  return request({
	  url: "/rs/rs_facilities/deleteById", 
    method: 'get',
	  params: { rs_facilities_id:id }
	}).then(function(event) {
	  call && call(event)
	})
}

ajax.getAllList = function(call){
  return request({
	  url: "/hd/hd_device_type/getAllList",
    method: 'get',
	  params: {}
	}).then(function(event) {
	  call && call(event)
	})
}

// 删除基地根据id
ajax.deleteBaseById =function(id,call){
  return request({
	  url: "http://121.32.129.19:8100/nyy/admin_show/bs/bs_base/deleteById?bs_base_id="+id,
    method: 'get',
	  params: {}
	}).then(function(event) {
	  call && call(event)
	})
}

export default {
  update_jidiInfo: update_jidiInfo,
  create_dikuai: null ,
  get_jidiByUserId: get_jidiByUserId,
  get_jidiInfoByUserId: get_jidiInfoByUserId,
  getDKByJDId: getDKByJDId,
  update_DK: update_DK,
  addDevice: addDevice,
  queryDevice: queryDevice,
  editAndSave: editAndSave,
  getJDById: getJDById, // 根据id查询基地
  ...ajax
}
