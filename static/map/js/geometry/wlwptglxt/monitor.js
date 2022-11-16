define([
	'geometry/point'
],function(point){
	
	var monitor = point.inherit({
		
		into : function(param){
			this.super();
			this.type = "monitor";
			this.name = "摄像头";
			//父级 属于那个农场
			this.parentType = ["farm"];
			this.img = './img/shexiangtou.png';
			this.geometryType = 'point';
			//保存进入数据配置
			this.attribute={ 
				"名称" : "摄像头",
				"经度" : p.x ,
				"维度" : p.y ,
			};
		},
		
		//绘制完成执行
		complete : function(e){
			this.super();
			var p = e.geometry;
			
		},
		
	})
	
	return monitor;
	
})
