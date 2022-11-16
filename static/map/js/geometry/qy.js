
define([
	'geometry/polygon'
],function(polygon){
	
	var farm = polygon.inherit({
		
		into : function(param){
			this.super();
			this.type = "qy";
			this.name = "区域";
			//父级 属于那个农场
//			this.parentType = ['position'];
			this.attribute = { 
				name : ""
			};
			this.zIndex = 50;
			//透明度
			
			this.config = {
				opacity_area : 0.85,
				opacity_line : 1,
				color_area : "#25573c",
				color_line : "#25573c",
				area_image : "",
			}
			
		},
		
		getName : function(){
			return this.attribute.name;
		},
		
//		connectionCondition : function(a,b){
//			return esri.geometry.geometryEngine.contains( b , a);
//		}
		
		getSymbol : function(){
			var SimpleFillSymbol = esri.symbol.SimpleFillSymbol;
			var SimpleLineSymbol = esri.symbol.SimpleLineSymbol;
			var Color = esri.Color;
			var lineColor = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
		    	new Color(this.config.color_line), 2);
		    lineColor.color.a = this.config.opacity_line;
			
			var images = this.getImage(this.config.area_image);
			if( images ){
				var symbol =  new esri.symbol.PictureFillSymbol({
				    "url":images,
				    "height":this.config.area_image_size,
				    "width":this.config.area_image_size,
				    "outline": lineColor,
				    "type":"esriPFS"
				});	
				
				return symbol;
			}
			
			
			
			var s = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
			    lineColor,new Color(this.config.color_area)
		  	);
		  	s.color.a = this.config.opacity_area;
			return s;
		},
		
		//扩展不问 引用model工具
		setModel : function(model){
			
			var json = [
				{ name : "名称",value : this.attribute.name , attr : "attribute name" },
				{ name : "企业名称",value : this.attribute.cname , attr : "attribute cname" },
				{ name : "设备类型",value : this.attribute.type , attr : "attribute type" },
				{ name : "图片",value : this.config.area_image , type : "select" , attr : "config area_image" , option : this.getImageName() },
				{ name : "图片的比例",value : this.config.area_image_size , type : "range" , attr : "config area_image_size" },
				{ name : "颜色",value : this.config.color_area , type : "color" , attr : "config color_area" },
				{ name : "透明度",value : this.config.opacity_area , attr : "config opacity_area" },
				{ name : "边框颜色",value : this.config.color_line , type : "color" , attr : "config color_line" },
				{ name : "超链接",value : this.attribute.url , attr : "attribute url" },
				{ name : "参数",value : this.attribute.param , attr : "attribute param" },
				{ name : "id",value : this.attribute.id , attr : "attribute id" },
				{ name : "层次",value : this.zIndex , attr : "zIndex" },
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
