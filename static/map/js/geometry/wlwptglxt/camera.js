define([
	'geometry/point'
],function(point){
	
	var sensor = point.inherit({
		
		into : function(param){
			this.super();
			this.type = "sensor";
			this.name = "摄像头";
			//父级 属于那个农场
			this.parentType = ["workshop"];
			this.img = './img/传感器1.png';
			this.geometryType = 'point';
		},
		
		//绘制完成执行
		complete : function(e){
			this.super();
			var p = e.geometry;
			//保存进入数据配置
			this.attribute={ 
				"名称" : "传感器",
				"经度" : p.x ,
				"维度" : p.y ,
			};
		},
		
		
	})
	
	return sensor;
	
})
