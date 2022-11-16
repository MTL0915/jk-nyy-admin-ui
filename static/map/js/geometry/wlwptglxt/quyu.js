define([
	'geometry/polygon'
],function(polygon){
	
	var workshop = polygon.inherit({
		
		into : function(param){
			this.super();
			this.type = "区域";
			this.path = "wlwptglxt/quyu";
			this.name = "区域";
			//父级 属于那个农场
			this.parentType = ["产业园"];
			//保存进入数据配置
			this.attribute={ 
				
			};
			this.zIndex = 4;
		},
		
		//绘制完成执行
		complete : function(e){
			this.super();
			
		},
		
	})
	
	return workshop;
	
})
