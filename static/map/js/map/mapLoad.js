define([
	'util/eventManagess'
],function(event){
//	alert("0");
	var map ;
	var maploadStart = new event();
	var mapload = new event(); 
	var maploadEnd = new event();
	var argu;

	var createMap = function(id){
		var map = new argu.Map(id, {
			logo: false,
			slider:false,
			sliderPosition: "top-right"
		});
		
		//使用地图插件
		map.usePlugin = function(name,callback){
			Lwz.require(["map/plugin/"+name],function(plugin){
				plugin.setMap(map);
				callback && callback.apply(map,arguments);
				console.log(name+'插件加载完成！');
			})
		}
		//注册地图插件  已弃用。。 
		map.setPlugin = function(name,callback){
			Lwz.require(["map/plugin/"+name],function(plugin){
				plugin.setMap(map);
				callback && callback.apply(map,arguments);
				console.log(name+'插件加载完成！');
			})
		};
		//显示底图
		map.showBaseMap = function(name,callback){
			Lwz.require(["map/baseMap/"+name],function(baseMap){
				new baseMap().setMap(map);
				callback && callback.apply(map,arguments);
				console.log(name+'地图加载完成！');
			})
		};
		//开启绘画
		
		
		return map;
	}
	
	var getMap = function(){
		return map;
	};
//	alert("b");
	
	// var host = http+'//iot.joinken.cn';
	var host = '.';

	var script = document.createElement("script");
	var css = document.createElement("link");
	var http = location.protocol || "https:";
	script.src= host + '/arcgis_js_api/init.js';
	css.href =  host + '/esri/css/esri.css";
	css.rel="stylesheet";
	document.head.appendChild(script);
	document.head.appendChild(css)

	script.onerror = function(){
	
	}
	script.onload = function(){
			
	
	
		require([
			"esri/map",
			"esri/geometry/Extent",
			"esri/layers/ArcGISTiledMapServiceLayer",
			"esri/layers/ArcGISDynamicMapServiceLayer",
			"esri/layers/GraphicsLayer",
			"esri/graphic",
			"esri/geometry/Point",
			"esri/geometry/geometryEngine",
			"esri/geometry/ScreenPoint",
			"esri/SpatialReference",
			"esri/layers/FeatureLayer",
			"esri/InfoTemplate",
			"esri/toolbars/draw",
			"esri/toolbars/Edit",
			"esri/symbols/PictureMarkerSymbol",
			"esri/symbols/SimpleLineSymbol",
			"esri/symbols/SimpleFillSymbol",
			"esri/symbols/PictureFillSymbol",
			"esri/symbols/TextSymbol",
			"esri/Color",
			"esri/symbols/Font",
			"esri/tasks/query",
			"esri/tasks/QueryTask",
			"esri/tasks/LengthsParameters",
			"esri/tasks/AreasAndLengthsParameters"
		], function(
			Map, Extent, Tiled, ArcGISDynamicMapServiceLayer, GraphicsLayer, Graphic, Point, GeometryEngine, ScreenPoint, SpatialReference, FeatureLayer, InfoTemplate, Draw, PictureMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, PictureFillSymbol, TextSymbol, Color, Font, Query, QueryTask
		) {
			
			argu = {
				Map:Map, Extent:Extent,	Tiled:Tiled, ArcGISDynamicMapServiceLayer:ArcGISDynamicMapServiceLayer, GraphicsLayer:GraphicsLayer, 
				Graphic:Graphic, Point:Point, GeometryEngine:GeometryEngine,ScreenPoint:ScreenPoint, SpatialReference:SpatialReference, FeatureLayer:FeatureLayer, 
				InfoTemplate:InfoTemplate, Draw:Draw, PictureMarkerSymbol:PictureMarkerSymbol, SimpleLineSymbol:SimpleLineSymbol,
				SimpleFillSymbol:SimpleFillSymbol, PictureFillSymbol:PictureFillSymbol, TextSymbol:TextSymbol, Color:Color, 
				Font:Font, Query:Query, QueryTask:QueryTask,
			}
			
			esri.geometry.geometryEngine = GeometryEngine;
			
			maploadStart.call(this,argu);
			
			map = createMap("map");
	
			mapload.call(this,map,argu);
	
			var key = setInterval(function(){
				if( map.loaded == true ){
					maploadEnd.call(map,map,argu);
					clearInterval(key);
				}
			},100)
			
			
			
		});
	}

	
	

	return {
		
		maploadStart : maploadStart,
		mapload : mapload,
		maploadEnd : maploadEnd,
		map : getMap,
		getMap : getMap,
		createMap: createMap
		
	}
	
})

