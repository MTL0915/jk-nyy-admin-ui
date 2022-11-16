<template>
  <!-- 无人车界面 -->

  <div class='plan_device_vue'>

    <!-- 地图模块 主要作用于地图显示 -->
    <comp-devicemap
      :deviceInfo="deviceInfo"
      :deviceConf="deviceConf"
    ></comp-devicemap>

    <!-- 设备状态栏 -->
    <comp-deviceStatus
      ref="deviceStatus"
      class="deviceStatusContainer"
      :deviceInfo="deviceInfo"
      :deviceConf="deviceConf"
    ></comp-deviceStatus>

    <!-- 设备运行状态栏 -->
    <comp-deviceRunStatus
      ref="deviceRunStatus"
      class="deviceStatusRunContainer"
      :deviceInfo="deviceInfo"
    ></comp-deviceRunStatus>

    <!-- 设备运行预警日志 -->
    <comp-deviceWarnLog
      ref="deviceWarnLog"
      class="deviceWarnLogContainer"
      :hd_device_id="deviceInfo.id"
    ></comp-deviceWarnLog>

    <!-- 设备操作栏 -->
    <comp-deviceOperationButton
      ref="deviceOperationButton"
      class="deviceOperationButtonContainer"
      :showCompFunc="showCompFunc"
      :hideCompFunc="hideCompFunc"
    ></comp-deviceOperationButton>

    <!-- 视频监控栏 -->
    <comp-videoMonitor
      ref="videoMonitor"
      class="videoMonitorContainer"
      :urlOptions="urlOptions"
      :hideCompFunc="hideCompFunc"
    ></comp-videoMonitor>

    <!-- 设备控制栏 -->
    <comp-deviceControl
      ref="deviceControl"
      class="deviceControlContainer"
      :hd_device_id="deviceInfo.id"
    ></comp-deviceControl>

    <!-- 设备参数设置栏 -->
    <comp-deviceAttributeConfig
      ref="deviceAttributeConfig"
      class="deviceAttributeConfigContainer"
      :updateDeviceConfFunc="updateDeviceConf"
      :hd_device_id="deviceInfo.id"
      :hideCompFunc="hideCompFunc"
    ></comp-deviceAttributeConfig>
  </div>
</template>

<script>
import compDevicemap from "./comps/map/deviceMap";
import compDeviceStatus from "./comps/deviceStatus";
import compDeviceRunStatus from "./comps/deviceRunStatus";
import compDeviceWarnLog from "./comps/deviceWarnLog";
import compDeviceOperationButton from "./comps/deviceOperationButton";
import compVideoMonitor from "./comps/videoMonitor";
import compDeviceControl from "./comps/deviceControl";
import compDeviceAttributeConfig from "./comps/deviceAttributeConfig";

// 任务管理模式
import compTaskmanagements from "./comps/taskmanagements/taskmanagements";

import { getToken, setToken, removeToken } from "@/utils/auth";

import { getDevice, getDeviceConf } from "./data/data";

