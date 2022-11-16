<template>
  <div class="drawLineMap">
    <img
      class="lwz"
      v-show="!isAuthority"
      :src="require('@/assets/img/Plan/drawLineMap/timg.gif')"
    />
    <!-- <div class='test' style='position:absolute;top:0;left:0;width:100%;color:red;z-index: 99'>
            {{position}}
        </div> -->
    <comp-head
      :active="headActive"
      :name="headActive"
      v-show="!showUnmanned"
    ></comp-head>

    <comp-pointInfo
      ref="pointInfo"
      :positionCorrection="positionCorrection"
      :deviceConfig="deviceConfig"
      :device="deviceData"
      :property_values="property_values"
    ></comp-pointInfo>

    <!-- 实时监控模块 -->
    <div
      class="contenBox"
      v-if="headActive === 1"
    >
      <comp-unmanned
        ref="unmanned"
        :headActive="headActive"
        :view="view"
        :deviceData="deviceData"
        :device_id="device_id"
        :ws="ws"
        :deviceWsUpdate="deviceWsUpdateFunction"
      ></comp-unmanned>
      <!-- <img class='shijiaostart' @click="shijiaostart" :src='require("@/assets/img/editMap/shijiaostart.png")' /> -->
      <comp-video ref="video"></comp-video>
    </div>

    <!-- 任务管理 -->
    <div
      class="contenBox"
      v-if="headActive === 2"
    >
      <comp-devicelist
        ref="deviceList"
        :property_values="property_values"
        v-show="showDeviceList"
        :deviceTypeData="deviceTypeData"
        :publicData="publicData"
      ></comp-devicelist>
      <comp-taskList
        ref="taskList"
        v-show="showtaskList"
        :deviceTypeData="deviceTypeData"
        :publicData="publicData"
      ></comp-taskList>
      <comp-taskListInfo
        ref="taskListInfo"
        v-show="showtaskListInfo"
        :deviceTypeData="deviceTypeData"
        :publicData="publicData"
      ></comp-taskListInfo>
      <comp-addtask
        ref="addTask"
        v-show="showAddTask"
        :publicData="publicData"
      ></comp-addtask>
      <comp-edittask
        ref="editTask"
        v-show="showEditTask"
        :ws="ws"
        :deviceWs="deviceWsUpdate"
        :publicData="publicData"
      ></comp-edittask>
      <comp-pathlist
        ref="pathList"
        v-show="showPathlist"
        :sensorBtn="sensorBtn"
        :deviceTypeData="deviceTypeData"
        :publicData="publicData"
      ></comp-pathlist>
      <comp-tasknotes
        ref="taskNotes"
        v-show="showTaskNotes"
        :deviceTypeData="deviceTypeData"
        :publicData="publicData"
      ></comp-tasknotes>
      <comp-runtask
        ref="runTask"
        v-show="showRunTask"
        :deviceWs="deviceWsUpdate"
        :property_values="property_values"
        :deviceTypeData="deviceTypeData"
        :publicData="publicData"
      ></comp-runtask>
      <comp-WarnStop
        ref="warnStop"
        :property_values="property_values"
      ></comp-WarnStop>
      <comp-taskRecord ref="taskRecord"></comp-taskRecord>
    </div>

    <!-- 头像部分 -->
    <comp-headPortrait
      ref="headPortrait"
      :deviceConfig="deviceConfig"
      :headActive="headActive"
      :device="deviceData"
      :ws="ws"
    ></comp-headPortrait>

    <JKMap3d
      :load="mapLoad"
      class="mapBox"
    ></JKMap3d>

    <!-- 设置配置 -->
    <div
      class="contenBox"
      style="z-index: 999999;"
      v-show="showConfigEdit"
    >
      <comp-config
        ref="config"
        :device_id="deviceData.device_id"
        :deviceConfig="deviceConfig"
      ></comp-config>
    </div>

    <!-- 导航页面 -->
    <comp-navigation
      :publicData="publicData"
      :device="deviceData"
      :deviceWs="deviceWsUpdate"
      ref="navigation"
    ></comp-navigation>
    <!-- <comp-showPath v-show='showShowPath'></comp-showPath> -->
    <!-- <no-manOpt ref='nomanOpt' class='nomanOpt' v-if='publicData.activeDevice.code' :device_id='publicData.activeDevice.code' :device='publicData.activeDevice' :updateInfo='updateInfoFunction'></no-manOpt> -->
  </div>
