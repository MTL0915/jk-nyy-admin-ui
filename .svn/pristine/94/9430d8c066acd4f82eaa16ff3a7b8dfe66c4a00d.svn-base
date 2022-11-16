<template>
  <div
    class="addTask"
    v-show="isShow"
  >
    <!-- 头部 -->
    <div class="addTaskHead">
      <img
        @click="back"
        :src="require('@/assets/img/Plan/drawLineMap/qp/jtz.png')"
      />
      <span
        @click="back"
        style="font-size:14px;"
      >新增任务</span>
    </div>
    <!-- 身体 -->
    <div class="">
      <div class="addTaskModel">
        <div class="addTaskModelName">设备名称：</div>
        <div>{{ device.name }}</div>
      </div>
      <div class="addTaskModel">
        <div class="addTaskModelName need">任务名称：</div>
        <div>
          <input
            class="inputStyle"
            type="text"
            v-model="form.taskName"
          />
        </div>
      </div>
      <div class="addTaskModel">
        <div class="addTaskModelName need">任务类型：</div>
        <div>
          <select
            class="taskType inputStyle"
            v-model="form.taskType"
            @change="changeTaskType()"
          >
            <option
              v-for="(it, i) in taskType"
              :key="i"
              :value="it.id"
            >{{
              it.name
            }}</option>
          </select>
        </div>
      </div>
      <div class="addTaskModel">
        <div class="addTaskModelName">执行速度：</div>
        <div>
          <el-slider
            style="width: 150px;"
            v-model="form.speed"
            :step="0.1"
            :max="1.5"
            show-stops
          >
          </el-slider>
        </div>
      </div>
      <div class="addTaskModel">
        <div class="addTaskModelName">操作模式</div>
        <div class="flex width">
          <el-radio-group v-model="form.controlMode">
            <el-radio :label="1">手动</el-radio>
            <el-radio :label="2">自动</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="addTaskModel">
        <div class="addTaskModelName">操作机手：</div>
        <div>
          <input
            type="text"
            v-model="form.czjs"
            class="taskType inputStyle"
          />
        </div>
      </div>
      <div
        class="addTaskModel"
        v-show="form.controlMode === 2"
      >
        <div class="addTaskModelName need">开启日期：</div>
        <div>
          <el-date-picker
            v-model="form.startDate"
            size="mini"
            style="width:160px;"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
      </div>
      <div
        class="addTaskModel"
        v-show="form.controlMode === 2"
      >
        <div class="addTaskModelName need">结束日期：</div>
        <div>
          <el-date-picker
            v-model="form.endDate"
            size="mini"
            style="width:160px;"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptionsEnd"
          >
          </el-date-picker>
        </div>
      </div>
      <div
        class="addTaskModel"
        v-show="form.controlMode === 2"
      >
        <div class="addTaskModelName need">任务周期：</div>
        <div class="timeZhouQi">
          <div
            @click="clickZhouQi(1)"
            :class="{ active: form.weeks.indexOf(1) > -1 }"
          >
            星期一
          </div>
          <div
            @click="clickZhouQi(2)"
            :class="{ active: form.weeks.indexOf(2) > -1 }"
          >
            星期二
          </div>
          <div
            @click="clickZhouQi(3)"
            :class="{ active: form.weeks.indexOf(3) > -1 }"
          >
            星期三
          </div>
          <div
            @click="clickZhouQi(4)"
            :class="{ active: form.weeks.indexOf(4) > -1 }"
          >
            星期四
          </div>
          <div
            @click="clickZhouQi(5)"
            :class="{ active: form.weeks.indexOf(5) > -1 }"
          >
            星期五
          </div>
          <div
            @click="clickZhouQi(6)"
            :class="{ active: form.weeks.indexOf(6) > -1 }"
          >
            星期六
          </div>
          <div
            @click="clickZhouQi(7)"
            :class="{ active: form.weeks.indexOf(7) > -1 }"
          >
            星期日
          </div>
        </div>
      </div>
      <div
        class="addTaskModel"
        v-show="form.controlMode === 2"
      >
        <div class="addTaskModelName need">开始时间：</div>
        <div>
          <el-time-picker
            size="mini"
            style="width:160px;"
            v-model="form.startTime"
            :picker-options="{
              selectableRange: '00:00:00 - ' + endTime
            }"
            @change="changeStartData"
            placeholder="任意时间点"
          >
          </el-time-picker>
        </div>
      </div>
      <div class="addTaskModel">
        <div
          class="drawBtn"
          @click="draw"
          v-show="isDraw"
        >
          <span>绘制</span>
          <img :src="require('@/assets/img/Plan/drawLineMap/qp/ditu.png')" />
        </div>
      </div>
    </div>

    <div class="footor">
      <!-- <div
        class='save'
        @click='draw'
      >
        <span>绘制</span>
      </div> -->
      <div
        class="save"
        @click="save"
      >保存</div>
      <div
        class="close"
        @click="back"
      >取消</div>
    </div>
  </div>
