
define([
	'geometry/polygon'
],function(polygon){
	
	var farm = polygon.inherit({
		
		into : function(param){
			this.super();
			this.type = "farm";
			this.name = "农场";
			//父级 属于那个农场
			this.parentType = ['position'];
			this.attribute={ 
				"名称" : "",
				"面积" : "420亩" , 
				"颜色" : "#ff2828",
				"联系人": "",
				"电话" : "",
				"地址" : "",
				"描述" : ""
			}
			this.zIndex = 0;
			//透明度
			this.opacity_area = 0.25;
			this.opacity_line = 1;
			this.color_area = [42, 187, 156];
			this.color_line = [42, 187, 156];
		},
		
		//绘制完成执行
		complete : function(e){
			this.super();
			var p = e.geometry;
			//保存进入数据配置
			
		},
		
		connectionCondition : function(a,b){
			return esri.geometry.geometryEngine.contains( b , a);
		}
		
	})
	
	return farm;
	
})
