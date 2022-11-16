var http = location.protocol || "https:";
export default {
  initJs: http+'//cp.e-jiankun.com/arcgis_js_api/init.js',
  initCss: http+'//cp.e-jiankun.com/esri/css/esri.css',
  baseMap: http+'//121.32.129.19:8100/arcgis2/rest/services/440800/base_blue/MapServer',
  //   baseMap: 'gg',
  layersType: 'gg',
  modules: [
    'esri/geometry/geometryEngine',
    'esri/map',
    'esri/graphic',
    'esri/Color',
    'esri/layers/TiledMapServiceLayer',
    'esri/SpatialReference',
    'esri/geometry/Extent',
    'esri/layers/TileInfo',
    'esri/geometry/Point',
    'esri/geometry/Polygon',
    'esri/geometry/Circle',
    'esri/symbols/SimpleFillSymbol',
    'esri/symbols/SimpleMarkerSymbol',
    'esri/symbols/SimpleLineSymbol',
    'esri/symbols/PictureMarkerSymbol',
    'esri/graphic',
    'esri/layers/GraphicsLayer',
    'esri/toolbars/edit',
    'esri/toolbars/draw',
    'dojo/_base/declare',
    'esri/layers/TiledMapServiceLayer'
  ],
  mapParam: {
    slidePosition: 'bottom-right'
  }
}
