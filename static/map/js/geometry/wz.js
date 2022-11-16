define([
	'geometry/text'
],function(text){

	var wenzi = text.inherit({
		
		into : function(){
			this.super();
			this.geometryType = 'point';
			this.type = "wz";
			this.name = "文字";
			this.text = '';
			this.angle = 0;
			this.color = '#ffffff'
			this.size = 12;
		},
		
		getSymbol : function(){
			var Color = esri.Color;
			var Font = esri.symbol.Font;
			var textSymbol =  new esri.symbol.TextSymbol( this.text || "文字标题").setColor(
			    new Color(this.color)).setAlign(Font.ALIGN_START).setAngle(this.angle).setFont(
			    new Font(this.size+"pt").setWeight(Font.WEIGHT_BOLD)) ;
			return textSymbol; 
		},
		
		//扩展不问 引用model工具
		setModel : function(model){
			var json = [
				{ name : "文本",value : this.text , attr : "text" },
				{ name : "颜色",value : this.color , type : "color" , attr : "color" },
				{ name : "字体大小",value : this.size , attr : "size" },
				{ name : "超链接",value : this.attribute.url , attr : "attribute url" },
				{ name : "参数",value : this.attribute.param , attr : "attribute param" },
				{ name : "id",value : this.attribute.id , attr : "attribute id" },
			]
			var self = this;
			model.show(json,function(json){
				for( var i in json ){
					var it = json[i];
					self[it.attr] = it.value; 
				}
				self.graphic.setSymbol(self.getSymbol());
				this.hide();
			},{
				btn : [
					{ name : "删除" , call : function(){
						self.remove();
						this.hide();
					} }
				]
			});
		}
		
	});
	
	return wenzi;
	
})
