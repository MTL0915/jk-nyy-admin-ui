define([
	
],function(googleLayer){

	var baseLayer =  function(map){
		
		this.constructor = function(map){  
			map && this.setMap(map)
		}
		this.constructor.apply(this,arguments);
	}
	
	baseLayer.prototype.into = function(){
		this.baseLayer = this.createLayer(map);
		this.pluginName = "baseMap_baseLayer";
		this.show();
	}

	baseLayer.prototype.createLayer = function(map = this.map){
		return new baseLayer();
	}
	
	baseLayer.prototype.show = function(){
		if( this.baseLayer.getMap() ){
			this.baseLayer.show();
		}else{
			this.map.addLayer(this.baseLayer);
		}
	}
	
	baseLayer.prototype.hide = function(){
		this.baseLayer.hide();
	}
	
	baseLayer.prototype.setMap = function(map){
		this.map = map;
		this.into();
		this.pluginName && (map[this.pluginName] = this);
	}
	
	return baseLayer;
	
})
