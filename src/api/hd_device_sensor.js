import request from '@/utils/request'

//根据设备ID返回传感器列表
export function getSensorListByDeviceId (data) {
  return request({
    url: '/hd/hd_device_sensor/getSensorListByDeviceId',
    method: 'get',
    params: data
  })
}

//传感器配置摄像头预置点
export function getFacilitiesDeviceSensorByBase (data) {
  return request({
    url: '/hd/hd_device_sensor/getFacilitiesDeviceSensorByBase',
    method: 'get',
    params: data
  })
}

//传感器配置摄像头预置点
export function sensorSetSxtPreset (data) {
  return request({
    url: '/hd/hd_device_sensor/sensorSetSxtPreset',
    method: 'get',
    params: data
  })
}

//传感器删除所有摄像头预置点
export function sensorDeleteSxtAllPreset (data) {
  return request({
    url: '/hd/hd_device_sensor/sensorDeleteSxtAllPreset',
    method: 'get',
    params: data
  })
}

export function sensorMoveSxtPreset (data) {
  return request({
    url: '/hd/hd_device_sensor/sensorMoveSxtPreset',
    method: 'get',
    params: data
  })
}

export function getSensorCount (data) {
  return request({
    url: '/hd/hd_device_sensor/getSensorCount',
    method: 'get',
    params: data
  })
}

export function getNewsSensorList (data) {
  return request({
    url: '/hd/hd_device_sensor/getNewsSensorList',
    method: 'get',
    params: data
  })
}

export function getById (data) {
  return request({
    url: '/hd/hd_device_sensor/getById',
    method: 'get',
    params: data
  })
}

export function getNewDataBySensorIds (data) {
  return request({
    url: '/hd/hd_device_sensor/getNewDataBySensorIds',
    method: 'get',
    params: data
  })
}

// 根据基地ID获取设备对应的开关传感器列表
export function getSwitchSensorsByBs_base_id (data) {
  return request({
    url: '/hd/hd_device_sensor/getSwitchSensorsByBs_base_id',
    method: 'get',
    params: data
  })
}

// 根据地块ID获取设备对应的开关传感器列表
export function getSwitchSensorsByRs_facilities_id (data) {
  return request({
    url: '/hd/hd_device_sensor/getSwitchSensorsByRs_facilities_id',
    method: 'get',
    params: data
  })
}

export function findByHd_device_id (data) {
  return request({
    url: '/hd/hd_device_sensor/findByHd_device_id',
    method: 'get',
    params: data
  })
}

export function findByHd_device_idOrDevice_id (hd_device_id, device_id, device_channels) {
  var params = new URLSearchParams()
  if (hd_device_id) {
    params.append('hd_device_id', hd_device_id)
  }
  if (device_id) {
    params.append('device_id', device_id)
  }
  if (device_channels) {
    params.append('device_channels', device_channels)
  }
  return request({
    url: '/hd/hd_device_sensor/findByHd_device_id',
    method: 'get',
    params
  })
}

export function findAllSensorByHd_device_id (hd_device_id) {
  var params = new URLSearchParams()
  params.append('hd_device_id', hd_device_id)
  return request({
    url: '/hd/hd_device_sensor/findAllSensorByHd_device_id',
    method: 'get',
    params
  })
}

export function getValueSensorsByRs_facilities_id (rs_facilities_id) {
  var params = new URLSearchParams()
  params.append('rs_facilities_id', rs_facilities_id)
  return request({
    url: '/hd/hd_device_sensor/getValueSensorsByRs_facilities_id',
    method: 'get',
    params
  })
}

// 设备传感器管理-删除传感器
export function deleteById (data) {
  return request({
    url: '/hd/hd_device_sensor/deleteById',
    method: 'get',
    params: data
  })
}

export function findByHd_factory_device_id (hd_factory_device_id) {
  var params = new URLSearchParams()
  params.append('hd_factory_device_id', hd_factory_device_id)
  return request({
    url: '/hd/hd_device_sensor/findByHd_factory_device_id',
    method: 'get',
    params
  })
}

export function findCascaderDeviceSensorByRs_facilities_id (rs_facilities_id) {
  var params = new URLSearchParams()
  params.append('rs_facilities_id', rs_facilities_id)
  return request({
    url: '/hd/hd_device_sensor/findCascaderDeviceSensorByRs_facilities_id',
    method: 'get',
    params
  })
}

export function addWarnStrategy (data) {
  return request({
    url: '/hd/hd_device_sensor/addWarnStrategy',
    method: 'post',
    params: data
  })
}

//传感器数据查询
export function selectSensorData2 (data) {
  return request({
    url: '/hd/hd_device_sensor/selectSensorData2',
    method: 'get',
    params: data
  })
}

//配置传感器
export function setUserSensorConfig (data) {
  return request({
    url: '/hd/hd_device_sensor/setUserSensorConfig',
    method: 'post',
    data
  })
}