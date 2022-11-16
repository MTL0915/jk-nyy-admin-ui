import ws from '../../components_drawLine/ws/executor.js'

window.ws = ws;

var id = "";

var control = function(no) {
  if (!no) {
    alert("找不到选中设备！");
  }
  // 将id赋值
  id = no;
  // 需要传输的对象
  this.obj = {};
  // 速度
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

  this.loginload = true;

  this.onupdateInfo = new Function();

  this.ondisupdateInfo = new Function();

  // 失败请求返回
  this.onerrorinfo = new Function();

  this.init();
};

control.prototype = {
  init() {
    // 监听上传
    this.monitorWs = ws.loginConnect(res => {
      if (res.data.device_id != id) return; //非本设备
      // console.log("***************************************")
      // console.log("获取的设备信息:")
      // console.log(res)
      // console.log("***************************************")
      this.onupdateInfo(res);
    });

    // 失败上传回调
    this.dismonitorWs = ws.disConnect(res => {
      if (res.data.device_id != id) return; //非本设备
      this.ondisupdateInfo(res);
    });
  },

  destroy() {
    this.monitorWs.remove();
    this.dismonitorWs.remove();
  },

  // 操作方向
  send(body) {
    var obj = {
      device_id: id,
      request_type: "SetLogic",
      socket_type: 0,
      request_body: body
    };
    ws.wc_socket.sendContent(
      obj,
      () => {
        //
      },
      () => {
        //
      }
    );
  },

  // 主动获取
  sendGetSta() {
    var obj = {
      device_id: id,
      socket_type: 0,
      request_type: "GetStaByDevice_id"
    };
    ws.wc_socket.sendContent(obj, () => {}, () => {});
  },

  // 设置逻辑发送
  sendSetPara(body,successFun,errorFun) {
    var obj = {
      device_id: id,
      request_type: "SetPara2",
      socket_type: 0,
      request_body: body
    };
    if (successFun != undefined && errorFun != undefined){
      ws.wc_socket.sendContent(obj, successFun, errorFun);
    }else{
      ws.wc_socket.sendContent(obj, () => {}, () => {});
    }
  },

  setActionStatus(body,successFun,errorFun) {
    var obj = {
      device_id: id,
      request_type: "SetActionStatus",
      socket_type: 0,
      request_body: body
    };
    if (successFun != undefined && errorFun != undefined){
      ws.wc_socket.sendContent(obj, successFun, errorFun);
    }else{
      ws.wc_socket.sendContent(obj, () => {}, () => {});
    }
  },

  sendContentSync (){
    return new Promise(( suc , err )=>{
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
      ws.wc_socket.sendContent(
        objBody,
        (res) => {
          //
          suc(res);
        },
        (res) => {
          err(res);
          this.onerrorinfo(res)
        }
      );
      this.obj = {};
    })
    
  },

  // 管理发送
  sendContent() {
    // 判断是否已经开车了
    if (this.theCar) {
      // 如果已经开车了则等待下一趟
    } else {
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
        ws.wc_socket.sendContent(
          objBody,
          () => {
            //
          },
          (res) => {
            //
            this.onerrorinfo(res)
          }
        );
        this.obj = {};
        // console.log(objBody);
      }, 100);
    }
  },

  // 开机
  bootUp() {
    var obj = {
      controlType: 1,
      logicNum: [1, 2],
      logic1: {
        action: "open",
        channel: [1]
      },
      logic2: {
        action: "close",
        channel: []
      }
    };
    this.send(obj);
  },

  // 关机
  bootDown() {
    var obj = {
      controlType: 1,
      logicNum: [1, 2],
      logic1: {
        action: "open",
        channel: []
      },
      logic2: {
        action: "close",
        channel: [1]
      }
    };
    this.send(obj);
  },

  // 输入方向
  setAnget(speed, angel) {
    this.SetPara = {
      // speed_gear: speed,
      speed: speed,
      direction: angel,
    };
    this.sendContent();
  },

  // 升
  up(it) {
    // 获取通道号
    var channel = it.channel;
    // 将通道号添加到对应的位置
    this.SetLogicChannel[channel] = "open";
    // 发送请求
    this.sendContent();
  },

  // 降
  down(it) {
    // 获取通道号
    var channel = it.channel;
    // 将通道号添加到对应的位置
    this.SetLogicChannel[channel] = "close";
    // 发送请求
    this.sendContent();
  },

  unUpAndDown(it) {
    // 获取通道号
    var channel = it.channel;
    // 将通道号添加到对应的位置
    this.SetLogicChannel[channel] = "stop";
    // 发送请求
    this.sendContent({ one: true });
  },

  // 打开窗户
  openWindow(it) {
    return this.up(it);
  },

  // 关闭窗户
  closeWindow(it) {
    return this.down(it);
  },

  // 停止窗户
  stopWindow(it) {
    return this.unUpAndDown(it);
  },

  // 开启阀门
  sendOn(it,Sync) {
    // 获取通道号
    var channel = it.channel;
    // 将通道号添加到对应的位置
    this.SetLogicChannel[channel] = "open";
    // 发送请求
    return Sync ? this.sendContentSync() : this.sendContent();
  },

  // 关闭阀门
  sendOff(it,Sync) {
    // 获取通道号
    var channel = it.channel;
    // 将通道号添加到对应的位置
    this.SetLogicChannel[channel] = "close";
    // 发送请求
    return Sync ? this.sendContentSync() : this.sendContent();
  },

  // 停止阀门
  sendStop (it,Sync){
    // 获取通道号
    var channel = it.channel;
    // 将通道号添加到对应的位置
    this.SetLogicChannel[channel] = "stop";
    // 发送请求
    return Sync ? this.sendContentSync() : this.sendContent();
  },

  // 单打电源
  openSensor (sensorId,){
    var obj = {
      'hd_device_sensor_id': sensorId,
      'socket_type': 0,
      'request_type': 'OpenChannel'
    }
    
    return new Promise((res,err)=>{
      ws.wc_socket.sendContent(obj,function(e){
        res(e)
      },function(e){
        res(e)
      });
    }) 
  },

  // 关闭电源
  clearSensor (sensorId){
    var obj = {
      'hd_device_sensor_id': sensorId,
      'socket_type': 0,
      'request_type': 'CloseChannel'
    }
    return new Promise((res,err)=>{
      ws.wc_socket.sendContent(obj,function(e){
        res(e);
      },function(e){
        res(e);
      });
    }) 
  },

  // 清除的时候
  remove() {
    // 清除上报监听
    this.monitorWs.remove();
    // 清除队列上报
    clearInterval(this.theCar);
  },

  // 下发取消任务指令
  cancelInstructions(fn) {
    var option = {
      'device_id': id,
      'socket_type': 0,
      'request_type': 'StopRouteJob'
    }
    ws.wc_socket.sendContent(
      option,
      arg => {
        fn(arg);
      },
      arg => {
        fn(arg);
      }
    );
  },

  // 执行任务
  executeInstructions(routeJobId, fn) {
    var option = {
      'device_id': id,
      'socket_type': 0,
      'request_type': 'StartRouteJob',
      'request_body': {
        'routeJobId': routeJobId,
      }
    };
    ws.wc_socket.sendContent(
      option,
      arg => {
        fn(arg);
      },
      arg => {
        fn(arg);
      }
    );
  },

  // 下发任务指令
  setUpInstructions(routeJobId, fn, index) {
    var option = {
      'device_id': id,
      'socket_type': 0,
      'request_type': 'OrderRouteJob',
      'request_body': {
        'routeJobId': routeJobId,
        'start': index
      }
    }
    ws.wc_socket.sendContent(
      option,
      arg => {
        fn(arg);
      },
      arg => {
        fn(arg);
      }
    );
  },

  // 示教开始
  teachMode (fn){
    var option = {
      'device_id': id,
      'socket_type': 0,
      'request_type': 'StartTeach'
    }
    ws.wc_socket.sendContent(
      option,
      arg => {
        fn && fn(arg);
      },
      arg => {
        fn && fn(arg);
      }
    );
  },

  // 示教结束
  unteachMode (fn){
    var option = {
      'device_id': id,
      'socket_type': 0,
      'request_type': 'EndTeach'
    }
    ws.wc_socket.sendContent(
      option,
      arg => {
        fn && fn(arg);
      },
      arg => {
        fn && fn(arg);
      }
    );
  }

};

export default control;