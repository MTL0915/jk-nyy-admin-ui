import request from '@/utils/request'

//获取配置
export function getPLCAddress (data) {
    return request({
      url: '/chengshun/getPLCAddress',
      method: 'get',
      params: data
    })
  }

  