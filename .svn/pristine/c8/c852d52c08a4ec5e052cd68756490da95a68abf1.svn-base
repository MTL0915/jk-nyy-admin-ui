define([
	'geometry/geometry',
],function(geometry){
	
	var line = geometry.inherit({
		
		into : function(){
			this.super();
			this.geometryType = 'polyline';
			//线的颜色
			this.config.line_color = "#ffffff";
			//线的宽度
			this.config.line_width = 3;
			//线的类型
			this.config.line_type = "STYLE_SOLID";
			//起始点的图标
			this.config.startPointImages = "";
		},
		
		complete : function(){
			this.super();
		},
		
		getSymbol : function(){
			var SimpleLineSymbol = esri.symbol.SimpleLineSymbol;
			var Color = esri.Color;
			var sls = new SimpleLineSymbol(
				SimpleLineSymbol[this.config.line_type] || this.config.line_type,
			    new Color(this.config.line_color),
			    this.config.line_width
		 	);
			return sls;
		},
		
	});
	
	return line;
	
})
