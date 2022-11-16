<template>
  <div class="mapBox">
    <div id="mapCont" />
    <div id='sideBox'>
      <div></div>
      <div>-</div>
      <div>+</div>
    </div>
  </div>
</template>

<script>
import { loadCss, loadModules } from 'esri-loader'
import bus from './bus.js'
import ajaxApi from '@/api/map.js'
export default {
  name: 'MapVue',
  components: {

  },
  props: {
    p_gisModules: Array,
    p_basemap: String
  },
  data () {
    return {
      DOMAIN: process.env.DOMAIN,
      map: null,
      mapisLoad: false,
      // basemap : "https://183.62.243.20:8002/arcgis/rest/services/GDDLG/MapServer",
      // basemap : "bd",
      basemap: this.p_basemap || 'gg',
      // basemap : "https://'+this.DOMAIN+'/arcgis/rest/services/base/black_blue_4490/MapServer",
      // basemap : "https://121.32.129.19:8100/arcgis/rest/services/base/base_440232_vector/MapServer",
      // basemap : "https://121.32.129.19:8100/arcgis/rest/services/base/base_440232_vector2/MapServer",
      gisConstructor: {},
      // baseMap : null,
      gisModules: this.p_gisModules || [
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
        'dojo/_base/declare'
      ],
      // 等待地图加载的回应事件集合
      events: [],
      // 等待地图点击的回应事件集合
      layerClickEvents: [],
      // 加载的专题对象
      topics: []
    }
  },
  created: function () {
    bus.$on('map', this.busQuery)
    this.init()
  },
  beforeDestroy: function () {
    bus.$off('map', this.getData)
  },
  methods: {
    getMap (fn) {
      fn && fn(this.map)
      return this.map
    },
    busQuery (name, ...param) {
      return this[name] && this[name](...param)
    },
    showInfoWindow (graphic, param = {}) {
      var width = param.width || 300
      var height = param.height || 300
      var title = param.title || ''
      var url = param.url
      var map = this.map
      var dom = map.infoWindow.domNode
      var a = dom.querySelectorAll('.sizer,.contentPane')
      for (var i = 0; i < a.length; i++) {
        a[i].style.width = width + 'px'
        a[i].className.indexOf('contentPane') > -1 && (a[i].style.height = height + 'px')
      }
      dom.querySelector('.title')
      map.infoWindow.setTitle(title)
      map.infoWindow.setContent("<iframe style='width:100%;height:100%;border:none;' src='" + url + "'></iframe")
      map.infoWindow.show(graphic.geometry.x ? graphic.geometry : graphic.geometry.getCentroid())
    },
    // click
    init () {
      let http = location.protocol || "https:";
      // 加载css;
      loadCss(http + '//' + this.DOMAIN + '/arcgis_js_api/esri/css/esri.css')
      // 加载模块
      loadModules(this.gisModules, {
        url: http + '//' + this.DOMAIN + '/arcgis_js_api/init.js' // http://arcgis.biubu.cn/v326/init.js
      }).then(this.TDTinstance)
        .then(this.initMap)
    },
    TDTinstance (args) {
      esri.geometry.geometryEngine = args[0]
      for (const k in args) {
        const name = this.gisModules[k].split('/').pop()
        this.gisConstructor[name] = args[k]
      }
    },
    initMap (argus) {
      this.map = new esri.Map('mapCont', {
        logo: false,
        slider: true,
        // sliderPosition: 'bottom-right'
      })
      this.loadBaseMap()
      var key = setInterval(() => {
        if (this.map.loaded === true) {
          clearInterval(key)
          this.mapload()
          // 绑定父级引用者
          if (this.$parent) {
            this.$parent.initMap(this.map)
          }
        }
      }, 300)
      this.map.on('click', function (e) { console.log(e) })
      // 为地图添加工具
      this.addUtil()
    },

    // 添加绘制对象
    addUtil () {
      // 生成一个绘制对象保存map对象中
      this.map.draw = new this.gisConstructor.draw(this.map)
      // 为draw创建一个图层来
      this.map.draw.layer = this.createLayer('draw')
      // 计算绘制完成后的回调
      this.map.draw.oncomplete = null
      // 确认回调函数
      this.map.draw.on('draw-complete', (event) => {
        this.map.draw.deactivate()
        if (this.map.draw.oncomplete) {
          var fn = this.map.draw.oncomplete
          this.map.draw.oncomplete = null
          fn(event)
        }
      })
      this.map.edit = new this.gisConstructor.edit(this.map)
      this.map.edit.ondeactivate = null
      // 确认回调函数
      this.map.edit.on('deactivate', (event) => {
        if (this.map.edit.oncomplete) {
          var fn = this.map.edit.oncomplete
          this.map.edit.oncomplete = null
          fn(event)
        }
      })
    },
    editActive (graphic, fn) {
      // 先停止上一个操作
      this.map.edit.deactivate()
      fn && (this.map.edit.oncomplete = fn)
      this.map.edit.activate(2, graphic)
    },
    editClose (graphic, fn) {
      // 先停止上一个操作
      this.map.edit.deactivate()
    },
    drawActive (type, fn) {
      fn && (this.map.draw.oncomplete = fn)
      this.map.draw.activate(type)
    },
    // 加载底图
    loadBaseMap () {
      this.setBaseMap(this.basemap)
    },
    mapload () {
      this.mapisLoad = true
      // 运行回调函数 通知等待已经完成
      this.events.forEach((event) => { event() })
      // 清空等待回调
      this.events = []
    },
    load: function (call) {
      // 保存等待函数
      if (this.mapisLoad) {
        call()
      } else {
        this.events.push(call)
      }
    },
    // 修改地图
    setBaseMap (urlserver) {
      if (this.baseMap) {
        this.map.removeLayer(this.baseMap)
      }
      if (urlserver === 'bd') {
        this.baseMap = this.createBdLayer()
      } if (urlserver === 'gg') {
        this.baseMap = this.createGgLayer()
      } else {
        this.baseMap = new esri.layers.ArcGISTiledMapServiceLayer(urlserver)
      }
      this.map.addLayer(this.baseMap)
    },

    createGgLayer () {
      dojo.declare('GoogleMapLayer', esri.layers.TiledMapServiceLayer, { // create WMTSLayer by extending esri.layers.TiledMapServiceLayer
        constructor: function () {
          this.spatialReference = new esri.SpatialReference({
            wkid: 102113
          })

          this.fullExtent = new esri.geometry.Extent(-20037508.342787, -20037508.342787, 20037508.342787, 20037508.342787, this.spatialReference)
          // this.initialExtent = new esri.geometry.Extent(11501488.165446503, 3695866.152885527, 11678516.32295504, 3728734.075048165, this.spatialReference)
          this.initialExtent = new esri.geometry.Extent(14618082.998191215, 10704507.149991233, 4098580.096440325, 2374160.7383272075, this.spatialReference)

          this.tileInfo = new esri.layers.TileInfo({
            'spatialReference': {
              'wkid': '3857'
            },
            'rows': 256,
            'cols': 256,
            'origin': {
              'x': -20037508.342787,
              'y': 20037508.342787
            },
            'lods': [{
              'level': 0, 'scale': 591657527.591555, 'resolution': 156543.033928
            }, {
              'level': 1, 'scale': 295828763.795777, 'resolution': 78271.5169639999
            }, {
              'level': 2, 'scale': 147914381.897889, 'resolution': 39135.7584820001
            }, {
              'level': 3, 'scale': 73957190.948944, 'resolution': 19567.8792409999
            }, {
              'level': 4, 'scale': 36978595.474472, 'resolution': 9783.93962049996
            }, {
              'level': 5, 'scale': 18489297.737236, 'resolution': 4891.96981024998
            }, {
              'level': 6, 'scale': 9244648.868618, 'resolution': 2445.98490512499
            }, {
              'level': 7, 'scale': 4622324.434309, 'resolution': 1222.99245256249
            }, {
              'level': 8, 'scale': 2311162.217155, 'resolution': 611.49622628138
            }, {
              'level': 9, 'scale': 1155581.108577, 'resolution': 305.748113140558
            }, {
              'level': 10, 'scale': 577790.554289, 'resolution': 152.874056570411
            }, {
              'level': 11, 'scale': 288895.277144, 'resolution': 76.4370282850732
            }, {
              'level': 12, 'scale': 144447.638572, 'resolution': 38.2185141425366
            }, {
              'level': 13, 'scale': 72223.819286, 'resolution': 19.1092570712683
            }, {
              'level': 14, 'scale': 36111.909643, 'resolution': 9.55462853563415
            }, {
              'level': 15, 'scale': 18055.954822, 'resolution': 4.77731426794937
            }, {
              'level': 16, 'scale': 9027.977411, 'resolution': 2.38865713397468
            }, {
              'level': 17, 'scale': 4513.988705, 'resolution': 1.19432856685505
            }, {
              'level': 18, 'scale': 2256.994353, 'resolution': 0.597164283559817
            }, {
              'level': 19, 'scale': 1128.497176, 'resolution': 0.298582141647617
            }]
          })
          this.loaded = true
          this.onLoad(this)
        },
        getTileUrl: function (level, row, col) {
          var url = 'http://mt0.google.cn/vt/lyrs=s,h&hl=zh-CN&gl=cn&' +
            'x=' + col + '&' +
            'y=' + row + '&' +
            'z=' + level + '&s='
          return url
        }
      })
      return new GoogleMapLayer()
    },

    // 创建百度底图
    createBdLayer () {
      var gisEsri = this.gisConstructor
      return new gisEsri.declare(gisEsri.TiledMapServiceLayer,
        {// 构造函数
          constructor: function (properties) {
            this.spatialReference = new gisEsri.SpatialReference({
              wkid: 102113
            })
            // 图层提供的起始显示范围以及整个图层的地理范围
            this.fullExtent = new gisEsri.Extent(-20037508.342787, -20037508.342787, 20037508.342787, 20037508.342787, this.spatialReference)
            this.initialExtent = new gisEsri.Extent(5916776.8, 1877209.3, 19242502.6, 7620381.8, this.spatialReference)
            // 图层提供的切片信息
            this.tileInfo = new gisEsri.TileInfo({
              'rows': 256,
              'cols': 256,
              'compressionQuality': 0,
              'origin': {
                'x': -20037508.342787,
                'y': 20037508.342787
              },
              'spatialReference': {
                'wkid': 102113
              },
              'lods': [
                { 'level': 0, 'resolution': 156543.033928, 'scale': 591657527.591555 },
                { 'level': 1, 'resolution': 78271.5169639999, 'scale': 295828763.795777 },
                { 'level': 2, 'resolution': 39135.7584820001, 'scale': 147914381.897889 },
                { 'level': 3, 'resolution': 19567.8792409999, 'scale': 73957190.948944 },
                { 'level': 4, 'resolution': 9783.93962049996, 'scale': 36978595.474472 },
                { 'level': 5, 'resolution': 4891.96981024998, 'scale': 18489297.737236 },
                { 'level': 6, 'resolution': 2445.98490512499, 'scale': 9244648.868618 },
                { 'level': 7, 'resolution': 1222.99245256249, 'scale': 4622324.434309 },
                { 'level': 8, 'resolution': 611.49622628138, 'scale': 2311162.217155 },
                { 'level': 9, 'resolution': 305.748113140558, 'scale': 1155581.108577 },
                { 'level': 10, 'resolution': 152.874056570411, 'scale': 577790.554289 },
                { 'level': 11, 'resolution': 76.4370282850732, 'scale': 288895.277144 },
                { 'level': 12, 'resolution': 38.2185141425366, 'scale': 144447.638572 },
                { 'level': 13, 'resolution': 19.1092570712683, 'scale': 72223.819286 },
                { 'level': 14, 'resolution': 9.55462853563415, 'scale': 36111.909643 },
                { 'level': 15, 'resolution': 4.77731426794937, 'scale': 18055.954822 },
                { 'level': 16, 'resolution': 2.38865713397468, 'scale': 9027.977411 },
                { 'level': 17, 'resolution': 1.19432856685505, 'scale': 4513.988705 },
                { 'level': 18, 'resolution': 0.597164283559817, 'scale': 2256.994353 },
                { 'level': 19, 'resolution': 0.298582141647617, 'scale': 1128.497176 }
              ]
            })

            // 设置图层的loaded属性，并触发onLoad事件
            this.loaded = true
            this.onLoad(this)
          },

          getTileUrl: function (level, row, col) {
            var zoom = level - 1
            var offsetX = Math.pow(2, zoom)
            var offsetY = offsetX - 1
            var numX = col - offsetX
            var numY = (-row) + offsetY
            zoom = level + 1
            // var num = (col + row) % 8 + 1
            var url = 'http://online1.map.bdimg.com/tile/?qt=tile&x=' + numX + '&y=' + numY + '&z=' + zoom + '&styles=pl'
            return url
          }
        })()
    },
    // 添加图层
    addLayer: function (layer) {
      this.map.addLayer(layer)
    },

    // 创建面
    createPolygon (rings, symbol, info) {
      var point = new this.gisConstructor.Polygon(rings)
      // var _symbol = symbol || new this.gisConstructor.SimpleFillSymbol()
      return this.createGraphic(point, symbol, info)
    },

    // 创建点
    createPoint (x, y, symbol, info) {
      var point = new this.gisConstructor.Point([x * 1, y * 1])
      // var _symbol = symbol || new this.gisConstructor.SimpleMarkerSymbol()
      return this.createGraphic(point, symbol, info)
    },

    createGraphic (geometry, symbol, info) {
      if (this.map.spatialReference.wkid > 10000 && geometry.x < 500) {
        // var x = geometry.x
        // var y = geometry.y
        // var d = wandergis.wgs84togcj02(x, y)
        // d = wandergis.gcj02tobd09(d[0], d[1])

        /* 经纬度转墨卡托投影坐标*/
        var lonlatTomercator = function (lonlat) {
          var mercator = { x: 0, y: 0 }
          var x = lonlat.x * 20037508.34 / 180
          var y = Math.log(Math.tan((90 + lonlat.y) * Math.PI / 360)) / (Math.PI / 180)
          y = y * 20037508.34 / 180
          mercator.x = x
          mercator.y = y
          return mercator
        }

        var d = lonlatTomercator({ x: d[0], y: d[1] })

        geometry.spatialReference.wkid = '4326'
        geometry = esri.geometry.geographicToWebMercator(geometry)
      }
      geometry.spatialReference.wkid = this.map.spatialReference.wkid
      return new this.gisConstructor.graphic(geometry, symbol, info)
    },

    // 删除图层
    removeLayer: function (layer) {
      this.map.removeLayer(layer)
    },

    // 生成layer
    createLayer: function (id) {
      var layer = this.map.getLayer(id)
      if (!layer) {
        layer = this.gisConstructor.GraphicsLayer({ id })
        this.map.addLayer(layer)
      }
      layer.on('click', this.layerClick)
      return layer
    },

    // 所有的layer点击事件
    layerClick (argu) {
      if (typeof argu === 'function') {
        this.layerClickEvents.push(argu)
      } else {
        if (this.layerClickEvents.indexOf(argu) === -1) {
          this.layerClickEvents.forEach((event) => { event.apply(this, arguments) })
        }
        if (argu.graphic) {
          var layer = argu.graphic.getLayer()
          layer.onclick && layer.onclick(argu)
        }
      }
    },

    // 删除专题
    removeTopic: function () {
      var layers = this.map._layers
      for (var i in layers) {
        layers[i].layerType === 'topic' && this.map.removeLayer(layers[i])
      }
    },

    // 生成专题
    createTopicLayer: function (param) {
      // 创建图层容器
      var layer = this.createLayer(param.id)
      // 记录进入数据

      layer.layerType = 'topic'
      layer.param = param
      layer.clear()
      param.layerClick && (layer.onclick = param.layerClick.bind(param))
      // 根据专题类型创建图形
      if (param.type === 'point') {
        // 生成symbol
        var symbol = param.config.symbolType
        var config
        if (symbol === 'default') {
          config = param.symbol.default
          symbol = new this.gisConstructor.PictureMarkerSymbol(config.url, config.size, config.size)
        }
        param.getData((data) => {
          for (var i in param.data) {
            // 根据配置中的字段找到数据中对象的jd wd
            var x = param.data[i][param.config.jd]
            var y = param.data[i][param.config.wd]
            // 添加进入图层
            layer.add(this.createPoint(x, y, symbol, param.data[i]))
          }
        })
      } else if (param.type === 'polygon') {
        // var symbol = param.symbol
        var SimpleFillSymbol = this.gisConstructor.SimpleFillSymbol
        var SimpleLineSymbol = this.gisConstructor.SimpleLineSymbol
        var Color = this.gisConstructor.Color
        for (var i in symbol) {
          var it = symbol[i]
          var rings = it.rings
          if (it.type === 'solid') {
            var sfs = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
              new SimpleLineSymbol(it.lineStyle || 'solid',
                new Color(it.lineColor), it.lineWidth), new Color(it.color)
            )
            sfs.color.a = it.opacity / 100
            // 如果类型是填充渲染
          }
          layer.add(this.createPolygon(rings, sfs, param.data[i]))
        }
      }
    },

    centerAt (point, zoom) {
      this.map.setExtent(point._extent)
    },

    setJdByid (id) {

    },

  }
};

</script>

<style>
.mapBox {
  height: 100%;
  width: 100%;
}
#mapCont {
  height: 100%;
  width: 100%;
}
.mapBox .contentPane {
  max-height: 100% !important;
  box-sizing: border-box;
  padding: 0 !important;
}
.mapBox *::-webkit-scrollbar {
  width: 1px;
}

.mapBox .esriPopup .titlePane {
  background: #39bfb6;
  /* padding: 7px; */
}
.mapBox .esriPopup .titlePane .title {
  color: #ffffff;
  font-size: 18px;
}

.mapBox .esriPopup .titlePane .maximize {
  display: none;
}
</style>
