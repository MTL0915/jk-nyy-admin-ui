
import wscli from './jk-nyy-client-1.0.js'

export default (function wsControl(){
    var self={};
    self.init = function (ssUri, sToken , fn) {
        let serverUri= ""
        let token = ""
        if(ssUri){
           serverUri = ssUri;
           token = sToken;
        }
        wscli.init({  url:serverUri,access_token: token });
        //连接
        try{
            wscli.connect().onopen = function(){
                console.log("连接成功")
                fn && fn()
            };

        }catch (e){
            alert("连接失败");
        }
       
    }
    self.close =function(){
        wscli.close();
    }
    /**
     *设置主动上报回调
     * 
     */
    self.setUploadSta = function(func){
        wscli.onUploadSta = func;
    }

    /**
     *设置主动上报回调
     * 
     */
    self.setDisconnect = function(func){
        wscli.onDisconnect = func;
    }

    /**
     * 绑定设备
     */
    self.bindDevice = function(device_id,handlerResponse,failed){
        var obj = {
            "message_id":"1",
            "device_id":device_id,
            "request_type":"BindDevice2",
            "request_body":{},
            "socket_type":0
        }
        wscli.send(obj,handlerResponse,failed);
    }
    self.SetPara= function (device_id,body,handlerResponse, failed){
        var obj = {
            "device_id":device_id,
            "request_type":"SetPara2",
            "request_body":body,
            "socket_type":0
        }
      
        return wscli.send(obj,handlerResponse, failed);
    }

    
    /**
     *  设置无人喷药车参数
     * speed,direction,spray,mode
     * @deprecated
     */
    self.setWcParasetPara= function (device_id,body,handlerResponse){
        var obj = {
            "device_id":device_id,
            "request_type":"SetPara",
            "request_body":{},
            "socket_type":0
        }
        obj.device_id = device_id;
        if (typeof body.speed !="undefined"){
            obj.request_body.speed = parseFloat(body.speed);
        }
        if (typeof body.direction !="undefined"){
            obj.request_body.direction = parseInt(body.direction);
        }
        if (typeof body.spray !="undefined"){
            obj.request_body.spray = body.spray;
        }
        if (typeof body.mode !="undefined"){
            obj.request_body.mode = body.mode;
        }
        wscli.send(obj,handlerResponse);
    }
    self.sendContent= function (obj,success,error){
        wscli.send(obj,success,error);
    }


    return self;
})()

