define([
	'geometry/polygon'
],function(polygon){
	
	var dikuai = polygon.inherit({
		
		into : function(param){
			
			this.super();
			this.type = "地块";
			this.path = 'wlwptglxt/dikuai';
			//父级 属于那个农场
			this.parentType = ["基地"];
			//透明度
			this.config.color_area = param.color || [255, 255, 255];
			this.config.color_line = param.color || [255, 255, 255];
			this.attribute.hothouseType = param.dikuaiType || "加热温室";
			this.name = this.attribute.hothouseType || "地块";
		},
		
		//绘制完成执行
		complete : function(e){
			this.super();
			var p = e.geometry;
		},
		
	})
	
	return dikuai;
	
})
