import request from '@/utils/request'


  export function addCZFactoryDevice(data) {
    return request({
      url: "/weidkz/addCZFactoryDevice",
      method: "post",
      params: data
    });
  }