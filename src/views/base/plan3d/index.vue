<template>
  <div class="plan3d">
    <!-- <div id='map3d'></div> -->
    <JKMap3d
      :load="TDTinstance"
      id="map3d"
    ></JKMap3d>
    <!-- 左侧查询窗口 -->
    <pland-search
      ref="search"
      :restaurants="restaurants"
      :restaurants1="restaurants1"
      v-show="showSearch && !isCoverMode"
    ></pland-search>
    <!-- 上方的工具栏 -->
    <pland-toolbar
      :isBack="isBack"
      :callBack="callBack"
      v-show="!isCoverMode"
      ref="toolbar"
      :esri="esri"
      :view="view"
      :baseChange="baseChange"
      :typeChange="typeChange"
      :layerTypes="layerTypes"
    ></pland-toolbar>
    <!-- 下方的图层选择器 -->
    <pland-bottom
      ref="bottom"
      :isLight="isLight"
      v-show="!isCoverMode"
      :timeDate="timeDate"
      :modePanor="modePanor"
      :mode="mode"
      :view="view"
      :heading="heading"
      :changeBaseMap="changeBaseMap"
      :sceneList="panor"
      :changePanor="changePanor"
    ></pland-bottom>
    <!-- 显示地图弹窗 -->
    <div ref="dialogBox"></div>
    <!-- vr显示 -->
    <div
      v-show="vrUrl"
      class="vrBox"
    >
      <div
        class="vrClose"
        @click="vrClose"
      >退出</div>
      <iframe
        style="background: #00000000;border:none;"
        :src="vrUrl"
      />
    </div>
    <!-- 阻断滚轴事件 -->
    <div
      style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:999;"
      v-show="isCover"
    ></div>
    <!-- 设备信息列表 -->
    <!-- <pland-deviceInfo :view='view' :data='deviceInfo' v-show='isShowDeviceInfo'></pland-deviceInfo> -->
    <!-- 全部设备展示列表 -->
    <pland-showalldevice
      ref="showalldevice"
      v-if="isShowDeviceInfo"
      :change="showalldevice_changePage"
      :max="showalldevice_max"
      :count="showalldevice_count"
      :page="showalldevice_page"
      :datas="allDeviceData"
    ></pland-showalldevice>
    <!-- 全部基地展示列表 -->
    <pland-showallbase
      ref="showallbase"
      v-if="isShowBaseInfo"
      :max="showallbasemax"
      :change="showallbase_changePage"
      :datas="allBaseData"
    ></pland-showallbase>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { loadCss, loadModules } from "esri-loader";
import ajaxApi from "@/api/map";
import {
  getSensorByDeviceId,
  getWarnByBaseId,
  baseListByOrgId,
  getDeviceByUser
} from "@/api/map3d/index";
import { getByBaseId } from "@/api/rsPanorScene";
import plandSearch from "./components/search";
import plandToolbar from "./components/toolbar";
import plandBottom from "./components/bottom";
// import plandDeviceInfo from './components/deviceInfo'
import { parse } from "path-to-regexp";
import { map3d } from "@/utils/jiankun_map";

window.map3d = map3d;

import plandShowalldevice from "./components/showAllDevice";
import plandShowallbase from "./components/showAllBase";
// import equipJkl from '@/views/base/equip/module/EquipJkl'

window.refresh3dMap = function () { };

//打开全屏方法
window.openFullscreen = function (element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen();
  }
};

