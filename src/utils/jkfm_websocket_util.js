
//获取配方
export function getFormula(device_id, ws) {
    var obj = {
      'device_id': device_id,
      'request_type': 'GetPara',
      "request_body":{
        "msgbd_type": "GetFormula",
        "msgbd_id": 0
      },
      'socket_type': 0
    }
    return ws.send(obj)
  }


  //设置配方
  export function setFormula(device_id,msgbd_content,ws,name){
    msgbd_content.fml_user = name || '系统'
    var obj =  { 
          "device_id": device_id,
          "request_type": "SetPara",
          "request_body": {
              "msgbd_type": "SetFormula",
              "msgbd_content": msgbd_content
          },
      }
    return ws.send(obj)
  }

  //获取计划
  export function getPlan(device_id,msgbd_id,ws){
    var obj =  { 
          "device_id": device_id,
          "request_type": "GetPara",
          "request_body": {
              "msgbd_type": "GetPlan",
              "msgbd_id": msgbd_id
          },
      }
    return ws.send(obj)
  }


  //设置计划
  export function setPlan(device_id,msgbd_content,ws,name){
    msgbd_content.irr.irr_user = name || '系统'
    var obj = {
      "device_id": device_id,
      "request_type": "SetPara",
      "request_body": {
        "msgbd_type": "SetPlan",
        "msgbd_content": msgbd_content
       },
    }
    return ws.send(obj)
  }


   //获取事务
   export function getTask(device_id,msgbd_id,ws){
    var obj = {
      "device_id": device_id,
      "request_type": "GetPara",
      "request_body": {
        "msgbd_type": "GetTask",
        "msgbd_id": msgbd_id //计划id
       },
    }
    return ws.send(obj)
  }

  //设置附属设备(设置阀门)
export function setDev(device_id,msgbd_content,ws,name){
  // msgbd_content.fml_user = name || '系统'
  //   msgbd_content.irr_user = name || '系统'
  //   msgbd_content.db_user = name || '系统'
  //   msgbd_content.rad_user = name || '系统'
  var obj = {
    "device_id": device_id,
    "request_type": "SetPara",
    "request_body": {
      "msgbd_type": "SetDev",
      "msgbd_content": msgbd_content
     },
  }
  return ws.send(obj)
}

//获取附属设备(获取阀门)
export function getDev(device_id,ws){
  var obj = {
    "device_id": device_id,
    "request_type": "GetPara",
    "request_body": {
      "msgbd_type": "GetDev",
      "msgbd_id": 0
     },
  }
  return ws.send(obj)
}

 //设置编组
 export function setBlock(device_id,msgbd_content,ws,name){
  msgbd_content.devBlock.db_user = name || '系统'
  var obj = {
    "device_id": device_id,
    "request_type": "SetPara",
    "request_body": {
      "msgbd_type": "SetBlock",
      "msgbd_content": msgbd_content
     },
  }
  return ws.send(obj)
}


  //获取编组
  export function getBlock(device_id,ws){
    var obj = {
      "device_id": device_id,
      "request_type": "GetPara",
      "request_body": {
        "msgbd_type": "GetBlock",
        "msgbd_id": 0
       },
    }
    return ws.send(obj)
  }

  //获取编组中的附属设备 (获取阀门组的阀门信息)
  export function getDevInBlock(device_id,msgbd_id,ws){
    var obj = {
      "device_id": device_id,
      "request_type": "GetPara",
      "request_body": {
        "msgbd_type": "GetDevInBlock",
        "msgbd_id": msgbd_id
       },
    }
    return ws.send(obj)
  }

  



  //获取光辐射计划
  export function getRad(device_id,ws){
    var obj = {
      "device_id": device_id,
      "request_type": "GetPara",
      "request_body": {
        "msgbd_type": "GetRad",
        "msgbd_id": 0
       },
    }
    return ws.send(obj)
  }


  //获取已经加入光辐射时段的灌溉计划
  export function getRadIrr(device_id,msgbd_id,ws){
    var obj = {
      "device_id": device_id,
      "request_type": "GetPara",
      "request_body": {
        "msgbd_type": "GetRadIrr",
        "msgbd_id": msgbd_id
       },
    }
    return ws.send(obj)
  }

  //设置光辐射计划
  export function setRad(device_id,msgbd_content,ws,name){
    msgbd_content.radiaton.rad_user = name || '系统'
    var obj = {
      "device_id": device_id,
      "request_type": "SetPara",
      "request_body": {
        "msgbd_type": "SetRad",
        "msgbd_content": msgbd_content
       },
    }
    return ws.send(obj)
  }

  
  //获取今日任务
  export function getTodayTask(device_id,ws){
    var obj = {
      "device_id": device_id,
      "request_type": "GetPara",
      "request_body": {
        "msgbd_type": "GetTodayTask",
        "msgbd_id": 0
       },
    }
    return ws.send(obj)
  }

  //获取系统设备
  export function getSysDev(device_id,ws){
    var obj = {
      "device_id": device_id,
      "request_type": "GetPara",
      "request_body": {
        "msgbd_type": "GetSysDev",
        "msgbd_id": 0
       },
    }
    return ws.send(obj)
  }

  //获取设备运行状态
  export function getSta(device_id,ws){
    var obj = {
      "device_id": device_id,
      "request_type": "GetSta",
      "request_body": { },
    }
    return ws.send(obj)
  }

  //启动计划
  export function startPlan(device_id,msgbd_id,ws,name){
    var obj = {
      "device_id": device_id,
      "request_type": "SetAction",
      "request_body": {
        "msgbd_id": msgbd_id,
        "action": "open",
        "msgbd_type": "SetPlanAction"
       },
    }
    return ws.send(obj)
  }
  


  //停止计划
  export function stopPlan(device_id,ws,name){
    var obj = {
      "device_id": device_id,
      "request_type": "SetAction",
      "request_body": {
        "msgbd_id": 0,
        "action": "close",
        "msgbd_type": "SetPlanAction"
       },
    }
    return ws.send(obj)
  }


  //获取累计水肥
  export function getIrrFerSum(device_id,msgbd_id,time,ws){
    var obj = {
      "device_id": device_id,
      "request_type": "GetPara",
      "request_body": {
        "time":time,
        "msgbd_id": msgbd_id,
        "msgbd_type": "GetIrrFerSum"
       },
    }
    return ws.send(obj)
  }


  
