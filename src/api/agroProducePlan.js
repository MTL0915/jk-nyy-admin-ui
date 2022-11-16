import request from '@/utils/request'

  export function finishAgroProducePlan (data) {
    return request({
      url: "api/finishAgroProducePlan",
      method: "get",
      params: data
    });
  }

  export function addOrUpdateAgroProducePlan (data) {
    return request({
      url: "api/addOrUpdateAgroProducePlan",
      method: "post",
      data
    });
  }

  export function agroProducePlanList (data) {
    return request({
      url: "api/agroProducePlanList",
      method: "get",
      params: data
    });
  }

  export function agroProducePlanChangeSta (data) {
    return request({
      url: "api/agroProducePlanChangeSta",  
      method: "get",
      params: data
    });
  }

  export function deleteAgroProducePlan (data) {
    return request({
      url: "api/deleteAgroProducePlan",  
      method: "get",
      params: data
    });
  }

  export function getAgroProducePlan (data) {
    return request({
      url: "api/getAgroProducePlan",  
      method: "get",
      params: data
    });
  }

  
  
  