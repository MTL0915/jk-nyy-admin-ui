import request from '@/utils/request'

//水肥应用列表
export function productSfList(data) {
  return request({
    url: "/hd/hd_product_sf/productSfList",
    method: "get",
    params: data
  });
}
//设备ID查询详情
export function getDetailById(data) {
  return request({
    url: "/hd/hd_device/getDetailById",
    method: "get",
    params: data
  });
}
//表单发送
export function productSfAddOrUpdate(data) {
  return request({
    url: "/hd/hd_product_sf/productSfAddOrUpdate",
    method: "post",
    data
  });
}
//水肥应用根据id获取详情
export function productSfDetail(data) {
  return request({
    url: "/hd/hd_product_sf/productSfDetail",
    method: "get",
    params: data
  });
}



