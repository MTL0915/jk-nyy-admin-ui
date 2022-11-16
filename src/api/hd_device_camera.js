import request from '@/utils/request'

export function listCameraStatus (data) {
  return request({
    url: '/hd/hd_device_camera/listCameraStatus',
    method: 'get',
    params: data
  })
}

export function deletePhoto (data) {
  return request({
    url: '/hd/hd_device_camera/deletePhoto',
    method: 'get',
    params: data
  })
}

export function photoCompressExport (data) {
  return request({
    url: '/hd/hd_device_camera/photoCompressExport',
    method: 'get',
    responseType: 'blob',
    params: data
  })
}

export function getPhotoDetails (data) {
  return request({
    url: '/hd/hd_device_camera/getPhotoDetails',
    method: 'get',
    params: data
  })
}

export function cameraUploadTypeList (data) {
  return request({
    url: '/hd/hd_device_camera/cameraUploadTypeList',
    method: 'get',
    params: data
  })
}

export function cameraPictureList (data) {
  return request({
    url: '/hd/hd_device_camera/cameraPictureList',
    method: 'get',
    params: data
  })
}

export function findCameraByHd_device_id (data) {
  var params = new URLSearchParams()
  for (const d in data) {
    if (data[d]) {
      params.append(d, data[d])
    }
  }
  return request({
    url: '/hd/hd_device_camera/findByHd_device_id',
    method: 'get',
    params
  })
}

export function existPhotoDevice (data) {
  return request({
    url: '/hd/hd_device_camera/existPhotoDevice',
    method: 'get',
    params: data
  })
}