export default {
  components: {
    compDevicemap,
    compDeviceStatus,
    compDeviceRunStatus,
    compDeviceWarnLog,
    compDeviceOperationButton,
    compVideoMonitor,
    compDeviceControl,
    compDeviceAttributeConfig,

    compTaskmanagements,
  },
  data () {
    return {
      device_id: "",
      deviceInfo: {},
      deviceConf: {},
      urlOptions: [],
    };
  },
  beforeCreate () {
    // 判断是否存在token
    var token = this.$route.query.token;
    if (token && !getToken()) {
      setToken(token);
      // 然后刷新自己
      location.reload();
    }
  },
  created () {
    this.getDeviceInfo();
    this.$nextTick(() => {
      this.showCompFunc("videoMonitor");
    });
  },
  mounted () { },
  methods: {
    setUrlOptions () {
      // {name: '监控01',value: 'rtmp://rtmp01open.ys7.com/openlive/a2a84062fbc2437ca2198a6725483c68'}

      var video_url = this.getDeviceConfValue("video_url");
      if (video_url == null) {
        return;
      }
      var urlOptions = [];
      var arr = video_url.split(",");
      for (var i = 0, len = arr.length; i < len; i++) {
        var v = arr[i];
        if (!v) {
          continue;
        }
        urlOptions.push({
          name: "监控" + (i + 1) + "号",
          value: v,
        });
      }
      this.urlOptions = urlOptions;
    },
    getDeviceConfValue (name) {
      var obj = this.getDeviceConf(name);
      if (obj != null) {
        return obj.value;
      }
      return null;
    },
    getDeviceConf (name) {
      var deviceConf = this.deviceConf;
      if (
        !deviceConf ||
        deviceConf.length == undefined ||
        deviceConf.length === 0
      ) {
        return null;
      }
      var obj = deviceConf.find((e) => {
        return e.name === name;
      });
      if (obj != null && obj != undefined) {
        return obj;
      }
      return null;
    },
    getDeviceInfo () {
      var device_id = this.$route.query.device_id;
      if (!device_id) {
        alert("无设备信息！");
        return;
      }
      this.device_id = device_id;
      getDevice(device_id).then((res) => {
        if (res.code === 200) {
          if (!res.data.innerStatus.property_values) {
            res.data.innerStatus.property_values == {};
          }
          this.deviceInfo = res.data;
          this.deviceInfo.sensorInfos = res.data.sensor;

          // 获取设备上报信息
          this.$ws.deviceInfoUpload = this.deviceInfoUpload;
          this.$ws.deviceOffine = this.deviceOffine;

          getDeviceConf(device_id).then((conf) => {
            this.deviceConf = conf.data;
            this.setUrlOptions();
          });
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    updateDeviceConf () {
      getDeviceConf(this.deviceInfo.device_id).then((conf) => {
        this.deviceConf = conf.data;
        this.setUrlOptions();
      });
    },
    // 设备状态数据主动上报
    deviceInfoUpload (data) {
      if (this.device_id !== data.device_id) {
        return;
      }

      this.deviceInfo.bind_sta = data.bind_sta;
      this.deviceInfo.innerStatus.property_values = data.property_values;
      this.deviceInfo.sensorInfos = data.sensorInfos;
      this.deviceInfo.state = data.state;
      this.deviceInfo.system_response_time = data.system_response_time;
    },
    // 设备离线通知
    deviceOffine (data) {
      if (this.device_id !== data.device_id) {
        return;
      }

      console.log("设备离线：", data);
      this.deviceInfo.state = data.state;

      var sensorInfos = this.deviceInfo.sensorInfos;
      if (!sensorInfos || sensorInfos.length == 0) {
        return null;
      }
      for (var i = 0, len = sensorInfos.length; i < len; i++) {
        var sensorInfo = sensorInfos[i];
        if (sensorInfo.hd_sensor_type_function_code === "POWER_SWITCH") {
          sensorInfo.value = 0;
        }
      }
    },
    // 显示组件
    showCompFunc (compName) {
      if (!compName) {
        return;
      }
      this.$refs["deviceOperationButton"].showComp(compName);
      this.$refs[compName] &&
        this.$refs[compName].showComp &&
        this.$refs[compName].showComp();
    },
    hideCompFunc (compName) {
      if (!compName) {
        return;
      }
      this.$refs["deviceOperationButton"].hideComp(compName);
      this.$refs[compName] &&
        this.$refs[compName].hideComp &&
        this.$refs[compName].hideComp();
    },
  },
};
</script>

<style scoped>
.plan_device_vue {
  height: 100%;
}

.deviceStatusContainer {
  position: fixed;
  top: 15px;
  left: 65px;
}

.deviceStatusRunContainer {
  position: absolute;
  left: 95px;
  top: 250px;
}

.deviceWarnLogContainer {
  position: fixed;
  bottom: 15px;
  left: 15px;
}

.deviceOperationButtonContainer {
  bottom: 45px;
  right: 10px;
  width: 820px;
  position: fixed;
  height: 70px;
}

.videoMonitorContainer {
  top: 20px;
  right: 10px;
  width: 300px;
  position: fixed;
  height: 250px;
}

.deviceControlContainer {
  bottom: 160px;
  right: 10px;
  width: 251px;
  height: 247px;
  position: fixed;
}

.deviceAttributeConfigContainer {
  position: fixed;
  width: 550px;
  height: 420px;
  left: calc(50% - 275px);
  top: 130px;
}
@media (max-width: 1024px) {
  .deviceOperationButtonContainer {
    bottom: 0px;
    right: 6px;
    width: 45%;
    height: 60px;
  }
  .deviceControlContainer {
    bottom: 80px;
    right: 10px;
    width: 151px;
    height: 147px;
  }
}
</style>