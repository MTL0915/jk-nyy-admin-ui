define([
	'map/mapLoad',
	"map/util/verification"
],function(mapLoad,verification){
	
	var createGraphic = function(){
		
		this.constructor = function(){}
		
		this.constructor.apply(this,arguments);
		
	}
	
	var fn = createGarphic.fn = createGarphic.prototype;
	
	fn.createGraphic = function(geometry,symbol){
		return esri.Graphic();
	}
	
	fn.getpoint = function(x,y,spatialReference){
		//适用于各个类型的参数矫正
		var spatialReference = verification(spatialReference);
		return esri.geometry.Point([x,y],spatialReference);
	}
	
	fn.getPictureFill = function(img,width,height,outline){
		var pfs = new esri.symbol.PictureFillSymbol(img,
		    this.getSimpleLine.apply(this,outline),
		    width||42, height||42);
		return pfs;
	}
	
	fn.getSimpleLine = function(type,color,width){
		var SimpleLineSymbol = esri.symbol.SimpleLineSymbol;
		return new SimpleLineSymbol(type||SimpleLineSymbol.STYLE_SOLID,new Color(color||'#000'), width||1); 
	}
	
	fn.getSimpleMarker = function(type,color,width,outline){
		var orangeRed = new Color(color||[238, 69, 0, 0.5]); // hex is #ff4500
        var marker = new SimpleMarkerSymbol(type||"solid", width||15, outline ? this.getSimpleLine.apply(this,outline) : null, orangeRed);
        return marker;
	}
	
	fn.getGraphic = function(type){ 
		var geometry = this["get"+type] && this["get"+type].apply(this,param);
		var symbol = this.getSimpleMarker();
		return this.createGraphic(geometry,symbol);
	}

	return new createGarphic();
	
})
