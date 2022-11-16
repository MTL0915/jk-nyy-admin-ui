import request from "@/utils/request";

//模板列表
export function customFormworkList(data) {
  return request({
    url: "/custom/formwork/list",
    method: "get",
    params: data
  });
}

//模板详情
export function getCustomFormwork(data) {
  return request({
    url: "/custom/formwork/get",
    method: "get",
    params: data
  });
}

//删除基地个性化
export function deleteCustomBase(data) {
  return request({
    url: "/custom/base/delete",
    method: "get",
    params: data
  });
}

//基地个性化配置列表
export function customBaseList(data) {
  return request({
    url: "/custom/base/list",
    method: "get",
    params: data
  });
}

//更改使用状态
export function changeCustomBaseSta(data) {
  return request({
    url: "/custom/base/changeSta",
    method: "get",
    params: data
  });
}

//根据ID获取个性化配置
export function getCustomBaseById(data) {
  return request({
    url: "/custom/base/getById",
    method: "get",
    params: data
  });
}

//清除配置图片
export function clearCustomBaseImage(data) {
  return request({
    url: "/custom/base/clearImage",
    method: "get",
    params: data
  });
}
