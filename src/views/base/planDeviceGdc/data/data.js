// 一个模块的数据处理中心

import { 
    getAttributeByDevice,
    addOrUpdateAttribute, 
    getRouteJobPath, 
    routeJobDetail,
    getRouteJob,
    getRouteJobLine,
    removeRouteJob,
    updateRouteJob,
    updateRouteJobPath,
    deleteByRouteJobPathId,
    addRouteJobLine,
    routeJobType,
    createRouteJob,
    routeJobPath
} from '@/api/map3d/drawMap'
import { getDetailById } from '@/api/equip'

/* 获取设备数据 */
export function getDevice (device_id){
    return getDetailById({
        device_id
    })
}

/* 获取设备配置 */
export function getDeviceConf (device_id) {
    return getAttributeByDevice(device_id)
}

/* 获取设备配置 */
export function addOrUpdateDeviceConf (data) {
    return addOrUpdateAttribute(data)
}

/* */
export function getRouteJobPath_ (){
    return getRouteJobPath.apply(this,arguments);
}

export function getRouteJobLine_ (){
    return getRouteJobLine.apply(this,arguments);
}

export function routeJobDetail_ (){
    return routeJobDetail.apply(this,arguments);
}

export function getRouteJob_ (){
    return getRouteJob.apply(this,arguments);
}

export function removeRouteJob_ (){
    return removeRouteJob.apply(this,arguments);
}

export function updateRouteJob_ (){
    return updateRouteJob.apply(this,arguments);
}

export function updateRouteJobPath_ (){
    return updateRouteJobPath.apply(this,arguments);
}

export function deleteByRouteJobPathId_ (){
    return deleteByRouteJobPathId.apply(this,arguments);
}

export function addRouteJobLine_ (){
    return addRouteJobLine.apply(this,arguments);
}

export function routeJobType_ (){
    return routeJobType.apply(this,arguments);
}

export function createRouteJob_ (){
    return createRouteJob.apply(this,arguments);
}

export function routeJobPath_ (){
    return routeJobPath.apply(this,arguments);
}