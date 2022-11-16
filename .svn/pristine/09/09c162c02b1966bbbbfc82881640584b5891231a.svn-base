

var alertName = function(map,dom){
	this.setMap(map);
	this.dom = dom.container === Array ? dom : [dom];
}

alertName.prototype = {

	setMap (map){
		this.map = map;
		this.mapChange = map.on("extent-change",()=>{
			var layer = this.getLayer();
			for( var i = 0 ; i < layer.graphics.length ; i++ ){
				this.unalert(layer.graphics[i])
				this.alert(layer.graphics[i])
			}  
		});
	},

	getDomControl (){
		if( !this.domControl ){
			this.domControl = document.createElement("div");
			this.map.container.appendChild(this.domControl);
		}
		return this.domControl ;
	},

	addGraphic (graphic , i){
		this.getLayer().add(graphic);
		this.alert(graphic,i);
	},
	
	getLayer (){
		if( !this.layer ){
			this.layer = new esri.layers.GraphicsLayer({ id : "alertIdent" });
			this.map.addLayer(this.layer)
		}  
		return this.layer;
	},

	removeLayer(layer){
		var layer = this.getLayer();
		layer.clear()
		this.map.removeLayer(layer);
	},

	close (){
		this.removeLayer();
		this.domControl && this.domControl.remove();
		this.mapChange.remove();
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
		var point = this.getMap().toScreen(graphic.geometry);
		// 根据做坐标单位渲染地图
		dom.style.position='absolute';
		dom.style.left=point.x+'px';
		dom.style.top=point.y+'px';
		this.getDomControl().appendChild(dom);
		graphic.dom = dom;
	},
	
	unalert (graphic){
		graphic.dom && graphic.dom.remove();
	},

	getMap (){
		this.map || (this.map = (this.layer.getMap() || window.map))
		return this.map;
	}

}

alertName.init = function(layer,dom,isAll){
	var alert = new alertName();
	layer.alertName = alert;
	alert.RelatedLayer(layer);
	alert.addDom(dom);
	isAll === true ? alert.showAll() : null
	return alert;
}

export default alertName;