define([
	'geometry/geometry',
	"geoemtry/util/util"
],function(geometry,util){

	var point = geometry.inherit({
		
		into : function(){
			this.super();
			this.geometryType = 'point';
			//html
			this.html = "";
			//dom id
			this.id = "test";
			
		},
		
		//绘制完成执行
		complete : function(e,symbol){
			//判断父子级关系
			if( !this.connection(e) ) { return this.stopDraw(); }
			
			
			
			//将绘制的图形导出
			var g = this.createGraphic(e.geometry,symbol||this.getSymbol());
			//生成图层
			var layer = this.getLayer();
			//添加进入
			layer.add(g);
			//取消绘制
			this.stopDraw();
			//绘制回调
			this.drawCall && this.drawCall(e);
			//添加进入数据统计
			this.addGroup();
		},
		
		getSymbol : function(cb){
			var dom
			if( this.html ){
				dom = document.createElement("div");
				dom.innerHTML = html;
			}else if( this.id ){
				dom = document.getElementById(this.id);
			}
			
			util.screenShot(dom,function(e,w,h){

				var symbol =  new esri.symbol.PictureMarkerSymbol({
				    "url":e,
				    "height":20,
				    "width":20,
				    "type":"esriPMS",
				    "angle": 0,
			  	});
				
				cb && cb(symbol);
				
			});
			
		},
		
	});
	
	return point;
	
})
