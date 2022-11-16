import request from '@/utils/request'

//海康云眸门店列表
export function hikcloudStoreInfo (data) {
  return request({
    url: '/hd/sxt/hikcloudStoreInfo',
    method: 'get',
    params: data
  })
}

//海航云眸设备列表
export function hikcloudCameraList (data) {
  return request({
    url: '/hd/sxt/hikcloudCameraList',
    method: 'get',
    params: data
  })
}

//海康云眸添加设备到出厂设备中
export function hikcloudAddFactoryDevice (data) {
  return request({
    url: '/hd/sxt/hikcloudAddFactoryDevice',
    method: 'post',
    params: data
  })
}

//萤石云摄像头流量最后的时间
export function yingShiSxtTrafficLastTime (data) {
  return request({
    url: '/hd/sxt/yingShiSxtTrafficLastTime',
    method: 'get',
    params: data
  })
}

//查询萤石云摄像头流量
export function yingShiSxtTrafficList (data) {
  return request({
    url: '/hd/sxt/yingShiSxtTrafficList',
    method: 'get',
    params: data
  })
}

//根据时间获取存储文件信息
export function videoRecList (data) {
  return request({
    url: '/hd/sxt/videoRecList',
    method: 'get',
    params: data
  })
}

//获取录像回放
export function getSxtRec (data) {
  return request({
    url: '/hd/sxt/getSxtRec',
    method: 'get',
    params: data
  })
}

//开启摄像头设备视频加密
export function sxtEncryptOn (data) {
  return request({
    url: '/hd/sxt/sxtEncryptOn',
    method: 'post',
    params: data
  })
}

//关闭摄像头设备视频加密
export function sxtEncryptOff (data) {
  return request({
    url: '/hd/sxt/sxtEncryptOff',
    method: 'post',
    params: data
  })
}

//摄像头预置点列表
export function sxtPresetList (data) {
  return request({
    url: '/hd/sxt/sxtPresetList',
    method: 'get',
    params: data
  })
}

//摄像头移动到预置点
export function sensorMoveSxtPreset (data) {
  return request({
    url: '/hd/sxt/sensorMoveSxtPreset',
    method: 'get',
    params: data
  })
}


//删除摄像头预置点
export function deleteSxtPreset (data) {
  return request({
    url: '/hd/sxt/deleteSxtPreset',
    method: 'get',
    params: data
  })
}


//新增摄像头预置点
export function addSxtPreset (data) {
  return request({
    url: '/hd/sxt/addSxtPreset',
    method: 'get',
    params: data
  })
}

//修改摄像头预置点名称
export function updateSxtPresetName (data) {
  return request({
    url: '/hd/sxt/updateSxtPresetName',
    method: 'get',
    params: data
  })
}


//设置定时拍照
export function setSxtTimingPhoto (data) {
  return request({
    url: '/hd/sxt/setSxtTimingPhoto',
    method: 'get',
    params: data
  })
}


//设置拍照识别
export function setSxtRecognition (data) {
  return request({
    url: '/hd/sxt/setSxtRecognition',
    method: 'get',
    params: data
  })
}


// 获取海康云眸取流token
export function getHikcloudToken (data) {
  return request({
    url: '/hd/sxt/getHikcloudToken',
    method: 'get',
    params: data
  })
}

// 获取萤石云token
export function getYingShiToken (data) {
  return request({
    url: '/hd/sxt/getYingShiToken',
    method: 'get',
    params: data
  })
}

// 获取乐橙token
export function getLeChengToken (data) {
  return request({
    url: '/hd/sxt/getLeChengToken',
    method: 'get',
    params: data
  })
}

// 海康威视设备列表
export function hikvisionList (data) {
  return request({
    url: '/hd/sxt/hikvisionList',
    method: 'get',
    params: data
  })
}

// 添加摄像头设备(通用型 序列号 + 验证码)
export function addSxtDevice (data) {
  return request({
    url: '/hd/sxt/addSxtDevice',
    method: 'post',
    params: data
  })
}

// 添加海康安防平台设备
export function addHikvisionDevice (data) {
  return request({
    url: '/hd/sxt/addHikvisionDevice',
    method: 'post',
    params: data
  })
}

// 摄像头设备绑定上云
export function bindSxtDevice (data) {
  return request({
    url: '/hd/sxt/bindSxtDevice',
    method: 'post',
    params: data
  })
}

// 修改摄像头设备
export function updateSxtDevice (data) {
  return request({
    url: '/hd/sxt/updateSxtDevice',
    method: 'post',
    params: data
  })
}

// 删除摄像头设备
export function deleteSxtDevice (data) {
  return request({
    url: '/hd/sxt/deleteSxtDevice',
    method: 'get',
    params: data
  })
}

// 根据ID获取摄像头流地址
export function getSxtUrlById (data) {
  return request({
    url: '/hd/sxt/getSxtUrlById',
    method: 'post',
    params: data
  })
}

// 获取摄像头列表
export function getSxtList (data) {
  return request({
    url: '/hd/sxt/getSxtList',
    method: 'get',
    params: data
  })
}

// 抓拍照片
export function captureSxtDevice (data) {
  return request({
    url: '/hd/sxt/captureSxtDevice',
    method: 'get',
    params: data
  })
}

// 控制摄像头
export function controlSxt (data) {
  return request({
    url: '/hd/sxt/controlSxt',
    method: 'post',
    params: data
  })
}
