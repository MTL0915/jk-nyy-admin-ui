var obj = {};

(function($) {
 
	$.config = {
		url: '', //链接地址
		access_token : '',
	};
	$.MID_PREFIX = ""
 
	$.init=function(config) {
		this.config = config;
		return this;
	};
 
	var checkConfig = function(){
		if (!$.config.url){
			throw Error("连接失败，url无效！");
		}
		if (!$.config.access_token){
			throw Error("连接失败，access_token无效！");
		}
	}; 

	var closeSocket = function() {
		if($.getState()) {
			$.socket.close();
			$.socket = null;
		}
	}
	
	$.close = function(){
		closeSocket();
	}
	/**
	 * 连接webcocket
	 */
	$.connect = function(fn) {
		var protocol = (window.location.protocol == 'http:') ? 'ws:' : 'wss:';
	
		checkConfig();
		
		this.host = protocol + this.config.url + "/" + this.config.access_token;
 
 
		window.WebSocket = window.WebSocket || window.MozWebSocket;
		if(!window.WebSocket) { // 检测浏览器支持  
			throw Error('当前浏览器不支持websocket.');
			return;
		}

		//如果连接成功，直接返回
		if ($.getState()){
			console.log("websocket已连接！");
			return;
		}
		
		this.socket = new WebSocket(this.host);
		this.socket.onopen = function() {
			$.onopen();
		};
		
		this.socket.onmessage = function(message) {
			var result = JSON.parse(message.data);
			var code = result.code;
			if ( code == 215 ){
				$.onDisconnect && $.onDisconnect(result);
			}else if (code == 211  ){ //上报
				$.onUploadSta && $.onUploadSta(result);
			}else if (code == 200){ //SetPara 
				$.feedbackSuccess(result)
			}else{ //当错误
				$.feedbackFailed(result)
			}
		};
	
		this.socket.onclose = function() {
			$.onclose();
			closeSocket(); // 清理  
		};
		//无法连接服务器
		this.socket.onerror = function(errorMsg) {
			$.onerror(errorMsg);
		}
		return this;
	}
	$.close = function(){
		this.socket&& this.socket.close();
	}

	$.feedbackSuccess= function(result){
		const message_id = result.message_id
		if(!message_id) return;
		var message = sendStore[message_id];
		if(message.callback ){
			message.callback(result)
		}
		delete sendStore[message_id];
		//此前的失败, 成功不算 
		// var feedbackOrder = parseInt(message_id);
		// this.feedbackFailedOrder(result, --feedbackOrder)
	}
	$.feedbackFailed= function(result){
		const message_id = result.message_id
		if(!message_id) return;
		var feedbackOrder = parseInt(message_id);
		this.feedbackFailedOrder(result, feedbackOrder)
	}
	
	$.feedbackFailedOrder= function(result, feedbackOrder){
		console.log("rev faile order=%d %o",feedbackOrder,result);
		//
		for (let index = feedbackOrder; index > -1; index--) {
			const key = ($.MID_PREFIX +index)
			const element = sendStore[key];
			if(element ){
				element.failed(result)
				delete sendStore[key];
			}else{
				break;
			}
		
		}
	}
	//请求响应
	$.onResponse;
	
	//access_token失效，登录失败
	$.onTokenExpireLoginError;

	//失联通知
	$.onLost;

	//设备更新通知
	$.onUpgrade;

	$.onUploadSta = null;

	$.onDisconnect = null;

	// 连接成功回调函数
	$.onopen = function() {console.log("连接成功");}
  
	//关闭回调
	$.onclose = function() {console.log("websocket连接断开");}
  
	// 异常回调
	$.onerror = function(msg) {console.log("无法连接服务器");console.log(msg)}

	/**
	 * 消息发送，只能发送字符串
	 */
	var sendStore = {};
	var order = -1;
	//返回消息id
	$.send = function(message,callback, failed) {
		order++;
		const message_id = ($.MID_PREFIX + order);
		// if (0==$.getState()){
		// 	$.connect();
		// }
		if(1==$.getState()) {
			callback= callback?callback: this.defaultSuccessCallback
			failed= failed?failed: this.defaultFailedCallback
			message.access_token = $.config.access_token;
			message.message_id = message_id;
			message.timestamp = new Date().getTime()/1000;
			message = JSON.stringify(message);
			sendStore[message_id] ={
				"message":message,
				"callback":callback,
				"failed":failed,
			}
			this.socket.send(message);
		}else{
			//回调失败
			failed()
			console.error("websocket与服务器未连接");
		}
		return message_id;
	}
	$.defaultFailedCallback = function(err){

	}
	$.defaultSuccessCallback = function(res){

	}
	//1表示正常连接，0表示关闭
	$.getState = function(){
		if ($.socket && $.socket.readyState == 1){
			return 1;
		}else{
			return 0;
		}
	}

})(obj)
export default  obj;