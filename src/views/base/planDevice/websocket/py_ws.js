// 喷药车
import ws from './ws'
class py_ws extends ws {
    constructor (){
        super();
    }

    // 单打电源
    openSensor (sensorId){
        return new Promise((success,failed)=>{
            var obj = {
                'hd_device_sensor_id': sensorId,
                'socket_type': 0,
                'request_type': 'OpenChannel'
            }
            this.sendContent(obj,success,failed);
        })
    }

    // 关闭电源
    clearSensor (sensorId){
        var obj = {
            'hd_device_sensor_id': sensorId,
            'socket_type': 0,
            'request_type': 'CloseChannel'
        }
        return new Promise((res,err)=>{
            this.sendContent(obj,function(e){
                res(e);
            },function(e){
                err(e);
            });
        }) 
    }

    // 开启阀门
    sendOn(it,Sync) {
        // 获取通道号
        var channel = it.channel;
        // 将通道号添加到对应的位置
        this.SetLogicChannel[channel] = "open";
        // 发送请求
        return Sync ? this.sendContentSync() : this.sendContent();
    }

    // 关闭阀门
    sendOff(it,Sync) {
        // 获取通道号
        var channel = it.channel;
        // 将通道号添加到对应的位置
        this.SetLogicChannel[channel] = "close";
        // 发送请求
        return Sync ? this.sendContentSync() : this.sendContent();
    }

    // 停止阀门
    sendStop (it,Sync){
        // 获取通道号
        var channel = it.channel;
        // 将通道号添加到对应的位置
        this.SetLogicChannel[channel] = "stop";
        // 发送请求
        return Sync ? this.sendContentSync() : this.sendContent();
    }
}

export default py_ws;