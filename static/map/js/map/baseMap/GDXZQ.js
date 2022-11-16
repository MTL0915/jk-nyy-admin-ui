define([
	'map/baseMap/baseMap',
],function(baseMap){
	
	var layer =  function(map){};
	
	layer.prototype = new baseMap();
	
	layer.prototype.into = function(){
		this.baseLayer = this.createLayer(map);
		this.pluginName = "baseMap_GDXZQ";
		this.show();
	}
	
	layer.prototype.createLayer = function(){
		return new esri.layers.ArcGISDynamicMapServiceLayer("http://183.62.243.20:8002/arcgis/rest/services/GEOSERVER/GDXZQ/MapServer");
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