</template>

<script>
import { map3d } from "@/utils/jiankun_map";

window.map3d = map3d;

import {
  routeDevices, //获取具有规划路径属性的功能设备
  routeJobType, //获取任务类型接口
  routeJobAction // 获取任务路段类型接口
} from "@/api/map3d/drawMap";

import compHead from "./components_drawLine/head";
import compDevicelist from "./components_drawLine/deviceList";
import compTaskList from "./components_drawLine/taskList";
import compTaskListInfo from "./components_drawLine/taskListInfo";
import compAddtask from "./components_drawLine/addTask";
import compEdittask from "./components_drawLine/editTask";
import compPathlist from "./components_drawLine/pathList";
import compTasknotes from "./components_drawLine/taskNotes";
import compRuntask from "./components_drawLine/runTask";
import compPointInfo from "./components_drawLine/pointInfo";
import compWarnStop from "./components_drawLine/warnStop";
import compTaskRecord from "./components_drawLine/taskRecord";

import compVideo from "./components_unmanned/video";
import compHeadPortrait from "./components_unmanned/headPortrait";
import compNavigation from "./components_unmanned/navigation";
import { getDetailById } from "@/api/equip";

import compUnmanned from "./unmanned";
import compConfig from "./config";

// 加载控制模组
// import noManOpt from './components_unmanned/noManOpt/noManOpt'

// import compShowPath from './components_drawLine/showPath'

// ws
import ws from "./components_unmanned/noManOpt/Control.js";

