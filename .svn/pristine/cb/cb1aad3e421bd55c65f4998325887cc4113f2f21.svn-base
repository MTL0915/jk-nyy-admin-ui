define([
	'map/baseMap/baseMap',
	'map/baseMap/app/googleLayer',
],function(baseMap,googleLayer){

	googleLayer();

	var googleMapLayer =  function(map){ }
	
	googleMapLayer.prototype = new baseMap();
	
	googleMapLayer.prototype.into = function(){
		this.baseLayer = this.createLayer(map);
		this.pluginName = "baseMap_googleMapLayer";
		this.show();
	}
	
	googleMapLayer.prototype.createLayer = function(map = this.map){
		return new GoogleMapLayer();
	}
	
	return googleMapLayer;
	
})
