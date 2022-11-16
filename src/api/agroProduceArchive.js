import request from '@/utils/request'

export function add (data) {
  return request({
    url: 'api/agroProduceArchive',
    method: 'post',
    data
  })
}


export function addOrEdit (data) {
  return request({
    url: 'api/agroProduceArchive/addOrEdit',  
    method: 'post',
    data
  })
}


export function get (id) {
  return request({
    url: 'api/agroProduceArchive/get',
    method: 'get',
    params: {
      id: id
    }
  })
}

export function del (id) {
  return request({
    url: 'api/agroProduceArchive/' + id,
    method: 'delete'
  })
}

export function edit (data) {
  return request({
    url: 'api/agroProduceArchive',
    method: 'put',
    data
  })
}

export function agroProduceArchiveList (data) {
  return request({
    url: "api/agroProduceArchiveList",
    method: "get",
    params: data
  });
}

export function getAgroProduceCycleByArchive (data) {
  return request({
    url: "api/getAgroProduceCycleByArchive",
    method: "get",
    params: data
  });
}

export function getAgroProduceArchiveByMonth (data) {
  return request({
    url: '/api/getAgroProduceArchiveByMonth',
    method: 'get',
    params: data
  })
}

export function getArchiveMonthStatistics (data) {
  return request({
    url: "api/getArchiveMonthStatistics",
    method: "get",
    params: data
  })
}

//种植档案统计  按基地
export function baseArchiveStatistics (data) {
  return request({
    url: "api/baseArchiveStatistics",
    method: "get",
    params: data
  })
}



