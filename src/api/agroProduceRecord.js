import request from '@/utils/request'

export function getAgroProduceRecordByArchive (data) {
    return request({
        url: "api/getAgroProduceRecordByArchive",
        method: "get",
        params: data
    });
}

export function agroProduceRecordTypeList (data) {
    return request({
        url: "api/agroProduceRecordTypeList",
        method: "get",
        params: data
    });
}

export function deleteRecordImage (data) {
    return request({
        url: "api/deleteRecordImage",
        method: "get",
        params: data
    });
}

export function getAgroProduceRecordById (data) {
    return request({
        url: "api/getAgroProduceRecordById",
        method: "get",
        params: data
    });
}

export function deleteAgroProduceRecordById (data) {
    return request({
        url: "api/deleteAgroProduceRecordById",
        method: "get",
        params: data
    });
}

export function agroProduceRecordList (data) {
    return request({
        url: "api/agroProduceRecordList",
        method: "get",
        params: data
    });
}

export function archiveMonthRecordAndPlan (data) {
    return request({
        url: "api/archiveMonthRecordAndPlan",
        method: "get",
        params: data
    });
}
// 获取基地农事记录统计
export function baseRecordStatistics (data) {
    return request({
        url: "api/baseRecordStatistics",
        method: "get",
        params: data
    });
}


