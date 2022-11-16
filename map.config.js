module.exports =  {
    initJs : "http://tdqq.gdagri.gov.cn/arcgis_js_api/init.js",
    initCss : "http://tdqq.gdagri.gov.cn/esri/css/esri.css",
    baseMap : "http://121.32.129.19:8100/arcgis/rest/services/440232/ruyuandaping_new_20200309/MapServer",
    layersType : "gg",
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