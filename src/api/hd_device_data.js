import request from '@/utils/request'

export function getDeviceHistoryDataPage(data){
    return request({
        url : "/hd/device/getDeviceHistoryDataPage",
        method : "get",
        params : data
    })
}