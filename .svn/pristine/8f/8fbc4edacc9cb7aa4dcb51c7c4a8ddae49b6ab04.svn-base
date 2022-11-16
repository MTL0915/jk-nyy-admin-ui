define([
	'map/mapLoad'
],function(mapLoad){
	
	var verification = function(){
		this.constructor = function(){}
		this.constructor.apply(this,arguments);
	}
	
	var fn = verification.fn = verification.prototype;
	
	fn.spatialReference = function(){
		var p1 = arguments[0];
		if( !p1 ){
			return mapLoad.getMap(); 
		}
		if( p1.declaredClass && map.declaredClass == "esri.Map" ){
			//如果传入参数是map
			return map.spatialReference;
		}
		if( p1.declaredClass && map.declaredClass == "esri.SpatialReference" ){
			//如果传入参数是map
			return p1;
		}
		if( typeof p1 == 'object' ){
			//如果传入参数是map
			return p1;
		}
		if( typeof p1 == 'string' ){
			return new esri.spatialReference(p1);
		}
	}
	
	return verification;
	
})
