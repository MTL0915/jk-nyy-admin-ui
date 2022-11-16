define([
	'geometry/geometry',
],function(geometry){
	
	var point = geometry.inherit({
		
		//输入名称
		setName : function(name){
			var g = this.getNameGraphic();
			if( !g ) { return } 
			g.symbol.setText(name);
			g.symbol.color.setColor("#ffffff");
			this.layer.refresh();
		},
		
		getNameGraphic : function(){
			return this.nameGraphic || this.createNameGraphic("");
		},
		
		getSymbol : function(){
			var SimpleFillSymbol = esri.symbol.SimpleFillSymbol;
			var SimpleLineSymbol = esri.symbol.SimpleLineSymbol;
			var Color = esri.Color;
			var lineColor = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
		    	new Color(this.config.color_line), 2);
		    lineColor.color.a = this.config.opacity_line;
			var s = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
			    lineColor,new Color(this.config.color_area)
		  	);
		  	s.color.a = this.config.opacity_area;
			return s;
		},
		
		createNameGraphic : function(name){
			//确定名称
			var _name = name; 
			//创建symbol
			var symbol = new esri.symbol.TextSymbol(_name,null,new esri.Color("#ffffff"));
			//确定质点
			var point = this.graphic.geometry.getCentroid();
			//合成Graphic
			var graphic = this.nameGraphic = new esri.Graphic(point,symbol);
			//加入到layer中
			this.layer.add(graphic);
			return graphic;
		},
		
		complete : function(){
			//继承父级同名函数
			this.super();
			
			//执行输入名称
			this.graphic && this.setName(this.getName());
		},
		
		modelSave : function(){
			
		},
		
		//扩展不问 引用model工具
		setModel : function(model){
			
			var json = [
				{ name : "名称",value : this.getName() , attr : "attribute name" },
				{ name : "颜色",value : this.config.color_area , type : "color" , attr : "config color_area" },
				{ name : "透明度",value : this.config.opacity_area , attr : "config opacity_area" },
				{ name : "边框颜色",value : this.config.color_line , type : "color" , attr : "config color_line" },
				{ name : "层级",value : this.zIndex , attr : "zIndex" },
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
				self.setName(self.attribute.name);
				self.modelSave(self,model);
			},{
				btn : [
					{ name : "删除" , call : function(){
							self.remove();
							this.hide();
						} 
					},
					{ name : "取消" , call : function(){
							this.hide();
						} 
					}
				],
			});
		},
		
		mapLevelChange : function(event){
			this.super();
			this.groupGeometry(event.level);
		},
		
		//满足条件时  给予创建坐标图标演示位置， 主要用于地图最大高度聚合用  主要受用范围是范围几何类型  点类型误用
		groupGeometry : function(level){
			
			if( this.config.groupGeometryLevel ){
				if(level < this.config.groupGeometryLevel) {
					if( !this.groupPoint ){
						var point = this.graphic.geometry.getCentroid();
						//创建symbol对象
						var symbol =  new esri.symbol.PictureMarkerSymbol({
						    "url":"./map/img/定位_red.png",
						    "height":20,
						    "width":20,
						    "type":"esriPMS",
						    "angle": 0,
					  	});
					  	this.groupPoint = new esri.Graphic(point,symbol); 
					}
					this.layer.add(groupPoint);						
				}else{
					this.groupPoint && this.groupPoint.remove();
				}
			}
		}
		
	});
	
	return point;
	
})