export default {
  components: {
    compHead,
    compDevicelist,
    compTaskList,
    compTaskListInfo,
    compAddtask,
    compEdittask,
    compPathlist,
    compTasknotes,
    // compShowPath
    compUnmanned,
    compRuntask,
    compConfig,
    compPointInfo,
    compWarnStop,
    compVideo,
    compHeadPortrait,
    compTaskRecord,
    compNavigation
    // 控制模组
    // noManOpt
  },
  watch: {
    headActive (data) {
      if (data == 1) {
        var item = view.map.layers.items;
        for (var i = 0; i < item.length;) {
          var e = item[i];
          e.declaredClass == "esri.layers.GraphicsLayer" &&
            e.id != "pointInfo" &&
            e.id != "pointInfoLine" &&
            e.id != "自动导航"
            ? view.map.layers.remove(e)
            : i++;
        }
        // 如果不存在pointInfoLine图层的话则添加
        if (!view.map.findLayerById("pointInfoLine")) {
          view.map.add(this.$refs.pointInfo.layerLine);
        }
        // 重启一下摄像头
        var url = this.configForm.find(e => {
          return e.name === "video_url";
        });
        if (url && url.value != "" && url.value) {
          // 如果存在视频流地址
          setTimeout(() => {
            this.$refs.video.playVideo(url.value);
          }, 300);
        }
      } else if (data == 2) {
        this.initUnmanned();
      }
    }
  },
  data () {
    return {
      DOMAIN: process.env.DOMAIN,
      isAuthority: false,
      deviceData: {},
      // 来自首页头部的选择
      headActive: 1,

      bs_base_id: "ff8080817209852b017217b7fbd801be",

      // 获取url传入的设备序列号
      device_id: param.id,

      position: "",

      showDeviceList: true,
      showtaskList: false,
      showtaskListInfo: false,
      showAddTask: false,
      showEditTask: false,
      showPathlist: false,
      showTaskNotes: false,
      showRunTask: false,
      showConfigEdit: false,

      showUnmanned: false,

      ws: new ws(param.id),

      defaultActive: null,

      // 农机数据
      deviceTypeData: [
        {
          id: 1,
          name: "开沟施肥机",
          status1: 4,
          status2: 8,
          children: [
            {
              id: 1,
              name: "开沟施肥机1号",
              status: 0, // 状态 0 已离线 1 正在作业
              phone: "18321406920",
              master: "廖威仲",
              path: [],
              task: []
            }
          ]
        },
        {
          id: 2,
          name: "开沟施肥机",
          status1: 4,
          status2: 8
        },
        {
          id: 3,
          name: "开沟施肥机",
          status1: 4,
          status2: 8
        }
      ],

      publicData: {
        // 当前选中设备
        activeDevice: {},
        // 当前选中任务
        activeTask: {},
        // 任务类型
        taskType: [],
        // 子任务的类型
        taskLineType: [],
        // 保存的路线数据
        pathData: [],
        // 在添加任务作业的状态中
        isAddtask: false,
        // 在添加路段状态中
        isAddPath: false
      },

      // 获取设备配置数据
      deviceConfig: [],

      // 设备ws上报数据
      channelValue: [],
      property_values: {},
      sensorInfos: [],
      deviceWsUpdate: {},

      sensorBtn: [],

      view: null,

      // 设备配置信息
      configForm: [],
      positionCorrection: ""
    };
  },
  mounted () {
    window.getData = () => {
      return this.publicData;
    };
    // 开启默认数据加载
    this.getData();
    // 加载设备信息
    this.getDevice();
    // 监听websocket上传
    this.ws.onupdateInfo = data => {
      window.ws_info = data.data;
      var info = data.data;
      // 收到上传信息将设备状态改为在线
      this.deviceData.status = 1;
      // 处理ws上报数据
      this.channelValue = info.channelValue;
      this.property_values = info.property_values;
      this.sensorInfos = info.sensorInfos;
      this.deviceWsUpdate = info;
      this.$refs.unmanned && this.$refs.unmanned.deviceWsUpdateFunction(info);
      this.$refs.headPortrait &&
        this.$refs.headPortrait.deviceWsUpdateFunction(info);
    };

    this.ws.onerrorinfo = res => {
      // this.$message({
      //     type: "error",
      //     message: res.msg
      // })
    };

    this.ws.ondisupdateInfo = data => {
      // 如果是离线状态下 则不显示页面信息ui和控制ui
      this.$alert("该设备不在线", "提示", {
        confirmButtonText: "确定",
        callback: action => { }
      });
      // 收到上传信息将设备状态改为离线
      this.deviceData.state = 0;
      this.$refs.headPortrait && this.$refs.headPortrait.setPowerClose();
    };
  },
  methods: {
    initUnmanned () {
      // 清空当前选中的任务
      this.publicData.activeTask = {};
      this.showDeviceList = true;
      this.showtaskList = false;
      this.showtaskListInfo = false;
      this.showAddTask = false;
      this.showEditTask = false;
      this.showPathlist = false;
      this.showTaskNotes = false;
      this.showRunTask = false;
      this.showConfigEdit = false;
      this.showUnmanned = false;
    },

    // 获取设备信息
    getDevice () {
      getDetailById({
        device_id: this.device_id
      }).then(e => {
        if (e.code == 500) {
          this.$message({
            showClose: true,
            message: "你没有这个设备的权限",
            type: "warning",
            duration: 0
          });
        } else {
          var location = e.data.innerStatus.property_values.location;
          if (!location) {
            this.$message({
              type: "error",
              message: "初始化设备位置信息加载失败"
            });
          } else {
            this.mapCenter([location[1], location[0]], 17);
            // this.position = location;
          }

          this.isAuthority = true;
          this.deviceData = e.data;

          // 从设备传感器中抽出可以控制的阀门
          this.sensorBtn = JSON.parse(
            JSON.stringify(
              e.data.sensor.filter(e => {
                return ["101", "102"].indexOf(e.hd_sensor_type_code) > -1;
              })
            )
          );

          // 判断在线状态
          if (this.deviceData.state == 0) {
            var key = setInterval(() => {
              if (!this.view) {
                return;
              }
              clearInterval(key);
              key = null;
              var property_values = this.deviceData.innerStatus.property_values;
              var info = {
                channelValue: this.deviceData.sensor.map(e => {
                  return e.value * 1;
                }),
                controlType: property_values.controlType,
                device_id: this.deviceData.device_id,
                hd_device_id: this.deviceData.id,
                id: this.deviceData.id,
                property_values: property_values,
                sensorInfos: this.deviceData.sensor,
                state: 0
              };
              // 将表示识别为离线
              property_values.state = 0;
              this.channelValue = info.channelValue;
              this.property_values = info.property_values;
              this.sensorInfos = info.sensorInfos;
              this.deviceWsUpdate = info;
              this.$refs.unmanned &&
                this.$refs.unmanned.deviceWsUpdateFunction(info);
              this.$refs.headPortrait &&
                this.$refs.headPortrait.deviceWsUpdateFunction(info);
            });
            // 如果是离线状态下 则不显示页面信息ui和控制ui
            this.$alert("该设备不在线", "提示", {
              confirmButtonText: "确定",
              callback: action => { }
            });
          }
        }
      });
    },

    mapCenter (xy, zoom) {
      if (this.view) {
        var g = this.view.center.clone();
        if (xy[0] > 1000) {
          g.x = xy[0];
          g.y = xy[1];
        } else {
          g.longitude = xy[0];
          g.latitude = xy[1];
        }
        this.view.center = g;

        this.view.zoom = zoom;
      } else {
        this.position = xy;
      }
    },

    // 接受上传数据
    updateInfoFunction (e) {
      //
    },

    getData () {
      // 获取规划路径的设备
      this.getRouteDevice();
      // 获取任务类型
      this.getTaskType();
    },

    getTaskType () {
      routeJobType().then(res => {
        this.publicData.taskType = res.data.content;
      });
      routeJobAction().then(res => {
        this.publicData.taskLineType = res.data.content;
      });
    },

    getRouteDevice () {
      routeDevices({
        bs_base_id: this.bs_base_id
      }).then(res => {
        // 将数据解析获取设备种类
        var deviceType = [];
        var ary = [];
        for (var i = 0; i < res.data.length; i++) {
          var it = res.data[i];
          var det = deviceType.find(e => {
            return e.name === it.hd_device_type_name;
          });
          if (!det) {
            var devJson = {
              id: it.id,
              code: it.device_id,
              name: it.name, //"开沟施肥机1号",
              status: it.state, // 状态 0 已离线 1 正在作业
              phone: "18321406920",
              master: "廖威仲",
              path: [],
              task: [],
              ...it
            };
            var json = {
              name: it.hd_device_type_name,
              status1: it.state == 1 ? 1 : 0,
              status2: it.state == 0 ? 1 : 0,
              children: [devJson]
            };
            if (it.device_id === this.device_id) {
              // 如果这个对象的编码等于传入编码
              this.defaultActive = devJson;
            }
            // 如果不存在类型
            deviceType.push(json);
            ary.push(json);
          } else {
            it.state == 1 ? det.status1++ : det.status2++;
            var json = {
              id: it.id,
              code: it.device_id,
              name: it.name, //"开沟施肥机1号",
              status: it.state, // 状态 0 已离线 1 正在作业
              phone: "18321406920",
              master: "廖威仲",
              path: [],
              task: [],
              ...it
            };
            if (it.device_id === this.device_id) {
              // 如果这个对象的编码等于传入编码
              this.defaultActive = json;
            }
            det.children.push(json);
            ary.push(json);
          }
        }
        this.deviceTypeData = deviceType;
      });
    },

    // 地图加载完毕事件
    mapLoad (view) {
      this.view = view;

      // this.$refs.unmanned.loadMap(view);

      // var tileLayer2=new map3d.esri.TileLayer("http://'+this.DOMAIN+'/arcgis3d/rest/services/Hosted/gdnyjstgzz/MapServer");

      // var layer = new map3d.esri.IntegratedMeshLayer({
      //     // 这个就是url
      //     url: "http://121.32.129.19:8100/arcgis3d//rest/services/Hosted/nyjstgz3/SceneServer",
      //     copyright:"jk",
      //     elevationInfo:{
      //         mode:"absolute-height",
      //         offset:0
      //     },
      //     id: "3dLayer"
      // });
      // this.view.map.add(layer);

      window.view = view;

      // 如果存在位置
      if (this.position) {
        var key = setInterval(() => {
          if (view.center) {
            clearInterval(key);
            this.mapCenter(this.position, 17);
          }
        }, 100);
      }

      this.$refs.navigation.loadMap && this.$refs.navigation.loadMap(view);
    },

    draw () {
      map3d.Util.draw("polyline");
    },

    websocket () { },

    locaPosition (param) {
      if (this.point) {
        this.point.layer.removeAll();
        this.point = null;
      }
      view.zoom = 20;
      this.point = map3d.Util.createGraphic({
        geometry: {
          type: "point",
          x: param.x,
          y: param.y
        },
        symbol: {
          type: "point-3d", // autocasts as new PointSymbol3D()
          symbolLayers: [
            {
              type: "object", // autocasts as new ObjectSymbol3DLayer()
              width: 1, // diameter of the object from east to west in meters
              height: 1, // height of the object in meters
              depth: 1, // diameter of the object from north to south in meters
              resource: { primitive: "sphere" },
              material: { color: "red" }
            }
          ]
        }
      });
      map3d.Util.addGraphic(this.point, "tests");
      view.center = this.point.geometry;
    },

    // 矫正坐标 根据配置文件中的坐标偏转量
    jiaozheng (pointXYs) {
      var positionCorrection = this.positionCorrection;
      if (!positionCorrection) {
        return pointXYs;
      } else {
        positionCorrection = positionCorrection.split(",");
        return pointXYs.map(e => {
          return [
            e[0] * 1 + positionCorrection[0] * 1,
            e[1] * 1 + positionCorrection[1] * 1
          ];
        });
      }
    },

    // 逆转矫正 将地图上的坐标点通过矫正配置参数转换成实际坐标点
    unjiaozheng (pointXYs) {
      var positionCorrection = this.positionCorrection;
      if (!positionCorrection) {
        return pointXYs;
      } else {
        positionCorrection = positionCorrection.split(",");
        return pointXYs.map(e => {
          return [
            e[0] * 1 - positionCorrection[0] * 1,
            e[1] * 1 - positionCorrection[1] * 1
          ];
        });
      }
    }
  }
};
</script>

<style scoped>
.drawLineMap {
  width: 100%;
  height: 100%;
}
.contenBox {
  position: absolute;
  top: 0px;
  bottom: 0;
  width: 100%;
}
.contenBox > * {
  z-index: 999;
}
.mapBox {
  height: 100%;
}
.lwz {
  position: absolute;
  width: 100%;
  height: calc(100% + 35px);
  z-index: 9999999;
  margin-top: -35px;
}
</style>
<style>
.cur {
  transition: all 0.75s;
  cursor: pointer;
}
.cur.active {
  box-shadow: 0px 0px 8px #59aae2;
}
.cur:hover {
  box-shadow: 0px 0px 8px #59aae2;
}
.drawLineMap .esri-ui-corner {
  display: none;
}
.esri-widget {
  display: none;
}
.nomanOpt {
  position: absolute !important;
  top: 0;
}
</style>
