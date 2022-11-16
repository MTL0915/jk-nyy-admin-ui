<template>
  <div style="width:100%;height:100%">
    <div
      style="width:100%;height:100%"
      id="mapContainer"
    > </div>
    <img
      style=""
      :src='require("@/assets/img/gy/gy_point.png")'
    ></img>

    <comp-head
      :active='3'
      :videoCameraShow="false"
      :taskDivShow="false"
    ></comp-head>

    <comp-headPortrait
      ref='headPortrait'
      :deviceConfig='deviceConfig'
      :device='deviceData'
      :ws='ws'
    ></comp-headPortrait>

    <comp-unmanned
      ref='unmanned'
      :view='view'
      :deviceData='deviceData'
      :device_id='device_id'
      :ws='ws'
    ></comp-unmanned>
    <!-- 参数配置 -->
    <comp-config
      ref='config'
      :deviceConfig='deviceConfig'
      :device_id='deviceData.device_id'
      v-show='showConfigEdit'
    ></comp-config>
  </div>
</template>

<script>
import { loadCss, loadModules } from "esri-loader";
import gyStatus from './gyStatus';
import { getDetailById } from '@/api/equip'
import compHeadPortrait from '@/views/base/plan3d/components_unmanned/headPortrait'
import compConfig from '@/views/base/plan3d/config'
import compUnmanned from '@/views/base/plan3d/unmanned'
import compHead from '@/views/base/plan3d/components_drawLine/head'
import gy_pointImg from "@/assets/img/gy/gy_point.png";
// ws 
import ws from '@/views/base/plan3d/components_unmanned/noManOpt/Control.js'

