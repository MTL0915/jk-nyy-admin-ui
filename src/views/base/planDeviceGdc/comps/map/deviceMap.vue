<template>
  <!-- 地图模块 -->
  <div class='device_map_vue'>
    <JKMap
      class='map_box'
      :load='loadMap'
      :mapParams="mapParams"
    ></JKMap>

    <!-- 地图设备信息展示栏 -->
    <comp-pointinfo
      :pointInfo='pointInfoArea'
      :deviceInfo="deviceInfo"
    ></comp-pointinfo>

    <!-- <comp-maploading :complete='complete'></comp-maploading> -->
    <div
      class='completeEdit'
      @click='sketchViewModel.complete()'
      v-show='showCompleteEditBtn'
    >完成编辑</div>

  </div>
</template>

<script>
const mapParams = require("./util/map.config.js");
import ws from "../../websocket/py_ws";
// import events from '../../util/events'
import { getDevice, getRouteJobPath_, getRouteJobLine_ } from "../../data/data";
import compPointinfo from "./pointInfo";
import compMaploading from "./mapLoading";
import bus from "../../util/bus";
import { changePoint } from "./util/changeLngLat";
export default {
  props: {
    deviceInfo: {
      type: Object,
    },
    deviceConf: {
      type: Object,
    },
  },
  components: {
    compPointinfo,
    compMaploading,
  },
  data () {
    return {
      mapParams,
      map: null,
      equipLayer: null,
      pointGraphic: null,
      pointInfoArea: {},
      runWay: null,
      yzPointLayer: null,
      yzPointArr: [],

      pointLine: null,
      layerLine: null,
      layerLinePolygon: null,
      mapCamereChange: null,
      pointInfoX: 0,
      pointInfoY: 0,
      rotateX: 0,
      rotateZ: 0,
      direction: 0,
      device: {},
      showCompleteEditBtn: false,
      top: 50,
      left: 50,
      // complete: 30,
    };
  },
  mounted () {
    // 显示任务路径
    bus.$on("map_showPath", this.showJobPath.bind(this));
    // 退出任务路径编辑
    bus.$on("map_baskPathEdit", this.baskPathEdit.bind(this));
    // 摄像头调整到当前设备图标位置
    bus.$on("map_centerAt", this.centerAt.bind(this));
    // 获取当前的地图对象
    bus.$on("map_getView", (fn) => {
      fn(this.view);
    });
    // 获取当前地图绘制的路径几何
    bus.$on("map_getJob", (fn) => {
      fn(this.Job);
    });
    // 退出当前编辑的几何模式
    bus.$on("map_backEditGeometry", () => {
      this.sketchViewModel && this.sketchViewModel.complete();
    });
    // 重新渲染任务路径根据任务
    bus.$on("map_refreshShowTaskLineByJob", (it) => {
      this.refreshShowTaskLineByJob(it);
    });
    // 编辑当前的几何
    bus.$on("map_editGeometry", (graphic, fn) => {
      this.pathClick(graphic, fn);
    });
  },
  methods: {
    createRunWay () {
      if (this.map) {
        this.runWay = new window.esri.layers.ArcGISDynamicMapServiceLayer(
          "https://www.nongjixxh.com/arcgis/rest/services/440900/mmlz_gd/MapServer",
          "runWayLayer"
        );
        this.map.addLayer(this.runWay);
      } else {
        setTimeout(() => {
          this.createRunWay();
        }, 1000);
      }
    },
    // /* 地图摄像头变化 主要作用是在一定高度之间切换图标和3d模型之间的切换 */
    // cameraChange() {
    //   if (this.mapCamereChange) return;
    //   //  监听摄像头的变化
    //   this.mapCamereChange = this.view.watch("camera", () => {
    //     this.cameraChangeFnc();
    //   });
    // },

    // cameraChangeFnc() {
    //   if (this.pointGraphic) {
    //     // 基本上 在4.x里面 所有的地图拖动 旋转 本质上都是摄像头的变化
    //     var windowXY = this.view.toScreen(this.pointGraphic.geometry);
    //     this.pointInfoX = windowXY.x;
    //     this.pointInfoY = windowXY.y;
    //     // console.log("tilt:"+this.view.camera.tilt)
    //     // console.log("heading:"+this.view.camera.heading)
    //     // console.log("fov:"+this.view.camera.fov)
    //     this.rotateX = this.view.camera.tilt;
    //     this.rotateZ = this.view.camera.heading;
    //     this.top = windowXY.x;
    //   }
    //   // 监听摄像机高度 隐藏显示模型和图标
    //   //   if (this.view.zoom < 20) {
    //   //     this.isIcon = false;
    //   //     this.pointGraphicIcon.visible = false;
    //   //     this.mapDeviceIconLayer && (this.mapDeviceIconLayer.visible = true);

    //   //     this.pointGraphic.visible = false;
    //   //   } else {
    //   //     this.isIcon = false;
    //   //     this.pointGraphicIcon.visible = false;
    //   //     this.mapDeviceIconLayer && (this.mapDeviceIconLayer.visible = false);

    //   //     this.pointGraphic.visible = true;
    //   //   }
    // },

    centerAt () {
      this.map.centerAt(this.pointGraphic);
      //   this.view.center = this.pointGraphic.geometry.clone();
      //   this.view.zoom = 19;
    },

    /* 开始建立websocket链接 */
    createWebsocket () {
      // 创建ws的实例化对象
      this.ws = ws.get();
      // 绑定设备实例
      this.ws.setDeviceId(this.$route.query.device_id);
      // 绑定上报事件
      this.wsUploadSta = this.ws.onUploadSta(this.uploadSta);
      // 预加载完成度+20
      // this.complete += 20;
    },

    /* 获取设备数据 确保在websocket无法获取的情况下 依旧可以显示最新的一次数据 */
    getDevice () {
      return new Promise((a, b) => {
        getDevice(this.$route.query.device_id)
          .then((res) => {
            // 预加载完成度+20
            // this.complete += 20;
            // 保存设备信息
            this.device = res.data;
            // 根据设备id显示一下设备位置
            if (res.data.innerStatus.property_values && res.data.innerStatus.property_values.location) {
              this.showPoint(
                res.data.innerStatus.property_values.location.concat().reverse()
              );
            }
            // // 将摄像头对准一下当前地点
            // this.centerAt();
            // // 显示一下初始化摄像头
            // this.cameraChangeFnc();
            a();
          })
          .catch(b);
      });
    },

    /* 地图初始化行为
     *  view 地图实例化对象
     */
    loadMap (map) {
      var isLoad = setInterval(() => {
        map.initExtent = new window.esri.geometry.Extent({
          xmax: 110.95690034008577,
          xmin: 110.94776320982338,
          ymax: 21.758295380039765,
          ymin: 21.753683984610465,
          spatialReference: { wkid: 4326 },
        });
        map.setExtent(map.initExtent);

        clearInterval(isLoad);
        // 预加载完成度+30
        // this.complete += 30;
        this.map = map;
        this.equipLayer = new window.esri.layers.GraphicsLayer({
          id: "equipLayer",
        });
        this.yzPointLayer = new window.esri.layers.GraphicsLayer({
          id: "yzPointLayer",
        });
        this.map.addLayer(this.equipLayer);
        this.map.addLayer(this.yzPointLayer);
        this.createRunWay();
        this.createYzPoint();

        this.mapExtent = this.map.on("extent-change", () => {
          let area = this.map.toScreen(this.pointGraphic.geometry);
          this.pointInfoArea = area;
        });

        this.mapPan = this.map.on("pan-start", () => {
          this.pointInfoArea = {};
        });

        this.mapZoom = this.map.on("zoom-start", () => {
          this.pointInfoArea = {};
        });

        // 获取设备信息
        this.getDevice().then(() => {
          // 开始建立通信链接
          this.createWebsocket();
        });
      }, 200);
    },

    createYzPoint () {
      let pointArr = [
        {
          name: "巡航轨道车1号预置点",
          lng: 110.9527323698245,
          lat: 21.754953952679493,
        },
        {
          name: "巡航轨道车2号预置点",
          lng: 110.95133324675308,
          lat: 21.754782631487075,
        },
        {
          name: "巡航轨道车3号预置点",
          lng: 110.95046236402494,
          lat: 21.75582483540763,
        },
        {
          name: "巡航轨道车4号预置点",
          lng: 110.95263719138427,
          lat: 21.75609133504028,
        },
        {
          name: "巡航轨道车5号预置点",
          lng: 110.95179486218821,
          lat: 21.75696697669043,
        },
      ];
      pointArr.map((it) => {
        let point = new window.esri.geometry.Point(
          [it.lng, it.lat],
          this.map.spatialReference
        );
        let iconSymbol = new window.esri.symbol.PictureMarkerSymbol(
          require("@/assets/planDeviceGdc/ico_yzddw.png"),
          36,
          48
        );
        let graphic = new window.esri.Graphic(point, iconSymbol);
        this.yzPointLayer.add(graphic);
        this.yzPointArr.push(graphic);
      });
    },

    /* 上报数据事件 */
    uploadSta (result) {
      // 在地图上绘制坐标图标
      this.showPoint(
        result.data.property_values.position,
        result.data.property_values.arimuth
      );
    },

    // 显示设备点
    showPoint (position, direction) {
      if (this.pointGraphic) {
        this.equipLayer.clear();
      }
      let point = new window.esri.geometry.Point(
        changePoint(position, this.map),
        this.map.spatialReference
      );
      let iconSymbol = new window.esri.symbol.PictureMarkerSymbol(
        require("@/assets/planDeviceGdc/head_icon.png"),
        100,
        31
      );
      this.pointGraphic = new window.esri.Graphic(point, iconSymbol);
      this.equipLayer.add(this.pointGraphic);
      let area = this.map.toScreen(this.pointGraphic.geometry);
      this.pointInfoArea = area;
    },
    // 根据任务id显示任务路线图
    showJobPath (it, suc) {
      // 标记一下当前显示的任务；
      this.Job = it;
      var routeJobPathId = it.routeJobPathId;
      // 当选中任务的时候 获取路线数据
      getRouteJobPath_(routeJobPathId).then((e) => {
        // 获取任务路线
        if (e.data.content[0]) {
          // 注入线段
          it.path = e.data.content[0].path
            ? JSON.parse(e.data.content[0].path)
            : [];
          it.path = ws.correctPosition(it.path);
          // 注入线段数据
          it.pathData = e.data.content[0];
          // 将选中任务传入 显示路径
          this.showTaskPath(it);
          // 加载任务子任务数据
          getRouteJobLine_(it.routeJobPathId).then((e) => {
            // 当任务被选中的时候
            it.pointTask =
              e.data.content.length > 0
                ? e.data.content.map((e) => {
                  var p = JSON.parse(e.path);
                  var graphic = this.showTaskLine(
                    it.path,
                    p[0],
                    p[p.length - 1],
                    e.color
                  );
                  graphic.Job = it;
                  return {
                    ...e,
                    point: p,
                    name: e.name,
                    taskType: e.routeJobActionId,
                    color: e.color,
                    graphic: graphic,
                  };
                })
                : [];

            suc && suc(it);
          });
        }
        return e;
      });
    },

    // 显示设备的路线规划图
    showTaskPath (item) {
      if (item.path[0][0] > 1000) {
        var path = item.path;
      } else {
        var path = item.path.map((e) => {
          return map3d.esri.webMercatorUtils.lngLatToXY(e[0], e[1]);
        });
      }
      var geometry = map3d.Util.createPolyline(
        path,
        this.view.spatialReference.wkid
      );
      // 视角移动指定路线
      this.view.goTo({
        target: geometry.extent,
      });
      // return graphic;
    },

    // 获取线段symbol
    getLineSymbol (param = {}) {
      return {
        type: "line-3d",
        symbolLayers: [
          {
            type: "line",
            size: "10px",
            material: {
              color: param.color || [255, 255, 255, 0.8],
            },
          },
        ],
      };
    },

    // 显示子任务 段落
    showTaskLine (path, pointIndex1, pointIndex2, color) {
      var paths = path.slice(
        Math.min(pointIndex1, pointIndex2),
        Math.max(pointIndex1, pointIndex2) + 1
      );
      if (paths[0][0] < 1000) {
        paths = paths.map((e) => {
          return map3d.esri.webMercatorUtils.lngLatToXY(e[0], e[1]);
        });
      }
      var graphic = this.showPath(paths, { color: color || [255, 0, 0, 0.8] });
      graphic.click = this.pathClick.bind(this);
      map3d.Util.addGraphic(graphic, "农机规划路线", this.view);
      return graphic;
    },

    // 根据节点显示线段
    showPath (paths, param) {
      // 定义线段symbol
      var symbol = this.getLineSymbol(param);
      var geometry = map3d.Util.createPolyline(
        paths,
        this.view.spatialReference.wkid
      );
      // 合并开始
      var graphic = map3d.Util.createGraphic({ geometry, symbol });
      // 返回合成几何
      return graphic;
    },

    // 任务路线被点击
    pathClick (graphic, fn) {
      var Job = graphic.Job;
      // 获取当前任务路线属于的任务对象
      var task = Job.pointTask.find((e) => {
        return e.graphic === graphic;
      });
      // 判断任务对象是否存在
      if (!task) {
        return;
      }
      // 将这个几何进入编辑模式
      map3d.Util.load(["esri/widgets/Sketch/SketchViewModel"]).then((res) => {
        if (!graphic.layer) {
          graphic.layer = map3d.Util.getLayer("编辑用的", view);
        }
        var sketchViewModel = (this.sketchViewModel = new res[0]({
          view: this.view,
          layer: graphic.layer,
          updateOnGraphicClick: false,
          defaultUpdateOptions: {
            // 设置更新操作的默认选项
            toggleToolOnClick: false, // 仅启用重塑操作
          },
        }));
        // if( this.$parent.$refs.pathList && this.$parent.$refs.pathList.selectPathGraphic(graphic,sketchViewModel) === false ){
        //     return;
        // }
        sketchViewModel.update([graphic], {
          tool: "reshape",
        });
        sketchViewModel.eventUpdate = sketchViewModel.on("update", (e) => {
          if (e.state === "complete") {
            sketchViewModel.eventUpdate.remove();

            // 给其他模块响应
            bus.$emit("pathlist_show");
            bus.$emit("taskEdit_show");
            bus.$emit("modeTab_show");
            this.showCompleteEditBtn = false;

            //重新绘制路线
            var it = this.Job;
            var path = JSON.parse(task.path);
            var p = [
              ws.uncorrectPosition(
                map3d.esri.webMercatorUtils.xyToLngLat(
                  task.graphic.geometry.paths[0][0][0],
                  task.graphic.geometry.paths[0][0][1]
                )
              ),
              ws.uncorrectPosition(
                map3d.esri.webMercatorUtils.xyToLngLat(
                  task.graphic.geometry.paths[0][1][0],
                  task.graphic.geometry.paths[0][1][1]
                )
              ),
            ];
            it.path[path[0]] = p[0];
            it.path[path[1]] = p[1];

            var layer = this.view.map.findLayerById("农机规划路线");
            this.view.map.layers.remove(layer);

            it.pointTask.forEach((e) => {
              var p = JSON.parse(e.path);
              var graphic = this.showTaskLine(
                it.path,
                p[0],
                p[p.length - 1],
                e.color
              );
              graphic.Job = it;
              e.graphic = graphic;
            });

            fn && fn();
          }
        });
        // 给其他模块响应
        bus.$emit("pathlist_hide");
        bus.$emit("taskEdit_hide");
        bus.$emit("modeTab_hide");
        this.showCompleteEditBtn = true;
        this.view.extent = graphic.geometry.extent;
        this.view.zoom -= 1;
      });
    },

    // 重新绘制路段
    refreshShowTaskLineByJob (it = this.Job) {
      var layer = this.view.map.findLayerById("农机规划路线");
      this.view.map.layers.remove(layer);
      it.pointTask.forEach((e) => {
        var p = JSON.parse(e.path);
        var graphic = this.showTaskLine(
          it.path,
          p[0],
          p[p.length - 1],
          e.color
        );
        graphic.Job = it;
        e.graphic = graphic;
      });
    },

    // 退出地图编辑部分
    baskPathEdit () {
      var layer = this.view.map.findLayerById("农机规划路线");
      this.view.map.layers.remove(layer);
    },
  },
  destroyed () {
    this.equipLayer.clear();
    this.map.removeLayer(this.equipLayer);
    this.mapExtent.remove();
    this.mapPan.remove();
    this.mapZoom.remove();
    this.map.removeLayer(this.runWay);
  },
};
</script>

<style scoped>
.device_map_vue {
  height: 100%;
  width: 100%;
}
.completeEdit:hover {
  color: #ffffff;
}
.completeEdit {
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 11px;
  border-radius: 4px;
  color: #318ad5;
  border: solid 1px;
  font-size: 16px;
  cursor: pointer;
  background: #00000073;
}
</style>

<style>
.esri-ui-top-left.esri-ui-corner,
.esri-component.esri-attribution.esri-widget {
  display: none;
}
</style>