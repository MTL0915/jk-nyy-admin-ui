import request from '@/utils/request'

export function add(data) {
  var formData = new FormData()
  for (var i in data) {
    formData.append(i, data[i])
  }
  return request({
    url: 'api/rsPanorScene',
    method: 'post',
    data : formData
  })
}

export function changeOrd(data) {
  var str = '';
  for( var i in data ){
    str += i + "=" + data[i] + "&";
  }
  if( str ) str = "?" + str;
  return request({
    url: 'api/changeOrd' + str,
    method: 'get',
    data
  })
}

export function get(data) {
  return request({
    url: 'api/rsPanorScene?sort=ord,asc',
    method: 'get',
    data
  })
}


export function getByPanorId(id){
  return request({
    url: 'api/rsPanorScene?size=999&sort=ord,asc&rsPanorId='+id,
    method: 'get',
  })
}

export function getByBaseId(id){
  return request({
    url: 'api/rsPanorScene?size=999&sort=ord,asc&bs_base_id='+id,
    method: 'get',
  })
}

export function del(id) {
  return request({
    url: 'api/rsPanorScene/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api/rsPanorScene',
    method: 'put',
    data
  })
}

export function changeImage(data) {
  var formData = new FormData()
  for (var i in data) {
    formData.append(i, data[i])
  }
  return request({
    url: 'api/changeImage',
    method: 'post',
    data : formData
  })
}