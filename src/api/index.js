import request from "@/utils/request";

/**
 * 封装get请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, data) {
  return request({
    url: url,
    method: "get",
    params: data
  });
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function del(url, data) {
  return request({
    url: url,
    method: "delete",
    params: data
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data) {
  return request({
    url: url,
    method: "post",
    data: data
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data) {
  return request({
    url: url,
    method: "put",
    data: data
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data) {
  return request({
    url: url,
    method: "patch",
    data: data
  });
}
