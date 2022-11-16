<template>
  <!-- 地图模块 -->
  <div class="device_map_vue">
    <JKMap3d
      class="map_box"
      :load="loadMap"
    ></JKMap3d>
    <comp-pointinfo
      :pointInfoY="pointInfoY"
      :pointInfoX="pointInfoX"
      :deviceName="device.name"
    ></comp-pointinfo>
    <comp-maploading :complete="complete"></comp-maploading>
    <div
      class="completeEdit"
      @click="sketchViewModel.complete()"
      v-show="showCompleteEditBtn"
    >
      完成编辑
    </div>
    <!-- <img v-show='isIcon' style='position:absolute;width: 24px;' 
            :style='"top:"+pointInfoY+"px;left:"
            +pointInfoX+"px;transform:translate(-50%,-50%) rotateZ(-"+(rotateZ-direction)+"deg) "' :src='require("@/assets/img/Plan/jiantou.png")' /> -->
  </div>
</template>

<script>
import ws from "../../websocket/py_ws";
import { map3d } from "@/utils/jiankun_map";
import { createPolygonByPolyline } from "../../util/map";
// import events from '../../util/events'
import { getDevice, getRouteJobPath_, getRouteJobLine_ } from "../../data/data";
import compPointinfo from "./pointInfo";
import compMaploading from "./mapLoading";
import bus from "../../util/bus";
export default {
  components: {
    compPointinfo,
    compMaploading
  },
  data () {
    return {
      view: null,
      pointLine: null,
      pointGraphic: null,
      pointGraphicIcon: null,
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
      complete: 30
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
    bus.$on("map_getView", fn => {
      fn(this.view);
    });
    // 获取当前地图绘制的路径几何
    bus.$on("map_getJob", fn => {
      fn(this.Job);
    });
    // 退出当前编辑的几何模式
    bus.$on("map_backEditGeometry", () => {
      this.sketchViewModel && this.sketchViewModel.complete();
    });
    // 重新渲染任务路径根据任务
    bus.$on("map_refreshShowTaskLineByJob", it => {
      this.refreshShowTaskLineByJob(it);
    });
    // 编辑当前的几何
    bus.$on("map_editGeometry", (graphic, fn) => {
      this.pathClick(graphic, fn);
    });
  },
  methods: {
    /* 地图摄像头变化 主要作用是在一定高度之间切换图标和3d模型之间的切换 */
    cameraChange () {
      if (this.mapCamereChange) return;
      //  监听摄像头的变化
      this.mapCamereChange = this.view.watch("camera", () => {
        this.cameraChangeFnc();
      });
    },

    cameraChangeFnc () {
      if (this.pointGraphic) {
        // 基本上 在4.x里面 所有的地图拖动 旋转 本质上都是摄像头的变化
        var windowXY = this.view.toScreen(this.pointGraphic.geometry);
        this.pointInfoX = windowXY.x;
        this.pointInfoY = windowXY.y;
        // console.log("tilt:"+this.view.camera.tilt)
        // console.log("heading:"+this.view.camera.heading)
        // console.log("fov:"+this.view.camera.fov)
        this.rotateX = this.view.camera.tilt;
        this.rotateZ = this.view.camera.heading;
        this.top = windowXY.x;
      }
      // 监听摄像机高度 隐藏显示模型和图标
      if (this.view.zoom < 20) {
        this.isIcon = false;
        this.pointGraphicIcon.visible = false;
        this.mapDeviceIconLayer && (this.mapDeviceIconLayer.visible = true);

        this.pointGraphic.visible = false;
      } else {
        this.isIcon = false;
        this.pointGraphicIcon.visible = false;
        this.mapDeviceIconLayer && (this.mapDeviceIconLayer.visible = false);

        this.pointGraphic.visible = true;
      }
    },

    centerAt () {
      this.view.center = this.pointGraphic.geometry.clone();
      this.view.zoom = 19;
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
      this.complete += 20;
    },

    /* 获取设备数据 确保在websocket无法获取的情况下 依旧可以显示最新的一次数据 */
    getDevice () {
      return new Promise((a, b) => {
        getDevice(this.$route.query.device_id)
          .then(res => {
            // 预加载完成度+20
            this.complete += 20;
            // 保存设备信息
            this.device = res.data;
            // 根据设备id显示一下设备位置
            if (res.data.innerStatus.property_values && res.data.innerStatus.property_values.location) {
              this.showPoint(
                res.data.innerStatus.property_values.location.concat().reverse()
              );
            }
            // 将摄像头对准一下当前地点
            this.centerAt();
            // 显示一下初始化摄像头
            this.cameraChangeFnc();
            a();
          })
          .catch(b);
      });
    },

    /* 地图初始化行为
     *  view 地图实例化对象
     */
    loadMap (view) {

      var isLoad = setInterval(() => {
        if (view.camera) {
          clearInterval(isLoad);
          // 预加载完成度+30
          this.complete += 30;
          this.view = view;
          // 获取设备信息
          this.getDevice().then(() => {
            // 开始建立通信链接
            this.createWebsocket();
            // 添加摄像头监听事件 主要用来监听图标和模型之间的切换
            this.cameraChange();
          });
        }
      }, 200);
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
      if (!this.pointGraphic) {
        this.pointGraphicIcon = map3d.Util.createImgPoint({
          img: require("@/assets/img/Plan/drawLineMap/qp/point.png"),
          xy: position,
          spatialReference: { wkid: 4326 }
        });
        // 生成几何Point
        var point = {
          type: "point",
          x: position[0],
          y: position[1],
          spatialReference: { wkid: 4326 }
        };
        // 生成模型symbol
        var symbol = {
          type: "point-3d",
          symbolLayers: [
            {
              anchor: "bottom",
              type: "object",
              resource: {
                href: "/static/model/nj3.gltf"
              },
              width: 1, //模型宽度
              height: 1, //模型高度
              // height: 1,
              material: {
                color: "red"
              },
              heading: direction
            }
          ]
        };
        // 生成Graphic
        this.pointGraphic = new map3d.esri.Graphic({
          geometry: point,
          symbol: symbol
        });
        // 添加图标
        this.layer = map3d.Util.addGraphic(
          this.pointGraphicIcon,
          "pointInfo",
          this.view
        );
        this.pointGraphic.visible = false;
        // 添加模型
        this.layer = map3d.Util.addGraphic(
          this.pointGraphic,
          "pointInfo",
          this.view
        );
        // 路线对象
        this.pointLine = map3d.Util.createGraphic({
          geometry: {
            type: "polyline",
            hasZ: false,
            hasM: false,
            paths: [[]],
            spatialReference: { wkid: 102100 }
          },
          symbol: {
            type: "simple-line",
            color: "lightblue",
            width: "20px",
            style: "solid"
          }
        });
        this.pointLine.visible = false;
        this.layerLine = map3d.Util.addGraphic(
          this.pointLine,
          "pointInfoLine",
          this.view
        );
        // 创建矩形线
        this.layerLinePolygon = createPolygonByPolyline(
          this.pointLine.geometry
        );
        map3d.Util.addGraphic(
          this.layerLinePolygon,
          "pointInfoLine",
          this.view
        );
      } else {
        this.pointGraphic.geometry.x = position[0];
        this.pointGraphic.geometry.y = position[1];
        this.pointGraphic.geometry = this.pointGraphic.geometry.clone();

        this.pointGraphic.symbol.symbolLayers.items[0].heading =
          direction + 180;
        this.pointGraphic.symbol = this.pointGraphic.symbol.clone();
        this.direction = direction;
        var angle = this.direction - this.view.camera.heading;
        if (angle < 0) {
          angle = 360 + angle;
        }
        this.createIcon(position, angle);

        this.pointGraphicIcon.geometry.x = position[0];
        this.pointGraphicIcon.geometry.y = position[1];
        this.pointGraphicIcon.geometry = this.pointGraphicIcon.geometry.clone();

        var positions = map3d.esri.webMercatorUtils.geographicToWebMercator({
          x: position[0],
          y: position[1]
        });
        position = [positions.x, positions.y];
        var ary = this.pointLine.geometry.paths[0];
        if (
          ary.length === 0 ||
          ary[ary.length - 1][0] !== position[0] ||
          ary[ary.length - 1][1] !== position[1]
        ) {
          ary.push(position);
          this.pointLine.geometry.paths[0] = ary;
          this.pointLine.geometry = this.pointLine.geometry.clone();

          this.layerLinePolygon.geometry = map3d.esri.geometryEngine.geodesicBuffer(
            this.pointLine.geometry,
            3,
            "feet"
          );
        }
        this.cameraChangeFnc();
      }
    },

    createIcon (it, angle) {
      if (this.mapDeviceIconLayer) {
        this.mapDeviceIconLayer.removeAll();
      }

      var view = this.view;
      var p1 = view.toMap({ x: 0, y: 0 });
      var p2 = view.toMap({ x: 1, y: 0 });
      // 获得每个像素的距离的实际距离
      var juli = map3d.esri.geometryEngine.distance(p1, p2);
      // 生成三角形
      var p = [];
      // 将当前点转接屏幕坐标
      // 转换成点
      var it = new view.center.constructor({
        x: it[0],
        y: it[1]
      });
      it = view.toScreen(it);
      // 根据角度和距离计算下一个位置在哪里
      var beilv = 1 * 0.8;
      p.push(this.getDiffByAngle([it.x, it.y], angle, (5 / juli) * beilv));
      p.push(this.getDiffByAngle([it.x, it.y], angle + 85, (3 / juli) * beilv));
      p.push(
        this.getDiffByAngle([it.x, it.y], angle + 125, (2 / juli) * beilv)
      );
      p.push(
        this.getDiffByAngle([it.x, it.y], angle + 180, (0 / juli) * beilv)
      );
      p.push(
        this.getDiffByAngle([it.x, it.y], angle + 250, (2 / juli) * beilv)
      );
      p.push(
        this.getDiffByAngle([it.x, it.y], angle + 290, (3 / juli) * beilv)
      );
      try {
        p = p.map(e => {
          var a = view.toMap({ x: e[0], y: e[1] });
          return [a.x, a.y];
        });
      } catch (e) {
        return;
      }

      var polygon = new map3d.esri.Polygon({
        rings: [p],
        spatialReference: { wkid: 102100 }
      });
      var polygonStyle = {
        type: "simple-fill",
        color: [0, 148, 255, 0.8],
        outline: {
          color: [0, 148, 255, 0.8],
          width: 1
        }
      };
      var graphic = new map3d.esri.Graphic(polygon, polygonStyle);
      this.mapDeviceIconLayer = map3d.Util.addGraphic(
        graphic,
        "mapDeviceIcon",
        view
      );
      // graphicsLayer.add( graphic );
    },

    // 获取按照一个方向的只能变量
    getDiffByAngle (point, angle, diff) {
      angle = Math.abs(angle % 360);
      var x1 = Math.sin((angle * Math.PI) / 180) * diff;
      var y1 = Math.cos((angle * Math.PI) / 180) * diff;
      return [x1 + point[0], point[1] - y1];
    },

    // 根据任务id显示任务路线图
    showJobPath (it, suc) {
      // 标记一下当前显示的任务；
      this.Job = it;
      var routeJobPathId = it.routeJobPathId;
      // 当选中任务的时候 获取路线数据
      getRouteJobPath_(routeJobPathId).then(e => {
        // 获取任务路线
        if (e.data.content[0]) {
          // 注入线段
          it.path = e.data.content[0].path
            ? JSON.parse(e.data.content[0].path)
            : [];
          //
          // it.path = ws.uncorrectPosition(it.path);
          it.path = ws.correctPosition(it.path);
          // 注入线段数据
          it.pathData = e.data.content[0];
          // 将选中任务传入 显示路径
          this.showTaskPath(it);
          // 加载任务子任务数据
          getRouteJobLine_(it.routeJobPathId).then(e => {
            // 当任务被选中的时候
            it.pointTask =
              e.data.content.length > 0
                ? e.data.content.map(e => {
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
                    graphic: graphic
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
        var path = item.path.map(e => {
          return map3d.esri.webMercatorUtils.lngLatToXY(e[0], e[1]);
        });
      }
      var geometry = map3d.Util.createPolyline(
        path,
        this.view.spatialReference.wkid
      );
      // 视角移动指定路线
      this.view.goTo({
        target: geometry.extent
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
              color: param.color || [255, 255, 255, 0.8]
            }
          }
        ]
      };
    },

    // 显示子任务 段落
    showTaskLine (path, pointIndex1, pointIndex2, color) {
      var paths = path.slice(
        Math.min(pointIndex1, pointIndex2),
        Math.max(pointIndex1, pointIndex2) + 1
      );
      if (paths[0][0] < 1000) {
        paths = paths.map(e => {
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
      var task = Job.pointTask.find(e => {
        return e.graphic === graphic;
      });
      // 判断任务对象是否存在
      if (!task) {
        return;
      }
      // 将这个几何进入编辑模式
      map3d.Util.load(["esri/widgets/Sketch/SketchViewModel"]).then(res => {
        if (!graphic.layer) {
          graphic.layer = map3d.Util.getLayer("编辑用的", view);
        }
        var sketchViewModel = (this.sketchViewModel = new res[0]({
          view: this.view,
          layer: graphic.layer,
          updateOnGraphicClick: false,
          defaultUpdateOptions: {
            // 设置更新操作的默认选项
            toggleToolOnClick: false // 仅启用重塑操作
          }
        }));
        // if( this.$parent.$refs.pathList && this.$parent.$refs.pathList.selectPathGraphic(graphic,sketchViewModel) === false ){
        //     return;
        // }
        sketchViewModel.update([graphic], {
          tool: "reshape"
        });
        sketchViewModel.eventUpdate = sketchViewModel.on("update", e => {
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
              // ws.uncorrectPosition(
              map3d.esri.webMercatorUtils.xyToLngLat(
                task.graphic.geometry.paths[0][0][0],
                task.graphic.geometry.paths[0][0][1]
              ),
              // ),
              // ws.uncorrectPosition(
              map3d.esri.webMercatorUtils.xyToLngLat(
                task.graphic.geometry.paths[0][1][0],
                task.graphic.geometry.paths[0][1][1]
              )
              // )
            ];
            it.path[path[0]] = p[0];
            it.path[path[1]] = p[1];

            var layer = this.view.map.findLayerById("农机规划路线");
            this.view.map.layers.remove(layer);

            it.pointTask.forEach(e => {
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
      it.pointTask.forEach(e => {
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
    }
  }
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
