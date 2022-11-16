import request from '@/utils/request'

// 获取具有路径规划的功能设备 
export function routeDevices(data){
    return request({
        url: "/route/routeDevices",
        data // bs_base_id ， rs_facilities_id
    })
}

// 获取任务类型接口
export function routeJobType(data){
    return request({
        url: "/route/routeJobType",
        data // bs_base_id ， rs_facilities_id
    })
}

// 获取任务路段任务类型接口
export function routeJobAction(data){
    return request({
        url: "/route/routeJobAction",
        data // bs_base_id ， rs_facilities_id
    })
}

// 创建路径任务路径添加
export function routeJobPath(data){
    return request({
        url: "/route/routeJobPath",
        method: "post",
        data // bs_base_id ， rs_facilities_id
    })
}

// 删除路径任务路径组
export function removeRouteJobPath(id){
    return request({
        url: "/route/routeJobPath/"+id,
        method: "delete",
    })
}

// 修改路径任务路径组
export function updateRouteJobPath(data){
    return request({
        url: "/route/routeJobPath",
        method: "put",
        data
    })
}

// 创建路径功能
export function createRouteJob(data){
    return request({
        url: "/route/routeJob",
        method: 'post',
        data // bs_base_id ， rs_facilities_id
    })
}

// 删除路径数据
export function removeRouteJob(id){
    return request({
        url: "/route/routeJob/"+id,
        method: 'delete',
    })
}

// 修改路径数据
export function updateRouteJob(data){
    return request({
        url: "/route/routeJob",
        method: 'put',
        data
    })
}

// 获取任务列表功能
// export function getRouteJobById(){
    
// }

// 获取任务列表功能
export function getRouteJob(id){
    return request({
        url: "/route/routeJob",
        method: 'get',
        params: {
            hd_device_id: id,
            size: 99
        }
    })
}


// 获取任务路线图
export function getRouteJobPath (id){
    return request({
        url: "/route/routeJobPath",
        method: 'get',
        params: {
            id: id
        } 
    })
}


// 获取任务 的子任务列表信息
export function getRouteJobLine (routeJobPathId){
    return request({
        url: "/route/routeJobLine",
        method: 'get',
        params: {
            routeJobPathId: routeJobPathId,
            size: 9999
        }
    })
}

// 新增任务 的子任务信息
export function addRouteJobLine (data){
    return request({
        url: "/route/routeJobLine",
        method: 'post',
        data
    })
}

// 新增任务 的子任务信息
export function addRouteJobLines (datas){
    return new Promise((req)=>{
        var a = function(ids,i){
            var id = ids[i];
            if( !id ){
                req();
                return;
            } 
            console.log("已创建路径字节:"+id +"-----"+i);
            request({
                url: "/route/routeJobLine",
                method: 'post',
                data
            }).then(()=>{
                a(ids,++i);
            })
        }
        a(datas,0)
    })
}

// 删除任务 的子任务信息
export function removeRouteJobLines (ids){
    return new Promise((req)=>{
        var a = function(ids,i){
            var id = ids[i];
            if( !id ){
                req();
                return;
            } 
            console.log("删除路径字节:"+id +"-----"+i);
            request({
                url: "/route/routeJobLine/"+id,
                method: 'delete',
            }).then(()=>{
                //if( ids.length )
                a(ids,++i);
            })
        }
        a(ids,0)
    })
}

// 删除任务 的子任务信息
export function removeRouteJobLine (id){
    return request({
        url: "/route/routeJobLine/"+id,
        method: 'delete',
    })
}

// 修改任务 的子任务信息
export function updateRouteJobLine (data){
    return request({
        url: "/route/routeJobLine",
        method: 'put',
        data
    })
}

// 获取设备配置信息 车身尺寸 视频推流地址 雷达报警 
export function getAttributeByDevice (id){
    return request({
        url: "/hd/hd_device_attribute/getAttributeByDevice",
        method: 'get',
        params: {
            device_id: id
        }
    })
}

// 新增修改 设备配置信息 车身尺寸 视频推流地址 雷达报警 
export function addOrUpdateAttribute (data){
    // var data = {
    //     name: param.name,
    //     description: param.name,
    //     value: param.value
    // }
    // param.id && ( data.id = param.id );
    // param.device_id && ( data.device_id = param.device_id );
    // param.hd_device_id && ( data.hd_device_id = param.hd_device_id );

    // var formDate = new FormData();
    
    return request({
        url: "/hd/hd_device_attribute/addOrUpdateAttribute",
        method: 'post',
        params: data
    })
}

export function routeJobDetail (data){
    return request({
        url: "/route/routeJobDetail",
        method: "get",
        params: data
    })
}

export function deleteByRouteJobPathId (routeJobPathId){
    // /route/deleteByRouteJobPathId
    return request({
        url: "/route/deleteByRouteJobPathId",
        method: "get",
        params: {
            routeJobPathId: routeJobPathId
        }
    })
}
