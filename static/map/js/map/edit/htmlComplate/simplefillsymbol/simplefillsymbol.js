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
		//修改透明度
		updateGraphicOpacity : function(e){
			var json = this.graphic.symbol.getFill();
			json.a = e.target.value * 0.01;
			this.graphic.symbol.setColor( new esri.Color(json) );
			this.graphic.getLayer().refresh()
		},
		//修改颜色
		updateGraphicColor : function(e){
			this.graphic.symbol.setColor(new esri.Color(e.target.value)); 
			this.graphic.getLayer().refresh()
		},
		//修改边框颜色
		updateGraphicBorderColor : function(e){
			this.graphic.symbol.outline.setColor(new esri.Color(e.target.value)); 
			this.graphic.getLayer().refresh()
		},
		//修改边框宽度
		updateGraphicBorderWidth : function(e){
			this.graphic.symbol.outline.setWidth(e.target.value / 10); 
			this.graphic.getLayer().refresh()
		},
		//调整层级高度 z-index
		ZIndex : function(e){
			var layer = this.graphic.getLayer();
			layer.remove(this.graphic);
			layer.add(this.graphic,e.target.value*1);
			layer.refresh();
		},
		//根据几何初始化配置
		initOption : function(){
			var gra = this.graphic;
			var dom = this.dom;
			var attributes;
			if( gra.attributes && typeof gra.attributes === 'object' ){
				attributes = dom.getElementsByClassName('attributes')[0];
				var html = "";
				for( var i in gra.attributes ){
					html += ' <div class="form-group"> ';;
			        html += '     	<label for="name">'+i+'</label> ';
	    			html += '	  	<input type="text" bind-change="upadateAttributes" attributesName="'+i+'" class="form-control" id="name" placeholder="请输入iframe" value="'+gra.attributes[i]+'"> ';
					html += ' </div>';
				}
				attributes.innerHTML = html;
				var input = Array.prototype.slice.apply(attributes.getElementsByTagName("input")||[]);
				input.forEach(function(e){ e.onchange = this.upadateAttributes.bind(this); }.bind(this));
			}
			
			dom.getElementsByClassName('graphicColor')[0].value = new esri.Color( gra.symbol.color ).toHex();
			dom.getElementsByClassName('graphicBorderColor')[0].value = new esri.Color( gra.symbol.outline.color ).toHex();
			dom.getElementsByClassName('graphicBorderWidth')[0].value = gra.symbol.outline.width * 10;
			dom.getElementsByClassName('graphicOpacity')[0].value = gra.symbol.outline.color.a * 100;
		},
		//取消编辑
		closeEdit : function(e){
			this.edit.esriEdit.deactivate();
			this.edit.selectGraphic = [];
			this.destroy();
		},
		//添加一个属性
		addAttributes : function(e){
			var name = prompt("属性名:","");		
			if( !name || name == '' ) {
				return;
			}
			
			var gra = this.graphic;
			var dom = this.dom;
			if( !gra.attributes || typeof gra.attributes !== 'object' ) gra.attributes = {};
			var attributes = dom.getElementsByClassName('attributes')[0];
			var html = "";
			html += ' <div class="form-group"> ';
	        html += '     	<label for="name">'+name+'</label> ';
			html += '	  	<input type="text" bind-change="upadateAttributes" attributesName="'+name+'" class="form-control" id="name" placeholder="请输入iframe" value=""> ';
			html += ' </div>';
			attributes.innerHTML += html;
			
			var input = Array.prototype.slice.apply(attributes.getElementsByTagName("input")||[]);
			if( input.length > 0 ) 
				input[input.length-1].onchange = this.upadateAttributes.bind(this);
		},
		
		//修改属性
		upadateAttributes : function(e){
			var gra = this.graphic;
			var dom = e.target;
			var name = dom.getAttribute('attributesName');
			if( !gra.attributes ) gra.attributes = {};
			gra.attributes[name] = dom.value;
		},
		
		//切换成为图片symbol
		updateSymbolTypeToImage : function(e){
			var gra = this.graphic;
			
			if( e.target.files.length < 0 ){ return };
			var f = new FileReader();
			f.onload = function(e){
				this.graphic.setSymbol( new esri.symbol.PictureFillSymbol() );
				this.graphic.symbol.setOutline( new esri.symbol.SimpleLineSymbol() );
				this.graphic.symbol.setUrl(e.currentTarget.result);
				this.graphic.getLayer().refresh();
				this.edit.selectGraphic = [];
				this.edit.editGraphic(this.graphic);
			}.bind(this);
			f.readAsDataURL(e.currentTarget.files[0]);
		}
		
	};
	
})
