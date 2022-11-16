import request from '@/utils/request'

export function queryByHd_hardware_version_id(hd_hardware_version_id) {
  var params = new URLSearchParams()
  params.append('hd_hardware_version_id', hd_hardware_version_id)
  return request({
    url: '/hd/hd_device_upgrade_file/query',
    method: 'post',
    params
  })
}

export function del(id) {
  var params = new URLSearchParams()
  params.append('id', id)
  return request({
    url: '/hd/hd_device_upgrade_file/delete',
    method: 'get',
    params
  })
}

export function add(data) {
  const param = new FormData() // 创建form对象
  for (const d in data) {
    if (data[d]) {
      param.append(d, data[d])
    }
  }
  return request({
    url: '/hd/hd_device_upgrade_file/add',
    method: 'post',
    data: param
  })
}
