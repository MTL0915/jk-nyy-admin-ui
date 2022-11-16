
import wc_socket from './web_socket/wc_ws_control'
import { getToken } from '@/utils/auth'
var events = function(func) {
 
    var data = [];
 
    var retFunc = func;
 
    var ret = function(func, bool) {
 
        if(typeof func === "function" && !bool) {
 
            data.push(func);
 
            func.remove = function() {
                data.splice(data.indexOf(func), 1);
                return this;
            }
            func.setIndex = function(index) {
                this.index = index;
                return this;
            }
            func.index = 0;
 
            ret.onaddFunction && ret.onaddFunction(func);
 
            return func;
 
        }
 
        retFunc && retFunc.apply(this, arguments);
 
        data.sort(function(a, b) {
            return a.index < b.index
        });
 
        for(var i = 0; i < data.length; i++) {
 
            var it = data[i];
 
            it && (it.apply(this, arguments) === 'remove') && it.remove();
 
            ret.ontrigger && ret.ontrigger(it);
 
            if(data.indexOf(it) == -1) --i;
 
        };
 
    }
 
    ret.remove = function() {
        data = [];
    };
 
    ret.getFunction = function() {
        return data;
    }
 
    ret.onaddFunction = null;
    ret.ontrigger = null;
 
    return ret;
 
}

// import Queue from '@/utils/Queue'
class exe_base {

    constructor(info){
        /**
         * 设备基本信息
         */
        this.info = info;
        /**
         * 消息队列
         */
        // this.messageQueue = new Queue();
        this.wc_socket = wc_socket
        
        ///TODO 默认就是绑定状态
        this.isBindDevice = true;
        this.vue
        this.vueData

        this.DEBUG_INFO = false;

        //主动上传回调
        this.loginConnect= new events();

        // 失败上传回调
        this.disConnect= new events();
    }
    bindVue(vue){
        this.vue = vue;
        this.vueData = vue.$data;
    }
    getVueData(path){
        if(path ){
            let ret = this.vueData;
            path.split(".").forEach(e=>{
                ret = ret[e];
            });
            return ret;
        }
        return this.vueData;
    }
    /**
     * 
     * @param {*} path 
     * @param {*} value 
     * @param {*} synCtr 是否立即发送命令 同步
     */
    setVueData(path,value, synCtr){
        let ret = this.vueData;
        let paths = path.split(".")
        for (var index = 0; index < paths.length-1; index++) {
            ret = ret[paths[index]];
        }
        ret[paths[index]] = value;
        if(synCtr ==true){
            this.syncControl();
        }
    }
    sendSetParaMessageQueue(messageBody,callback, failed){
        // this.messageQueue.enqueue({
        //     "messageBody":messageBody,
        //     "callback":callback,
        //     "failed":failed,
        // })
        this.syncControl();
    }
    /////测试
    testWebSocket(){
        var obj = {
            "device_id":"",
            "request_type":"SetPara",
            "request_body":{},
            "socket_type":0
        }
        this.wc_socket.sendContent(obj)
    }
    sendBind(){
        console.log("sendBind ",this.info.device_id);
        this.isBindDevice = true;
        this.wc_socket.bindDevice(this.info.device_id)
    }
    syncControl(){
        throw "未实现";
    }
    addUploadStaEvent(func){
        throw "未实现";
    }
    //
    defaultFailedCallback(result){
    }
    getTestToken(apiUri,callback){

        // 修改到直接获取当前登录用户的token
        //创建异步对象
        return callback({ data: { token: getToken() } });

        // //创建异步对象  
        // var xhr = new XMLHttpRequest();
        // xhr.open('post', apiUri );
        // //post请求一定要添加请求头才行不然会报错
        // xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        // // xhr.send('username=testUser&password=123456');
        // xhr.send('username=18929576935&password=jiankun888888');
        // //xhr.send('username=18929576941&password=abc123.com');
        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState == 4 && xhr.status == 200) {
        //         var json = JSON.parse(xhr.responseText);
        //         callback(json)
        //     } 
        // }
    }
}

var ws = new exe_base();

// 登录
let login = function(fn) {
    console.log("刷新连接");
    var ssUri = process.env.BASE_API; //"http://192.168.33.206:8000/nyy/admin";
    var wsUri = process.env.WEBSOCKET_URL;//"192.168.33.206:9005/iotcs-websocket/socketServer";
    // var ssUri = "http://121.32.129.19:8100/nyy/admin";
    // var wsUri = "121.32.129.19:8100/iotcs-websocket/socketServer";
    // var ssUri = "https://iot.joinken.cn/nyy/admin";
    // var wsUri = "iot.joinken.cn/iotcs-websocket/socketServer";
    // var self = this;
    var apiUri = ssUri+"/auth/directLogin2"
    ws.getTestToken(apiUri,function(data){
        // 
        // self.loginload = true;
        // 获取token
        var sToken = data.data.token
        
        ws.wc_socket.init(wsUri,sToken,function(){
            fn && fn()
        })
        window.onbeforeunload = function(){
            if(wc_socket){
                console.log("colose ws");
                wc_socket.close();
            }
        }
        //主动上报回调  
        ws.wc_socket.setUploadSta(function(result){
            // 
            // var data = result.data;
            ws.loginConnect(result);
        })
        
        //离线上报回调  
        ws.wc_socket.setDisconnect(function(result){
            // 
            // var data = result.data;
            ws.disConnect(result);
        })

        /** */
        //控制 & 活动  
    })
}

login(function(){
	console.log("链接成功")
	
});

export default ws;