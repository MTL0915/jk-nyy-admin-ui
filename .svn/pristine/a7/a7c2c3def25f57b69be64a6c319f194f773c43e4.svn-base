import console from '../util/console'
import { getToken } from '@/utils/auth'
import events from '../util/events'

// ws本体
let wsObject = null;

// 设备id
let deviceId = null;

// 位置矫正
let positionCorrection = null; 

import { getAttributeByDevice } from "@/api/map3d/drawMap.js";

// 获取设备ajax
var getAttributeByDeviceAjax = function(id) {
    return new Promise((a,b)=>{
        // 获取设备配置信息
        getAttributeByDevice(id).then(res => {
            var data = res.data;
            // 获取位置矫正数据
            var positionCorrectionThis = data.find(e => {
                return e.name === "positionCorrection";
            });
            if (
                positionCorrectionThis &&
                positionCorrectionThis.value != "" &&
                positionCorrectionThis.value
            ) {
                // 如果存在矫正地址
                positionCorrection = positionCorrectionThis.value;
            }
            a()
        });
    })
};

// 一个模块的socket交互中心
class ws {

    // 初始化函数
    constructor (){

        // ws链接地址
        this.webSocketUrl = process.env.WEBSOCKET_URL;

        // token值
        this.token = null;

        // 协议头
        this.wsProtocol = 'ws://'

        // 接受到上报信息
        this.onUploadSta = new events();

        // 接受请求的管理
        this.sendStore = {};

        // 存储类型
        this.SetPara = null;

        // 控制
        this.SetLogic = {
            controlType: 1,
            logicNum: []
        };

        // 控制通道号合计
        this.SetLogicChannel = {};
        this.SetLogicOpen = [];
        this.SetLogicClose = [];
        this.SetLogicStop = [];

        // 允许空执行等待次数
        this.noParamNum = 0;

        // 进行初始化
        this.init();

        // 标记一下当前创建示例  用于确保唯一获取
        ws.setObject( this );
    }

    // socket请求成功后的回调
    feedbackSuccess (result){
        // 获取当前信息的消息码
        let message_id = result.message_id;
        // 根据消息码获取消息预存的回调信息
        this.sendStore[message_id].success && this.sendStore[message_id].success(result);
        // 删除掉当前的事件处理
        delete this.sendStore[message_id];
    }

    // socket请求失败后的回调
    feedbackFailed (result){
        // 获取当前信息的消息码
        let message_id = result.message_id;
        // 根据消息码获取消息预存的回调信息
        this.sendStore[message_id].error && this.sendStore[message_id].error(result);
        // 删除掉当前的事件处理
        delete this.sendStore[message_id];
    }

    // 获取ws的链接状态
    getState (){
        return 1;
    }

    getDeviceId (){
        return deviceId;
    }

    getTestToken (){
        return new Promise((res)=>{
            this.token = getToken();
            res(this.token);
        })
    }

    getWebSocketUrl (){ return this.webSocketUrl }

    getWsProtocol (){ return this.wsProtocol }

    // 初始化
    init (){
        // 首先先登录获取token
        this.getTestToken().then((token)=>{
            // 创建websocket实例
            this.ws = new WebSocket(this.getWsProtocol() + this.getWebSocketUrl() + "/" + token);

            // 开启成功后
            this.ws.onopen = () => {
                console.success("websocket链接成功");
            }

            // 接收到信息部分
            this.ws.onmessage = (message)=> {
                var result = JSON.parse(message.data);
                var code = result.code;
                if ( code == 215 ){
                    // $.onDisconnect && $.onDisconnect(result);
                }else if (code == 211  ){ //上报
                    this.uploadSta(result);
                }else if (code == 200){ //SetPara 
                    
                    this.feedbackSuccess(result)
                }else{ //当错误
                    
                    this.feedbackFailed(result)
                }
            };
            
            // ws关闭
            this.ws.onclose = ()=> {
                
            };

            // 链接服务器出现错误
            this.ws.onerror = (errorMsg)=> {
                
            }

        });
    }

    // 验证上报数据是否是当前绑定设备
    // result 是上报数据体
    matchDeviceId (result){
        var devieId = result.data.device_id;
        // console.log("接收到来自："+devieId+"的上报数据");
        if( this.getDeviceId() === devieId ){
            return true;
        }else{
            return false;
        }
    }

    // 正对于位置矫正进行处理
    positionHandle (result){
        var property_values = result.data.property_values;
        // 获取初始的上报经纬度
        var location = property_values.location;
        // 首先将位置调整
        property_values.position = location.reverse();
        // 如果偏转存在
        if( positionCorrection ){
            // 然后根据偏转量大小来设置偏转后的距离
            property_values.position = property_values.position.map((a,i) => {
                var b = positionCorrection.split(",")[i]*1;
                return a += b && isNaN(b) ? b : 0;
            });
        }
    }
    