export default {
  components: {
    plandSearch,
    plandToolbar,
    plandBottom,
    plandShowalldevice,
    plandShowallbase
  },
  computed: {
    ...mapGetters(["id", "token", "user"])
  },
  props: {
    selectDk: {
      type: String,
      default: ""
    },
    base_id: {
      type: String,
      default: ""
    },
    isCoverMode: {
      type: Boolean,
      default: false
    },
    // 退出回调函数 一般用于访问设置退出
    isBack: {
      type: Boolean,
      default: false
    },
    callBack: {
      type: Function,
      default: function () { }
    }
  },
  data () {
    return {
      // 选择的地块 一般用于默认选中地块 从其他页面跨过来的时候
      // selectDk: "",
      // base_id : "",
      base: [],
      panor: [],
      // 存放全部几何资源 用于查找和清除
      graphic: [],
      // 所有图层的
      graphicLayers: [],
      // 显示聚合图层
      graphicLayersJuHe: [],
      // 地块名称的图层
      graphicLayersName: [],
      // 设备名称的图层
      graphicLayersDeviceName: [],
      // 显示提示标注图层
      graphicLayerMake: [],
      // 显示浮窗graphic
      dialogGraphic: [],
      // 显示预警信息的Graphic
      warnGraphic: [],
      // 预警信息缓存
      warnList: [],
      // 加载的高清图
      layerHD: [],
      // 加载的3d模型图
      layer3d: [],
      // 保存所有图层类型的
      types: [],
      layerTypes: [],
      vrUrl: "",
      vrShow: false,
      restaurants: [],
      restaurants1: [],
      heading: 0,
      // 显示模式 2d还是3d
      mode: 2,
      // 如果点击了全景
      modePanor: false,
      // 进入了全景的状态
      isPanor: false,
      // 遮罩
      isCover: false,
      // 显示日光配置按钮
      isLight: false,
      // 显示
      showSearch: true,
      // 显示设备信息弹窗
      isShowDeviceInfo: false,
      // 显示基地信息弹窗
      isShowBaseInfo: false,
      //显示的设备id
      sbid: "ff808081742f080d01742f6c5c5f005e",
      // 显示设备分布的数据
      deviceInfo: [],
      // 获取的全部基地数据
      allBaseData: [],
      // 获取的全部设备数据
      allDeviceData: [],

      showalldevice_max: 10,
      showalldevice_count: 5,
      showalldevice_page: 1,

      showallbaseareaid: "",
      showallbasesort: "",
      showallbasepage: 1,
      showallbasemax: 10
    };
  },

  mounted () {
    this.$router.history.current.query.isCoverMode &&
      (this.isCoverMode = JSON.parse(
        this.$router.history.current.query.isCoverMode
      ));
    this.$router.history.current.query.isBack &&
      (this.isBack = JSON.parse(this.$router.history.current.query.isBack));
    this.$router.history.current.query.base_id &&
      (this.base_id = this.$router.history.current.query.base_id);
    this.$router.history.current.query.selectDk &&
      (this.selectDk = this.$router.history.current.query.selectDk);

    window.refresh3dMap = function () {
      this.baseChange(this.base_id);
    }.bind(this);
  },

  methods: {
    map3dLoad (view) { },
    TDTinstance (view) {
      // this.timeDate = view.environment.lighting.date.getHours();

      // 加载测量数据
      map3d.Util.measure().then(ret => {
        this.measure = ret;
      });

      // 添加事件控制
      // setTimeout(()=>{
      //     view.environment.lighting.directShadowsEnabled = true;
      //     view.environment.lighting.date = new Date();
      // },5000)

      var view = (this.view = window.view = view);
      this.esri = map3d.esri;
      view.watch("zoom", () => {
        // 判断是否显示名称
        this.panduanIsShowName();
        // 判断是否显示提示标注
        this.panduanIsShowMake();
        // 判断是否显示聚合
        this.panduanIsShowJuHe();
      });

      // 监听摄像头的变化
      view.watch("camera", camera => {
        if (this.heading != camera.heading) {
          this.heading = -1 * camera.heading;
        }
        // 判断是否显示名称
        this.panduanIsShowName();
        // 判断dialog浮动窗
        this.panduanIsDialog();
      });

      view.on(
        "mouse-wheel",
        e => {
          // 判断是否进入全景Vr 缩小的时候触发
          e.deltaY < 0 && this.panduanIsShowPanor(e);
        },
        false
      );

      view.on("click", event => {
        console.log(event.mapPoint);
        view.hitTest(event).then(response => {
          if (response.results[0]) {
            var graphic = response.results[0].graphic;
            if (graphic.attributes.pointType === "地块") {
              view
                .goTo({
                  target: graphic.geometry.extent,
                  zoom: 19
                })
                .then(() => {
                  if (this.modePanor) {
                    if (!this.findPanor(graphic)) {
                      // 如果不存在全景 则继续显示地块内容
                      this.$refs.search.dkId = graphic.attributes.id;
                    }
                  } else {
                    this.$refs.search.dkId = graphic.attributes.id;
                  }
                });
            } else if (graphic.attributes.pointType === "全景") {
              // 先关闭全景感应
              this.isPanor = true;
              this.vrCloseCamera = view.camera.clone();
              // 存在点 先执行入场动画
              view
                .goTo({
                  position: {
                    longitude: graphic.geometry.longitude,
                    latitude: graphic.geometry.latitude,
                    z: 80
                  },
                  tilt: 0
                })
                .then(() => {
                  view
                    .goTo({
                      tilt: 90
                    })
                    .then(() => {
                      this.isPanor = false;
                      this.changePanor(graphic.attributes, {
                        tilt: 90,
                        heading: this.view.camera.heading
                      });
                    });
                });
            } else if (graphic.attributes.pointType === "设备") {
              this.showDialogDevice(graphic);
              return;
            }
          }
        });
      });
      this.loadTopic();
    },

    // 刷新自己
    refresh3dMap () { },

    baseChange (id, i) {
      // 清除掉原本的基地显示
      this.clearTopic();
      // 重置图层类型
      this.types = [];
      // 重置显示
      this.graphicLayers.forEach(e => {
        e.visible = true;
      });
      // 隐藏搜索框
      this.$refs.search.isSearch = false;
      // 显示左侧搜索列表 因为显示全部可能会关闭
      this.showSearch = true;
      // 关闭显示全部设备的界面
      this.isShowDeviceInfo = false;
      // 清空全景列表
      this.panor = [];
      // 如果传入的id为全部 则显示全部基地位置图形
      if (id === "all") {
        // 将基地选择标注为全部
        this.$refs.toolbar.base = "all";
        this.$refs.toolbar.name = "全部";
        this.showSearch = false;
        this.isShowDeviceInfo = false;
        this.isShowBaseInfo = true;
        setTimeout(() => {
          this.showallbasepage = 0;
          // 刷新数据显示
          this.showAllBase(() => {
            setTimeout(() => {
              this.$refs.showallbase.setPage(1);
            }, 100);
          });
        });
        return;
      }
      // 如果传入的id为全部 则显示全部基地位置图形
      if (id === "allDevice") {
        this.$refs.toolbar.base = "all";
        this.$refs.toolbar.name = "全部";
        this.showSearch = false;
        this.isShowBaseInfo = false;
        this.isShowDeviceInfo = true;
        setTimeout(() => {
          this.showalldevice_page = 1;
          // 刷新数据显示
          this.showAllDevice(() => {
            setTimeout(() => {
              this.$refs.showalldevice.setPage(1);
            }, 100);
          });
        });
        return;
      }
      this.showSearch = true;
      this.isShowDeviceInfo = false;
      this.isShowBaseInfo = false;
      this.$refs.toolbar.topic = "";
      // 修改基地id
      this.base_id = id;
      // 从新渲染基地
      this.loadTopic();
    },

    showalldevice_changePage (i) {
      //
      // this.$refs.showalldevice.setPage(i);
      // this.baseChange("allDevice");
      // 清除掉原本的基地显示
      this.clearTopic();
      // 重置图层类型
      this.types = [];
      // 重置显示
      this.graphicLayers.forEach(e => {
        e.visible = true;
      });
      // 隐藏搜索框
      this.$refs.search.isSearch = false;
      // 显示左侧搜索列表 因为显示全部可能会关闭
      this.showSearch = true;
      // 关闭显示全部设备的界面
      this.isShowDeviceInfo = false;
      // 清空全景列表
      this.panor = [];
      this.$refs.toolbar.base = "all";
      this.$refs.toolbar.name = "全部";
      this.showSearch = false;
      this.showalldevice_page = i;
      this.isShowDeviceInfo = true;
      setTimeout(() => {
        // this.$refs.showalldevice.setPage(1);
        // 刷新数据显示
        this.showAllDevice();
      });
      return;
    },

    showAllDevice (fn) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      var json = {
        count: 0,
        page: this.showalldevice_page - 1,
        size: 10,
        sort: [],
        shi_area_id: this.$refs.showalldevice.shi || "",
        keyword: this.$refs.showalldevice.filter_key || "",
        bs_base_id: this.$refs.showalldevice.base_id || "",
        customStatus: this.$refs.showalldevice.device_status
      };
      // 获取所有设备的位置
      getDeviceByUser(json).then(e => {
        this.allDeviceData = e.data;
        this.showalldevice_max = parseInt(e.page.count / 10) + 1;
        fn && fn();
        // this.$refs.showalldevice.setPage(1);
        loading.close();
        // 记录已经出现的基地id
        var baseIds = [];
        var data = e.data;
        var ary = {
          states1: [],
          states2: [],
          states3: []
        };
        for (var i in data) {
          var it = data[i];
          ary["states" + it.state] && ary["states" + it.state].push(it);
          if (!it.longitude || !it.latitude) continue;
          var p = JSON.parse(it.geometry_json);
          if (!p) continue;
          p = this.mercatorTolonlat(p.point);
          // p = [it.longitude*1, it.latitude*1];
          // var point = { type: "point", longitude: p[0], latitude: p[1] , spatialReference: { wkid: 102100 } };
          var point = {
            type: "point",
            x: p[0],
            y: p[1],
            spatialReference: { wkid: 102100 }
          };
          // var markerSymbol = { type: "simple-marker", color: [226, 119, 40],outline: {color: [255, 255, 255],width: 2}};
          var markerSymbol = {
            type: "picture-marker", // autocasts as new PictureMarkerSymbol()
            url: require("@/assets/img/Plan/sbIcon/" +
              it.hd_device_type_code +
              "_" +
              it.state +
              ".png"),
            width: 16,
            height: 16
          };
          var polygonGraphic = new this.esri.Graphic({
            geometry: point,
            symbol: markerSymbol,
            attributes: {
              pointType: "设备",
              ...it
            }
          });
          this.addGraphics(polygonGraphic, "全部设备", "地块名称");
          it.graphic = polygonGraphic;
          // 创建名称
          var point = polygonGraphic.geometry.clone();
          point.z = 40;

          // 创建symbol
          var symbol = {
            type: "text", // autocasts as new TextSymbol()
            color: "white",
            haloColor: "black",
            haloSize: "1px",
            text: it.name,
            xoffset: 0,
            yoffset: 0,
            font: {
              // autocasts as new Font()
              size: 8,
              family: "Josefin Slab",
              weight: "bold"
            }
          };
          var polygonGraphic = new this.esri.Graphic({
            geometry: point,
            symbol: symbol,
            attributes: it
          });
          var layer = this.addGraphics(
            polygonGraphic,
            it.hd_device_type_name + "_name",
            "地块名称"
          );
          layer.parentLayerName = it.hd_device_type_name;
          it.graphicName = polygonGraphic;

          // 创建聚合点
          var point = baseIds.find(e => {
            return e.attributes.id === it.bs_base_id;
          });
          if (point) {
            point.symbol.text = point.symbol.text * 1 + 1;
            // 如果存在聚合点则数量+1
          } else {
            // 如果不存在聚合点则创建新的聚合点
            var point = {
              type: "point",
              x: p[0],
              y: p[1],
              spatialReference: { wkid: 102100 }
            };
            var markerSymbol = {
              type: "text", // autocasts as new TextSymbol()
              color: "white",
              haloColor: "black",
              haloSize: "1px",
              text: 1,
              xoffset: 0,
              yoffset: 0,
              font: {
                // autocasts as new Font()
                size: 8,
                family: "Josefin Slab",
                weight: "bold"
              }
            };
            var polygonGraphic = new this.esri.Graphic({
              geometry: point,
              symbol: markerSymbol,
              attributes: {
                id: it.bs_base_id
              }
            });
            this.addGraphics(polygonGraphic, "设备聚合点", "聚合");
            polygonGraphic.click = function (e) {
              view.goTo({ target: e.geometry, zoom: 19 });
            };
            baseIds.push(polygonGraphic);
            var point = {
              type: "point",
              x: p[0],
              y: p[1],
              spatialReference: { wkid: 102100 }
            };
            var markerSymbol = {
              type: "picture-marker",
              url: require("@/assets/img/Plan/juhe.png"),
              width: 32,
              height: 48
            };
            var polygonGraphic = new this.esri.Graphic({
              geometry: point,
              symbol: markerSymbol,
              attributes: {
                id: it.bs_base_id
              }
            });
            polygonGraphic.click = function (e) {
              view.goTo({ target: e.geometry, zoom: 19 });
            };
            this.addGraphics(polygonGraphic, "设备聚合点", "聚合");
          }
        }
        // 赋值列表
        // this.deviceInfo = ary;

        // 将视角调整到国内区域
        view.goTo({
          position: {
            spatialReference: { latestWkid: 3857, wkid: 102100 },
            x: 11842626.453888904,
            y: 3509349.7170162597,
            z: 5536204.441273296
          },
          heading: 0,
          tilt: 0.2676745938573489
        });
      });
    },

    showallbase_changePage (i) {
      //
      // this.$refs.showalldevice.setPage(i);
      // this.baseChange("allDevice");
      // 清除掉原本的基地显示
      this.clearTopic();
      // 重置图层类型
      this.types = [];
      // 重置显示
      this.graphicLayers.forEach(e => {
        e.visible = true;
      });
      // 隐藏搜索框
      this.$refs.search.isSearch = false;
      // 显示左侧搜索列表 因为显示全部可能会关闭
      this.showSearch = true;
      // 关闭显示全部设备的界面
      this.isShowDeviceInfo = false;
      // 清空全景列表
      this.panor = [];
      this.$refs.toolbar.base = "all";
      this.$refs.toolbar.name = "全部";
      this.showSearch = false;
      this.showallbasepage = i;
      this.isShowDeviceInfo = true;
      setTimeout(() => {
        // this.$refs.showalldevice.setPage(1);
        // 刷新数据显示
        this.showAllBase();
      });
      return;
    },

    // 显示全部基地
    showAllBase (fn) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      var json = {
        page: this.showallbasepage,
        size: 10,
        orderSort: this.$refs.showallbase.sort,
        shi_area_id: this.$refs.showallbase.shi,
        keyword: this.$refs.showallbase.filter_key
      };
      // this.showallbasesort && ( json.orderSort = this.showallbasesort )
      // this.showallbasesort && ( json.shi_area_id = this.showallbaseareaid )

      // 获取所有基地的位置
      baseListByOrgId(json).then(e => {
        loading.close();
        var data = e.data.data;
        this.allBaseData = data;
        // 修改基地分页的最大值
        this.showallbasemax = parseInt(e.data.count / 10) + 1;
        fn && fn();
        // 绑定基地数据 删选掉其中没有基地几何的基地
        data = data.filter(e => {
          return e.geometry;
        });
        // 將基地的数据转换为json
        // this.allBaseData =
        data.forEach(e => {
          e.geometry = JSON.parse(e.geometry);
        });
        var graphics = [];
        // 将几何全部渲染出点展示
        for (var i in data) {
          // 创建几何
          var geometry = map3d.Util.createPolygon({
            rings: data[i].geometry.rings,
            spatialReference: this.view.spatialReference
          });
          // 获取中心点
          var point = geometry.geometry.centroid;
          var xy = [point.x, point.y];
          // 创建点
          point = map3d.Util.createImgPoint({
            xy: xy,
            spatialReference: this.view.spatialReference,
            img: require("@/assets/img/Plan/biaoshi.png"),
            data: data[i]
          });

          var json = point.toJSON();
          graphics.push([point.geometry.x, point.geometry.y]);
          point.click = e => {
            this.baseChange(e.attributes.id);
            this.$refs.toolbar.name = e.attributes.name;
            this.$refs.toolbar.base = e.attributes.id;
          };
          map3d.Util.addGraphic(point, "全部基地");
          // // 创建名称
          // point = map3d.Util.createTextPoint({
          //     xy: [xy[0], xy[1], 50],
          //     spatialReference: this.view.spatialReference,
          //     text: "测试标题",
          //     data: data[i],
          //     // is3d: true
          // });

          // map3d.Util.addGraphic( point , "全部基地" );
        }

        var polygon = map3d.Util.createPolygon({
          rings: graphics,
          spatialReference: this.view.spatialReference
        });

        this.view.goTo({
          target: polygon.geometry
        });
      });
    },

    // 获取全部数据

    // 可显示类型变化
    typeChange (array) {
      this.graphicLayers.forEach(e => {
        if (array.indexOf(e.id) > -1) {
          e.visible = true;
        } else {
          e.visible = false;
        }
      });
    },

    // 切换底图
    changeBaseMap (type) {
      // 切换底图的地址
      this.view.map.basemap = type;
      // 获取基地graphic
      var layer = this.view.map.findLayerById("基地");
      var graphic = layer.graphics.items[0];
      if (graphic && graphic.symbol) {
        // 修改基地的边线 在印象图中的时候是不存在边线的  在矢量图中添加边线
        if (type === "topo") {
          graphic.symbol.color.a = 0.25;
          graphic.symbol.outline.color.a = 1;
          graphic.symbol = graphic.symbol.clone();
        } else {
          graphic.symbol.color.a = 0;
          graphic.symbol.outline.color.a = 0;
          graphic.symbol = graphic.symbol.clone();
        }
      }
    },

    // 选择显示vr
    changePanor (it, camera = "") {
      // 如果是全景状态则不允许进入
      if (this.isPanor) {
        return;
      }
      if (camera) {
        camera = `&camera={lon:${camera.heading !== undefined ? camera.heading : "''"
          },lat:${camera.tilt !== undefined ? camera.tilt - 90 : "''"}}`;
      }
      // 标注好是在全景状态
      this.isPanor = true;
      // 判断角度
      this.vrUrl =
        "./vr?isAnimate=false&dk=" +
        it.id +
        "&panorId=" +
        it.rsPanorId +
        "&sceneId=" +
        it.id +
        camera;
    },

    // 清除基地地图资源
    clearTopic () {
      // 清楚集合圖層
      this.graphicLayers.forEach(e => {
        e.removeAll();
      });
      this.graphicLayersName.forEach(e => {
        e.removeAll();
      });
      this.graphicLayersDeviceName.forEach(e => {
        e.removeAll();
      });
      this.graphicLayerMake.forEach(e => {
        e.removeAll();
      });
      this.graphicLayersJuHe.forEach(e => {
        e.removeAll();
      });
      // 删除高清图
      this.removeLayerHD();
      // 清除3d模型图
      this.removeLayer3d();
      // 删除零食存放点
      this.graphicsLayer && this.graphicsLayer.removeAll();
      // 清除信息浮层
      this.hideDeviceInfo();
      // 清除预警动画
      this.unwarn();
      // 清除显示全部的图层
      var layer = this.view.map.findLayerById("全部基地");
      if (layer) {
        layer.removeAll();
      }
    },

    // 加载资源地图全貌
    loadTopic () {
      // 加载地图
      this.loadBase();
      // 显示基地信息
      this.$refs.search.baseId = this.base_id;
    },

    // 退出Vr
    vrClose () {
      setTimeout(() => {
        this.isPanor = false;
      }, 1000);
      this.vrUrl = "";
      this.vrCloseCamera && this.view.goTo(this.vrCloseCamera);
      this.vrCloseCamera = null;
    },

    // 全图视角
    mapExtent (extent) {
      if (!this.mapJdExtent) return;
      this.view
        .goTo({
          target: this.mapJdExtent,
          tilt: 0,
          zoom: this.view.zoom
        })
        .then(() => {
          this.view.goTo(extent ? { target: extent } : { zoom: 17.3 });
        })
        .catch(function (error) {
          if (error.name != "AbortError") {
            console.error(error);
          }
        });
    },

    // 加载基地
    loadBase () {
      var id = this.base_id;
      ajaxApi.getJDById(id || this.$store.state.baseinfo.cur_base_id, event => {
        event.data.geometry =
          typeof event.data.geometry === "string"
            ? JSON.parse(event.data.geometry)
            : event.data.geometry;
        // 保存基地信息
        this.base = event.data;
        // 生成遮罩
        this.toCover();
        // 加载基地图形
        this.createJD();
        // 加载地块
        this.loadPlot();
      });
    },

    // 判断是否存在数据
    isBaseGeometry () {
      return !!this.base.geometry;
    },

    // 加载基地的几何
    createJD () {
      // 判断是否存在基地
      if (!this.isBaseGeometry() && false) {
        this.$confirm(
          "没有检测到地图规划，是否跳转到绘制界面进行编辑",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            location.href = "./map?mode=false&base_id=" + this.base_id;
          })
          .catch(() => { });
        return;
      }

      // 获取保存的几何数据
      var json =
        typeof this.base.geometry === "string"
          ? JSON.parse(this.base.geometry)
          : this.base.geometry;
      if (!json) return;
      var rings = json.rings[0].map(e => {
        return this.mercatorTolonlat(e);
      });
      // 创建几何图形
      var polygon = {
        type: "polygon",
        rings: rings,
        spatialReference: { wkid: 102100 }
      };
      // 颜色
      var color = new this.esri.Color(json.color);
      color.a = 0; // || json.opacity;
      var fillSymbol = {
        type: "simple-fill",
        color: color,
        outline: { color: [255, 255, 255], width: 1 }
      };
      var polygonGraphic = new this.esri.Graphic({
        geometry: polygon,
        symbol: fillSymbol,
        attributes: this.base
      });
      this.mapJdExtent = polygonGraphic.geometry.extent;
      this.addGraphics(polygonGraphic, json.type, "地块");

      // 判断模式创建3d地图
      if (this.mode === 3) {
        this.to3D();
      }

      // 创建高清底图
      this.toHD();
    },

    loadPlot () {
      var id = this.base_id;
      ajaxApi.getDKByJDId(
        { bs_base_id: id || this.$store.state.baseinfo.cur_base_id },
        event => {
          this.plot = event.data;
          // 创建地块图形
          this.createPlot();
          // 加载设备
          this.loadDevice();
        }
      );
    },

    // 加载地块
    createPlot () {
      var data = this.plot;
      this.restaurants = data.map(e => {
        e.value = e.name;
        return e;
      });
      var graphics = [];
      for (var i in data) {
        var it = data[i];
        var json =
          typeof it.geometry_json === "string"
            ? JSON.parse(it.geometry_json)
            : it.geometry_json;
        if (!json) continue;
        var rings = json.rings[0].map(e => {
          return this.mercatorTolonlat(e);
        });
        // 创建几何图形
        var polygon = {
          type: "polygon",
          rings: rings,
          spatialReference: { wkid: 102100 }
        };
        var color = new this.esri.Color(json.color || "#ffffff");
        color.a = json.opacity;
        var fillSymbol = {
          type: "simple-fill",
          color: color,
          outline: { color: [255, 255, 255], width: 1 }
        };
        var polygonGraphic = new this.esri.Graphic({
          geometry: polygon,
          symbol: fillSymbol,
          attributes: {
            pointType: "地块",
            ...it
          }
        });
        this.addGraphics(polygonGraphic, "地块", "地块"); //json.type

        // 创建名称
        var point = polygonGraphic.geometry.centroid.clone();
        // 创建symbol
        var symbol = {
          type: "text", // autocasts as new TextSymbol()
          color: "white",
          haloColor: "black",
          haloSize: "1px",
          text: it.name,
          xoffset: 3,
          yoffset: 3,
          font: {
            // autocasts as new Font()
            size: 8,
            family: "Josefin Slab",
            weight: "bold"
          }
        };
        var polygonGraphic = new this.esri.Graphic({
          geometry: point,
          symbol: symbol,
          attributes: it
        });
        this.addGraphics(polygonGraphic, json.type + "_name", "地块名称");
      }
      // 加载预警信息  实现预警提示
      this.refreshWarnInfo();
      // 判断是否有默认选中地块
      if (this.selectDk) {
        // 获取地块图层
        var layer = this.view.map.findLayerById("地块");
        var graphic = layer.graphics.items.find(e => {
          return e.attributes.id === this.selectDk;
        });
        // 如果存在这个地块
        if (graphic) {
          this.mapExtent(graphic.geometry.extent);
          return;
        }
      }
      // 开始调整地图视角
      this.mapExtent();
    },

    // 加载设备
    loadDevice () {
      var id = this.base_id;
      ajaxApi.queryDevice(
        {
          bs_base_id: id || this.$store.state.baseinfo.cur_base_id,
          need_geometry: true,
          need_camera: true,
          size: 999
        },
        event => {
          this.device = event.data.content;
          this.CreateDevice();
          // 加載全景
          this.loadPanor();
        }
      );
    },

    // 加载设备图片
    CreateDevice () {
      var graphics = [];
      var data = this.device;
      this.restaurants1 = data.map(e => {
        e.value = e.name;
        return e;
      });
      for (var i in data) {
        var it = data[i];
        if (!it.longitude || !it.latitude) continue;
        var p = JSON.parse(it.geometry_json);
        if (!p) continue;
        p = this.mercatorTolonlat(p.point);
        // p = [it.longitude*1, it.latitude*1];
        // var point = { type: "point", longitude: p[0], latitude: p[1] , spatialReference: { wkid: 102100 } };
        var point = {
          type: "point",
          x: p[0],
          y: p[1],
          spatialReference: { wkid: 102100 }
        };
        // var markerSymbol = { type: "simple-marker", color: [226, 119, 40],outline: {color: [255, 255, 255],width: 2}};
        var markerSymbol = {
          type: "picture-marker", // autocasts as new PictureMarkerSymbol()
          url: require("@/assets/img/Plan/sbIcon/" +
            it.hd_device_type_code +
            "_" +
            it.state +
            ".png"),
          width: 16,
          height: 16
        };
        var polygonGraphic = new this.esri.Graphic({
          geometry: point,
          symbol: markerSymbol,
          attributes: {
            pointType: "设备",
            ...it
          }
        });
        this.addGraphics(polygonGraphic, it.hd_device_type_name, "地块");

        // 创建名称
        var point = polygonGraphic.geometry.clone();
        // 创建symbol
        var symbol = {
          type: "text", // autocasts as new TextSymbol()
          color: "white",
          haloColor: "black",
          haloSize: "1px",
          text: it.name,
          xoffset: 0,
          yoffset: 0,
          font: {
            // autocasts as new Font()
            size: 8,
            family: "Josefin Slab",
            weight: "bold"
          }
        };
        var polygonGraphic = new this.esri.Graphic({
          geometry: point,
          symbol: symbol,
          attributes: it
        });
        var layer = this.addGraphics(
          polygonGraphic,
          it.hd_device_type_name + "_name",
          "设备名称"
        );
        layer.parentLayerName = it.hd_device_type_name;
      }
      // this.view.graphics.addMany(graphics)
    },

    // 加载全景数据
    loadPanor () {
      var id = this.base_id;
      getByBaseId(id || this.$store.state.baseinfo.cur_base_id).then(e => {
        var data = e.content;
        var dat = [];
        for (var i = 0; i < data.length; i++) {
          // 如果存在经纬度
          if (data[i].latitude) {
            // 将这个提取到第一个
            dat.push(data.splice(i, 1)[0]);
            i--;
          }
        }
        dat = dat.concat(data);
        // e.content((e)=>{ e.latitude ? e.index = 1 : e.index = 0 });
        this.panor = dat; //e.content.sort((a,b)=>{ return a.index > b.index }).reverse();
        this.createPanor();
      });
    },

    // 显示全景图形
    createPanor () {
      var graphics = [];
      var data = this.panor.concat();
      for (var i in data) {
        var it = data[i];
        if (!it.longitude || !it.latitude) continue;
        var p = [it.longitude * 1, it.latitude * 1];
        p = this.mercatorTolonlat(p);
        var point = {
          type: "point",
          x: p[0],
          y: p[1],
          spatialReference: { wkid: 102100 }
        };
        // var markerSymbol = { type: "simple-marker", color: [226, 119, 40],outline: {color: [255, 255, 255],width: 2}};
        var markerSymbol = {
          type: "picture-marker", // autocasts as new PictureMarkerSymbol()
          url: require("@/assets/img/Plan/sbIcon/" +
            "JK-VR" +
            "_" +
            1 +
            ".png"),
          width: 16,
          height: 16
        };
        var polygonGraphic = new this.esri.Graphic({
          geometry: point,
          symbol: markerSymbol,
          attributes: {
            pointType: "全景",
            ...it
          }
        });
        it._graphics = polygonGraphic;
        this.addGraphics(polygonGraphic, "全景", "地块");

        // 创建名称
        var point = polygonGraphic.geometry.clone();
        // 创建symbol
        var symbol = {
          type: "text", // autocasts as new TextSymbol()
          color: "white",
          haloColor: "black",
          haloSize: "1px",
          text: it.name,
          xoffset: 0,
          yoffset: 0,
          font: {
            // autocasts as new Font()
            size: 8,
            family: "Josefin Slab",
            weight: "bold"
          }
        };
        var polygonGraphic = new this.esri.Graphic({
          geometry: point,
          symbol: symbol,
          attributes: it
        });
        var layer = this.addGraphics(polygonGraphic, "全景_name", "设备名称");
        layer.parentLayerName = "全景";
        // graphics.push(polygonGraphic)
      }
      this.layerTypes = this.types;
      // this.view.graphics.addMany(graphics)
    },

    // 墨卡托转GPS坐标
    mercatorTolonlat (mercator, bool) {
      // mercator[0] -= 615;
      // mercator[1] += 300;
      if (!bool) {
        return mercator;
      }
      var lonlat = [];
      var x = (mercator[0] / 20037508.34) * 180;
      var y = (mercator[1] / 20037508.34) * 180;
      y =
        (180 / Math.PI) *
        (2 * Math.atan(Math.exp((y * Math.PI) / 180)) - Math.PI / 2);
      lonlat[0] = x;
      lonlat[1] = y;
      return lonlat;
    },

    // 测试几何添加
    testCreatePolygon (rings) {
      // Create a polygon geometry
      var polygon = {
        type: "polygon", // autocasts as new Polygon()
        rings: rings
      };

      // Create a symbol for rendering the graphic
      var fillSymbol = {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        color: [227, 139, 79, 0.8],
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255],
          width: 1
        }
      };

      // Add the geometry and symbol to a new graphic
      var polygonGraphic = (window.asd = new this.esri.Graphic({
        geometry: polygon,
        symbol: fillSymbol
      }));

      this.view.graphics.addMany([polygonGraphic]);
    },

    // 创建谷歌图层
    createGg (type) {
      //  <X>-20037508.3427892</X>
      // <Y>20037508.3430388</Y>
      let tileInfo = new this.esri.TileInfo({
        rows: 256,
        cols: 256,
        compressionQuality: 0,
        origin: { x: -20037508.342787, y: 20037508.342787 },
        // origin: { x: -20037508.3427892, y: 20037508.3430388 },
        // origin: new this.esri.Point({ x: -20037508.2427892, y: 20037508.3430388 , spatialReference: { wkid: 102100 } }),
        // origin: new this.esri.Point({ x: -179.99999910168435, y: 85.05112877999998 , spatialReference: { wkid: 4326 } }),
        spatialReference: { wkid: 102100 }, //102113
        lods: [
          { level: 3, scale: 73957190.948944, resolution: 19567.8792409999 },
          { level: 4, scale: 36978595.474472, resolution: 9783.93962049996 },
          { level: 5, scale: 18489297.737236, resolution: 4891.96981024998 },
          { level: 6, scale: 9244648.868618, resolution: 2445.98490512499 },
          { level: 7, scale: 4622324.434309, resolution: 1222.99245256249 },
          { level: 8, scale: 2311162.217155, resolution: 611.49622628138 },
          { level: 9, scale: 1155581.108577, resolution: 305.748113140558 },
          { level: 10, scale: 577790.554289, resolution: 152.874056570411 },
          { level: 11, scale: 288895.277144, resolution: 76.4370282850732 },
          { level: 12, scale: 144447.638572, resolution: 38.2185141425366 },
          { level: 13, scale: 72223.819286, resolution: 19.1092570712683 },
          { level: 14, scale: 36111.909643, resolution: 9.55462853563415 },
          { level: 15, scale: 18055.954822, resolution: 4.77731426794937 },
          { level: 16, scale: 9027.977411, resolution: 2.38865713397468 },
          { level: 17, scale: 4513.988705, resolution: 1.19432856685505 },
          { level: 18, scale: 2256.994353, resolution: 0.597164283559817 },
          { level: 19, scale: 1128.497176, resolution: 0.298582141647617 }
        ]
      });
      //实例化电子地图
      let digitalLayer = new this.esri.WebTileLayer({
        id: "digitalMap",
        title: "digitalMap",
        // urlTemplate: 'http://mt0.google.cn/vt/lyrs=s,h&hl=zh-CN&gl=cn&&src=app&x={col}&y={row}&z={level}&s=Gali',
        urlTemplate:
          "http://mt1.google.cn/vt/lyrs=m@226000000&hl=zh-CN&gl=cn&src=app&x={col}&y={row}&z={level}&s=Gali",
        tileInfo: tileInfo,
        spatialReference: new this.esri.SpatialReference({ wkid: 102100 })
      });
      //实例化影像图
      let satelliteLayer = new this.esri.WebTileLayer({
        id: "satelliteMap",
        title: "satelliteMap",
        urlTemplate:
          "http://mt1.google.cn/vt/lyrs=s@157&hl=zh-CN&gl=cn&x={col}&y={row}&z={level}&s=Gali",
        tileInfo: tileInfo,
        spatialReference: new this.esri.SpatialReference({ wkid: 102100 })
      });
      //实例化地图标注
      let AnooMarkerLayer = new this.esri.WebTileLayer({
        id: "anooMarkerMap",
        title: "anooMarkerMap",
        urlTemplate:
          "http://mt1.google.cn/vt/lyrs=h@177000000&hl=zh-CN&gl=cn&x=${col}&y=${row}&z=${level}&s=Gali",
        tileInfo: tileInfo,
        spatialReference: new this.esri.SpatialReference({ wkid: 102100 })
      });

      return type === "wx" ? satelliteLayer : digitalLayer;
    },

    // 将Graphic加入地图
    addGraphics (graphic, type, isType) {
      var layers = "";
      if (isType === "地块") {
        layers = this.graphicLayers;
      } else if (isType === "地块名称") {
        layers = this.graphicLayersName;
      } else if (isType === "设备名称") {
        layers = this.graphicLayersDeviceName;
      } else if (isType === "标注") {
        layers = this.graphicLayerMake;
      } else if (isType === "聚合") {
        layers = this.graphicLayersJuHe;
      }
      var layer = layers.find(e => {
        return e.id === type;
      });
      if (!layer) {
        isType === "地块" ? this.types.push({ name: type, count: 1 }) : "";
        // 创建一个新的layer
        layer = new this.esri.GraphicsLayer({
          id: type
        });
        this.view.map.add(layer);
        layers.push(layer);
      } else {
        if (isType === "地块") {
          var a = this.types.find(e => {
            return e.name === type;
          });
          if (!a) {
            this.types.push({ name: type, count: 1 });
          } else {
            a.count++;
          }
        }
      }
      layer.add(graphic);
      return layer;
    },

    panduanIsShowName () {
      if (this.view.zoom > 17) {
        this.showName();
      } else {
        this.hideName();
      }
    },

    panduanIsShowJuHe () {
      if (this.view.zoom > 17) {
        this.hideJuHe();
      } else {
        this.showJuHe();
      }
    },

    // 判断是否显示标记
    // 主要是用来范围模型太小放大后找不到
    panduanIsShowMake () {
      if (this.view.zoom < 22) {
        this.showMark();
      } else {
        this.hideMark();
      }
    },

    // 判断是否显示全景
    panduanIsShowPanor (event) {
      // 获取摄像头位置
      var position = this.view.camera.position;
      // return;
      if (position.z < 300) {
        view.hitTest(event).then(response => {
          if (response.results[0]) {
            var graphic = response.results.find(e => {
              return (
                e.graphic &&
                e.graphic.attributes &&
                e.graphic.attributes.pointType === "地块"
              );
            });
            if (graphic) {
              graphic = graphic.graphic;
              // 获取全部的场景
              var panor = this.panor;
              // 创建3。x几何
              var polygon = graphic.geometry;
              for (var i in panor) {
                var it = panor[i];
                if (it.latitude || it.longitude) {
                  // 创建point
                  var point = new this.esri.Point(
                    [it.longitude * 1, it.latitude * 1],
                    { wkid: 102100 }
                  );
                  // { x: point.longitude , y: point.latitude }
                  if (this.esri.geometryEngine.contains(polygon, point)) {
                    this.view.navigation.mouseWheelZoomEnabled = false;
                    this.vrCloseCamera = this.view.camera.clone();
                    this.view
                      .goTo({
                        center: graphic.geometry.centroid,
                        tilt: 90,
                        scale: 25
                      })
                      .then(() => {
                        // this.view.navigation.mouseWheelZoomEnabled = true
                        setTimeout(() => {
                          this.changePanor(it);
                          this.view.navigation.mouseWheelZoomEnabled = true;
                        }, 2500);
                      });
                    return true;
                  }
                }
              }
            }
          }
        });
        return;
      }
    },

    panduanIsDialog () {
      var data = this.dialogGraphic;
      for (var i in data) {
        this.dialog(data[i]);
      }
    },

    showMark () {
      this.graphicLayerMake.forEach(e => {
        e.visible = true;
      });
    },

    hideMark () {
      this.graphicLayerMake.forEach(e => {
        e.visible = false;
      });
    },

    hideName () {
      this.graphicLayersName.forEach(e => {
        e.visible = false;
      });
      this.graphicLayersDeviceName.forEach(e => {
        e.visible = false;
      });
    },

    showName () {
      this.graphicLayersName.forEach(e => {
        e.visible = true;
      });
      this.graphicLayersDeviceName.forEach(e => {
        e.visible = false;
      });
    },

    showJuHe () {
      this.graphicLayersJuHe.forEach(e => {
        e.visible = true;
      });
    },

    hideJuHe () {
      this.graphicLayersJuHe.forEach(e => {
        e.visible = false;
      });
    },

    clearCover () {
      // 解除监听事件
      // this.toCoverCall.remove();
      // 删除遮罩图层
      var layer = view.map.findLayerById("遮罩图层");
      layer && layer.removeAll();
    },

    toCover () {
      // 监听摄像头的变化
      // this.toCoverCall = view.watch('camera',(camera) => {
      var layer = view.map.findLayerById("遮罩图层");
      layer && layer.removeAll();
      // 创建几何
      var graphic = map3d.Util.createPolygon({
        rings: [
          [
            [3866787.0695904642, -5961803.113718026],
            [3866787.0695904642, 7497221.874369162],
            [20273601.464591347, 7497221.874369162],
            [20273601.464591347, -5961803.113718026],
            [3866787.0695904642, -5961803.113718026]
          ],
          [
            [-19898722.2859717, 7345434.318107146],
            [-5853822.567618711, 9160389.234189669],
            [-7796574.527819938, -7261454.40940793],
            [-19834062.12346153, -5893672.695431372],
            [-19898722.2859717, 7345434.318107146]
          ],
          [
            [-5844977.649645708, 9149165.938878391],
            [3862994.0282146437, 7489417.709524606],
            [3854671.5435689464, -5948528.30907802],
            [-7790790.975549085, -7250117.216265776],
            [-5844977.649645708, 9149165.938878391]
          ]
        ],
        // rings: [
        //     [
        //         [view.extent.xmax, view.extent.ymax],
        //         [view.extent.xmax, view.extent.ymin],
        //         [view.extent.xmin, view.extent.ymin],
        //         [view.extent.xmin, view.extent.ymax],
        //         [view.extent.xmax, view.extent.ymax]
        //     ]
        // ],
        spatialReference: { wkid: 102100 },
        color: [0, 0, 0, 0.85]
      });

      //

      // this.base.geometry
      var graphic1 = map3d.Util.createPolyline(
        (this.base.geometry && this.base.geometry.rings[0]) || [
          [12622897.675556285, 2653322.3836513436],
          [12622954.708353758, 2655564.184387215],
          [12623836.1669332, 2655442.104851243],
          [12624865.49962043, 2654895.2777416105],
          [12624706.894069985, 2653708.8144688997],
          [12623611.758027356, 2652789.033162465],
          [12622897.675556285, 2653322.3836513436]
        ],
        102100
      );

      var geometry = map3d.esri.geometryEngine.cut(graphic.geometry, graphic1);
      var g1 = map3d.Util.createGraphic({
        geometry: geometry[1],
        symbol: graphic.symbol
      });

      map3d.Util.addGraphic(g1, "遮罩图层", view);
    },

    toHD () {
      if (this.base.geometry.layer2d) {
        var tileLayer2 = new this.esri.TileLayer(this.base.geometry.layer2d, {
          id: "高清图层"
        });
        this.setLayerHD(tileLayer2);
      }
    },

    to3D () {
      this.toLight();
      if (this.base.geometry.layer3d) {
        var layer = new this.esri.IntegratedMeshLayer({
          // 这个就是url
          url: this.base.geometry.layer3d,
          copyright: "jk",
          elevationInfo: {
            mode: "absolute-height",
            offset: 0
          },
          id: "3dLayer"
        });
        this.setLayer3d(layer);
      }
      var layer = this.view.map.findLayerById("基地");
      var symbol = layer.graphics.items[0].symbol;
      symbol.outline.color.a = 0;
      layer.graphics.items[0].symbol = symbol.clone();
      this.view.goTo({ tilt: 50 });
      this.mode = 3;
    },

    // 开启阴影模式
    toLight () {
      // 开启阴影配置
      view.environment.lighting.date = new Date();
      view.environment.lighting.directShadowsEnabled = true;
      // 显示阴影配置按钮
      this.isLight = true;
    },

    toUnLight () {
      // 开启阴影配置
      view.environment.lighting = {};
      // 显示阴影配置按钮
      this.isLight = false;
      this.$refs.bottom.hideLightUi();
    },

    to2D () {
      this.toUnLight();
      var layer = this.view.map.findLayerById("基地");
      var symbol = layer.graphics.items[0].symbol;
      symbol.outline.color.a = 1;
      layer.graphics.items[0].symbol = symbol.clone();
      this.view.goTo({ tilt: 0 });

      this.removeLayer3d();
      this.mode = 2;
    },

    // 添加高清图
    setLayerHD (layer) {
      this.view.map.add(layer);
      this.layerHD.push(layer);
    },

    // 删除高清图
    removeLayerHD (layer) {
      if (layer) {
        this.view.map.remove(layer);
        this.layerHD.splice(this.layerHD.indexOf(layer), 1);
      }
      this.layerHD.forEach(e => {
        this.view.map.remove(e);
      });
      this.layerHD = [];
    },

    setLayer3d (layer) {
      // 如果图层已经创建过了
      var _layer = this.layer3d.find(e => {
        return e.id === layer.id;
      });
      if (_layer) {
        _layer.visible = true;
      } else {
        this.layer3d.push(layer);
        this.view.map.add(layer);
      }
    },

    removeLayer3d (layer) {
      if (layer) {
        layer.visible = false;
        // this.view.map.remove(layer);
        // this.layer3d.splice(this.layer3d.indexOf(layer),1);
      }
      this.layer3d.forEach(e => {
        e.visible = false;
        // this.view.map.remove(e);
      });
    },

    // 在全景模式下 点击地块直接展示
    findPanor (graphic) {
      // 获取全部的场景
      var panor = this.panor;
      // 创建3。x几何
      var polygon = graphic.geometry;
      for (var i in panor) {
        var it = panor[i];
        if (it.latitude || it.longitude) {
          // 创建point
          var point = new this.esri.Point([it.longitude * 1, it.latitude * 1], {
            wkid: 102100
          });
          // { x: point.longitude , y: point.latitude }
          if (this.esri.geometryEngine.contains(polygon, point)) {
            this.changePanor(it);
            return true;
          }
        }
      }
      return false;
    },

    // 开启警报
    warn (graphic, level) {
      // 判断合集里面是否存在几何
      if (this.warnGraphic.indexOf(graphic) === -1) {
        this.warnGraphic.push(graphic);
      } else {
        // 如果已经绑定过事件了 则退出禁止重复绑定
        return;
      }
      // 开始计时器闪烁变化
      graphic.key = setInterval(() => {
        // 判断克隆symbol在不在
        if (!graphic.cloneSymbol) {
          var color = { 4: "#d86c20", 3: "#d86c20", 2: "#ff0000" };
          color = color[level];
          // 创建闪烁symbol1
          graphic.cloneSymbol = graphic.symbol.clone();
          graphic.cloneSymbol.outline.color.setColor(color);
          graphic.cloneSymbol.outline.color.a = 0.75;
          graphic.cloneSymbol.color.setColor(color);
          graphic.cloneSymbol.color.a = 0.75;
          // 创建闪烁symbol2
          graphic.cloneSymbol1 = graphic.symbol.clone();
          graphic.cloneSymbol1.outline.color.setColor(color);
          graphic.cloneSymbol1.outline.color.a = 0.25;
          graphic.cloneSymbol1.color.setColor(color);
          graphic.cloneSymbol1.color.a = 0.25;
          // 保存原来的symbol配置
          graphic.oldSymbol = graphic.symbol;
        }
        if (graphic.symbol === graphic.cloneSymbol) {
          graphic.symbol = graphic.cloneSymbol1;
        } else {
          graphic.symbol = graphic.cloneSymbol;
        }
        // graphic.symbol = graphic.cloneSymbol;
      }, 500);
    },

    // 结束警报
    unwarn (graphic) {
      if (!graphic) {
        this.warnGraphic.forEach(e => {
          this.unwarn(e);
        });
        this.warnGraphic = [];
        return;
      }
      graphic.key && clearInterval(graphic.key);
      graphic.key = null;
    },

    // 判断是摄像头
    isSXT (graphic) {
      var attr = graphic.attributes;
      if (attr.hd_device_type_code === "JK-SX") {
        return true;
      } else {
        return false;
      }
    },

    showDialogDevice (graphic) {
      if (this.isSXT(graphic)) {
        // 如果是摄像头
        // 创建dom
        var html = `
                    <div class='iframeBox' v-show='iframeShow' style='top:-100%;'>
                        <div class='iframeTitle'>${graphic.attributes.name}
                        <i class='el-icon-close closeIframe' onclick='var dom =this.parentElement.parentElement.parentElement;dom.querySelector("iframe").remove();dom.remove();dom.graphics.dom = null'></i>
                        <i class='el-icon-full-screen closeIframe' style='right: 25px;' onclick='var dom =this.parentElement.parentElement.parentElement; openFullscreen(dom.querySelector("iframe"))'></i>
                        </div>
                        <div class='iframeWindow' style='width: 300px;height: 200px;background: #00000099;'>
                        <iframe
                            dbbig='sadasd'
                            style='height: 100%;' 
                            src="/openvideo?hd_device_id=${graphic.attributes.id
          }&playWay=play"
                            frameborder="0"
                        />
                        </div>
                    </div>
                `;
        this.dialog(graphic, html, "摄像头");
        return;
      }

      getSensorByDeviceId(graphic.attributes.device_id).then(e => {
        var html = "<div class='title'>" + graphic.attributes.name + "</div>";
        html +=
          "<i class='el-icon-close closeSonBox' onclick='this.parentElement.remove(); this.parentElement.graphics.dom = null;' ></i>";
        html += "<div class='sonBox'>";
        for (var i in e.data) {
          html += `<div>
                        <div>${e.data[i].name}</div>
                        <div class='stateColor${e.data[i].sta}'>${e.data[i].sta === 2 ? "数据异常" : e.data[i].value + e.data[i].unit
            }</div>
                    </div>`;
        }
        html += "</div>";
        this.dialog(graphic, html, "设备");
      });
    },

    // 弹窗浮层
    dialog (graphic, html, type) {
      var index = this.dialogGraphic.indexOf(graphic);
      if (index < 0) {
        // 定义浮窗类型
        graphic.dialogType = type;
        // 如果不存在
        this.dialogGraphic.push(graphic);
      } else {
        if (graphic.dom === null) {
          // 如果存在但是dom = null
          this.dialogGraphic.splice(index, 1);
          graphic.dom = undefined;
          return;
        }
      }
      // 如果不存在dom
      if (!graphic.dom) {
        graphic.dom = document.createElement("div");
        graphic.dom.graphics = graphic;
        graphic.dom.className = "map3d_dialog";
        graphic.dom.innerHTML = `
                    <div class='bor'></div>
                    ${html}
                `;
        this.$refs.dialogBox.appendChild(graphic.dom);
      }
      // 获取屏幕坐标
      if (graphic.geometry.type === "point") {
        var p = this.view.toScreen(graphic.geometry);
      } else {
        var p = this.view.toScreen(graphic.geometry.centroid);
      }

      graphic.dom.style.cssText = `left: ${p.x}px;top:${p.y - 50}px;`;
    },

    // 展示所有的设备的信息面板
    showDeviceInfo () {
      // 排除掉 基地 地块 全景 摄像头
      var type = ["基地", "地块", "全景", "摄像头"];
      type = this.types.filter(e => {
        return type.indexOf(e.name) === -1;
      });
      // 将获取到的类型名称进行遍历 获取layer
      var layer = type.map(e => {
        return this.view.map.findLayerById(e.name);
      });
      // 遍历所有图层 将下面的点对象展示面板
      layer.forEach(e => {
        e.graphics.items.forEach(e => {
          this.showDialogDevice(e);
        });
      });
    },

    // 关闭所有设备的信息的面板
    hideDeviceInfo () {
      var data = this.dialogGraphic;
      for (var i = 0; i < data.length; i++) {
        var graphics = data[i];
        if (graphics.dom && graphics.dialogType === "设备") {
          graphics.dom.remove();
          graphics.dom = null;
          data.splice(i, 1);
          i--;
        }
      }
    },

    // 显示所有摄像头的浮层
    showSxtInfo () {
      var a = this.view.map.findLayerById("摄像头");
      if (!a) return;
      var graphics = a.graphics.items;
      for (var a in graphics) {
        this.showDialogDevice(graphics[a]);
      }
    },

    hideSxtInfo () {
      var data = this.dialogGraphic;
      for (var i = 0; i < data.length; i++) {
        var graphics = data[i];
        if (graphics.dom && graphics.dialogType === "摄像头") {
          graphics.dom.remove();
          graphics.dom = null;
          data.splice(i, 1);
          i--;
        }
      }
    },

    // 获取基地预警数据 更新地块的健康情况
    refreshWarnInfo () {
      // 先取消前一次的预警警报
      this.unwarn();
      // 根据当前基地id获取预警信息
      getWarnByBaseId(this.base_id).then(e => {
        var data = (this.warnList = e.data);
        // 从数据中赛选出有预警信息的地块id
        var b = e.data
          .filter(e => {
            return e.sensorList.length != 0;
          })
          .map(e => {
            return {
              id: e.rs_facilities_id,
              level: e.sensorList.sort((a, b) => {
                return a.state < b.state;
              })[0].state
            };
          });
        // 在地块图层中找到对应的几何对象
        var a = this.view.map.findLayerById("地块").graphics.items;
        a = a.filter(e => {
          var bool = b.find(be => {
            return be.id === e.attributes.id;
          });
          bool ? (e.level = bool.level) : null;
          return bool;
        });
        // 将筛选出来的几何对象 标记为预警状态
        a.forEach(e => {
          // e.attributes.products.find((e)=>{ return . })
          // 排除掉 > 10的
          e.level === 3 && this.warn(e, e.level);
        });
      });

      // this.refreshWarnInfoKey = setTimeout(() => {
      //   this.refreshWarnInfo();
      // }, 60000);
    },

    showWarnInfo () {
      var graphics = this.warnGraphic;
      for (var i in graphics) {
        var graphic = graphics[i];
        // 创建浮层显示
        var list = this.warnList.find(e => {
          return e.rs_facilities_id === graphic.attributes.id;
        });
        if (!list) return;
        list = list.sensorList[0];
        if (!list) return;
        //{geometry: graphic.geometry.centroid}
        this.dialog(
          graphic,
          `
                <div class='iframeBox' v-show='iframeShow' style='top:-100%;width: 150px;'>
                    <div class='iframeTitle'>${list.hd_device_sensor_name}
                    <i class='el-icon-close closeIframe' onclick='var dom =this.parentElement.parentElement.parentElement;dom.remove();dom.graphics.dom = null'></i>
                    </div>
                    <div class='iframeWindow' style="padding: 7px;">
                        ${list.state_msg}
                    </div> 
                </div>`,
          "预警"
        );
      }
    },

    hideWarnInfo () {
      var data = this.dialogGraphic;
      for (var i = 0; i < data.length; i++) {
        var graphics = data[i];
        if (graphics.dom && graphics.dialogType === "预警") {
          graphics.dom.remove();
          graphics.dom = null;
          data.splice(i, 1);
          i--;
        }
      }
    }
  }
};
</script>

