define([
	'geometry/point'
],function(point){

	var text = point.inherit({
		
		into : function(){
			this.super();
			this.geometryType = 'point';
			this.attribute.text = "";
			this.angle = 0;
			this.attribute.color = '#ffffff'
			this.attribute.size = 12;
		},
		
		getSymbol : function(){
			var Color = esri.Color;
			var Font = esri.symbol.Font;
			var textSymbol =  new esri.symbol.TextSymbol( this.attribute.text || "文字标题").setColor(
			    new Color(this.attribute.color)).setAlign(Font.ALIGN_START).setAngle(this.angle).setFont(
			    new Font(this.attribute.size+"pt").setWeight(Font.WEIGHT_BOLD)) ;
			
			return textSymbol; 
		},
		
	});
	
	return text;
	
})
