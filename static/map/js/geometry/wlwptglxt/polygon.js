define([
	'geometry/geometry',
],function(geometry){
	
	var point = geometry.inherit({
		
		//输入名称
		setName : function(name){
			var g = this.getNameGraphic();
			g.symbol.setText(name);
			g.symbol.color.setColor("#ffffff");
			this.layer.refresh();
		},
		
		getNameGraphic : function(){
			return this.nameGraphic || this.createNameGraphic("");
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
			this.setName(this.getName());
		}
		
	});
	
	return point;
	
})
