define([
	'geometry/polygon'
],function(polygon){
	
	var workshop = polygon.inherit({
		
		into : function(param){
			this.super();
			this.type = "workshop";
			this.name = "作坊";
			//父级 属于那个农场
			this.parentType = ["farm"];
			//透明度
			this.opacity_area = 0.25;
			this.opacity_line = 1;
			this.color_area = [255, 255, 255];
			this.color_line = [255, 255, 255];
		},
		
		//绘制完成执行
		complete : function(e){
			this.super();
			var p = e.geometry;
			//保存进入数据配置
			this.attribute={ 
				"名称" : "",
				"面积" : "420亩" , 
				"颜色" : "#ff2828",
				"联系人": "",
				"电话" : "",
				"地址" : "",
				"描述" : "",
				"透明度" : "0.25",
			};
		},
		
	})
	
	return workshop;
	
})
