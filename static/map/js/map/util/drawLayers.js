define([
	'map/util/draw',
	'map/util/printer',
	'dialogTable/htmlComplete'
],function(Draw,printer,htmlComplete){
	
	var draw;
	
	var drawLayers = function(map){
		this.constructor=function(map){
			map && this.into(map);
			//当前选中的layer
			this.selLayer;
			//所有的layer合集
			this.layers = [];	
		}
		this.constructor.apply(this,arguments);
	}
	
	var fn = drawLayers.fn = drawLayers.prototype;
	
	fn.into = function(map){
		this.map = map;
		//如果已经创建了 则不动
		!draw ? draw = new Draw(map) : "";
		//加载编辑器
		require([ 'esri/toolbars/edit' ],function(Edit){
			
			var esriEdit = this.edit = new Edit(map);
//			esriEdit.on("activate",this.oneditActivate.bind(this)); //绑定每一个几何开始绑定编辑模式
//			esriEdit.on("deactivate",this.oneditDeactivate.bind(this)); //结束绑定模式 事件
//			esriEdit.on("graphic-move-stop",this.oneditGraphicMoveStop.bind(this)); //移动停止事件
//			esriEdit.on("graphic-click",this.oneditClick.bind(this));
			for( var i = 0 ; i < this.layers.length ; i++ ){
				this.layers[i].graphics.forEach(function(gra){
					esriEdit.activate(1,gra);
				});
			}
		}.bind(this))
	}
	
	fn.activate = function(type){
		var self = this;
		draw.activate(type,function(e){			
			var layer = self.selLayer;
			var symbol;
		    switch(e.geometry.type){
		      case "point":
		        symbol = e.target.markerSymbol;
		        symbol.type = "esriSMS";
		        break;
		      case "polyline":
		        symbol = e.target.lineSymbol;
		        symbol.type = "esriSLS";
		        break;
		      case "polygon":
		        symbol = e.target.fillSymbol;
		        symbol.type = "esriSFS";
		        break;
		    }
		    var gra = new esri.Graphic( e.geometry , symbol );
			if( layer ) 
				layer.add(gra);
			else{
				//创建图层
				self.createLayer();
				self.selLayer.add(gra);
			}
//			setTimeout(function(){
//				//self.edit && self.edit.activate(1,gra);	
//			},300)
			return 'remove';
		});
	}
	
	fn.selectLayer = function(index){
		var self = this;
		if( typeof index === 'number' ){
			this.selLayer = this.layers[index];			
		}if( index.declaredClass ){
			this.selLayer = index;
			index.graphics.forEach(function(gra){
				try{
					self.edit.activate(1,gra);	
				}catch(e){
					
				}
			});
		}else{
			this.selLayer = this.layers.find(function(e){ return e.id == index });
		}
	}
	
	fn.createLayer = function(id,bool){
		var layer = new esri.layers.GraphicsLayer({id: id || "drawLayers_"+new Date().getTime()});	
		bool !== false && (this.selLayer = layer)
		this.layers.push(layer);
		this.map.addLayer(layer);
		
		return layer
	}
	
	fn.export = function(){
		var layers = this.layers;
		for( var i = 0; i < layers.length ; i++ ){
			try{
				printer.export_layer(layers[i]);				
			}catch(e){
				console.log(layers.id+'图层导出时失败，原因：');
				console.log(e);
			}
		}
	}
	
	return drawLayers;
	
})

