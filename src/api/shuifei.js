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
// 水肥应用根据id删除
export function deleteById(data) {
  return request({
    url: "/hd/hd_product_sf/deleteProductSf",
    method: "get",
    params: data
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

//根据基地id主设备id获取日志
export function deviceRunLogList(data) {
  return request({
    url: "/hd/device/deviceRunLogList",
    method: "get",
    params: data
  });
}



