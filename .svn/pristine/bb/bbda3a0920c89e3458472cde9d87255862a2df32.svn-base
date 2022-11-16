import request from '@/utils/request'

export function deleteProducts(data) {
  return request({
    url: '/hd/hd_product/deleteProducts',
    method: 'get',
    params: data
  })
}

export function queryProduct(data) {
  if (data == undefined || data == null){
    data = {};
  }
  if (!data.size){
    data.size = 1000;
  }
  return request({
    url: '/hd/hd_product/queryProduct',
    method: 'get',
    params: data
  })
}

export function deleteById(data) {
  return request({
    url: '/hd/hd_product/delete',
    method: 'get',
    params: data
  })
}

export function getProductTree(data) {
  return request({
    url: '/hd/hd_product/products/tree',
    method: 'get',
    params: data
  })
}