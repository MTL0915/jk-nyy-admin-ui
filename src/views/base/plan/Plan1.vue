<template>
  <div
    class="mapbox"
    id='est1'
  >
    <JKMap
      ref="map"
      :load="mapLoad"
      :mapParams='mapParam'
    />
  </div>
</template>

<script>

import jk from "@/utils/jiankun_map";
let mapconfig = require('@/map.config.js');
;
export default {
  data () {
    return {
      map: null,
      mapParam: mapconfig
    }
  },
  mounted () {

  },
  methods: {
    mapLoad (map) {

      this.map = map

      // 初始化范围
      this.mapExtent()

      // // 显示气象点
      this.showQiXiang()
    },

    mapExtent () {
      var extent = window.esri.geometry.Extent({ 'xmin': 12110479.86614036, 'ymin': 2417704.583298544, 'xmax': 13088873.828190567, 'ymax': 2900175.1058345526, 'spatialReference': { 'wkid': 102113 } })
      this.map.setExtent(extent)
    },

    // 显示全省气象信息 
    showQiXiang () {
      window.$.ajax({
        url: 'https://weather.cma.cn/api/map/alarm?adcode=44',
        success: (e) => {

          var layer = new window.esri.layers.GraphicsLayer({ id: 'test' })
          layer.on('click', (e) => {
            this.alertMap(e.graphic)
          })
          this.map.addLayer(layer)
          for (var i in e.data) {
            var it = e.data[i]
            var geometry = new window.esri.geometry.Point([it.longitude, it.latitude])
            geometry = window.esri.geometry.geographicToWebMercator(geometry)
            // require('@/assets/img/Plan/qixiang/'
            var symbol = new window.esri.symbol.PictureMarkerSymbol('http://data.cma.cn/dataGis/static/ultra/img/gis/disasterWarning/' + it.type + '.png', 32, 22)
            layer.add(new window.esri.Graphic(geometry, symbol, it))
          }
        }
      })
    },

    // 弹出框
    alertMap (graphic) {
      var info = this.map.infoWindow
      var attr = graphic.attributes
      info.setTitle(attr.headline)
      info.setContent(`
        <div style="padding: 15px 0;">${attr.effective}</div>
        <div style="line-height: 19px;text-indent: 2em;">${attr.description}</div>
      `)
      info.show(graphic.geometry)
    }
  }
}
</script>

<style>
.mapbox {
  height: calc(100% - 55px);
}
.mapbox .map {
  height: 100%;
}
.mapbox .esriPopup .sizer {
  width: 300px;
}
</style>
