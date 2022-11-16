
define([
	'geometry/polygon'
],function(polygon){
	
	var farm = polygon.inherit({
		
		into : function(param){
			this.super();
			this.type = "基地";
			this.path = "wlwptglxt/jidi";
			this.name = "基地";
			//父级 属于那个农场
			this.parentType = [];
			this.attribute = { 
				"名称" : "",
				"面积" : "420亩" , 
				"颜色" : "#ff2828",
				"联系人": "",
				"电话" : "",
				"地址" : "",
				"描述" : ""
			};
			this.zIndex = 2;
			//需要开启地图的检测
			this.isMapZoom = false;
			//进行聚合的层级
			this.config.groupGeometryLevel = 6;
		},
		
		//绘制完成执行
		complete : function(e){
			this.super();
//			var p = e.geometry;
			//保存进入数据配置
//			this.attribute
		},
		
		connectionCondition : function(a,b){
			return esri.geometry.geometryEngine.contains( b , a);
		},
		
	})
	
	return farm;
	
})
