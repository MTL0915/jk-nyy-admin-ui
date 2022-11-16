var map , _edit , _draw;
Lwz.require([
	'map/mapLoad',
	'map/edit/edit',
	"geometry/geometry"
],function(mapLoad,edit,Geometry){
	
	mapLoad.mapload(function(map){
		
		_map = map;
		
		map.showBaseMap("googleLayer"); //
		
////ArcGISTiledMapServiceLayer
//		var baseMap = new esri.layers.ArcGISDynamicMapServiceLayer("http://183.62.243.20:8002/arcgis/rest/services/GDDOM/MapServer");
//
//		map.addLayer(baseMap);

		_edit = new edit(map);

	})
	
	mapLoad.maploadEnd(function(map){
		
		window.mapLoad && window.mapLoad(map);
		
	})
	

	
})