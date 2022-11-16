import request from '@/utils/request';

//获取植保类设备
export function insectList (data) {
    return request({
        url: "/hairui/insectList",
        method: "get",
        params: data
    });
}

//获取环境监测类设备
export function monitorList (data) {
    return request({
        url: "/hairui/monitorList",
        method: "get",
        params: data
    });
}

//获取植保设备已订阅列表
export function insectSubscribelist (data) {
    return request({
        url: "/hairui/insectSubscribelist",
        method: "get",
        params: data
    });
}

//获取环境监测设备已订阅列表
export function monitorSubscribelist (data) {
    return request({
        url: "/hairui/monitorSubscribelist",
        method: "get",
        params: data
    });
}

//新增设备订阅网址
export function addSubscribe (data) {
    return request({
        url: "/hairui/addSubscribe",
        method: "get",
        params: data
    });
}



//通过订阅ID删除订阅
export function removeSubscribeById (data) {
    return request({
        url: "/hairui/removeSubscribeById",
        method: "get",
        params: data
    });
}

//通过设备ID与订阅网址删除订阅
export function removeSubscribeByDeviceserialAndUrl (data) {
    return request({
        url: "/hairui/removeSubscribeByDeviceserialAndUrl",
        method: "get",
        params: data
    });
}