</template>

<script>
import {
  addRouteJobLine_,
  createRouteJob_, //创建路径
  routeJobPath_, //创建路径的路线
  routeJobType_,
  getDevice
} from "../../../data/data";
import bus from "../../../util/bus";
import ws from "../../../websocket/py_ws";
import { map3d } from "@/utils/jiankun_map";
export default {
  props: {},
  data () {
    var __data = {
      device: {},
      isDraw: true,
      isShow: false,
      form: {
        id: this.getMathRandom(),
        deviceName: "1号无人喷药车",
        taskName: "",
        taskType: "",
        taskTypeId: "",
        speed: 0.5,
        mode: 1, //模式
        czjs: "廖威仲",
        startDate: "",
        endDate: "",
        endTime: "",
        startTime: "",
        weeks: [1, 2, 3, 4, 5],
        color: "#ff0000",
        path: [], // 绘制的线段存储
        pointTask: [] // 每段线段的任务创建
      },
      taskType: [],
      pathListData: [], //可能会存在的路径预处理对象
      graphic: null,
      startTime: "00:00:00",
      endTime: "23:59:59",
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() <= Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick (picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "明天",
            onClick (picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周后",
            onClick (picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      pickerOptionsEnd: {
        disabledDate (time) {
          return time.getTime() <= Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick (picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "明天",
            onClick (picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周后",
            onClick (picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
    return __data;
  },
  mounted () {
    bus.$on("taskAdd_show", (params = {}) => {
      this.isShow = true;
      if (params.isDraw !== undefined) {
        this.isDraw = params.isDraw;
      } else {
        this.isDraw = true;
      }
      this.init();
    });
    bus.$on("taskAdd_hide", () => {
      this.isShow = false;
    });
    bus.$on("taskAdd_setPath", (path, pathListData) => {
      this.form.path = path;
      this.pathListData = pathListData;
    });
    // 回到实时监控模式的时候进行的行为
    bus.$on("taskAdd_switchMode", () => {
      this.isShow = false;
      // 清除绘制的图形
      this.graphic && this.graphic.layer.removeAll();
      this.graphic = null;
    });
    this.routeJobType();
    this.getDevice();
  },
  methods: {
    getDevice () {
      var device_id = this.$route.query.device_id;
      getDevice(device_id).then(res => {
        this.device = res.data;
      });
    },

    // 获取任务类型
    routeJobType () {
      routeJobType_().then(res => {
        this.taskType = res.data.content;
      });
    },

    clickZhouQi (XQ) {
      var weeks = this.form.weeks;
      if (weeks.indexOf(XQ) != -1) {
        weeks.splice(weeks.indexOf(XQ), 1);
      } else {
        weeks.push(XQ);
        weeks.sort();
      }
    },

    test1 () {
      this.endTime =
        this.form.endTime.getHours() +
        ":" +
        this.form.endTime.getMinutes() +
        ":" +
        this.form.endTime.getSeconds();
    },

    test (e) {
      this.startTime =
        this.form.startTime.getHours() +
        ":" +
        this.form.startTime.getMinutes() +
        ":" +
        this.form.startTime.getSeconds();
    },

    changeTaskType () {
      var data = this.taskType.find(e => {
        return this.form.taskType === e.id;
      });
      this.form.taskTypeId = data.id;
      this.form.taskTypeName = data.name;
    },

    getMathRandom () {
      return parseInt(Math.random()) * 10000 + new Date() * 1;
    },

    // 初始化
    init () {
      this.form = {
        id: this.getMathRandom(),
        deviceName: "1号无人喷药车",
        taskName: "",
        taskType: "",
        taskTypeId: "",
        speed: "",
        controlMode: 1, //模式
        czjs: "",
        startDate: "",
        endDate: "",
        endTime: "",
        startTime: "",
        weeks: [],
        path: [], // 绘制的线段存储
        pointTask: [] // 每段线段的任务创建
      };
    },

    save () {
      if (!this.form.taskName) {
        this.$message({
          message: "这个任务还没有填写任务名称",
          type: "warning"
        });
        return;
      }

      // 判断如果没有绘制 则提示她当前任务没有路径
      if (this.form.path.length === 0) {
        this.$message({
          message: "这个任务还没有配置路径，请先绘制任务路径",
          type: "warning"
        });
        return;
      }

      // 判断是否有选择任务类型
      if (!this.form.taskType) {
        this.$message({
          message: "请选择任务类型",
          type: "warning"
        });
        return;
      }

      // 判断是否有选择任务类型
      if (this.form.controlMode != 1) {
        // 如果不是手动模式
        // 判断时间是否不为空
        if (
          !this.form.startTime ||
          !this.form.startDate ||
          !this.form.endDate ||
          this.form.weeks.length == 0
        ) {
          this.$message({
            message: "自动模式下 请补全时间配置信息",
            type: "warning"
          });
          return;
        }
      }

      var path = this.form.path.map(e => {
        return map3d.esri.webMercatorUtils.xyToLngLat(e[0], e[1]);
      });

      // 将坐标逆转成实际坐标点
      // path = ws.uncorrectPosition(path);
      // path = ws.correctPosition(path);
      // var wsa = ws;

      if (this.isDraw) {
        // 将坐标逆转成实际坐标点
        path = ws.uncorrectPosition(path);
      }

      routeJobPath_({
        endLat: path[path.length - 1][1],
        endLon: path[path.length - 1][0],
        hd_device_id: this.device.id,
        hd_device_name: this.device.name,
        name: this.form.taskName,
        path: JSON.stringify(path),
        startLat: path[0][1],
        startLon: path[0][0]
      }).then(res => {
        this.pathData = res.data;
        var id = res.data.id;

        var startDate = this.form.startDate
          ? this.form.startDate.getFullYear().toString() +
          "-" +
          (this.form.startDate.getMonth() + 1 > 9
            ? this.form.startDate.getMonth() + 1
            : "0" + (this.form.startDate.getMonth() + 1)) +
          "-" +
          (this.form.startDate.getDate() > 9
            ? this.form.startDate.getDate()
            : "0" + this.form.startDate.getDate())
          : "";

        var endDate = this.form.endDate
          ? this.form.endDate.getFullYear().toString() +
          "-" +
          (this.form.endDate.getMonth() + 1 > 9
            ? this.form.endDate.getMonth() + 1
            : "0" + (this.form.endDate.getMonth() + 1)) +
          "-" +
          (this.form.endDate.getDate() > 9
            ? this.form.endDate.getDate()
            : "0" + this.form.endDate.getDate())
          : "";

        var startTime = this.form.startTime
          ? (this.form.startTime.getHours() > 9
            ? this.form.startTime.getHours()
            : "0" + this.form.startTime.getHours()) +
          ":" +
          (this.form.startTime.getMinutes() > 9
            ? this.form.startTime.getMinutes()
            : "0" + this.form.startTime.getMinutes())
          : "";

        // 提交服务器保存
        createRouteJob_({
          controlMode: this.form.controlMode,
          hd_device_id: this.device.id,
          hd_device_name: this.device.name,
          name: this.form.taskName,
          operationUser: this.form.czjs,
          routeJobPathName: this.form.taskName,
          routeJobTypeId: this.form.taskTypeId,
          routeJobTypeName: this.form.taskTypeName,
          routeJobPathId: id,

          speed: this.form.speed,
          startDate: startDate,
          endDate: endDate,
          startTime: startTime,
          weeks: this.form.weeks.join(",")
        }).then(res => {
          this.task = res.data;
          // 为每一个线段生成路段配置
          this.createPathList(path, 0, () => {
            // 初始化方法z
            this.init();
            this.graphic &&
              this.graphic.layer &&
              this.graphic.layer.remove(this.graphic);
            this.$message({
              type: "success",
              message: "添加成功"
            });
            // 隐藏自己
            this.isShow = false;
            // 显示任务列表
            bus.$emit("taskList_show");
            bus.$emit("taskList_refresh");
          });
        });
      });
      return;
    },

    createPathList (path, index = 0, fn) {
      if (index >= path.length - 1) {
        fn && fn();
        return;
      }
      // var activeTask = this.task;
      var json = {
        distance: 0,
        name: "路段" + (index + 1),
        path: JSON.stringify([index, index + 1]),
        color: "#ffffff",
        pathSpot: "",
        routeJobPathId: this.pathData.id,
        routeJobPathName: this.pathData.name,
        actionConfig: this.pathListData[index] || "{}"
      };

      addRouteJobLine_(json).then(res => {
        this.createPathList(path, ++index, fn);
      });
    },

    back () {
      // 隐藏自己
      this.isShow = false;
      // 显示任务列表
      bus.$emit("taskList_show");
      // 清除可能存在的几何
      this.graphic && this.graphic.layer.remove(this.graphic);
      this.graphic = null;
      // 解除可能会出现的绘制情况
      this.mapdraw && this.mapdraw.cancel();
      this.mapdraw = null;
      // 清除掉绘制的线

      // 初始化方法
      this.init();
    },

    // 改变线段颜色
    changePathColor (event) {
      // 调用颜色变化事件
      this.$parent.$refs.deviceList.changeCurrentPathColor(event.target.value);
    },

    // 绘制自己的路线
    draw () {
      var item = this.form;
      // 如果已经有绘制几何
      if (item.path.length != 0) {
        this.$confirm("此操作将删除已经绘制的几何?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          // 清除记录的点
          item.path = [];
          // 然后删除掉已经创建的几何
          this.graphic &&
            this.graphic.layer &&
            this.graphic.layer.remove(this.graphic);
          this.graphic = null;
          // 重新执行draw函数
          this.draw();
        });
        return;
      }
      this.mapdraw = map3d.Util.draw("polyline", res => {
        // 将几何计算像个不得小于0.8米
        var path = res.graphic.geometry.paths[0];
        // 是否有删除重复的操作
        var isdel = false;
        // 最后一个不用比较 所以length-1
        for (var i = 0; i < path.length - 1; i++) {
          var bb = new map3d.esri.Point(path[i], window.view.spatialReference);
          var aa = new map3d.esri.Point(
            path[i + 1],
            window.view.spatialReference
          );
          // 获取距离
          var diff = map3d.esri.geometryEngine.distance(bb, aa);
          // 如果小于0.8米
          if (diff < 0.8) {
            isdel = true;
            // 去除掉这个数组
            path.splice(i + 1, 1);
            // 将下标i-1
            i--;
          }
        }
        if (isdel) {
          this.$message({
            type: "warning",
            message: "检测到过于接近的节点，已经将其合并处理！"
          });
        }
        // 将几何保存进入
        item.path = res.graphic.geometry.paths[0];
        // 删除掉绘制的图层以及图形
        res.graphic.layer.remove(res.graphic);
        // 显示设备路线
        this.showTaskPath(item);
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
      bus.$emit("map_getView", view => {
        var geometry = map3d.Util.createPolyline(
          path,
          view.spatialReference.wkid
        );
        var symbol = this.getLineSymbol();
        var a = map3d;
        var graphic = new map3d.esri.Graphic({ geometry, symbol });
        map3d.Util.addGraphic(graphic, "taskAdd", view);
        // 视角移动指定路线
        view.goTo({
          target: geometry.extent
        });
        this.graphic = graphic;
      });
    },

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

    // 绘制田块
    drawPolygon () {
      var item = this.form;
      map3d.Util.draw("polygon", res => {
        // 删除掉绘制的图层以及图形
        res.graphic.layer.remove(res.graphic);

        // 获取几何正方形4个角度的坐标
        var extent = res.graphic.geometry.extent;
        var xy = [extent.xmax, extent.ymax];
        var xy1 = [extent.xmin, extent.ymin];

        var count = 50;

        var xdiff = (xy[0] - xy1[0]) / count;
        var ydiff = (xy[1] - xy1[1]) / count;
        var points = [];

        var graphic = map3d.Util.createPolygon({
          rings: [
            [
              [extent.xmax, extent.ymax],
              [extent.xmax, extent.ymin],
              [extent.xmin, extent.ymin],
              [extent.xmin, extent.ymax],
              [extent.xmax, extent.ymax]
            ]
          ],
          spatialReference: { wkid: 102100 },
          color: [0, 0, 0, 0.85]
        });
        // map3d.Util.addGraphic( graphic )

        // 根据直角在矩形范围内进行模拟生成点
        for (var x = 0; x <= count; x++) {
          var ps = [];
          for (var y = 0; y <= count; y++) {
            // 创建新点
            var point = map3d.Util.createPoint(
              [xy1[0] + xdiff * x, xy1[1] + ydiff * y],
              view.spatialReference
            );

            // 判断点是否在几何中
            if (res.graphic.geometry.contains(point)) {
              ps.push([xy1[0] + xdiff * x, xy1[1] + ydiff * y]);
              // var graphic = map3d.Util.createGraphic({
              //     geometry: point,
              //     symbol: {
              //         type: "point-3d",  // autocasts as new PointSymbol3D()
              //         symbolLayers: [{
              //             type: "object",  // autocasts as new ObjectSymbol3DLayer()
              //             width: 10,  // diameter of the object from east to west in meters
              //             height: 10,  // height of the object in meters
              //             depth: 10,  // diameter of the object from north to south in meters
              //             resource: { primitive: "sphere" },
              //             material: { color: "red" }
              //         }]
              //     }
              // })
              // map3d.Util.addGraphic(graphic,"测试");
            }
          }
          // 判断是但还是双
          if (x % 2 === 1) {
            // 是单的时候逆转一下
            ps.reverse();
          }
          points = points.concat(ps);
        }

        // 将结果绘制成线段
        var geometry = map3d.Util.createPolyline(
          points,
          view.spatialReference.wkid
        );
        var graphic = map3d.Util.createGraphic({
          geometry,
          symbol: {
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
          }
        });
        map3d.Util.addGraphic(graphic);
      });
    }
  }
};
</script>

<style scoped>
.saveOption {
  display: none;
  position: absolute;
  left: 0;
  top: 25px;
  width: 100%;
  text-align: center;
  background: #35a24c;
}

.save:hover .saveOption {
  display: block;
}

.addTask {
  position: absolute;
  top: 60px;
  right: 4px;
  background: #131f2da8;
  width: 278px;
  border-radius: 4px;
  color: #ffffff;
}

.addTaskHead {
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: solid 1px #ffffff;
  padding: 8px;
  display: flex;
  align-items: center;
}

.addTaskHead img {
  width: 12px;
}

.addTaskModel {
  display: flex;
  padding: 8px 19px;
  align-items: center;
}

.addTaskModelName {
  width: 62px;
  flex-shrink: 0;
  position: relative;
}

input[type="text"],
select {
  width: 160px;
}
input[type="text"],
select,
button {
  border-radius: 4px;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.width {
  width: 100%;
}

.cur {
  cursor: pointer;
}

.footor {
  display: flex;
  justify-content: space-around;
  padding: 9px;
  font-size: 12px;
  margin-top: 10px;
}

.save {
  padding: 6px 12px;
  background: #318ad5;
  border-radius: 4px;
  color: #ffffff;
  font-size: 12px;
  cursor: pointer;
  position: relative;
}

.close {
  padding: 6px 12px;
  background: #ffffff;
  border-radius: 4px;
  color: #4e4d4d;
  font-size: 12px;
  cursor: pointer;
}

.inputStyle {
  padding: 6px 6px;
  border: none;
  border-radius: 1px;
  background: #84848480;
  color: #fff;
}

.timeZhouQi {
  display: flex;
  flex-wrap: wrap;
}
.timeZhouQi > div {
  padding: 4px;
  background: #575e6ba8;
  color: #ffffff;
  border-radius: 4px;
  margin: 5px;
  cursor: pointer;
}
.timeZhouQi > div:hover {
  background: #318ad5a8;
}
.timeZhouQi > div.active {
  background: #318ad5;
}

.drawBtn {
  width: 100%;
  height: 100%;
  padding: 5px;
  text-align: center;
  background: #318ad5;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  transition: transform 0.25s;
}

.drawBtn:active {
  transform: scale(0.9);
}

.drawBtn > img {
  position: absolute;
  left: 38%;
  width: 12px;
}

.addTaskModelName.need:after {
  content: "*";
  position: absolute;
  left: -10px;
  color: red;
  top: -2px;
  font-size: 24px;
}
</style>
