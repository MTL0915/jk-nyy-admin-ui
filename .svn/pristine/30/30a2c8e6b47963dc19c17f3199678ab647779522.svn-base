define([
	'geometry/dian'
],function(dian){
	
	var sensor = dian.inherit({
		
		into : function(param){
			this.super();
			this.type = "设备";
			this.path = 'wlwptglxt/sensor';
			this.name = "设备";
			//父级 属于那个农场
			this.parentType = param.parentType;
			this.parentError = "设备只能放在对应的区域("+(this.parentType ? this.parentType.join(",") : "")+")上";
			this.img = param.img || './img/编辑页面工具栏/vidicon2.png';
			this.geometryType = 'point';
			//保存进入数据配置
			this.attribute.name = "设备";
			this.attribute.jd = "";
			this.attribute.wd = "";
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
