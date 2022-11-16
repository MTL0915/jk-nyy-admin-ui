define([
	'geometry/polygon'
],function(polygon){
	
	var 农机库 = polygon.inherit({
		
		into : function(param){
			this.super();
			this.type = "农机库";
			this.name = "农机库";
			//父级 属于那个农场
			this.parentType = ["基地"];
			//透明度
			this.opacity_area = 0.25;
			this.opacity_line = 1;
			this.color_area = param.color || [85, 162, 140];
			this.color_line = param.color || [85, 162, 140];
			this.hothouseType = param.hothouseType || "";
			this.attribute={ 
				"名称" : "",
				"可服务量" : "420" , 
				"颜色" : "#ff2828",
				"农机总数": "1",
				"占地面积" : "",
				"透明度" : 25,
			};
		},
		
		//绘制完成执行
		complete : function(e){
			this.super();
			var p = e.geometry;
		},
		
	})
	
	return 农机库;
	
})
