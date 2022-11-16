define([
	'geometry/polyline',
],function(polyline){
	
	var feixingguiji = polyline.inherit({
		
		into : function(){
			this.super();
			this.path = "wlwptglxt/feixingguiji";
			//飞机图标
			this.config.airImg = "";
			//飞机大小
			this.config.airSize = 15;
		},
		
		//启动飞行动画
		startFlyAnimate : function(path){
			path || ( path = this.getGraphic().geometry.paths[0] ); 
			this.animate(this.airGraphic,path,60,function(){
				this.startFlyAnimate(path.reverse());
			}.bind(this));
		},
		
		//动画
		animate : function(frampoint,topoint,speed = 60,call){
			var path = topoint;
			var i = 1;
			var pathTimer = function(){
				
				//帧数
				var zs = 1;
				var 
				//获取经度
				lon = frampoint.geometry.x,
				//获取纬度
				lat = frampoint.geometry.y;
				//开始计算差值
				_lon = (lon - path[i][0])/60;
				_lat = (lat - path[i][1])/60;
				
				//保持一分钟60次变化帧数
				var zstimer = setInterval(function(){
					if( this.stopAnimate ){ clearInterval(zstimer); }
					frampoint.geometry.x -= _lon;
					frampoint.geometry.y -= _lat;
					this.layer.refresh();
					zs ++;
					if( zs >= 60 ){
						clearInterval(zstimer);
						i++;
//						zs = 1;
						if( path[i] ) {
							
							pathTimer();
						}else{
							call && call();
						}
					} 
				}.bind(this),17)
				
//				i++;
//				
			}.bind(this);
			
			pathTimer();
		},
		
		
		
		complete : function(){
			this.super();
		},
		
		completed : function(){
			this.createAir();
		},
		
		//创建飞机symbol
		createAirSymbol : function(){
			var symbol =  new esri.symbol.PictureMarkerSymbol({
			    "url": this.getImage(this.config.airImg) || "map/img/zlz20190423/fxq.png",
			    "height":20,
			    "width":20,
			    "type":"esriPMS",
			    "angle": 0,
		 	});
		 	return symbol; 
		},
		
		//创建飞机模型
		createAir : function(){
			//获取几何
			var graphic = this.getGraphic();
			//获取几何第一个点
			var point = graphic.geometry.paths[0][0];
			//通过第一个点生成飞机坐标
			var air = new esri.geometry.Point(point,this.map.spatialReference);
			//生成几何
			this.airGraphic = new esri.Graphic(air,this.createAirSymbol());
			//将几何添加进入地图
			this.layer.add(this.airGraphic);
			//执行飞行
			this.startFlyAnimate();
		},
		
		removed : function(){
			
			this.stopAnimate = true;
		},
		
	});
	
	return feixingguiji;
	
})