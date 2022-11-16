/* 地图层次变化是改变底图
 */
define([
	'util/eventManagess'
],function(event){
	
	var dynamicLayer = function(){
		this.constructor = function(){
			this.map;
			this.data = [];
			//范围转换函数
			this.extentConversion = new event();
		}
		this.constructor.apply(this,arguments);
	}
	
	dynamicLayer.prototype.setMap = function(map){
		this.map = map;
	}
	
	dynamicLayer.prototype.setLevelBaseMap = function(level,baseMapUrl){
		if( typeof baseMapUrl === 'string' ) 
			baseMapUrl = new esri.layers.ArcGISDynamicMapServiceLayer(s.baseMapUrl);
		this.data.push({level:level,baseMapUrl:baseMapUrl});
	}

	dynamicLayer.prototype.into= function(level,baseMapUrl){
		var dynamicLayer = this;
		dynamicLayer.map.on("zoom-end",function(e){
			var s = dynamicLayer.data.find(function(le){ return  });
			var data = dynamicLayer.data;
			for( var i in data ){
				var le = data[i]
				if((le.max||999999) >= e.level && (le.min||0) <= e.level){
					var layer;
					if( typeof s.baseMapUrl === 'function' )
						layer = s.baseMapUrl.apply(this,e);
					else 
						layer = s.baseMapUrl;
					dynamicLayer.map.addLayer(layer);
				}
			}
		})
	}
	
	dynamicLayer.setMap = function(map){
		var d = new this();
		d.setMap(map);
		d.into();
		map.dynamicLayer = d;
	}
	
	return dynamicLayer;
	
})
