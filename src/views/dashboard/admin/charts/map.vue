<template>
  <div class="mapB">
    <JKMap
      ref="map"
      :load="mapLoad"
      :mapParams='mapConfig'
    />
  </div>
</template>

<script>
import ajaxApi from '@/api/map'
import jiankun from "@/utils/jiankun_map";
let mapConfig = require("@/map.config.js");
export default {
  data () {
    return {
      map: null,
      mapData: {
        jd: null
      },
      mapConfig: mapConfig
    }
  },
  mounted () {

  },
  props: {
    baseid: {
      type: String,
      default: null
    }
  },
  methods: {
    mapLoad (map) {
      //
      // 绑定map
      this.map = map;

      window.map_dash = map;

      this.map.setExtent( new esri.geometry.Extent({"xmin":12175485.69480905,"ymin":2392466.808282298,"xmax":13005897.570099164,"ymax":2720840.2817953993,"spatialReference":{"wkid":102113}}) )

      // 显示获取基地数据以及地块设备信息
      this.getData()
    },

    getData () {
      // 获取当前组织下的基地
      this.getMapJdByBs_org_id(() => {
        this.getDKByJDId(this.mapData.jd.option.id, (e) => {
          this.queryDevice(this.mapData.jd.option.id, () => {
            this.render()
          })
        })
      })
    },

    // 获取当前组织下的所有基地信息
    getMapJdByBs_org_id (call) {
      ajaxApi.getJDById(this.baseid ? this.baseid : this.$store.state.baseinfo.cur_base_id, (event) => {
        this.mapData.jd = {
          graphic: null, // 几何
          option: event.data, // 保存配置
          dk: null, // 地块合计
          sb: null,
          point: null // 中心点
        }

        call && call()
      })
    },

    // 根据基地获取地块
    getDKByJDId (jd_id, fn) {
      var jd = this.mapData.jd
      // 获取所有地块
      ajaxApi.getDKByJDId({ bs_base_id: jd_id }, (event) => {
        jd.dk = event.data.map((e) => {
          return {
            graphic: null,
            option: e
          }
        })
        fn && fn()
      })
    },

    // 根据基地获取设备
    queryDevice (jd_id, fn) {
      var jd = this.mapData.jd
      ajaxApi.queryDevice({ bs_base_id: jd_id, need_geometry: true, need_camera: true, size: 999 }, (event) => {
        jd.sb = event.data.content.map((e) => {
          return {
            graphic: null,
            option: e
          }
        })
        fn && fn()
      })
    },

    render () {
      this.render_jd()
      this.render_dk()
      this.render_sb()
    },

    render_jd () {
      var jd = this.mapData.jd
      // 根据基地的几何数据生成几何
      var jd_geometry = JSON.parse(jd.option.geometry)
      // 创建基地的layer
      var jd_layer = new window.esri.layers.GraphicsLayer({ id: 'jd' })
      this.map.addLayer(jd_layer)
      if (!jd_geometry) { return }
      // 添加创建几何
      var geometry = new window.esri.geometry.Polygon({ rings: jd_geometry.rings, spatialReference: this.map.spatialReference })
      // 进行渲染symbol

      var color = new window.esri.Color(jd_geometry.color)
      color.a = jd_geometry.opacity
      var symbol = new window.esri.symbol.SimpleFillSymbol(window.esri.symbol.SimpleFillSymbol.STYLE_SOLID,
        new window.esri.symbol.SimpleLineSymbol(window.esri.symbol.SimpleLineSymbol.STYLE_SOLID,
          new window.esri.Color(jd_geometry.lineColor), 1), color
      )
      var graphic = new window.esri.Graphic(geometry, symbol, jd.option)
      jd_layer.add(graphic)

      //   显示名称
      var textSymbol = new window.esri.symbol.TextSymbol(jd.option.name).setColor(
        new window.esri.Color([255, 255, 255])).setAlign(window.esri.symbol.Font.ALIGN_START).setFont(
          new window.esri.symbol.Font('8pt').setWeight(window.esri.symbol.Font.WEIGHT_BOLD))

      var textGraphic = window.esri.Graphic(graphic.geometry.getCentroid(), textSymbol)
      jd_layer.add(textGraphic)

      
      this.map.centerAndZoom(graphic.geometry.getCentroid(),16)
    },

    render_dk () {
      var dks = this.mapData.jd.dk
      // 创建基地的layer
      var layer = new window.esri.layers.GraphicsLayer({ id: 'dk' })
      this.map.addLayer(layer)
      for (var i in dks) {
        var dk = dks[i]
        // 根据基地的几何数据生成几何
        var dk_geometry = JSON.parse(dk.option.geometry_json);
        if (!dk_geometry) { continue; }
        // 添加创建几何
        var geometry = new window.esri.geometry.Polygon({ rings: dk_geometry.rings, spatialReference: this.map.spatialReference })
        var color = new window.esri.Color(dk_geometry.color)
        color.a = dk_geometry.opacity
        var symbol = new window.esri.symbol.SimpleFillSymbol(window.esri.symbol.SimpleFillSymbol.STYLE_SOLID,
          new window.esri.symbol.SimpleLineSymbol(window.esri.symbol.SimpleLineSymbol.STYLE_SOLID,
            new window.esri.Color(dk_geometry.lineColor), 1), color
        )
        var graphic = new window.esri.Graphic(geometry, symbol, dk.option)
        layer.add(graphic)

        //   显示名称
        var textSymbol = new window.esri.symbol.TextSymbol(dk.option.name).setColor(
          new window.esri.Color([255, 255, 255])).setAlign(window.esri.symbol.Font.ALIGN_START).setFont(
            new window.esri.symbol.Font('8pt').setWeight(window.esri.symbol.Font.WEIGHT_BOLD))

        var textGraphic = window.esri.Graphic(graphic.geometry.getCentroid(), textSymbol)
        layer.add(textGraphic)
      }
    },

    render_sb () {
      var sbs = this.mapData.jd.sb
      // 创建基地的layer
      var layer = new window.esri.layers.GraphicsLayer({ id: 'sb' })
      for (var i in sbs) {
        var sb = sbs[i]
        if (!sb.option.geometry_json) {
          continue
        }
        // 根据基地的几何数据生成几何
        var sb_geometry = JSON.parse(sb.option.geometry_json)
        this.map.addLayer(layer)
        // 添加创建几何
        var geometry = new window.esri.geometry.Point(sb_geometry.point, this.map.spatialReference)
        // 进行渲染symbol
        var symbol = new window.esri.symbol.PictureMarkerSymbol(require('@/assets/img/Plan/sbIcon/' + sb.option.hd_device_type_code + '_' + sb.option.state + '.png'), 24, 24)
        var graphic = new window.esri.Graphic(geometry, symbol, sb.option)
        layer.add(graphic)
      }
      jiankun.alertName.init(layer, `<div class='alertName'>\${attr.name}</div>`)
    }
  }
}
</script>

<style>
.map,
.mapB {
  height: 100%;
}
.map,
.mapB .mapBox {
  height: 100%;
  position: relative;
}
.map .alertName {
  background: #ffffff;
  color: #000000;
  border: solid 1px #eeeeee;
  padding: 8px 12px;
  border-radius: 4px;
  /* transform: translate(-50%, -50%); */
  transform: translate(-50%, -150%) !important;
}
</style>