export default {
  name: 'GyMap',
  components: { compHeadPortrait, compConfig, compUnmanned, compHead },
  data () {
    return {
      DOMAIN: process.env.DOMAIN,
      Map: null, //基础图层加载类
      SceneView: null,  //视图加载类
      TileLayer: null, //2D图层加载类
      IntegratedMeshLayer: null, //3D图层加载类
      Search: null,//搜索小部件类
      Polygon: null,//多边形类
      SimpleFillSymbol: null,//多边形特征描绘类
      Graphic: null,//几何类
      GraphicsLayer: null,//几何图层类

      pointGraphic: null,

      view: null,
      id: param.id, //设备id
      device_id: "",
      deviceData: {},
      ws: null,
      channelValue: [],
      property_values: {},
      sensorInfos: [],
      deviceWsUpdate: {},

      showConfigEdit: false,

      longitude: null,
      latitude: null
    }
  },
  mounted () {
  },
  computed: {
    data () {
      return null
    }
  },
  created () {
    // dom载入后触发
    if (this.id === undefined || this.id === "") {
      this.$message.error("设备Id无法为空！");
      return;
    }
    this.$nextTick(() => {
      this.initDeviceData();
    })
  },
  methods: {
    wsEventInit () {
      // 监听websocket上传
      this.ws.onupdateInfo = (data) => {
        window.ws_info = data.data;
        var info = data.data;
        // 收到上传信息将设备状态改为在线
        this.deviceData.status = 1;
        // 处理ws上报数据
        this.channelValue = info.channelValue;
        this.property_values = info.property_values;
        this.sensorInfos = info.sensorInfos;
        this.deviceWsUpdate = info;

        this.$refs.unmanned && this.$refs.unmanned.deviceWsUpdateFunction(info)
        this.$refs.headPortrait && this.$refs.headPortrait.deviceWsUpdateFunction(info)

        if (this.pointGraphic) {
          this.longitude = info.property_values.location[1];
          this.latitude = info.property_values.location[0];
          this.updateGeometry();
        }
      }

      this.ws.ondisupdateInfo = (data) => {
        // 如果是离线状态下 则不显示页面信息ui和控制ui
        this.$alert('该设备不在线', '提示', {
          confirmButtonText: '确定',
          callback: action => { }
        });
        // 收到上传信息将设备状态改为离线
        this.deviceData.state = 0;
        this.$refs.headPortrait && this.$refs.headPortrait.setPowerClose()
      }
    },
    initDeviceData () {
      getDetailById({ hd_device_id: this.id }).then((e) => {
        if (e.code == 500) {
          this.$message.error(e.msg);
        } else {
          this.device_id = e.data.device_id;
          this.ws = new ws(this.device_id)
          this.wsEventInit();
          // 设备经纬度
          var location = e.data.innerStatus.property_values.location;

          this.deviceData = e.data;

          var property_values = this.deviceData.innerStatus.property_values;
          var info = {
            channelValue: this.deviceData.sensor.map((e) => { return e.value * 1 }),
            controlType: property_values.controlType,
            device_id: this.deviceData.device_id,
            hd_device_id: this.deviceData.id,
            id: this.deviceData.id,
            property_values: property_values,
            sensorInfos: this.deviceData.sensor,
            state: 0,
          }
          // 将表示识别为离线
          property_values.state = 0;
          this.channelValue = info.channelValue;
          this.property_values = info.property_values;
          this.sensorInfos = info.sensorInfos;
          this.deviceWsUpdate = info;
          this.$refs.unmanned && this.$refs.unmanned.deviceWsUpdateFunction(info)
          this.$refs.headPortrait && this.$refs.headPortrait.deviceWsUpdateFunction(info)

          this.longitude = info.property_values.location[1];
          this.latitude = info.property_values.location[0];
          // 加载地图服务
          this.initMap();
        }
      })
    },
    initMap () {
      let protocol = location.protocol || "https:";
      // 加载Css
      let cssUrl = protocol + '//' + this.DOMAIN + '/arcgis_js_api4.16/esri/css/main.css';
      // let cssUrl = "https://js.arcgis.com/4.7/esri/css/main.css";

      loadCss(cssUrl);

      // 通过加载Js导入模块（类）
      let jsUrl = protocol + '//' + this.DOMAIN + '/arcgis_js_api4.16/init.js';
      // let jsUrl = "https://js.arcgis.com/4.7/";
      loadModules(["esri/Map", "esri/views/SceneView", "esri/layers/TileLayer", "esri/layers/IntegratedMeshLayer", "esri/widgets/Search",
        "esri/geometry/Polygon", "esri/symbols/SimpleFillSymbol", "esri/Graphic", "esri/layers/GraphicsLayer"], {
        url: jsUrl
      }).then((args) => {
        this.Map = args[0];
        this.SceneView = args[1];
        this.TileLayer = args[2];
        this.IntegratedMeshLayer = args[3];
        this.Search = args[4];
        this.Polygon = args[5];
        this.SimpleFillSymbol = args[6];
        this.Graphic = args[7];
        this.GraphicsLayer = args[8];

        // 加载基础图层
        var map = new this.Map({
          basemap: 'satellite'
        });

        map.basemap.load().then((e) => {
          this.onloadMapComplete();
        })

        // 通过视图将图层表达出来
        this.view = new this.SceneView({
          map: map,
          container: "mapContainer",
          scale: 50000000
        });

      });
    },

    // 当地图加载完成后
    onloadMapComplete () {
      // 去除默认小部件
      this.view.ui.components = [];

      // 加载2D高清地图图层
      // this.load2DLayer();
      // 加载3D高清地图图层
      // this.load3DLayer();

      // 视图加载点击事件
      this.loadClickEvent();

      // 添加搜索小部件
      // this.addSearchWidget();

      // 加载线路图层
      //this.loadLineLayer();

      // 标注轨道车位置
      // this.showDeviceLocation(113.3991172,23.1825082);
      this.showDeviceLocation(this.longitude, this.latitude);

      // 画出一条线
      var paths = [[113.3991137, 23.1824778], [113.3991139, 23.1824789], [113.3991140, 23.1824800], [113.3991142, 23.1824817], [113.3991144, 23.1824848], [113.3991147, 23.1824874], [113.3991150, 23.1824906], [113.3991152, 23.1824938], [113.3991154, 23.1824966], [113.3991158, 23.1824998], [113.3991160, 23.1825028], [113.3991165, 23.1825053], [113.3991172, 23.1825082], [113.3991181, 23.1825114], [113.3991191, 23.1825141], [113.3991199, 23.1825171], [113.3991209, 23.1825201], [113.3991220, 23.1825231], [113.3991229, 23.1825260], [113.3991238, 23.1825289], [113.3991246, 23.1825318], [113.3991253, 23.1825346], [113.3991265, 23.1825376], [113.3991276, 23.1825404], [113.3991286, 23.1825433], [113.3991297, 23.1825462], [113.3991308, 23.1825499], [113.3991320, 23.1825538], [113.3991333, 23.1825582], [113.3991348, 23.1825627], [113.3991363, 23.1825670], [113.3991376, 23.1825712], [113.3991390, 23.1825755], [113.3991406, 23.1825804], [113.3991420, 23.1825846], [113.3991440, 23.1825890], [113.3991459, 23.1825925], [113.3991483, 23.1825967], [113.3991507, 23.1826008], [113.3991532, 23.1826052], [113.3991554, 23.1826090], [113.3991577, 23.1826129], [113.3991602, 23.1826165], [113.3991632, 23.1826204], [113.3991659, 23.1826240], [113.3991688, 23.1826276], [113.3991719, 23.1826311], [113.3991753, 23.1826349], [113.3991789, 23.1826389], [113.3991826, 23.1826422], [113.3991870, 23.1826460], [113.3991916, 23.1826498], [113.3991957, 23.1826532], [113.3991999, 23.1826560], [113.3992048, 23.1826590], [113.3992096, 23.1826620], [113.3992139, 23.1826650], [113.3992184, 23.1826676], [113.3992231, 23.1826701], [113.3992281, 23.1826729], [113.3992330, 23.1826756], [113.3992385, 23.1826785], [113.3992430, 23.1826816], [113.3992484, 23.1826844], [113.3992535, 23.1826871], [113.3992581, 23.1826896], [113.3992630, 23.1826921], [113.3992685, 23.1826949], [113.3992735, 23.1826975], [113.3992785, 23.1827002], [113.3992837, 23.1827029], [113.3992880, 23.1827051], [113.3992929, 23.1827076], [113.3992983, 23.1827103], [113.3993033, 23.1827129], [113.3993076, 23.1827157], [113.3993121, 23.1827186], [113.3993164, 23.1827213], [113.3993220, 23.1827246], [113.3993261, 23.1827275], [113.3993306, 23.1827306], [113.3993354, 23.1827339], [113.3993402, 23.1827372], [113.3993442, 23.1827400], [113.3993485, 23.1827431], [113.3993531, 23.1827467], [113.3993576, 23.1827503], [113.3993614, 23.1827535], [113.3993656, 23.1827570], [113.3993701, 23.1827606], [113.3993746, 23.1827645], [113.3993780, 23.1827678], [113.3993819, 23.1827715], [113.3993861, 23.1827756], [113.3993902, 23.1827794], [113.3993937, 23.1827829], [113.3993973, 23.1827866], [113.3994014, 23.1827909], [113.3994054, 23.1827950], [113.3994091, 23.1827990], [113.3994123, 23.1828027], [113.3994159, 23.1828070], [113.3994191, 23.1828116], [113.3994219, 23.1828159], [113.3994238, 23.1828201], [113.3994262, 23.1828251], [113.3994280, 23.1828303], [113.3994297, 23.1828353], [113.3994312, 23.1828399], [113.3994325, 23.1828452], [113.3994337, 23.1828507], [113.3994345, 23.1828557], [113.3994348, 23.1828605], [113.3994348, 23.1828659], [113.3994346, 23.1828713], [113.3994340, 23.1828763], [113.3994332, 23.1828818], [113.3994327, 23.1828859]];
      //this.showDeviceTrail(paths);

      // 视图定位到指定经纬度
      this.view.goTo({
        center: [this.longitude, this.latitude],
        zoom: 20,
      })
    },
    showDeviceTrail (paths) {
      const polyline = {
        type: "polyline",
        paths: paths
      };
      const simpleLineSymbol = {
        type: "simple-line",
        color: [226, 119, 40], // Orange
        width: 2
      };

      const polylineGraphic = new this.Graphic({
        geometry: polyline,
        symbol: simpleLineSymbol
      });
      const graphicsLayer = new this.GraphicsLayer();
      graphicsLayer.add(polylineGraphic);
      this.view.map.add(graphicsLayer);
    },
    showDeviceLocation () {
      const graphicsLayer = new this.GraphicsLayer();

      const point = {
        type: "point",
        longitude: this.longitude,
        latitude: this.latitude
      }
      /*
      const simpleMarkerSymbol = {
        type: "simple-marker",
        color: [226, 119, 40],  // Orange
        outline: {
            color: [255, 255, 255], // White
            width: 1
        }
      }
      */
      var simpleMarkerSymbol = {
        type: "picture-marker",
        url: gy_pointImg,
        width: "32px",
        height: "32px"
      };
      this.pointGraphic = new this.Graphic({
        geometry: point,
        symbol: simpleMarkerSymbol
      });
      graphicsLayer.add(this.pointGraphic);

      this.view.map.add(graphicsLayer);

    },
    updateGeometry () {
      this.pointGraphic.symbol.angle = 45;
      this.pointGraphic.symbol = this.pointGraphic.symbol.clone();
      this.pointGraphic.geometry.longitude = this.longitude;
      this.pointGraphic.geometry.latitude = this.latitude;
      this.pointGraphic.geometry = this.pointGraphic.geometry.clone();
    },
    // 加载二维高清图层
    load2DLayer () {
      let layerUrl = "http://" + this.DOMAIN + "/arcgis3d/rest/services/Hosted/gdnyjstgzz/MapServer";
      let layer = new this.TileLayer(layerUrl, { id: "twoD_LayerId" });
      this.view.map.add(layer);
    },
    // 加载三维高清图层
    load3DLayer () {
      let layerUrl = "http://121.32.129.19:8100/arcgis3d//rest/services/Hosted/nyjstgz3/SceneServer";
      let layer = new this.IntegratedMeshLayer(layerUrl, { id: "threeD_LayerId" });
      this.view.map.add(layer);
    },
    // 视图加载点击事件
    loadClickEvent () {
      var view = this.view;
      view.on("click", (event) => {
        console.log(event.mapPoint);

        view.hitTest(event).then(function (hitTestResults) { // Search for features where the user clicked
          if (hitTestResults.results) {
            view.popup.open({ // open a popup to show some of the results
              location: event.mapPoint,
              title: "Hit Test Results",
              content: hitTestResults.results.length + "Features Found"
            });
          }
        })
      });
    },
    // 添加搜索小部件
    addSearchWidget () {
      var view = this.view;
      var searchWidget = new this.Search({
        view: view
      });

      view.ui.add(searchWidget, {
        position: "top-right"
      });
    },
    loadLineLayer () {

      var rings = [
        [113.39891844532, 23.183040220733],
        [113.3991116, 23.1824187],
        [113.3991109, 23.1823764],
        [113.39891844532, 23.183040220733]
      ];

      // 创建多边形
      var polygon = new this.Polygon({
        hasZ: true,
        hasM: true,
        rings: rings,
        spatialReference: { wkid: 4326 }
      });

      // 创建形式，用于描绘多边形
      var symbol = {
        // 表示类型
        type: "simple-fill",
        // 表示颜色 黑色
        color: [0, 0, 0, 0.9],
        // 表示填充类型 
        style: "solid",
        // 边线配置 白色的边框 宽度1
        outline: {
          color: "white",
          width: 1
        }
      }
      // 创建几何图
      var graphic = new this.Graphic({
        geometry: polygon,
        symbol: symbol,
        attributes: {}
      });

      var graphicsLayer = new this.GraphicsLayer({ id: "graphicsLayer" });
      graphicsLayer.add(graphic);
      var view = this.view;

      view.map.add(graphicsLayer);

    }

  }
}
</script>

<style lang="stylus" scoped>
.gyControlDiv
  position absolute
  bottom 10px
  left 10px

.contenBox
  position absolute
  top 0px
  bottom 0
  width 100%

.contenBox > *
  z-index 999
</style>