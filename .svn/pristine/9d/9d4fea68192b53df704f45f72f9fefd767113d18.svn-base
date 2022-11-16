
define([
	'geometry/polygon'
],function(polygon){
	
	var farm = polygon.inherit({
		
		into : function(param){
			this.super();
			this.type = "jd";
			this.name = "基地";
			//父级 属于那个农场
//			this.parentType = ['position'];
			this.attribute = { 
				name : ""
			};
			this.zIndex = 1;
			//透明度
			this.opacity_area = 0.85;
			this.opacity_line = 1;
			this.color_area = "#25573c";
			this.color_line = "#25573c";
			//name
			this.nick = "";
		},
		
		//绘制完成执行
		complete : function(e){
			this.super();
//			var p = e.geometry;
			//保存进入数据配置
//			this.attribute
		},
		
//		connectionCondition : function(a,b){
//			return esri.geometry.geometryEngine.contains( b , a);
//		}
		
		getName : function(){
			return this.attribute.name;
		},
		
		//扩展不问 引用model工具
		setModel : function(model){
			var json = [
				{ name : "名称",value : this.attribute.name , attr : "attribute name" },
				{ name : "企业名称",value : this.attribute.cname , attr : "attribute cname" },
				{ name : "设备类型",value : this.attribute.type , attr : "attribute type" },
				{ name : "颜色",value : this.config.color_area , type : "color" , attr : "config color_area" },
				{ name : "透明度",value : this.config.opacity_area , attr : "config opacity_area" },
				{ name : "边框颜色",value : this.config.color_line , type : "color" , attr : "config color_line" },
				{ name : "超链接",value : this.attribute.url , attr : "attribute url" },
				{ name : "参数",value : this.attribute.param , attr : "attribute param" },
				{ name : "id",value : this.attribute.id , attr : "attribute id" },
			];
			var self = this;
			model.show(json,function(json){

				for( var i in json ){
					var it = json[i];
					var attr = it.attr.split(" ");
					var o = self;
					for( var ie in attr ){
						if( ie == attr.length - 1 ){
							o[attr[ie]] = it.value;
						}else{
							o = o[attr[ie]];							
						}
					}
						
				}
				self.graphic.setSymbol(self.getSymbol())
				self.setName(self.attribute.name);

				this.hide();
			},{
				btn : [
					{ name : "删除" , call : function(){
							self.remove();
							this.hide();
						} 
					}
				]
			});
		}
		
	})
	
	return farm;
	
})
