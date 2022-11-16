module.exports = {
  initJs: "https://"+process.env.DOMAIN+"/arcgis_js_api/init.js",
  initCss: "https://"+process.env.DOMAIN+"/esri/css/esri.css",
  baseMap:
    // "http://121.32.129.22:9005/arcgis/rest/services/440900/guoyuan9004/MapServer",
    "https://www.nongjixxh.com/arcgis/rest/services/440900/guoyuan9004/MapServer",
  // "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
  modules: [
    "esri/geometry/geometryEngine",
    "esri/map",
    "esri/graphic",
    "esri/Color",
    "esri/layers/TiledMapServiceLayer",
    "esri/SpatialReference",
    "esri/geometry/Extent",
    "esri/layers/TileInfo",
    "esri/geometry/Point",
    "esri/geometry/Polygon",
    "esri/geometry/Circle",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/PictureMarkerSymbol",
    "esri/graphic",
    "esri/layers/GraphicsLayer",
    "esri/toolbars/edit",
    "esri/toolbars/draw",
    "dojo/_base/declare",
    "esri/layers/TiledMapServiceLayer"
  ],
  mapParam: {
    slider: false,
    slidePosition: "bottom-right",
    minZoom: 1
  }
};
