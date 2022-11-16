import request from '@/utils/request'


export function getMessage(data) {
  return request({
    url: 'api/userMessage',
    method: 'get',
    params: data
  })
}
export function getMatedata() {
  return request({
    url: 'api/userMessage/getMatedata',
    method: 'get',
  })
}
export function markReaded(id) {
  return request({
    url: 'api/userMessage/markReaded/'+ id,
    method: 'put'
  })
}
export function markAll() {
  return request({
    url: 'api/userMessage/markAll',
    method: 'put'
  })
}
