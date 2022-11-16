<template>
  <div class="navigationMode" :style="!isNa ? 'padding: 0;' : ''">
    <!-- <div v-show='isNa'>自动航行模式中</div>
        <div v-show='isNa' class='backBtn' @click='stopRouteJob'>退出</div> -->
    <img
      v-show="isNa"
      style="margin-top: 6px;left: 50%;top: 0;position: absolute;transform: translate(-50%, 0px);"
      :src="require('@/assets/img/editMap/daohangmoshi.png')"
    />
    <div
      v-show="isTouch"
      style="width: 100%;text-align: center;margin-top: 6px;"
    >
      <img
        class="titleIcon"
        :src="require('@/assets/img/editMap/shijiaomoshi.png')"
      />
      <img
        @click="backTouch"
        class="shijiaoend"
        :src="require('@/assets/img/editMap/shijiaoend.png')"
      />
    </div>
    <img
      v-show="!isTouch && !isNa"
      class="shijiaostart"
      @click="shijiaostart"
      :src="require('@/assets/img/editMap/shijiaostart.png')"
    />
  </div>
</template>

<script>
import { map3d } from "@/utils/jiankun_map";
import { createPolygonByPolyline } from "../../../util/map";
import {
  getRouteJobPath_,
  routeJobDetail_,
  getDevice
} from "../../../data/data";
import ws from "../../../websocket/py_ws";
import bus from "../../../util/bus";
export default {
  props: {
    deviceWs: {
      type: Object,
      default: () => {}
    },
    device: {
      type: Object,
      default: () => {}
    }
  },
  watch: {},
  data() {
    return {
      layer: null,
      task: null,
      taskPath: null,
      isNa: false, //是否已经是导航状态了
      isTouch: false, //将模式设置为示教模式
      routeJob: {},
      viewLoad: true //地图是否加载成功了
    };
  },
  mounted() {
    // 获取设备信息
    this.getDevice();
    /* 开始建立websocket链接 */
    this.createWebsocket();
    bus.$on("toNavigation", (a, b, c) => {
      this.toNavigation(a, b, c);
    });
  },
  methods: {
    getDevice() {
      getDevice(this.$route.query.device_id).then(res => {
        this.device = res.data;
      });
    },

    /* 开始建立websocket链接 */
    createWebsocket() {
      // 创建ws的实例化对象
      this.ws = ws.get();
      // 绑定上报事件
      this.wsUploadSta = this.ws.onUploadSta(this.deviceWsUpdateFunction);
    },

    deviceWsUpdateFunction(result) {
      var data = result.data;
      this.deviceWs = data;
      // 如果地图还未加载好
      if (!this.viewLoad) {
        return;
      }
      // 判断是否是在导航状态
      if (
        data.property_values.nav_cmd === 5 &&
        (data.property_values.task_id || data.property_values.task_id == 0) &&
        this.device &&
        !this.isNa
      ) {
        this.isNa = true;
        if (data.property_values.task_id == 0) {
          // 如果是导航状态下
          this.createLineByTask_id();
        }
        return;
      } else if (
        data.property_values.nav_cmd !== 5 ||
        (!data.property_values.task_id && data.property_values.task_id != 0)
      ) {
        this.isNa = false;
      }

      // 判断是否是在示教状态
      if (data.property_values.nav_cmd === 1 && this.device && !this.isTouch) {
        this.isTouch = true;
        // 如果是示教状态下
        this.touchMode();
        return;
      } else if (data.property_values.nav_cmd !== 1) {
        this.isTouch = false;
      }
    },

    // 开始示教
    shijiaostart() {
      // 判断一下当前状态
      if (this.deviceWs.property_values.state === 0) {
        // 如果设备是处于离线状态则无法控制
        return this.$message({
          message: "该设备处于离线状态 无法远程控制。",
          type: "warning"
        });
      }
      if (this.deviceWs.controlType === 3) {
        // 如果设备是处于离线状态则无法控制
        return this.$message({
          message: "该设备正在现场控制 无法远程控制。",
          type: "warning"
        });
      }
      // this.$refs.navigation
      this.ws.teachMode(res => {
        if (res.code == 500) {
          this.$message({
            type: "error",
            message: res.msg || "示教模式出现错误"
          });
        } else {
          bus.$emit("map_centerAt");
        }
      });
    },

    // 地图加载完毕事件
    loadMap() {
      this.viewLoad = true;
    },

    stopRouteJob() {
      this.$parent.$refs.headPortrait.stopRouteJob();
    },

    back() {
      //清除路线
      view.map.remove(this.layer);
    },

    // 创建自己的图层
    toNavigation(task, isContinue, fn) {
      return new Promise((res, err) => {
        // 根据任务id获取路径数据
        this.getPath(task, isContinue, () => {
          fn(), res();
          // 创建路线
          this.createLine(this.taskPath);
        });
        // 隐藏一些必要界面
        this.uiOperate();
      });
    },

    uiOperate() {
      this.$parent.headActive = 1;
      // this.$parent.isShwo
    },

    getPath(it, isContinue, fn) {
      this.task = it;
      // 当选中任务的时候 获取路线数据
      getRouteJobPath_(it.routeJobPathId).then(e => {
        if (e.code === 200) {
          this.taskPath = e.data.content[0];
          this.taskPath.path = ws.correctPosition(
            JSON.parse(this.taskPath.path)
          );
          // 下发执行命令
          isContinue === true ? this.continueTask(fn) : this.execuTask(fn);
        }
      });
    },

    createLineByTask_id(id) {
      // 根据任务id获取路径
      routeJobDetail_({ id }).then(res => {
        this.routeJob = res.data;
        res.data.routeJobPathDTO.path = this.$parent.jiaozheng(
          JSON.parse(res.data.routeJobPathDTO.path)
        );
        this.createLine(res.data.routeJobPathDTO);
      });
    },

    createLine(item, bool) {
      // 定义线段symbol
      var symbol = this.getLineSymbol();
      // 定义线段geometry
      if (item.path[0][0] > 1000) {
        var path = item.path;
      } else {
        var path = item.path.map(e => {
          return map3d.esri.webMercatorUtils.lngLatToXY(e[0], e[1]);
        });
      }
      var geometry = map3d.Util.createPolyline(
        path,
        view.spatialReference.wkid
      );
      // 合并开始
      // var graphic = map3d.Util.createGraphic({ geometry, symbol })
      var graphic = createPolygonByPolyline(geometry);
      // 将当前几何和任务联系起来
      graphic.task = item;
      // 绑定联系
      item.graphic = graphic;
      // 视角移动指定路线
      bool !== false &&
        view.goTo({
          target: graphic.geometry.extent
        });
      // 添加到地图上
      this.layer = map3d.Util.addGraphic(graphic, "自动导航", view);
      return graphic;
    },

    getLineSymbol(param = {}) {
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

    execuTask(fn) {
      // 发送任务
      this.ws.setUpInstructions(
        this.task.id,
        () => {
          this.ws.executeInstructions(this.task.id, e => {
            if (e.code == "500") {
              this.$message({
                type: "error",
                message: e.msg
              });
            } else {
              this.$message({
                type: "success",
                message: "任务启动成功，开始导航；"
              });
              fn && fn();
            }
          });
        },
        0
      );
    },

    // 继续任务
    continueTask(fn) {
      // 首先获取当前的任务路径
      var taskPath = this.taskPath.path.concat();
      // 获取当前设备的坐标点
      var point = this.deviceWs.property_values.location;
      // 计算最近的点
      var dif = ws
        .uncorrectPosition(taskPath)
        .map((e, i) => {
          return { d: this.diff(e, [point[1], point[0]]), point: e, i };
        })
        .sort((a, b) => {
          return a.d - b.d;
        });
      // 将最近的第一个数组坐标设备目标点  以及下标位置
      var index = dif[0].i;
      // 发送任务
      this.ws.setUpInstructions(
        this.task.id,
        () => {
          this.ws.executeInstructions(this.task.id, e => {
            if (e.code == "500") {
              this.$message({
                type: "error",
                message: e.msg
              });
            } else {
              this.$message({
                type: "success",
                message: "继续上一次任务成功，开始任务；"
              });
              fn && fn();
            }
          });
        },
        index
      );
    },

    // 求兩點之間的距離
    diff(p1, p2) {
      var x = Math.abs(p1[0] - p2[0]);
      var y = Math.abs(p1[1] - p2[1]);
      var diff = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
      return diff;
    },

    // 示教模式
    touchMode() {
      // 然后将页面设置为监控页面
      this.uiOperate();
    },

    // 退出示教
    backTouch() {
      // 发出退出示教提示
      this.ws.unteachMode(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "示教成功"
          });
          // 判断一下示教的数组有多少个
          if (res.data.length < 2) {
            return this.$message({
              type: "error",
              message:
                "示教结果的坐标点少于2个，所以无法生成有效路段，请重新尝试。"
            });
          }
          // 处理示教返回的路线数组
          var data = res.data.map(e => {
            var a = {
              position: [e.lng, e.lat],
              action: e.action_config
            };
            return a;
          });
          // 进入任务管理模式
          bus.$emit("home_showTaskmanagements");
          // 隐藏任务列表
          bus.$emit("taskList_hide");
          // 显示新增任务
          bus.$emit("taskAdd_show", {
            isDraw: false
          });
          setTimeout(() => {
            // 添加新增任务中的path路径属性
            // var path = ws
            //   .correctPosition(
            //     data.map(e => {
            //       return e.position;
            //     })
            //   )
            //   .map(e => {
            //     return map3d.esri.webMercatorUtils.lngLatToXY(e[0], e[1]);
            //   });
            var path = data.map(e => {
                  return e.position;
                }).map(e => {
                return map3d.esri.webMercatorUtils.lngLatToXY(e[0], e[1]);
              });
            // 输入生成路线
            var pathListData = data.map(e => {
              return e.action;
            });
            bus.$emit("taskAdd_setPath", path, pathListData);
          }, 200);
        } else {
          this.$message({
            type: "error",
            message: "退出失败"
          });
        }
      });
    },

    // 处理示教的返回数据
    processPath(data) {
      // 总线段
      var paths = [];
      // 一根单线段
      var pathsLine = [];
      // 当前处理线段
      var path = [];
      // 初始角度
      var arcStart = 0;
      // 极限角度、
      var arcMax = 5;
      for (var i in data) {
        var a = data[i];
        // 如果当前处理线段还没有点坐标
        if (path.length === 0) {
          // 将当前点作为初始点
          path.push(a);
          pathsLine.push(a);
          continue;
        } else {
          var p = path[0];
          // 计算结束坐标
          // 判断是否存在初始角度
          if (!arcStart) {
            // 如果不存在初始角度计算当前角度 并将角度设置为初始值
            arcStart = this.deg(p.position, a.position);
            continue;
          } else {
            var bb = new map3d.esri.Point(
              p.position,
              window.view.spatialReference
            );
            var aa = new map3d.esri.Point(
              a.position,
              window.view.spatialReference
            );
            // 获取距离
            var diff = map3d.esri.geometryEngine.distance(bb, aa);

            // 如果存在初始角度 则开始判断角度累积
            var arc = arcStart - this.deg(p.position, a.position);
            // 累积过后的角度是否超过了极限值 或者 如果到了最后一个了 或者 action类型不同分段
            if (
              // 当角度大于等于最大默认角度
              ((Math.abs(arc) >= arcMax ||
                // 动作发生变化
                p.action != a.action) &&
                // 判断距离
                diff > 0.8) ||
              // 是最后的点
              i == data.length - 1
            ) {
              // 超过极限值后
              // 将上一个点作为线段的结束
              path.push(data[i - 1]);
              pathsLine.push(a);
              // 将线段存入总集里
              paths.push(path);
              // 创建新的线段并将当前点作为初始点
              path = [data[i - 1]];
              // 初始角度清空
              arcStart = this.deg(path[0].position, a.position);
              continue;
            } else {
            }
          }
        }
      }
      return pathsLine;
    },

    // 求2点之间的角度
    deg(p1, p2) {
      var x = p1[0] - p2[0];
      var y = p1[1] - p2[1];
      var deg = (Math.atan(Math.abs(x / y)) * 180) / Math.PI;
      if (x > 0) {
        if (y > 0) {
          // 第四象限
          deg = 180 - deg;
        } else {
          // 第一象限 不用改变
        }
      } else {
        if (y > 0) {
          // 第三象限
          deg = 180 + deg;
        } else {
          // 第二象限
          deg = 360 - deg;
        }
      }
      return deg;
    }
  }
};
</script>

<style>
.shijiaostart:hover {
  border-radius: 50%;
  box-shadow: 0px 0px 3px #ffffff;
}

.shijiaostart {
  transition: all 0.25s;
  cursor: pointer;
  position: absolute;
  top: 65px;
  right: 5px;
}
.shijiaoend:hover {
  border-radius: 50%;
  box-shadow: 0px 0px 3px #ffffff;
}

.shijiaoend {
  transition: all 0.25s;
  cursor: pointer;
  position: absolute;
  top: 65px;
  right: 5px;
}

.navigationMode {
  position: absolute;
  top: 0px;
  left: 50%;
  padding: 15px;
  border-radius: 4px;
  transform: translateX(-50%);
  color: #ead4d4;
  font-size: 16px;
  display: flex;
  align-items: center;
  width: 100%;
  z-index: 1000;
}

.backBtn {
  padding: 4px;
  background: #43657d;
  border-radius: 4px;
  color: #fff;
  margin-left: 14px;
  cursor: pointer;
}

/* .backBtn:hover {
        background: #ead4d4;
    } */
</style>