<style>
.map3d_dialog {
  background: #000000a8;
  padding: 5px;
  border-radius: 4px;
  position: absolute;
  transform: translate(-50%, -100%);
  color: #ffffff;
  cursor: pointer;
}

.map3d_dialog::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 100%);
  border-top: solid 5px #000000a8;
  border-left: solid 5px #ffffff00;
  border-right: solid 5px #ffffff00;
}

.map3d_dialog:hover > .bor {
  display: block;
}

.map3d_dialog .bor {
  display: none;
  position: absolute;
  left: 50%;
  bottom: -5px;
  transform: translate(-50%, 0) rotateZ(45deg);
  border-right: solid 1px #ffffff;
  border-bottom: solid 1px #ffffff;
  padding: 3px;
}

.map3d_dialog .closeSonBox {
  position: absolute;
  top: 8px;
  right: 7px;
  display: none;
}

.map3d_dialog:hover > .closeSonBox {
  display: block;
}

.map3d_dialog .title {
  padding: 2px 2px 8px;
  font-size: 14px;
  text-align: center;
}

.map3d_dialog .sonBox {
  display: flex;
  flex-wrap: wrap;
}

.map3d_dialog .sonBox > div {
  width: 33%;
  text-align: center;
  padding: 3px;
}

.map3d_dialog .a {
}

