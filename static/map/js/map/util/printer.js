//打印机
define([
	'util/import'
],function(imports){

	var printer = function(map){
		
		this.constructor = function(map){
			
		}
		this.constructor.apply(this,arguments);
	}
	
	var fn = printer.fn = printer.prototype;
	
	//导出
	fn.export = function(){
		
	}
	//导入
	fn.import = function(){
		
	}
	
	fn.export_polygeo = function(polygeo){
		
	}
	
	fn.import_polygeo = function(){
		
	}
	
	fn.export_graphic = function(graphic,bool){
		if( !graphic.symbol ) return;
		graphic.symbol.symbol_type = graphic.symbol.declaredClass.split('.')[2].toLocaleLowerCase();
		var json = {
			geometry : graphic.geometry,
			symbol : graphic.symbol,
			attributes : graphic.attributes,
			infoTemplate : graphic.infoTemplate,
		}
		return bool == false ? json : JSON.stringify(json);
	}
	
	fn.import_graphic = function(graphic,bool){
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
	}
	
	
	fn.export_layer = function(layer,bool){
		var graphics = layer.graphics;
		var json = {};
		json.graphics = [];
		for( var i in graphics ){
			json.graphics.push( this.export_graphic(graphics[i],false) );	
		}
		json.id = layer.id;
		json.type = layer.declaredClass;
		layer.getMap() && ( json.extend = layer.getMap().extent );
		if( bool == false ){
			
		}else{
			imports.ImportString(JSON.stringify(json));						
		}
		
		return JSON.stringify(json);
	}
	
	fn.import_layer = function(json,map){
		var layer = new esri.layers.GraphicsLayer({id:json.id||""});
		var graphics = json.graphics;
		for( var i in graphics ){
			layer.add(this.import_graphic(graphics[i],false));
			//map.graphics.add(this.import_graphic(graphics[i],false))
		}
		
		if( json.extent ){
			map.setExtent( new esri.geometry.Extent(json.extent) );
		}

		if(map){
			layer.spatialReference = map.spatialReference;
			map.addLayer(layer);
		} 
		return layer;
	}
	
	return new printer();
	
})
