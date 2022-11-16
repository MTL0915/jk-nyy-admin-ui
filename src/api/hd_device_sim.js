import request from '@/utils/request'

// sim卡列表
export function simList(data) {
    return request({
      url: '/hd_device_sim/simList',
      method: 'get',
      params: data
    })
  }

  // sim历史流量
export function simHistoryList(data) {
  return request({
    url: '/hd_device_sim/simHistoryList',
    method: 'get',
    params: data
  })
}


  // 获取sim卡详情
  export function getSimDetail(data) {
    return request({
      url: '/hd_device_sim/getSimDetail',
      method: 'get',
      params: data
    })
  }


   // sim卡复机
   export function simActivationCard(data) {
    return request({
      url: '/hd_device_sim/simActivationCard',
      method: 'get',
      params: data
    })
  }

   // sim卡停机
   export function simStopCard(data) {
    return request({
      url: '/hd_device_sim/simStopCard',
      method: 'get',
      params: data
    })
  }


 // 检查sim卡是否绑定设备
 export function checkDeviceBindSim(data) {
  return request({
    url: '/hd_device_sim/checkDeviceBindSim',
    method: 'get',
    params: data
  })
}

// 删除sim卡
export function deleteSim(data) {
  return request({
    url: '/hd_device_sim/deleteSim',
    method: 'get',
    params: data
  })
}



// 存在sim卡的设备类型
export function existSimDeviceType(data) {
  return request({
    url: '/hd_device_sim/existSimDeviceType',
    method: 'get',
    params: data
  })
}


// 设置sim卡预警配置
export function listSimSysWarnConfigDetails(data) {
  return request({
    url: '/hd_device_sim/listSimSysWarnConfigDetails',
    method: 'get',
    params: data
  })
}



// 设置sim卡预警配置
export function updateSimSysWarnConfigDetails(data) {
  return request({
    url: '/hd_device_sim/updateSimSysWarnConfigDetails',
    method: 'post',
    params: data
  })
}


// 通过iccid获取sim的id
export function getSimIdByIccid(data) {
  return request({
    url: '/hd_device_sim/getSimIdByIccid',
    method: 'get',
    params: data
  })
}



  


  


  




  