define([
	'geometry/point'
],function(point){
	
	var 摄像头 = point.inherit({
		
		into : function(param){
			this.super();
			this.type = "摄像头";
			this.name = "摄像头";
			//父级 属于那个农场
			this.parentType = ["基地"];
			this.img = './img/shexiangtou.png';
			this.geometryType = 'point';
			//保存进入数据配置
			this.attribute={ 
				"名称" : "摄像头",
				"经度" : null ,
				"纬度" : null ,
			};
		},
		
		//绘制完成执行
		complete : function(e){
			this.super();
			var p = e.geometry;
			this.attribute["经度"] = p.x;
			this.attribute["纬度"] = p.y;
		}
		
	})
	
	return 摄像头;
	
})
