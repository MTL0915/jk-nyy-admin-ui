!function(util){
	window.Utils = util();
}(
	function(){
		//document_event_attributes
		var DEA = "doc-attr";
		var key = function(dom){ return true; };
		document.addEventListener("click",function(e){
			var dom = e.target;
			//判断是否进行运行
			if( !key(dom) ) { return };
			//对dom进行taggle调用
			var _dom = dom;
			var dea = null;
			for( var i=0;i<3;i++ ){
				dea = _dom.getAttribute(DEA);
				if( dea ){
					dea = dea.split(" ");
					for( var i in dea )
						util.elementEventAttributes[dea[i]](_dom);
					break;
				} 
				_dom = util.parent(_dom);
			}
			
		})
		
		//工具对象
		var util = {
			//对document进行的属性操作指令 
			//直接通过标签进行事件识别
			elementEventAttributes : {},
			//版本号
			version : "1.0",
		};
		
		util.$ = function(querySelect){
			if( typeof $ !== undefined || typeof jQuery !== undefined  ){
				return Array.prototype.slice.apply(jQuery(querySelect));
			}else if( document.querySelectorAll ){
				return document.querySelectorAll(querySelect);
			}else {
				//扩展ie查询
//				return document.querySelectorAll(querySelect);
				return []; 
			}
		}
		
		//绑定事件
		util.addEvent = function(element,name,call){
			element.addEventListener(name,call);
		}
		
		//查询是否存在class
		util.hasClass = function(dom,className,newclass){
			var name = dom.className;
			var nameA = name.replace(/\s{2,}/g," ").split(" ");
			var i = nameA.indexOf("className");
			if( i > -1 ){
				newclass && (nameA[i] = newclass);
				return true;
			}
			return false;
		}
		
		//获取父级
		util.parent = function(dom){
			return dom.parentElement;
		}
		
		//显示
		util.show = function(element){
			if( util.SplitFunction() ) return
			element.oldDisplay = element.style.display; 
			element.style.display = "block";
		}
		
		//隐藏
		util.hide = function(element){
			if( util.SplitFunction() ) return;
			element.style.display = element.oldDisplay || "none";
		}
		
		//隐藏
		util.taggle = function(element){
			if( util.SplitFunction() ) return;
			if( util.isElementVisible(element) ){
				util.hide(element);				
			}else{
				util.show(element);		
			}
		}
		
		 //打开全屏方法
	    util.openFullscreen = function(element) {
	        if (element.requestFullscreen) {
	            element.requestFullscreen();
	        } else if (element.mozRequestFullScreen) {
	            element.mozRequestFullScreen();
	        } else if (element.msRequestFullscreen) {
	            element.msRequestFullscreen();
	        } else if (element.webkitRequestFullscreen) {
	            element.webkitRequestFullScreen();
	        }
	    }
	
	    //退出全屏方法
	    util.exitFullScreen = function() {
	        if (document.exitFullscreen) {
	            document.exitFullscreen();
	        } else if (document.mozCancelFullScreen) {
	            document.mozCancelFullScreen();
	        } else if (document.msExitFullscreen) {
	            document.msExiFullscreen();
	        } else if (document.webkitCancelFullScreen) {
	            document.webkitCancelFullScreen();
	        } else if (document.webkitExitFullscreen) {
	            document.webkitExitFullscreen();
	        }
	    }
		
		//将函数的参数如果是数组传入的话  进行拆分多次执行
		util.SplitFunction = function(name){
			//获取函数名
			var name = name || arguments.callee.caller;
			//获取函数参数
			var argu = arguments.callee.caller.arguments;
			if( argu.length !== 1 ) return;
			argu = argu[0];
			//如果参数为数组 切只有一个的话
			if( util.isArray(argu) ){
				for( var i in argu ){
					if( util.isArray(argu[i]) ) continue;
					name(argu[i]);
				}
				return true;
			}else{
				return false;
			}
		}
		
		util.getFile = function(param = {}){
			var call = param.call;
			var evalStr = `
			var file = document.createElement("input");
			file.type = "file";
			file.onchange = function(e){
				var reader = new FileReader();
				reader.onload=function(e)
				{
					call && call(e.currentTarget.result);
				}
				reader.readAsText(this.files[0]);
			
				this.onchange = null;
			}
			file.click();`;
			eval(evalStr);
		}
		
		util.download = function(filename, text){
		  	var element = document.createElement('a');
			element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		  	element.setAttribute('download', filename);
			element.style.display = 'none';
			document.body.appendChild(element);
			element.click();
			document.body.removeChild(element);
			element = null;
		}
		
		util.getTime = function(i){
			var t = new Date();
			return t.getFullYear()+"_"+t.getMonth()+"_"+t.getDay();
		}
		
		util.isArray = function(obj){
			return typeof obj === "object" && obj.length !== undefined && obj.push !== undefined;
		}
		
		util.isElementVisible = function(obj){
			return !(obj.style.display === 'none');
		}
		
		//属性函数 显示按钮
		util.elementEventAttributes.showBtn = function(dom){
			var opt_queryselect = dom.getAttribute("showBtn-queryselect") || dom.getAttribute("e-queryselect");
			if( !opt_queryselect || opt_queryselect === "" || !dom ) return;
			var doms = util.show(util.$(opt_queryselect));
		}
		
		//属性函数 显示按钮
		util.elementEventAttributes.hideBtn = function(dom){
			var opt_queryselect = dom.getAttribute("hideBtn-queryselect") || dom.getAttribute("e-queryselect");
			if( !opt_queryselect || opt_queryselect === "" || !dom ) return;
			var doms = util.hide(util.$(opt_queryselect));
		}
		
		//属性函数 显示按钮
		util.elementEventAttributes.taggleBtn = function(dom){
			var opt_queryselect = dom.getAttribute("taggleBtn-queryselect") || dom.getAttribute("e-queryselect");
			if( !opt_queryselect || opt_queryselect === "" || !dom ) return;
			var doms = util.taggle(util.$(opt_queryselect));
		}
		
		//属性函数 checkbox 总开关
		util.elementEventAttributes.checkboxBtn = function(dom){
			setTimeout(function(){
				var opt_queryselect = dom.getAttribute("checkboxBtn-queryselect") || dom.getAttribute("e-queryselect");
				if( !opt_queryselect || opt_queryselect === "" || !dom ) return;
				for( var i in opt_queryselect ){
					opt_queryselect[i].checked = dom.checkbox;
				}
			})
		}
		
		//属性函数 开启全屏
		util.elementEventAttributes.onFullScreen = function(dom){
			var opt_queryselect = dom.getAttribute("onFullScreen-queryselect") || dom.getAttribute("e-queryselect");
			if( !opt_queryselect || opt_queryselect === "" || !dom ) return;
			dom = util.$(opt_queryselect);
			util.openFullscreen(dom);
		}
		
		//属性函数 关闭全屏
		util.elementEventAttributes.offFullScreen = function(dom){
			util.exitFullScreen(dom);
		}
		
		//属性函数 taggle全屏
		util.elementEventAttributes.taggleFullScreen = function(dom){
			var opt_queryselect = dom.getAttribute("taggleFullScreen-queryselect") || dom.getAttribute("e-queryselect");
			var _dom = util.$(opt_queryselect)[0];
			if( !document.fullscreenElement ){
				//如果不存在当前全屏的对象
				return util.openFullscreen(_dom);
			}else if( document.fullscreenElement === _dom ){
				//如果全屏对象等于传入函数
				return util.exitFullScreen();
			}else {
				//即存在的全屏对象不等于传入的操作dom
				util.exitFullscreen()
				return util.exitFullScreen(_dom)
			}
		}
		
		//属性函数 taggle文案
		util.elementEventAttributes.taggleAttr = function(dom){
			var opt_queryselect = dom.getAttribute("taggleAttr-queryselect") || dom.getAttribute("e-queryselect");
			var opt_replace = dom.getAttribute("taggleAttr-replace");
			var opt_replacetype = dom.getAttribute("taggleAttr-replacetype") || "innerText";
			var _dom = util.$(opt_queryselect)[0];
			var old = _dom[opt_replacetype]; 
			_dom[opt_replacetype] = opt_replace; 
			dom.setAttribute("taggleAttr-replace",old); 	
		}
		
		return util;
		
	}
)
