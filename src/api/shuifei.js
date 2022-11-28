import request from '@/utils/request'

//水肥应用列表
export function productSfList(data) {
  return request({
    url: "/hd/hd_product_sf/productSfList",
    method: "get",
    params: data
  });
}



