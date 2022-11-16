define([
	'map/util/printer'
],function(printer){
	
	return {
		//改成移动模式
		yidong : function(){
			this.edit.esriEdit.deactivate();
			this.edit.esriEdit.activate(1,this.graphic);
		},
		//改成边框模式
		biankuang : function(){
			this.edit.esriEdit.deactivate();
			this.edit.esriEdit.activate(2,this.graphic);
		},
		//复制
		fuzhi : function(){
			this.graphic;
			var clone = printer.import_graphic(printer.export_graphic(this.graphic));
			this.graphic.getLayer().add(clone);
		},
		//修改点击弹出链接
		upadateIframeSrc : function(e){
			if( !this.graphic.attribute ) this.graphic.attribute = {};
			this.graphic.attribute["iframeSrc"] = e.target.value; 
		},
		//修改透明度
		updateGraphicOpacity : function(e){
			var json = this.graphic.symbol.getFill();
			json.a = e.target.value * 0.01;
			this.graphic.symbol.setColor( new esri.Color(json) );
			this.graphic.getLayer().refresh()
		},
		//修改颜色
		updateGraphicColor : function(e){
			this.graphic.symbol.setColor(e.target.value); 
			this.graphic.getLayer().refresh()
		},
		//修改边框颜色
		updateGraphicBorderColor : function(e){
			this.graphic.symbol.outline.setColor(e.target.value); 
			this.graphic.getLayer().refresh()
		},
		//调整层级高度 z-index
		ZIndex : function(e){
			var layer = this.graphic.getLayer();
			layer.graphics.splice(layer.graphics.indexOf(this.graphic),1);
			layer.graphics.splice(e.target.value,0,this.graphic);
			//layer.refresh();
			layer.redraw();
		}
	};
	
})
