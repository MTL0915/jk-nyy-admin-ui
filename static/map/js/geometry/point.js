define([
	'geometry/geometry'
],function(geometry){

	var point = geometry.inherit({
		
		into : function(){
			this.super();
			this.geometryType = 'point';
			this.img = '/img/dian.png';
			
		},
		
		getSymbol : function(){
			var symbol =  new esri.symbol.PictureMarkerSymbol({
			    "url":this.img,
			    "height":20,
			    "width":20,
			    "type":"esriPMS",
			    "angle": 0,
		  	});
			return symbol; 
		},
		
	});
	
	return point;
	
})