    setDeviceId (id){
        ws.setDeviceId(id);
    }

    // 发送指令
    sendContent (message,callback,failed){
        
        const dates = new Date().getTime()/1000;
        const message_id = dates + parseInt(Math.random() * 10000000).toString();
        // if (0==$.getState()){
        // 	$.connect();
        // }
        if(1==this.getState()) {
            callback= callback?callback: this.defaultSuccessCallback
            // failed= failed?failed: this.defaultFailedCallback
            message.access_token = this.token;
            message.message_id = message_id;
            message.timestamp = dates;
            message = JSON.stringify(message);
            this.sendStore[message_id] ={
                "message":message,
                "success":callback,
                "error":failed,
            }
            this.ws.send(message);
        }else{
            //回调失败
            failed()
            console.error("websocket与服务器未连接");
        }
        return message_id;
    }    

    // 管理并发发送
  sendContentContinuous() {
        
        
        // 判断是否已经开车了
        if (this.theCar) {
        // 如果已经开车了则等待下一趟
        } else {
        var id = this.getDeviceId();
        // 如果还没有开车 则开车出发
        this.theCar = setInterval(() => {
            if (!this.SetPara && JSON.stringify(this.SetLogicChannel) == "{}") {
            this.noParamNum--;
            if (this.noParamNum <= 0) {
                clearInterval(this.theCar);
                console.log("无数据缓存， 退出链接");
                this.theCar = null;
            }
            return;
            }
            this.noParamNum = 3;
            // console.log("发送指令");
            var objBody = {
                device_id: id,
                socket_type: 0,
                request_type: "Customize",
                request_body: {
                    message_type: "MultiCommand",
                    message_body: {
                    command_type: []
                    }
                }
            };
            // 判断存储对象的类型有那些
            if (this.SetPara) {
                // 添加请求类型
                objBody.request_body.message_body.command_type.push("SetPara");
                // 添加请求内容
                objBody.request_body.message_body.SetPara = this.SetPara;
                // 清空缓存的指令
                this.SetPara = null;
            } else if (JSON.stringify(this.SetLogicChannel) !== "{}") {
                // 如果控制的通道号不为空
                // 添加请求类型
                objBody.request_body.message_body.command_type.push("SetLogic");
                // 添加请求内容
                objBody.request_body.message_body.SetLogic = JSON.parse(
                    JSON.stringify(this.SetLogic)
                );
                var logicType = [];
                // 遍历通道生成控制请求体
                for (var i in this.SetLogicChannel) {
                    // 获取类型
                    var action = this.SetLogicChannel[i];
                    // 结构体
                    var body = null;
                    // 判断这个类型是否已经存在了 不存在添加新的结构
                    if (logicType.indexOf(action) === -1) {
                    // 添加记录
                    logicType.push(action);
                    // 创建结构体
                    objBody.request_body.message_body.SetLogic.logicNum.push(
                        logicType.length
                    );
                    body = objBody.request_body.message_body.SetLogic[
                        "logic" + logicType.length
                    ] = {
                        action: action,
                        channel: []
                    };
                }
                // 判断结构体赋值
                if (!body) {
                // 如果结构体不存在
                var index = logicType.indexOf(action) + 1;
                body =
                    objBody.request_body.message_body.SetLogic["logic" + index];
                }

                // 将通道号添加进入
                body.channel.push(i * 1);
            }

            // 清空缓存的指令
            this.SetLogicChannel = {};
            }
            console.log("------------------------------");
            console.log(JSON.stringify(objBody));
            console.log("------------------------------");
            this.sendContent(
                objBody,
                () => { },
                () => {  }
            );
            this.obj = {};
            // console.log(objBody);
        }, 100);
        }
    }

    sendContentSync (){
        return new Promise(( suc , err )=>{
          var id = this.getDeviceId();
          if( !id ) {
            return console.warn("发送操作指令时没有指明操作单位")
          }
          console.log("发送指令");
          var objBody = {
            device_id: id,
            socket_type: 0,
            request_type: "Customize",
            request_body: {
              message_type: "MultiCommand",
              message_body: {
                command_type: []
              }
            }
          };
          // 判断存储对象的类型有那些
          if ( this.SetPara ) {
            // 添加请求类型
            objBody.request_body.message_body.command_type.push("SetPara");
            // 添加请求内容
            objBody.request_body.message_body.SetPara = JSON.parse(
              JSON.stringify(this.SetPara)
            );
            // 清空缓存的指令
            this.SetPara = null;
          } else if (JSON.stringify(this.SetLogicChannel) !== "{}") {
            // 如果控制的通道号不为空
            // 添加请求类型
            objBody.request_body.message_body.command_type.push("SetLogic");
            // 添加请求内容
            objBody.request_body.message_body.SetLogic = JSON.parse(
              JSON.stringify(this.SetLogic)
            );
            var logicType = [];
            // 遍历通道生成控制请求体
            for (var i in this.SetLogicChannel) {
              // 获取类型
              var action = this.SetLogicChannel[i];
              // 结构体
              var body = null;
              // 判断这个类型是否已经存在了 不存在添加新的结构
              if (logicType.indexOf(action) === -1) {
                // 添加记录
                logicType.push(action);
                // 创建结构体
                objBody.request_body.message_body.SetLogic.logicNum.push(
                  logicType.length
                );
                body = objBody.request_body.message_body.SetLogic[
                  "logic" + logicType.length
                ] = {
                  action: action,
                  channel: []
                };
              }
              // 判断结构体赋值
              if (!body) {
                // 如果结构体不存在
                var index = logicType.indexOf(action) + 1;
                body =
                  objBody.request_body.message_body.SetLogic["logic" + index];
              }
    
              // 将通道号添加进入
              body.channel.push(i * 1);
            }
    
            // 清空缓存的指令
            this.SetLogicChannel = {};
          }
          console.log("------------------------------");
          console.log(JSON.stringify(objBody));
          console.log("------------------------------");
          this.sendContent(
            objBody,
            (res) => {
              //
              suc(res);
            },
            (res) => {
              err(res);
            }
          );
          this.obj = {};
        })
    }

