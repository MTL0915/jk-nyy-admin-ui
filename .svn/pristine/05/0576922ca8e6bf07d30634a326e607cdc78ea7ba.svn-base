define([
	'geometry/point'
],function(point){
	
	var position = point.inherit({
		
		into : function(param){
			this.super();
			this.type = "dian";
			this.name = "dian";
			//父级 属于那个农场
			this.parent = param.parent||[];
			this.zIndex = 99;
			this.geometryType = 'point';
			this.attribute = {
				
			};
			this.img = "./map/img/定位_red.png";
		},
		
		//绘制完成执行
		complete : function(e){
			this.super();
			var p = e.geometry;
			//保存进入数据配置
			this.attribute["经度"] = p.x;
			this.attribute["维度"] = p.y;
		},
		
		getSymbol : function(){
			
			var symbol =  new esri.symbol.PictureMarkerSymbol({
			    "url":this.getImage(this.config.img) || this.img,
			    "height":20,
			    "width":20,
			    "type":"esriPMS",
			    "angle": 0,
		  	});
			return symbol; 
		},
		
		modelSave : function(){
			
		},
		 
		//扩展不问 引用model工具
		setModel : function(model){
			var json = [
				{ name : "文本",value : this.attribute.text , attr : "attribute text" },
				{ name : "图标链接",value : this.config.img , type: "select" , attr : "config img", option : this.getImageName() },
				{ name : "超链接",value : this.attribute.url , attr : "attribute url" },
				{ name : "参数",value : this.attribute.param , attr : "attribute param" },
				{ name : "id",value : this.attribute.id , attr : "attribute id" },
				{ name : "企业名称",value : this.attribute.cname , attr : "attribute cname" },
				{ name : "设备类型",value : this.attribute.type , attr : "attribute type" },
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
				self.graphic.setSymbol(self.getSymbol())
				self.modelSave(self,model);
			},{
				btn : [
					{ name : "删除" , call : function(){
						self.remove();
						this.hide();
					} },
					{ name : "取消" , call : function(){
						this.hide();
					} }
				]
			});
		}
		
	})
	
	return position;
	
})
