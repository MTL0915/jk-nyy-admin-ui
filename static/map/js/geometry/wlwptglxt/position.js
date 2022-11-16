define([
	'geometry/dian'
],function(dian){
	
	var position = dian.inherit({
		
		into : function(param){
			this.super();
			this.type = "定位";
			this.path = "wlwptglxt/position";
			this.name = "定位";
			//父级 属于那个农场
			this.parent = param.parent||null;
			this.geometryType = 'point';
			this.zIndex = 99; 
		},
		
		//绘制完成执行
		complete : function(e){
			this.super();
			var p = e.geometry;
			//保存进入数据配置
			this.attribute.jd = p.x ;
			this.attribute.wd = p.y ;
		},

		//扩展不问 引用model工具
		setModel : function(model){
			var json = [
				{ name : "名称",value : this.attribute.text , attr : "attribute text" },
				{ name : "图标链接",value : this.config.img , type: "select" , attr : "config img", option : this.getImageName() },
				{ name : "超链接",value : this.attribute.url , attr : "attribute url" },
				{ name : "参数",value : this.attribute.param , attr : "attribute param" },
				{ name : "id",value : this.attribute.id , attr : "attribute id" },
				{ name : "企业名称",value : this.attribute.cname , attr : "attribute cname" },	
			]
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
				self.graphic.setSymbol(self.getSymbol());
				self.modelSave(self,model);
//				this.hide();
			},{
				btn : [
					{ name : "删除" , call : function(){
						self.remove();
						this.hide();
					} }
				]
			});
		}
		
		
	})
	
	return position;
	
})
