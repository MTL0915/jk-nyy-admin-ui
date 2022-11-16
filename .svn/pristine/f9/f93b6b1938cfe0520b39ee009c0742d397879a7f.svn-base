define([
	'template/template',
	'util/keyboard',
	'map/util/draw',
	'map/util/printer'
],function(template,keyboard,Draw,printer){
	
	var draw;
	
	var edit = function(){
		this.constructor = function(map){
			this.setMap(map);
			//记录被选中的几何
			this.selectGraphic = [];
		};
		this.constructor.apply(this,arguments);
	}
		
	var fn = edit.fn = edit.prototype;
	
	fn.setMap = function(map){
		this.map = map;
	}
	
	fn.editLayer = function(layer){
		if( this.selectLayer ){
			this.selectLayer.clear();
			this.map.removeLayer(this.selectLayer);
		}; 
		this.selectLayer = layer;
		if( !layer.getMap() ){
			this.map.addLayer(layer);	
		}	
		layer.on("click",function(e){
		
			if( e.graphic ){
				if( keyboard.keyCode.indexOf(17) > -1 ){
					this.editGraphic(e.graphic,true);
				}else{
					this.editGraphic(e.graphic);
				}
			}
		}.bind(this))
	}
	
	fn.editGraphic = function(graphic,isadd){
		var self = this;
		//如果已经选中了的 则 不管
		var index = this.selectGraphic.indexOf(graphic);
		if( index > -1 ) return;
		
		
		if( isadd != true ){
			this.selectGraphic = [];
		}else{
			//如果是多选的话 判断是否是同样的symbol
			if( this.selectGraphic[0].symbol.declaredClass == graphic.symbol.declaredClass && graphic.symbol.declaredClass !== undefined ){
				//将symbol复制一份给选中对象
				var symbol = printer.import_graphic(printer.export_graphic(this.selectGraphic[0])).symbol;
				graphic.setSymbol(symbol);
				
				return;
				var symbol = new this.selectGraphic[0].symbol.constructor(JSON.parse(JSON.stringify(this.selectGraphic[0].symbol)));
				if( symbol && symbol.outline && symbol.outline.width !== this.selectGraphic[0].symbol.outline.width ){
					symbol.outline.width = this.selectGraphic[0].symbol.outline.width;
				}
				if( this.selectGraphic[0].symbol.font && symbol.font.size !== this.selectGraphic[0].symbol.font.size ){
					symbol.font.size = this.selectGraphic[0].symbol.font.size;
				}
				symbol && symbol.setStyle && symbol.setStyle(this.selectGraphic[0].symbol.style);
				
				return
			}else{
				//如果是不同的话退出
				return ;	
			}

			return 
		}
		
		if( this.template ){
			//如果存在模板  销毁前一个
			this.template.destroy();
		}
		
		this.getEdit(function(edit){
			this.esriEdit.deactivate();
			this.selectGraphic.push(graphic);
			if( graphic.geometry.type === 'point' ){
				//如果是点类型进入移动模式
				this.esriEdit.activate(1,graphic);
			}else{
				//标记几何为选中状态  也就是编辑模式
				this.esriEdit.activate(2,graphic);	
			}
			
			var ar = graphic.symbol.declaredClass.split("."); 
			type = ar[ar.length-1].toLocaleLowerCase();	
			
			
			this.template = template.load({
				name : type, 
				path : "map/edit/htmlComplate/",
				callback : function(e){
					this.edit = self;
					this.graphic = graphic;
					this.show({css: "top: 0; right: 0;height: 100%; overflow: auto;position: absolute;background: #fff"});
					this.initOption();
				}
			})
		}.bind(this));
	}
	
	fn.getEdit = function(callback,isNew){
		
		if( this.esriEdit ){
			callback && callback.call(this,this.esriEdit);
			return;
		}
		
		require(["esri/toolbars/edit"],function(edit){
			
			var edit = new edit(this.map);
			
			if( isNew == true ){
				esriEditArray.push(edit);
			}else{
				this.esriEdit = edit;
			}
				
			callback && callback.call(this,edit);
		}.bind(this))
		
	}
	
	fn.activate = function(type,callback){
		!draw && (draw = new Draw(this.map) );
		if( !this.selectLayer ) return;
		draw.activateAndAddLayer( type , this.selectLayer , function(e){
			e.graphic.symbol.type || (e.graphic.symbol.type = e.graphic.symbol.constructor.prototype.type);
			callback && callback.apply(this,arguments);
			return "remove";
		})
	}
	
	var esriEditArray = [];

	return edit;
	
})
