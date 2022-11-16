import request from '@/utils/request'

// 更新设备故障提醒人和提醒方式
export function updateDeviceWarnUser(data) {
  return request({
    url: '/hd/hd_device_error/deviceErrorConfig',
    method: 'post',
    data
  })
}

