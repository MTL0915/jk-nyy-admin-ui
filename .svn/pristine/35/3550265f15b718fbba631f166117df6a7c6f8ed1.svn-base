define([
	'geometry/point'
],function(point){
	
	var sensor = point.inherit({
		
		into : function(param){
			this.super();
			this.type = "sensor";
			this.name = "摄像头";
			//父级 属于那个农场
			this.parentType = ["hothouse"];
			this.parentError = "传感器只能放在地块上";
			this.img = './img/编辑页面工具栏/vidicon2.png';
			this.geometryType = 'point';
			//保存进入数据配置
			this.attribute={ 
				"名称" : "传感器",
				"经度" : null ,
				"纬度" : null ,
				"分区" : this.parent[0].attribute["名称"];
				"编号": "",
				"基地": "",
				"出厂日期": "",
				"设备类型" : "",
				"备注" : "",
			};
		},
		
		//绘制完成执行
		complete : function(e){
			this.super();
			var p = e.geometry;
			this.attribute["经度"] = p.x;
			this.attribute["纬度"] = p.y;
		},
		
		
	})
	
	return sensor;
	
})
