import request from "@/utils/request";

export function queryUserVehicle (data) {
    return request({
        url: "/ruide/queryUserVehicle",
        method: "get",
        params: data
    });
}
