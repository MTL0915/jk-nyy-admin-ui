import { loadCss, loadModules } from 'esri-loader'

let esri = {};
let urlserver = "";
let argsArray = ['esri/geometry/geometryEngine',
            'esri/map','esri/graphic','esri/Color',
            'esri/layers/TiledMapServiceLayer',
            'esri/SpatialReference','esri/geometry/Extent',
            'esri/layers/TileInfo','esri/geometry/Point',
            'esri/geometry/Polygon','esri/geometry/Circle',
            'esri/symbols/SimpleFillSymbol','esri/symbols/SimpleMarkerSymbol',
            'esri/symbols/SimpleLineSymbol','esri/symbols/PictureMarkerSymbol',
            'esri/graphic','esri/layers/GraphicsLayer','esri/toolbars/edit',
            'esri/toolbars/draw','dojo/_base/declare','esri/layers/ArcGISTiledMapServiceLayer'];
let mapInit = {
    mapInit () {
        // 加载css;
        // https://tdqq.gdagri.gov.cn/esri/css/esri.css
        loadCss('https://'+process.env.DOMAIN+'/esri/css/esri.css')
        // 加载模块
        loadModules(argsArray, {
          url: 'https://'+process.env.DOMAIN+'/arcgis_js_api/init.js' // http://arcgis.biubu.cn/v326/init.js
        }).then(this.TDTinstance)
          .then(this.initMap)
    },
    TDTinstance (args){
      for (const k in args) {
          var name = argsArray[k].split('/').pop();
          name = name.split("");
          name[0] = name[0].toLocaleUpperCase();
          name = name.join("")
          esri[name] = args[k];
      }
      esri["Geometry"] = window.esri.geometry;
    },
    // 初始化地图流程
    initMap (event){
        
        // 生成地图实例
        window.map = this.map = new esri.Map('mapBox', {
            logo: false,
            autoResize : true,
            slider: true,
            sliderPosition: 'bottom-right',
            extent : new esri.Geometry.Extent({"xmin":12230329.705939744,"ymin":2456819.707700946,"xmax":13098654.347259302,"ymax":2889147.539681881,"spatialReference":{"wkid":102113}})
        })
        this.loadBaseMap()
        var key = setInterval(() => {
            if (this.map.loaded === true) {
                clearInterval(key)
                // 绑定父级引用者
                this.loadMap(this.map)
            }
        }, 300)
        this.map.on('click', function(e) { console.log(e) })
        // 为地图添加工具
        // this.addUtil()
    },

    // 加载底图
    loadBaseMap() {
        this.baseMap = new esri.ArcGISTiledMapServiceLayer("https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer");
        //  this.createGgLayer()
        this.map.addLayer(this.baseMap)
    },

    createGgLayer() {
        dojo.declare('GoogleMapLayer', esri.TiledMapServiceLayer, { // create WMTSLayer by extending esri.layers.TiledMapServiceLayer
          constructor: function() {
            this.spatialReference = new esri.SpatialReference({
              wkid: 102113
            })
  
            this.fullExtent = new esri.Extent(-20037508.342787, -20037508.342787, 20037508.342787, 20037508.342787, this.spatialReference)
            // this.initialExtent = new esri.geometry.Extent(11501488.165446503, 3695866.152885527, 11678516.32295504, 3728734.075048165, this.spatialReference)
            this.initialExtent = new esri.Extent(14618082.998191215, 10704507.149991233, 4098580.096440325, 2374160.7383272075, this.spatialReference)
  
            this.tileInfo = new esri.TileInfo({
              'spatialReference': {
                'wkid': '3857'
              },
              'rows': 256,
              'cols': 256,
              'origin': {
                'x': -20037508.342787,
                'y': 20037508.342787
              },
              'lods': [{ 'level': 0, 'scale': 591657527.591555, 'resolution': 156543.033928
              }, { 'level': 1, 'scale': 295828763.795777, 'resolution': 78271.5169639999
              }, { 'level': 2, 'scale': 147914381.897889, 'resolution': 39135.7584820001
              }, { 'level': 3, 'scale': 73957190.948944, 'resolution': 19567.8792409999
              }, { 'level': 4, 'scale': 36978595.474472, 'resolution': 9783.93962049996
              }, { 'level': 5, 'scale': 18489297.737236, 'resolution': 4891.96981024998
              }, { 'level': 6, 'scale': 9244648.868618, 'resolution': 2445.98490512499
              }, { 'level': 7, 'scale': 4622324.434309, 'resolution': 1222.99245256249
              }, { 'level': 8, 'scale': 2311162.217155, 'resolution': 611.49622628138
              }, { 'level': 9, 'scale': 1155581.108577, 'resolution': 305.748113140558
              }, { 'level': 10, 'scale': 577790.554289, 'resolution': 152.874056570411
              }, { 'level': 11, 'scale': 288895.277144, 'resolution': 76.4370282850732
              }, { 'level': 12, 'scale': 144447.638572, 'resolution': 38.2185141425366
              }, { 'level': 13, 'scale': 72223.819286, 'resolution': 19.1092570712683
              }, { 'level': 14, 'scale': 36111.909643, 'resolution': 9.55462853563415
              }, { 'level': 15, 'scale': 18055.954822, 'resolution': 4.77731426794937
              }, { 'level': 16, 'scale': 9027.977411, 'resolution': 2.38865713397468
              }, { 'level': 17, 'scale': 4513.988705, 'resolution': 1.19432856685505
              }, { 'level': 18, 'scale': 2256.994353, 'resolution': 0.597164283559817
              }, { 'level': 19, 'scale': 1128.497176, 'resolution': 0.298582141647617
              }]
            })
            this.loaded = true
            this.onLoad(this)
          },
          getTileUrl: function(level, row, col) {
            var url = 'http://mt0.google.cn/vt/lyrs=s,h&hl=zh-CN&gl=cn&' +
              'x=' + col + '&' +
              'y=' + row + '&' +
              'z=' + level + '&s='
            return url
          }
        })
        return new GoogleMapLayer()
      },

    // 创建地图
    createMap: function (map) {
        this.map = map
        this.map.on('zoom-end', this.mao_zoom_end)
        this.map.on('click', this._clickMap)
        // 创建聚合专用的图层
        // this.groupLayer = new esri.layers.GraphicsLayer()
        // this.groupLayer.on('click', this.mapClick)
        // this.groupLayer.on('mouse-out', this.mouseout)
        // this.groupLayer.on('mouse-move', this.mousemove)
        // this.map.addLayer(this.groupLayer);
      },
    
}

export { mapInit , esri }