

var alertName = function(){
	this.layer = [];
	this.map = null;
	this.dom = [];
	
	for( var i in _prototype_ ){
		this[i] = _prototype_[i];
	}
}



var _prototype_ = {

	getDomControl (){
		if( !this.domControl ){
			this.domControl = document.createElement("div");
			this.map.container.appendChild(this.domControl);
		}
		return this.domControl ;
	},
	
	addLayer ( layer ){
		// 添加进入库存
		this.layer.push(layer);
	},
	
	addDom (dom,i){
		this.dom[i||0] = dom;
	},
	
	// 关联地图
	RelatedLayer ( layer ){
		this.layer.push(layer);
		layer.mouseout = layer.on("mouse-out",(e)=>{ 
			e.graphic && this.unalert(e.graphic);
		});
		layer.mouseover = layer.on("mouse-over",(e)=>{
			this.map || (this.map = layer.getMap());
			var graphic = e.graphic;
			if( graphic ){
				var i = graphic.alert || "";
				this.alert(graphic,i);
			}			
		});
	},

	removeLayer(layer){
		if( layer ){
			this.layer.splice(this.layer.indexOf(layer),1); 
			layer.mouseout && layer.mouseout.remove()
			layer.mouseover && layer.mouseover.remove()
		}else{
			for( var i = 0 ; i < this.layer.length ;  )
				this.removeLayer(this.layer.shift())
		}
	},

	close (){
		this.removeLayer();
		this.domControl && this.domControl.remove();
	},

	htmlToDom (html,attr){
		var div = document.createElement("div");
		eval( "div.innerHTML = `" + html + "`" );
		return Array.prototype.slice.apply(div.children);
	},
	
	// 特质弹窗效果1
	alert (graphic , i){
		// 获取对应dom
		var dom = this.htmlToDom(this.dom[i||0],graphic.attributes||{})[0];
		// 获取坐标
		var point = this.map.toScreen(graphic.geometry.type === "point" ? graphic.geometry : graphic.geometry.getCentroid());
		// 根据做坐标单位渲染地图
		dom.style.position='absolute';
		dom.style.left=point.x+'px';
		dom.style.top=point.y+'px';
		this.getDomControl().appendChild(dom);
		graphic.dom = dom;
	},
	
	unalert (graphic){
		graphic.dom.remove();
	},

}

alertName.init = function(layer,dom){
	var alert = new alertName();
	layer.alertName = alert;
	alert.RelatedLayer(layer);
	alert.addDom(dom);
	return alert;
}

export default alertName;