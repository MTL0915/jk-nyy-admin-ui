define([
	'geometry/polygon'
],function(polygon){
	
	var 仓库 = polygon.inherit({
		
		into : function(param){
			this.super();
			this.type = "仓库";
			this.name = "仓库";
			//父级 属于那个农场
			this.parentType = ["基地"];
			//透明度
			this.opacity_area = 0.25;
			this.opacity_line = 1;
			this.color_area = param.color || [194, 197, 68];
			this.color_line = param.color || [194, 197, 68];
			this.hothouseType = param.hothouseType || "";
			//保存进入数据配置
			this.attribute={
				"名称" : "",
				"颜色" : "#ff2828",
				"透明度" : 25,
				"占地面积" : "",
				"容纳人数" : "",
			};
		},
		
		//绘制完成执行
		complete : function(e){
			this.super();
			var p = e.geometry;
		},
		
	})
	
	return 仓库;
	
})
