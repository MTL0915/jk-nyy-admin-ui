define([
	'map/util/printer'
],function(printer){
	
	return {
		//改成移动模式
		yidong : function(){
			this.edit.esriEdit.activate(1,this.graphic);
		},
		//复制
		fuzhi : function(){
			this.graphic;
			var clone = printer.import_graphic(printer.export_graphic(this.graphic));
			this.graphic.getLayer().add(clone);
			this.graphic = clone;
			if( clone.geometry.type === 'point' ){
				this.yidong();
			}else{
				this.biankuang();
			}
		},
		//删除
		delete : function(){
			this.graphic.getLayer().remove(this.graphic);
			this.closeEdit();
		},
		//修改点击弹出链接
		upadateIframeSrc : function(e){
			if( !this.graphic.attribute ) this.graphic.attribute = {};
			this.graphic.attribute["iframeSrc"] = e.target.value; 
		},
		//修改字体大小
		updateGraphicFontSize : function(e){
			this.graphic.symbol.setSize(e.target.value*1); 
			this.graphic.getLayer().refresh()
		},
		//修改颜色
		updateGraphicColor : function(e){
			this.graphic.symbol.setColor(new esri.Color(e.target.value)); 
			this.graphic.getLayer().refresh()
		},
		//修改文本
		updateGraphicText : function(e){
			this.graphic.symbol.setText(e.target.value);
			this.graphic.getLayer().refresh()
		},
		//根据几何初始化配置
		initOption : function(graphic){
			var gra = graphic || this.graphic;
			var dom = this.dom;
			gra.attribute && (dom.getElementsByClassName('iframeSrc')[0].value = gra.attribute.iframeSrc);
			dom.getElementsByClassName('fontColor')[0].value = new esri.Color( gra.symbol.color ).toHex();
			dom.getElementsByClassName('text')[0].value = gra.symbol.text;
			dom.getElementsByClassName('fontSize')[0].value = gra.symbol.font.size;
		},
		//取消编辑
		closeEdit : function(e){
			this.edit.esriEdit.deactivate();
			this.edit.selectGraphic = [];
			this.destroy();
		}
	};
	
})
