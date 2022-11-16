import request from '@/utils/request'

//威视佰科设备列表
export function list (data) {
    return request({
      url: '/vispek/list',
      method: 'get',
      params: data
    })
  }

  
//将威视佰科设备添加到出厂设备
export function addVispekDeviceFactory (data) {
    return request({
      url: '/vispek/addVispekDeviceFactory',
      method: 'post',
      params: data
    })
  }