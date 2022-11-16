import { getToken } from '@/utils/auth'

class MyWebSocket {
  constructor(url, access_token) {
    var protocol = window.location.protocol === 'http:' ? 'ws:' : 'wss:'
    this.url = protocol + url 

    // promise池，存储请求成功与请求失败函数
    this.promisePool = {}
    // 用于区分前端消息指令
    this.message_id = 0

    // 发送心跳包
    var _this = this;
    setInterval(function(){
      if (_this.client && _this.client.readyState === 1) {
        // 发送心跳包
        _this.send({
          'socket_type': 1
        });
      }else{
        _this.open();
      }
    },20000)
  }

  getMessageId() {
    this.message_id++
    return this.message_id
  }

  tokenCheck(req, rsp) {
    // 此处根据自己的数据结构进行tokenCheck的判断，返回一个boolean
  }
  /**
   * Socket.readyState
   * 0 - 表示连接尚未建立。
		 1 - 表示连接已建立，可以进行通信。
		 2 - 表示连接正在进行关闭。
		 3 - 表示连接已经关闭或者连接不能打开
   */
  open(vue) {
    this.vue = vue
    return new Promise((resolve, reject) => {
      if (this.client && this.client.readyState === 1) {
        resolve && resolve()
      }
      var access_token = getToken();
      if (!access_token){
        console.log("无法获取access_token，建立websocket连接失败！");
        return;
      }
      var url = this.url + '/' + access_token
      this.client = new WebSocket(url)
      this.client.onopen = () => {
        resolve && resolve()
        this.client.onmessage = (e) => {
          const data = JSON.parse(e.data)
          //// this.logUpload && this.logUpload(data.data)///测试
          const key = data.message_id
          const req = this.promisePool[key]
          if (data.code === 200) {
            req && req.resolve && req.resolve(data)
            delete this.promisePool[key]
          } else if (data.code === 201) {
            // 主动上报数据
          } else if (data.code === 203) {
            // 主动上报设备更新数据
            this.upgradeUpload && this.upgradeUpload(data.data)
          } else if (data.code === 210) { // 消息日志主动上报
            console.log(data.data)
            this.logUpload && this.logUpload(data.data)
          } else if (data.code === 402) {
            // token值失效
            this.close()
          } else if (data.code === 211) {
            // 传感器数据主动上报
            // console.log(data)
            this.deviceInfoUpload && this.deviceInfoUpload(data.data);
          } else if (data.code === 215) {
            // 传感器数据主动上报
            // console.log(data)
            this.deviceOffine && this.deviceOffine(data.data);
          } else {
            req && req.reject && req.reject(data)
          }
        }

        this.client.onclose = () => {
          // 对应的重连操作
          // this.open()
          // this.vue && this.vue.$message.error('客户端与Websocket服务器连接！')
        }
      }
      this.client.onerror = () => {
        var data = {
          code: 500,
          msg: '客户端与服务器连接断开，请重新再试！'
        }
        // var promisePoolList = Object.values(this.promisePool)
        // for (var promise of promisePoolList) {
        //   promise.reject && promise.reject(data)
        // }
        reject && reject(data)
      }
    })
  }

  close() {
    this.client.close()
  }
  // token包含在content中
  send(content) {
    return new Promise((resolve, reject) => {
      content.message_id = this.getMessageId()
      this.promisePool[content.message_id] = {
        content,
        resolve,
        reject
      }

      content.access_token = getToken()

      if (this.client.readyState !== 1) {
        this.open().then(() => {
          this.sendContent(content)
        }).catch(() => {
          var data = {
            code: 500,
            msg: '客户端与服务器连接断开，请重新再试！'
          }
          reject && reject(data)
        })
      } else {
        this.sendContent(content)
      }
    })
  }

  sendContent(content) {
    this.client.send(JSON.stringify(content))
  }
  //TODO 目前 替换210
  addListener(func, code) {
    if (code == 210) {
      this.logUpload = func;
    }
  }
  removeListener(func) {
    //TODO ===
  }
}

export default MyWebSocket
