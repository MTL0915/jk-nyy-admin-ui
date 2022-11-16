let http = location.protocol || "https:";
module.exports =  {
    initJs : http+"//"+process.env.DOMAIN+"/arcgis_js_api/init.js",
    initCss : http+"//"+process.env.DOMAIN+"/esri/css/esri.css",
    // baseMap : "http://121.32.129.19:8100/arcgis/rest/services/440232/ruyuandaping_new_20200309/MapServer",
    baseMap : http+"//services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer",
    // baseMap : "http://121.32.129.19:8100/arcgis/rest/services/440200/guoyuan/MapServer",
    // layersType : "gg",
    modules : [
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
        "esri/layers/TiledMapServiceLayer"
    ],
    mapParam : {
        slidePosition : "bottom-right"
    }
}