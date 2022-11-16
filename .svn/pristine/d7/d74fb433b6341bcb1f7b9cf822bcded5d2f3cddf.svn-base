import request from '@/utils/request'

export function add (data) {
  return request({
    url: 'api/agroProductPest',
    method: 'post',
    data
  })
}

export function batchDel (ids) {
  return request({
    url: 'api/agroProductPest/batchDel',
    method: 'post',
    data: ids
  })
}


export function del (id) {
  return request({
    url: 'api/agroProductPest/' + id,
    method: 'delete'
  })
}

export function edit (data) {
  return request({
    url: 'api/agroProductPest',
    method: 'put',
    data
  })
}

export function addOrEdit (data) {
  return request({
    url: 'api/agroProductPest/addOrEdit',
    method: 'post',
    data
  })
}

export function getAgroProductPestByArchive (data) {
  return request({
    url: "api/getAgroProductPestByArchive",
    method: "get",
    params: data
  });
}