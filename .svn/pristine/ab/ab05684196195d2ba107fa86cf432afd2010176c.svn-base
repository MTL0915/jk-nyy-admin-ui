!function(){
    
    var path = document.getElementsByTagName("script");
    path = path[path.length-1].src.split("?path=")[1];
    
    var requireOption = window.requireOption || {
        path : path,
    };
    
    var windowIsLoad = false;
    
    var key = setInterval(function(){
    	if( document.body || windowIsLoad ){
    		windowIsLoad = true;
    		clearInterval(key);
    		this.onlad = null;
    		key = null;
    		requireFunctionRun();
    	}
    },500)
    
    var requireFileType = ['js','css','html','json']; //进行处理的文件后缀
    var defaultRequireType = 0;  //默认下标第一个
    var requireFileFunction = {
    	'.js':function(responseText,name){  
    		if( responseText.indexOf("/*lwz-define-js*/") > -1
	       		|| responseText.indexOf('define') < 0 ){
					eval( "Lwz.define([],'文件不符合AMD格式，作为js独立运行中')");
					responseText = "/*" + defineName + "*/\n" + responseText;
					eval( responseText);
				}else{
					responseText = responseText.replace("define",'Lwz.define')
					responseText = "/*" + defineName + "*/\n" + responseText;
					eval( responseText );
				}
				responseText = null;
    	},
    	".css" : function(responseText,name){
    		var css = document.createElement("style");
    		css.innerHTML = responseText;
    		css.setAttribute('name',name);
    		document.head.appendChild(css);
			responseText = null;
			eval( "Lwz.define([],'css文件不具备返回值功能')");
    	},
    	'.html' : function(responseText,name){
			eval( "Lwz.define([],'"+responseText.replace(/\'/g,'\\\'').replace(/\r|\n/g, "")+"')");
			responseText = null;
    	},
    	'.json' : function(responseText,name){
			eval( "Lwz.define([],function(){ return "+responseText.replace(/\'/g,'\\\'').replace(/\r|\n/g, "")+";})");
			responseText = null;
    	},
    }
    
    //保存所有的已经加载完成的require方法 等待页面网页加载完成执行
    var requireFunction = [];
    
    var requireFunctionRun = function(){
    	for(;requireFunction.length > 0;){
    		var f = requireFunction.shift();
    		f[0].apply(window,f[1]);
    	}
    }
     
    var defineName = '';
    
    var responseText = '';
    
    var zz = new RegExp("\.("+ requireFileType.join('|') +")$");

	var isScript = new RegExp("\^(http:|https:).*?$");

    var _require = function(name,callback){

    	callback || (callback = function(){ return arguments.length == 1 ? arguments[0] : Array.prototype.slice.apply(arguments); });
    	
        var path = requireOption.path,
            argu = [],
            key = false,
            it,
            length = name.length;
            
         
        name.forEach(function(e,i,ar){
        	it = zz.exec(e);
        	if( it == null ){
                ar[i] += "." + requireFileType[defaultRequireType];
        	}
        })
         
        if( name.length > 0 ){
             
            for( var i = 0 ; i < name.length ; i++ ){
                 
                if( typeof defineData.get(name[i]) === 'undefined' ){
                	if( !defineData.time[name[i]] )
                		defineData.time[name[i]] = {};
                	defineData.time[name[i]].start = new Date();
                	
            		if( isScript.test(name) ){
			    		var script = document.createElement("script");
			    		script.src = name;
			    		script.onload = function(){
			    			eval( "Lwz.define([],'script文件不具备返回值功能会直接运行')");	
			    		};
			    		script.onerror = function(e){
                        	eval( "Lwz.define([],'加载失败')");
                        	console.log(name+"文件加载失败")
                    		console.log("失败原因:"+e.currentTarget.responseText);	
			    		};
						
			    	}else{
			    		_require.ajax({
	                        type: 'get',
	                        url : requireOption.path + name[i],
	                        success: function(name,e){
	//                      	try{
	                        		defineName = name.toString();
	                        		responseText = e.currentTarget.responseText;
		                           	if( responseText ){
		                           		it = zz.exec(defineName);
		                           		if( it == null ) console.log( defineName + "文件的后缀名无法识别");
		                           		it = requireFileFunction[it[0]];
		                           		if( it == null ) console.log( defineName + "文件的处理逻辑无法识别");
		                           		it.call(this,responseText,defineName);
		                           	}
		                            else 
		                        		eval( "Lwz.define([],null)");    	
	//                      	}catch(e){
	//                      		console.log(name+"文件执行错误")
	//                      		console.log("错误原因:"+e.stack)
	//                      		responseText = null;
	//                      	}
	                            
	                        }.bind(this,name[i]),
	                        error: function(name,e){
	                        	defineName = name.toString() //.split('/').pop()
	                        	eval( "Lwz.define([],'加载失败')");
	                        	console.log(name+"文件加载失败")
	                    		console.log("失败原因:"+e.currentTarget.responseText);
	                        }.bind(this,name[i]),
	                    });
			    	}

                    defineData.setLoading(name[i]);
                }
                
                defineData.get(name[i],function(data,n){
                    argu[name.indexOf(n)] = data;
                    if( --length == 0 ){
                    	windowIsLoad ? callback.apply(window,argu) : 
                    	requireFunction.push([callback,argu])
                    }
                })
                
            }
             
        } else{
            callback.apply(this,argu)
        } ;
 
    }
    var getXML = function(){
        if( XMLHttpRequest )
            return new XMLHttpRequest();
        else
            return new ActiveXObject("Microsoft.XMLHTTP");
    }
    _require.XMLHttp = getXML();
    _require.option = requireOption;
    _require.ajax = function(option = {}){
        var url = option.url;
        if( !url ) return;
        var mothed = option.type || "get";
        var data = "";
        for( var i in option.data )
            data += i + "=" + option.data[i] + "&";
        var success = option.success;
        var error = option.error;
        var complete = option.complete;
        var ajax = getXML();
 
        //判断是否是post请求
        if( mothed === "post" ){
            //如果是则添加头部文件
            ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        }else{
            url += "?" + data; 
            data = undefined;
        }
        
        //建立请求连接
        ajax.open(mothed,url+"?"+Math.random());
         
        //发送请求
        ajax.send(data);
         
        //请求回调
        ajax.onreadystatechange = function(e){
            if( this.readyState == 4 ){
                if( this.readyState == 4 && this.status == 200 )
                    success.apply(this,arguments);
                else if( this.readyState == 4 && this.status.toString()[0] != "2" )
                    error.apply(this,arguments);
                complete && complete.apply(this,arguments);
            }
        }
         
    }
     
     
    var define = function(){
        var argLen = arguments.length,
            name = arguments[0],
            depend = arguments[1],
            object1 = arguments[2],
            notArgu = [],
            argu = [];
        try{
             
            //判断是否给模块命名
            if( typeof name !== 'string' ){
                object1 = depend;
                depend = name;
                name = defineName;
            }
         
            //如果存在依赖模块的话
            if( typeof depend === 'object'
             && typeof depend.length == 'number'
             && depend.constructor === Array) {
                 
                depend.forEach(function(e,i,ar){
                    it = zz.exec(e);
		        	if( it == null ){
		                ar[i] += "." + requireFileType[defaultRequireType];
		        	}
                })
                 
                //先判断依赖模块是否已经被加载了
                for( var i = 0; i < depend.length ; i ++ ){
                    if(typeof defineData.get(depend[i]) === 'undefined'
                    	|| defineData.get(depend[i]) === null
                    ){
                        //如果存在没有被加载的模块
                        notArgu.push(depend[i]);
                    }else{
                        argu[i] || ( argu[i] = defineData.get(depend[i]) );
                    }
                }
                 
                if( notArgu.length > 0 ){
                    //进入加载模块
                    //并在加载成功后重新运行函数
                    _require(notArgu,define.bind(this,name,depend||[],object1));
                    return ;
                }
            }else {
                object1 = depend;
                depend = undefined;
            }
 
        }catch(e){
            console.error(name+"文件加载错误；")
            console.error(e);
        }
         
        //不存在未被加载的依赖模块
        if( typeof object1 === 'function' ){
            defineData.set(name,object1.apply(this,argu));             
        }else{
            defineData.set(name,object1);
        }
         
    }
     
    var defineData = {
    	time : {},
        data : {},
        get : function( name , callback ){
	    	it = zz.exec(name);
            it == null ? name += "." + requireFileType[defaultRequireType] : null;
            var data = this.data[name];
            if( !callback ) return data;
            if( data ){
                callback.call(this,data,name);
                return data;               
            }else{
                this.waitLoad[name] || (this.waitLoad[name] = []);
                this.waitLoad[name].push(callback);
            }
        },
        set : function( name , data ){
            this.data[name] = data;
            console.log(name+'注册成功。')
       		this.time[name].end = new Date();
       		this.time[name].time = this.time[name].start - this.time[name].end;
            var waitFunction = this.waitLoad[name];
            for( ;; ){
                if( waitFunction.length < 1 ) break;
                waitFunction.shift()(data,name);
            }
        },
        setLoading : function(name){
        	this.data[name] = null;
        },
        waitLoad : {}
    };
     
    var _find = function(name){
    	var a = Lwz.data.data;
    	var b = {};
    	for( var i in a )
    		i.indexOf(name) > -1 && (b[i] = a[i]);
    	return b;
    }
     
    window.Lwz = {
        data : defineData,
        require : _require,
        define : define,
        find : _find
    };
 
}()