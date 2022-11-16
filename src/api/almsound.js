import request from '@/utils/request';

export function addAlmsoundDeviceFactory(data) {
    return request({
      url: '/almsound/addAlmsoundDeviceFactory',
      method: 'post',
      params: data
    })
  }