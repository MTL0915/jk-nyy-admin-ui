define([
	'geometry/util/html2canvas'
],function(){
	
	var util = {
		
		//将string转化为element格式
		stringToElement : function(htmlString){
			var div = document.createElement("div");
			div.innerHTML = htmlString;
			return div.children[0];
		},
		updateImage : function(change,bool){
			var file = document.createElement("input");
			file.type = "file";
			file.onchange = function(){
				util.fileReaderToBase64(this.files[0],function(base64){
					bool && (base64 = base64.replace(/^.*?,/,""));
					change && change(base64);
				})
				file.onchange = null;
				file.remove();
				file = null;
			};
			file.click();
		},
		fileReaderToBase64 : function(file,call){
			var a = new FileReader();
			a.onload = function(e){
				call && call(e.currentTarget.result);
				a.onload = null;
				a = null;
			};
			return a.readAsDataURL(file);
		},
		//获得element的准确宽高
		getElementWH : function(element){
			var width = element.offsetWidth;
			var height = element.offsetHeight;
			for( ;; ){
				if( !element.parentElement ){ break; }
				width || ( width = element.parentElement.offsetWidth );
				height || ( height = element.parentElement.offsetHeight );
				if( width && !height ){ break;	}
				element = element.parentElement;
			};
			return { w: width,h: height };
		},
		screenShot: function(targetDom,cb){
			if(! (targetDom instanceof jQuery) ){
				targetDom = $(targetDom);			     
			}
	        var copyDom = targetDom;//克隆dom节点
	        copyDom.css('display','block');
	        var width = copyDom.width();//dom宽
	        var height = copyDom.height();//dom高
	        var scale = 2;//放大倍数
			var dom = "";
			var elements;
			elements = copyDom[0].getElementsByTagName("*");
			for( var i in elements ){
				//遍历全部的元素  修改截图所不兼容的css样式
				if( i === "length" ) break;
				var it = elements[i];
				//如果有translate 样式  替换成一下
				if( it.style.transform.indexOf("translate") > -1 ){
					var b = $(it);
				    var xy = b[0].style.transform.replace(/\s/g,"").replace("translate(","").replace(")","").split(",");
					b.css({transform:"",left:xy[0],top:xy[1]});
					b.addClass("update_transform");
				}
			}
			
			var imgelement = copyDom.find("img");
			var imgArray = [];			
			//检查一下是否存在图片格式
			for( var i in imgelement ){
				if(i === "length") break;
				//如果图片是跨域图片
				if( imgelement[i].src.indexOf("http") == 0 && imgelement[i].src.indexOf( location.origin ) == -1 ){
					//用_src  记录原来的图片
					imgelement[i]._src = imgelement[i].src; 
					//对图片链接进行处理
					imgelement[i].src = ctx+"/" + imgelement[i].src.replace(/^.*?\..*?\//,"") + "?http=https://iot.joinken.cn";
					//添加进入数据 用来进行后面的还原处理
					imgArray.push(imgelement[i]);
				}
			}
				
			var _mapSvg = copyDom.find("svg");
			for( var i in _mapSvg ){
				if(i === "length") break;
				var SVG = _mapSvg[i];
				var img,svg,style,parentSvg,
				width = SVG.width.animVal.value,
				height = SVG.height.animVal.value;
				img = document.createElement("img");
				img.style.cssText = "width:"+width+";height:"+height+";position: absolute;";
				if( typeof SVG !== "string" ){
					SVG.setAttribute("xmlns","http://www.w3.org/2000/svg");
					$(SVG).hide();
					parentSvg = SVG.parentElement;
					svg = document.createElement("div");
					svg.appendChild(SVG);
					svg = svg.innerHTML;
					parentSvg.appendChild(SVG);
				}else{
					svg = SVG;	
				}
				img.src = "data:image/svg+xml;charset=utf-8,"+svg;//"<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'></svg>"//<?xml version="1.0" standalone="no"?>'// + svg ;
				img.onload = function(){ 
					var canvas,context,img,svg,style;
					svg = this;
					style = {
						width : svg.style.width,
						height : svg.style.height	
					}
					canvas = document.createElement("canvas");
					canvas.className = " copyImg";
					canvas.style.cssText = "width:"+style.width+";height:"+style.height+";position:absolute;";
					context = canvas.getContext('2d');
					context.drawImage( svg , 0 , 0 , 1266, 980 ,0,0,300,200);
					$(SVG).after(canvas);
				}
			}
			
	        //将全部的canvas转化成图片嵌入
	        var domCanvas = copyDom.find("canvas");
	        for( var i in domCanvas ){
	        	if( i === 'length' ) break;
	        	var it = domCanvas[i];
	        	var img = document.createElement("img");
	        	img.src = it.toDataURL("image/png");
	        	img.style.width = it.offsetWidth;
	        	img.style.height = it.offsetHeight;
	        	img.style.top = it.offsetTop;
	        	img.style.left =  it.offsetLeft;
	        	img.className = "domCanvas_img";
	        	it.insertAdjacentHTML("afterEnd",img.outerHTML);
	        	it.style.display = "none";
//	        	it.remove();
	        }
	        html2canvas(copyDom, {
	            allowTaint:true,
	            tainTest:true,
	            onrendered: function(canvas) {
	            	for( var i in domCanvas ){
			        	if( i === 'length' ) break;
			        	var it = domCanvas[i];
			        	it.style.display = "block";
			        }
	            	copyDom.find("svg").show();
	            	copyDom.find(".copyImg").remove();
	            	copyDom.find(".domCanvas_img").remove();
					for( var i in imgArray ){
						if(i === "length") break;
						imgArray[i].src = imgArray[i]._src;
					}
					var map = copyDom.find(".update_transform");
	        		for( var i in map ){
	        			if( i === "length" ) break;
	        			var it = map[i];
						var b = $(it);
					    var xy = [b.css("left"),b.css("top")];
						b.css({transform:"translate("+xy.join(',')+")",left:"",top:""});
	        		}
	                if(cb){
//	                    copyDom.remove();//css('display','none');
	                    cb(canvas.toDataURL("image/png"),width,height);
	                }
	            }
	        });
	    }
	}
	
	return util;
	
})
