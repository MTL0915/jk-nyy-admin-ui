import request from '@/utils/request'

export function simFlowStatistics(data) {
    return request({
      url: "/iot_time_quantumrest/simFlowStatistics",
      method: "post",
      params: data
    });
  }


  export function dailyTimeQuantum(data) {
    return request({
      url: "/iot_time_quantumrest/dailyTimeQuantum",
      method: "get",
      params: data
    });
  }