    // 上报数据成功
    // result 是上报数据体
    uploadSta (result){
        // 判断上报设备的id是否与当前绑定设备的id匹配
        if( this.matchDeviceId(result) ){
            console.debug(result.data.property_values.location);
            // 对矫正位置的做相对应的处理
            this.positionHandle(result);
            // 触发事件
            this.onUploadSta(result);
        }
    }

    // 示教开始
    teachMode (fn){
        var id = this.getDeviceId()
        var option = {
        'device_id': id,
        'socket_type': 0,
        'request_type': 'StartTeach'
        }
        this.sendContent(
            option,
            arg => { fn && fn(arg); },
            arg => { fn && fn(arg); }
        );
    }

    // 示教结束
    unteachMode (fn){
        var id = this.getDeviceId()
        var option = {
        'device_id': id,
        'socket_type': 0,
        'request_type': 'EndTeach'
        }
        this.sendContent(
            option,
            arg => { fn && fn(arg); },
            arg => { fn && fn(arg); }
        );
    }

    // 下发取消任务指令
    cancelInstructions(fn) {
        var option = {
            'device_id': this.getDeviceId(),
            'socket_type': 0,
            'request_type': 'StopRouteJob'
        }
        this.sendContent(
            option,
            arg => { fn && fn(arg); },
            arg => { fn && fn(arg); }
        );
    }

    // 执行任务
    executeInstructions(routeJobId, fn) {
        var option = {
        'device_id': this.getDeviceId(),
        'socket_type': 0,
        'request_type': 'StartRouteJob',
        'request_body': {
            'routeJobId': routeJobId,
        }
        };
        this.sendContent(
            option,
            arg => { fn(arg); },
            arg => { fn(arg); }
        );
    }

    // 下发任务指令
    setUpInstructions(routeJobId, fn, index) {
        var option = {
            'device_id': this.getDeviceId(),
            'socket_type': 0,
            'request_type': 'OrderRouteJob',
            'request_body': {
                'routeJobId': routeJobId,
                'start': index
            }
        }
        this.sendContent(
            option,
            arg => {
                fn(arg);
            },
            arg => {
                fn(arg);
            }
        );
    }

    // 输入方向
    setAnget(speed, angel) {
        this.SetPara = {
            speed: speed,
            direction: angel,
        };
        this.sendContentContinuous();
    }

    // 一般都是调用get来获取ws对象的
    static get (){
        return wsObject ? wsObject : new this();
    }

    static setObject ( obj ){
        wsObject = obj;
    }

    static setDeviceId (id){
        getAttributeByDeviceAjax(id).then(()=>{
            deviceId = id;
        })
    }

    static refreshDeviceConf (id){
        getAttributeByDeviceAjax( id || deviceId )
    }

    static correctPosition (array) {
        if (typeof array[0] === "object") {
          // 如果是一个经纬度数组
          return array.map(e => {
            return this.correctPosition(e);
          });
        } else {
          if (positionCorrection != "") {
            // 如果存在偏转值
            return [
              array[0] + positionCorrection.split(",")[0] * 1,
              array[1] + positionCorrection.split(",")[1] * 1
            ];
          } else {
            return [array[0], array[1]];
          }
        }
    }

    static uncorrectPosition (array) {
        if (typeof array[0] === "object") {
            // 如果是一个经纬度数组
            return array.map(e => {
              return this.uncorrectPosition(e);
            });
          } else {
            if (positionCorrection != "") {
              // 如果存在偏转值
              return [
                array[0] - positionCorrection.split(",")[0] * 1,
                array[1] - positionCorrection.split(",")[1] * 1
              ];
            } else {
              return [array[0], array[1]];
            }
          }
    }

}



export default ws;