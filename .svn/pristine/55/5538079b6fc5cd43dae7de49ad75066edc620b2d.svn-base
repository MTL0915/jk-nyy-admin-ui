define([
	'map/baseMap/baseMap',
],function(baseMap){

	var layer =  function(map){};
	
	layer.prototype = new baseMap();
	
	layer.prototype.into = function(){
		this.baseLayer = this.createLayer(map);
		this.pluginName = "baseMap_guangdong_county";
		this.show();
	}
	
	layer.prototype.createLayer = function(){
		var host = location.host;
		return new esri.layers.ArcGISTiledMapServiceLayer(host+"/arcgis/rest/services/base/guangdong_county/MapServer");
	}
	
	layer.prototype.show = function(){
		if( this.baseLayer.getMap() ){
			this.baseLayer.show();
		}else{
			this.map.addLayer(this.baseLayer);
		}
	}
	
	layer.prototype.hide = function(){
		this.baseLayer.hide();
	}
	
	layer.setMap = function(){
		var d = new this(map);
		map[d.pluginName] = d;
	}
	
	return layer;
	
})