.map3d_dialog:hover {
  border: solid 1px #ffffff;
  z-index: 9999;
  background: #000000;
}
.plan3d {
  height: 100%;
  width: 100%;
}
#map3d {
  height: 100%;
  width: 100%;
}
.vrBox {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000a8;
  z-index: 9999;
}
.vrBox > iframe {
  width: 100%;
  height: 100%;
}
.vrBox .vrClose {
  position: absolute;
  top: 25px;
  left: 25px;
  padding: 10px;
  font-weight: 800;
  color: #ffffff;
  background: #000000a8;
  border-radius: 5px;
  cursor: pointer;
}

.iframeBox {
  /* position: absolute; */
  /* left: 50%; */
  /* top: 50%; */
  /* transform: translate(-50%, -50%); */
}
.iframeBox .iframeBox iframe {
  width: 100%;
  height: 100%;
}
.iframeBox .iframeWindow {
  /*background:#e6e6e6;*/
}
.iframeBox .iframeBox iframe::-webkit-scrollbar {
  width: 0;
}
.iframeBox .closeIframe {
  position: absolute;
  right: 10px;
  cursor: pointer;
}
.iframeBox .closeIframe:hover {
  color: red;
}
.iframeBox .iframeTitle {
  padding: 2px;
  color: #dadada;
  border-bottom: solid 1px;
  font-size: 12px;
}
.esri-ui-corner-container {
  /* display: none; */
}

.esri-ui-top-left.esri-ui-corner {
  display: none;
}

.esri-ui-inner-container.esri-ui-corner-container {
  top: 65px !important;
}

.esri-component.esri-attribution.esri-widget {
  display: none;
}
.plan3d .stateColor2 {
  color: crimson !important;
}

.plan3d .stateColor3 {
  color: chocolate !important;
}

.plan3d .stateColor4 {
  color: chocolate !important;
}

.lwz {
  position: absolute;
  width: 100%;
  height: calc(100% + 35px);
  z-index: 9999999;
  margin-top: -35px;
}
</style>
