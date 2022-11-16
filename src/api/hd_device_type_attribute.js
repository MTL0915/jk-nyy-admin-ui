import request from '@/utils/request'

export function getAttributeById(data) {
    return request({
      url: "/hd/hd_device_type_attribute/getAttributeById",
      method: "get",
      params: data
    });
  }

export function getAttributeByDeviceType(data) {
    return request({
      url: "/hd/hd_device_type_attribute/getAttributeByDeviceType",
      method: "get",
      params: data
    });
  }

  export function addOrUpdateAttribute(data) {
    return request({
      url: "/hd/hd_device_type_attribute/addOrUpdateAttribute",
      method: "post",
      data
    });
  }

  export function deleteAttribute(data) {
    return request({
      url: "/hd/hd_device_type_attribute/deleteAttribute",
      method: "get",
      params: data
    });
  }