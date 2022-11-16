define([
	'util/eventManagess',
	'util/import'
],function(event,save){

	var draw = function(map){
		
		this.constructor = function(map){
			
			this.map = map;
			this.draw = new esri.toolbars.Draw(map);
			this.draw.on("draw-complete",this.complete.bind(this));
			this.ondeactivate = new event();
			this.onactivate = new event(function(){
				//当绘制时  开始绑定
				this._escAndRightClickDeactivate();
			});
			this.oncomplete = new event();
			
		}
		this.constructor.apply(this,arguments);
	}
	
	var fn = draw.fn = draw.prototype;
	
	fn.activate = function(type,callback){
		this.draw.activate(type);
		this.onactivate.apply(this,arguments);
		typeof callback === 'function' && this.oncomplete(callback);
	}
	
	fn.deactivate = function(){
		this.draw.deactivate();
		this.ondeactivate.apply(this,arguments);;
	}
	
	//Esc或者右键取消
	fn._escAndRightClickDeactivate = function(){
		var self = this;
		var f = function(e){
			if( e.keyCode ){
				self.deactivate();
			}
		}
		document.addEventListener("keydown",f);
		var key = this.ondeactivate(
			function(){
				//当取消绘制时  解除绑定
				document.removeEventListener("keydown",f);
				return 'remove';
			}	
		)
		
	}
	//Esc或者右键取消
	fn._escAndRightClickDeactivateClear = function(){
		document.removeEventListener("keydown",this._escAndRightClickDeactivateDown)
	}
	
	fn._escAndRightClickDeactivateDown = function(e){
		if( e.keyCode ){
			this.deactivate();
		}
	}
	
	fn.complete = function(){
		this.oncomplete.apply(this,arguments);
		this.deactivate();
	}
	
	//绘画并将图形导出
	fn.activateAndImport = function(type,bool){
		
		this.activate(type);
		var key = this.oncomplete(function(e){
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
			if(bool == false){
				console.log(JSON.stringify({geometry:e.geometry,symbol:symbol}))
			}else{
				age=prompt("保存文件名","");
				save.ImportString(JSON.stringify({geometry:e.geometry,symbol:symbol}), age || "几何数据");
			}
		})
		this.ondeactivate(function(){
			key.remove();
			return 'remove';
		})
	}
	
	fn.activateAndAddLayer = function(type,layer,callback){
		
		var symbol,symbol_type;
		if( type == 'text' ){
			
			type = 'point';
			symbol = new esri.symbol.TextSymbol();
			symbol.text = '文本';
			symbol_type = 'textsymbol';
		}
		
		this.activate(type,function(e){
			
            if( !symbol ) {
            	
            	switch(e.geometry.type){
	              case "point":
	                symbol = new esri.symbol.PictureMarkerSymbol();
	                symbol.setUrl("data:image/png;base64,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");
	                //symbol.type = "esriPMS";
	                break;
	              case "polyline":
	                symbol = e.target.lineSymbol;
	                symbol.type = "esriSLS";
	                break;
	              case "polygon":
	              
	                symbol = new esri.symbol.SimpleFillSymbol();
	                symbol.type = "esriSFS";
	                break;
	            }
            	
            } 
            
            var gra = new esri.Graphic(e.geometry,symbol);
            layer.add( gra );
            gra.symbol.type || symbol_type || (gra.symbol.type == symbol_type); 
            e.graphic = gra;
			callback && callback.apply(this,arguments);
			return "remove";
		})
		
	}
	
	return draw;
	
})
