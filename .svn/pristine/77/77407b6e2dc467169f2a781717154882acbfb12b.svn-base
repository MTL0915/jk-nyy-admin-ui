define([
	'newExtend',
	'util/eventManagess',
	'geometry/util/imageManagement'
],function(bewExtend,eventManagess,ImageManagement){
	
	var imageManagement = new ImageManagement();


	mapLevelChangeBool = false;
	var mapLevelChange = function(map){
		if( mapLevelChangeBool ) return;
		map.on("zoom-end",function(event){
			geometry.group.forEach(function(e){
				e.isMapZoom ? e.mapLevelChange(event) : null;
			})
		})
	}

	var geometry = bewExtend.inherit({
		
		into : function(option){
		
			this.type = null;
			this.geometryType = "polygon";
			this.map = option.map;
			this.path = 'geometry';
			this.layer = null;
			this.mouseup_color = "red";
			this.isMouse = false;
			//允许的父级
			this.parentType = [];
			this.parentError = "规划区域不能超过制定的范围";
			this.isConnection = option.isConnection || true; //是否开启父级关系
			//父级
			this.parent = [];
			this.children = [];
			//层级
			this.zIndex = 10;
			//透明度
			this.opacity_area = 0.25;
			this.opacity_line = 1;
			this.color_area = null;
			this.color_line = null;
			this.attribute = {};
			this.config = {
				opacity_area : 0.25,
				opacity_line : 1,
				color_area : option.color_area || option.color || "#ffffff",
				color_line : option.color_line || option.color || "#ffffff",
			};
			//几何
			this.graphic = null;
			//名称文字
			this.nameGraphic = null;
			//编辑对象
			this.edit = null;
			
		},
		
		main : function(option){
			//同步config 
			for( var i in option.config )	this.config[i] = option.config[i]; 
			
			this.onlayerClick = new eventManagess();
			this.onlayerMouseout = new eventManagess();
			this.onlayerMouseover = new eventManagess();
			
			mapLevelChange(this.map);
			
		},
		
		getEdit : function(){
			this.edit || (this.edit = new esri.toolbars.Edit(this.map));
			return this.edit;
		},
		
		getLayer : function(){
			return this.layer ? this.layer : this.createLayer();
		},
		
		getName : function(){
			return this.attribute.name || this.name;
		},
		
		createLayer : function(){
			this.layer = new esri.layers.GraphicsLayer();
			this.map.addLayer(this.layer);
			this.layer.on("click",this.layerClick.bind(this));
			this.layer.on("mouse-out",this.layerMouseout.bind(this));
			this.layer.on("mouse-over",this.layerMouseover.bind(this))
			return this.layer;
		},
		
		layerMouseout : function(e){
			
		},
		
		layerMouseover : function(e){
			
		},
		
		layerClick : function(e){
			e.geometry = this;
			this.onlayerClick(e);
		},
		
		refreshLayer : function(){
			this.layer.refresh();
		},
		
		getDraw : function(){
			return this.draw ? this.draw : this.createDraw();
		},
		
		createDrawByGraphic : function(graphic){
			return this.complete({geometry:graphic.geometry},graphic.symbol);
		},
		
		createDraw : function(map = this.map){
			this.draw = new esri.toolbars.Draw(map);
			this.draw.on("draw-complete",this.complete.bind(this));	
			return this.draw;
		},
		
		getGraphic : function(){
			return this.graphic;
		},
		
		//绘制完成执行
		complete : function(e,symbol){
			
			//判断父子级关系
			if( this.isConnection && !this.connection(e) ) {
				alert(this.parentError);
				return this.stopDraw(); 
			}
			//将绘制的图形导出
			var g = this.createGraphic(e.geometry,symbol||this.getSymbol());
			//生成图层
			var layer = this.getLayer();
			//添加进入
			layer.add(g);
			//取消绘制
			this.stopDraw();
			//绘制回调
			this.drawCall && this.drawCall(e);
			//添加进入数据统计
			this.addGroup();
			//完成绘制操作之后执行
			this.completed();
		},
		
		completed : function(){
			
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
		
		createGraphic : function(geometry,symbol){
			var g = new esri.Graphic(geometry,symbol);
			this.setGraphic(g);
			return g;
		},
		
		setGraphic : function(g){
			//记录图形
			this.graphic = g;
			return g;
		},
		
		//绘制自己
		drawGeometry : function(call){
			var draw = this.getDraw();
			draw.activate(this.geometryType||"polygon");
			this.drawCall = call;
		},
		
		stopDraw : function(){
			this.draw && this.draw.deactivate();
		},
		
		//删除自己
		remove : function(){
            this.layer.clear();
			this.map.removeLayer(this.layer);
			this.isGroup = false;
			//删除父子级关系
			geometry.group.splice( geometry.group.indexOf(this) , 1 );
			this.parent = [];
			this.children.forEach( function(e){ e.remove(); } );
			this.removed && this.removed();
			this.uneditModel();
		},
		
		getGroup : function(){
			return geometry.group;
		},
		
		//判断父子级配置关系
		connection : function(e){
	
			//获取允许添加的parent类型
			var type = this.parentType;
			if( !type || type.length == 0 ) return true;
			//获取已经创建的这些类型
			var group = this.getGroup();
			group = group.filter(function(e){ return type.indexOf(e.type) > -1; });
			
			//将符合类型的几何拿来判断
			for( var i in group ){
				if( this.connectionCondition(group[i].getGraphic().geometry, e.geometry) ){
					this.parent.push(group[i]);
					group[i].children.push(this);
					return true;
				}
			}
			
//			alert(this.parentError)
			return false;
							
		},
		
		connectionCondition : function(geometry, egeometry){
			if( esri.geometry.geometryEngine.contains(geometry, egeometry) ){
				return true;
			}
			return false
		},
		
		export_graphic : function(graphic,bool){
			if( !graphic.symbol ) return;
			graphic.symbol.symbol_type = graphic.symbol.declaredClass.split('.')[2].toLocaleLowerCase();
			var json = {
				geometry : graphic.geometry,
				symbol : graphic.symbol,
				attributes : graphic.attributes,
				infoTemplate : graphic.infoTemplate,
			}
			return bool == false ? json : JSON.stringify(json);
		},
		
		import_graphic : function(graphic,bool){
	
			var gra;
			try {
				
				typeof graphic == 'string' ? graphic = JSON.parse(graphic) : "";
				if( graphic.symbol.symbol_type ) { graphic.symbol.type = graphic.symbol.symbol_type };
				if( graphic.symbol ){
					if( graphic.symbol.type == 'simplefillsymbol' || ( !graphic.symbol.url && graphic.symbol.outline ) ){
						graphic.symbol.type = 'esriSFS';
					}else if( graphic.symbol.type == 'picturemarkersymbol' || ( !graphic.symbol.type && ( graphic.symbol.url !== undefined)) ){
						graphic.symbol.type = 'esriPMS';
					}else if( graphic.symbol.type == 'picturefillsymbol' || ( graphic.symbol.url !== undefined ) ){
						graphic.symbol.type = 'esriPFS';
					}else if( graphic.symbol.type == 'simplelinesymbol' ){
						graphic.symbol.type = 'esriSLS';
					}else if( graphic.symbol.type == 'textsymbol' || graphic.symbol.text ){
						graphic.symbol.type = 'esriTS';
					}
				}
			
				
				//处理几何
				delete graphic.geometry.cache;
				delete graphic.geometry._ring;
				graphic.geometry.spatialReference = { wkid : graphic.geometry.spatialReference.wkid || graphic.geometry.spatialReference || 4360 };
				
				gra = new esri.Graphic(graphic);
				if( gra.symbol && gra.symbol.outline && gra.symbol.outline.width !== graphic.symbol.outline.width ){
					gra.symbol.outline.width = graphic.symbol.outline.width;
				}
				if( graphic.symbol.font && gra.symbol.font.size !== graphic.symbol.font.size ){
					gra.symbol.font.size = graphic.symbol.font.size;
				}
				gra.symbol && gra.symbol.setStyle && gra.symbol.setStyle(graphic.symbol.style || 'solid');	
				gra.symbol && gra.symbol.height && gra.symbol.setHeight(graphic.symbol.height || 16);
				gra.symbol && gra.symbol.width && gra.symbol.setWidth(graphic.symbol.width || 16);
			}catch(e){
				gra = {};
				console.log("到处图形失败");
				console.log(e);
			}
			return gra;
		},
		
		export : function(){
			var option = {
				graphic : this.export_graphic(this.getGraphic()),
				attribute : this.attribute,
				config : this.config,
				type : this.type,
				zIndex : this.zIndex,
				path : this.path
			};
			return option;
		},
		
		import : function(option){
			var graphic = this.import_graphic(option.graphic);
			this.attribute = option.attribute;
			this.config = option.config;
			this.zIndex = option.zIndex;
			graphic.setAttributes(option.attribute);
			this.createDrawByGraphic(graphic);
		},
		
		addGroup : function(){
			if( this.isGroup != true )
				geometry.group.push(this);
		},
		
		show : function(){
			this.layer && this.layer.show();
		},
		
		hide : function(){
			this.layer && this.layer.hide();
		},
		
		//进入编辑模式
		editModel : function(tool){
			this.getEdit().activate(tool, this.graphic);
		},
		
		//离开编辑模式
		uneditModel : function(tool){
			this.edit && this.getEdit().deactivate();
		},
		
		//获取图片base数据
		getImage : function(name){
			var img = imageManagement.imageData.find(function(e){
				return e.name == name;
			})
			return img ? img.data : null;
		},
		
		//获取全部图片名称
		getImageName : function(name){
			var img = imageManagement.imageData.map(function(e){
				return e.name;
			})
			return img;
		},
		
		//地图变化检测
		mapLevelChange : function(event){
			var level = event.level;
			//达到高度时隐藏
			this.hideLevel(level);	 
		},
		
		//低于高度值则隐藏
		hideLevel : function(level){
			if( this.config.hideLevel ){
				level < this.config.hideLevel ? this.hide() : this.show();	
			}
		},
		
		
	});
	
	geometry.removeGroup = [];
	
	geometry.group = [];
	
	geometry.export = function(map){
		var option = {geometry : []};
		var group = geometry.group;
		
		for( var i in group ){
			var it = group[i];
			var s = it.export();
			option.geometry.push(s);
		}
		
		if( map ){
			option.extent = { extent : map.extent , type : "extent"};;			
		}
		
		option.image = imageManagement.imageData;
		
		return option;
	}
	
	geometry.import = function(option,map,call){
		//获取所有需要的类型
		var groupType = [];
		if( option.extent ){
			var extent = new esri.geometry.Extent(option.extent.extent)
			map.setExtent(extent);
		}
		
		if( option.image ){
			imageManagement.imageData = option.image;
		}
		var _geometry = option.geometry;
		_geometry.forEach(function(e){ groupType.indexOf(e.path) == -1 ? groupType.push(e.path) : null; });
		//根据zindex 排序
		_geometry.sort(function(a,b){
			var az = a.zIndex;
			var bz = b.zIndex;
			return az - bz; 
		});
		//加载需要用到的类型
		Lwz.require(groupType.map(function(e){ return 'geometry/'+e; }),function(Geometry){
			var i = _geometry.length;
			_geometry.forEach(function(e){
				geometry.create(e.path,{map : map},function(g){
					i--;
					//关闭掉嵌套系统
					g.isConnection = false;
					g.import(e);
					//开启嵌套
					g.isConnection = true;
					
					if( i == 0 ){
						call && call();
					}
				});
			})
		})
		
	}
	
	geometry.oldImport = function(option,map){
		//获取所有需要的类型
		var groupType = [];
		
		var _geometry = option;
		_geometry.forEach(function(e){ groupType.indexOf(e.type) == -1 ? groupType.push(e.type) : null; });
		//根据zindex 排序
		_geometry.sort(function(a,b){ return a.zIndex - b.zIndex });
		//加载需要用到的类型
		Lwz.require(groupType.map(function(e){ return 'geometry/'+e; }),function(Geometry){
			_geometry.forEach(function(e){
				if( e.extent ){
					var extent = new esri.geometry.Extent(e.extent)
					map.setExtent(extent);
					return;
				}
				geometry.create(e.type,{},function(g){
					g.import(e);
				});
			})
		})
		
	}
	
	geometry.create = function(type,option = {},call){
		Lwz.require([
			'geometry/'+type
		],function(Geometry){
			option.map || (option.map = _map);
			var _geometry_ = new Geometry(option);
//			_geometry_.onlayerClick(data.clickGeometry);
			call && call(_geometry_);
		})
	};
	
	geometry.getImageManagement = function(){
		return imageManagement; 
	}
	
	geometry.addImage = function(){
		imageManagement.add();
	}
	
	geometry.remove = function(map){
		for( var i = 0; i < geometry.group.length ; i++ ){
			var e = geometry.group[i]; 
			if( e.map === map ){
				e.remove();
				i--;
			} 
		}
		geometry.group = [];
	}
	
	geometry.mapChange = function(){
		geometry.group.forEach(function(e){ return e.remove(); })
	}
	
	return geometry;
	
})

