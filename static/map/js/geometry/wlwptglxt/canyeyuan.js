
define([
	'geometry/polygon'
],function(polygon){
	
	var farm = polygon.inherit({
		
		into : function(param){
			this.super();
			this.type = "产业园";
			this.path = "wlwptglxt/canyeyuan";
			this.name = "产业园";
			//父级 属于那个农场
			this.parentType = ['position'];
			this.zIndex = 3;
		},
		
		//绘制完成执行
		complete : function(e){
			this.super();
		},
		
		connectionCondition : function(a,b){
			return esri.geometry.geometryEngine.contains( b , a);
		}
		
	})
	
	return farm;
	
})
