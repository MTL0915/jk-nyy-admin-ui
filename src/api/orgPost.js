import request from '@/utils/request'

export function getLists(data) {
  return request({
    url: '/bs/bs_org/queryPost',
    method: 'get',
    params: data
  })
}

// add
export function addPost(data) {
  return request({
    url: '/bs/bs_org/savePost',
    method: 'get',
    params: data
  })
}

// edit
export function editPost(data) {
  return request({
    url: '/bs/bs_org/updatePost',
    method: 'get',
    params: data
  })
}

// delete
export function deletePost(data) {
  return request({
    url: '/bs/bs_org/deletePost',
    method: 'get',
    params: data
  })
}
