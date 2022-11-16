<template>
  <!-- 头像电量 -->
  <div class='headBox'>
    <div class='row1 head'>
      <!-- 头像 -->
      <div class='headImage'>
        <img
          @click='deviceCenter'
          class='headIcon'
          title="定位设备"
          :src='hd_device_type_image_path'
        />
      </div>
      <div class='a1'>
        <div class="a2">
          <div class="a3">{{device.name}}</div>
          <div class="a4">
            <span class="a5">设备状态</span>
            <span
              v-if='device.state != 0 && device.state != 5'
              style='color:#00ff50;'
            > 在线 </span>
            <span
              v-if='device.state == 0'
              style='color:#ff0000;'
            > 离线 </span>
            <span
              v-if='device.state == 5'
              style='color:#00ff50;'
            > 待机 </span>
          </div>
        </div>
        <div class="a6">
          <div class="a7">{{getPowerValue}}电量</div>
          <div class='a8'>
            <div
              class="a9"
              :style='"max-width:100%;width:"+getPowerValue'
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class='row2'>
      <div class='row2_btn'>
        <span>电源开关</span>
        <div
          class='switch'
          @click='clickPowerConfirm'
        >
          <el-switch
            v-model="isPower"
            size="mini"
            active-color="#13ce66"
            :disabled='disPower'
            inactive-color="#ff4949"
          > </el-switch>
        </div>
      </div>
      <div
        class='row2_btn cur'
        :class='{active: property_values.rd_sta === 1}'
      >
        <span>障碍物报警</span>
        <span> <img
            v-if="property_values.rd_sta === 1"
            :src='require("@/assets/img/Plan/drawLineMap/qp/zhangaiwu.png")'
          /> </span>
      </div>
    </div>
    <div class='row3'>
      <div class='row2_btn'>
        <span v-if="property_values.controlType === 3">现场控制</span>
        <span v-if="property_values.controlType === 3"> <img :src='require("@/assets/img/Plan/drawLineMap/qp/xianchang_control.png")' /> </span>

        <span v-if="property_values.controlType !== 3">远程控制</span>
        <span v-if="property_values.controlType !== 3"> <img :src='require("@/assets/img/Plan/drawLineMap/qp/yuancheng_control.png")' /> </span>
      </div>
      <div
        class='row2_btn cur'
        :class='{active: property_values.nav_cmd == 5}'
      >
        <span v-if="property_values.nav_cmd !== 5">手动航行</span>
        <span v-if="property_values.nav_cmd !== 5"> <img :src='require("@/assets/img/Plan/drawLineMap/qp/hand_control.png")' /> </span>

        <span v-if="property_values.nav_cmd === 5">自动航行</span>
        <span
          v-if="property_values.nav_cmd === 5"
          @click='stopRouteJob'
        > <img
            style="cursor:pointer"
            :src='require("@/assets/img/Plan/drawLineMap/qp/tuichu.png")'
          /> </span>
      </div>
    </div>
  </div>
</template>

<script>
import ws from '../../../websocket/py_ws'
import { getImage } from '@/utils/image_util'
import { getDevice, getDeviceConf } from '../../../data/data'
export default {
  props: {

  },
  watch: {

  },
  components: {

  },
  data () {
    return {
      property_values: {},
      info: {},
      isPower: false, //电源状态
      disPower: false,
      sensorInfos: [],
      value: 0,
      powerSensor: {},
      getPowerValue: "0%",
      device: {},
      hd_device_type_image_path: ""
    }
  },
  mounted () {
    // 获取设备信息
    this.getDevice();
  },
  methods: {

    getDevice () {
      var device_id = this.$route.query.device_id;
      getDevice(device_id).then((res) => {
        getDeviceConf(device_id).then((conf) => {
          this.device = res.data;
          this.deviceConf = conf.data;
          this.hd_device_type_image_path = this.getImage(this.device.hd_device_type_image_path);
          // 获取设备上报信息
          this.createWebsocket();
        })
      })
    },

    getImage: getImage,
    // 获得电量
    getPower () {
      // 获得配置信息
      var dataConfig = this.deviceConf;
      // 获取配置信息中的最小电压
      var min = dataConfig.find((e) => { return e.name == "batVolLower" });
      min ? min = min.value : min = 0;
      // 获取配置信息中的最大电压
      var max = dataConfig.find((e) => { return e.name == "batVolUpper" });
      max ? max = max.value : max = 0;
      // 获取当前上传电压
      var batVol = this.property_values.batVol;

      if (max === 0) {
        this.getPowerValue = "0%"
      } else if (parseInt(batVol) < min) {
        this.getPowerValue = "0%"
      } else {
        this.getPowerValue = parseInt((batVol * 1 - min * 1) / (max * 1 - min * 1) * 100) + "%";
      }
    },

    getWs () {
      return this.ws;
    },
    // 定位设备位置 将视角移动过去
    deviceCenter () {
      var p = null;
      if (this.property_values && this.property_values.location) {
        p = this.property_values.location;
      } else {
        p = this.$parent.position;
      }
      p = [p[1], p[0]];
      var z = 17
      if (view.zoom > 17) {
        z = view.zoom;
      }
      this.$parent.mapCenter(p, z);
    },
    // 上传信息
    deviceWsUpdateFunction (info) {
      info = info.data;
      // 判断设备状态同步
      this.device.state = info.property_values.state;
      this.info = info;
      if (this.sensorInfos.length == 0) {
        this.sensorInfos = info.sensorInfos;
      } else {
        this.sensorInfos.forEach((e) => {
          // 获取当前的通道号
          var channel = e.channel;
          // 根据通道号获取上传的通道号数据 同步数据
          var infos = info.sensorInfos.find((e) => { return e.channel === channel })
          // 开始对照数据进行同步
          for (var i in e) {
            e[i] = infos[i] === undefined ? e[i] : infos[i];
          }
        })
      }
      //判断电源是否打开
      var isPower = this.powerSensor = this.sensorInfos.find((e) => { return e.hd_sensor_type_function_code === "POWER_SWITCH" });
      if (isPower) {
        this.isPower = isPower.value == 0 ? false : true;
      }
      this.channelValue = info.channelValue;
      this.property_values = info.property_values;

      this.getPower(); //开始计算电源

      // console.log(this.property_values.batVol);
    },
    setPowerClose () {
      this.isPower = false;
    },
    // 终止任务
    stopRouteJob () {
      // 判断是否是离线状态
      if (this.device.state === 0) {
        this.$message({
          message: '该设备正处于离线状态 无法远程控制',
          type: 'warning'
        });
        return
      }
      // 如果已经启动则提示他是否要关闭
      this.$confirm('此操作将停止当前任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.ws.cancelInstructions();
        this.$parent.$refs.navigation.back()
      }).catch(() => { });
    },

    clickPowerConfirm () {
      // 判断是否是离线状态
      if (this.device.state === 0) {
        this.$message({
          message: '该设备正处于离线状态 无法远程控制',
          type: 'warning'
        });
        return
      }
      if (this.property_values.nav_cmd === 5) {
        // 如果设备是处于现场控制状态则无法控制
        this.$message({
          message: '该设备正在执行任务中 无法远程控制。如果需要请先退出任务！',
          type: 'warning'
        });
        return;
      }
      // 获取当前电源阀门对象数据
      var it = this.powerSensor;
      // 判断电源是否启动
      if (it.value) {
        // 如果已经启动则提示他是否要关闭
        this.$confirm('此操作将关闭电源, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 禁止这个按钮
          this.disPower = true;
          this.clickPower();
        }).catch(() => {
          this.isPower = it.value;
          this.disPower = false;
        });
        return;
      } else {
        // 禁止这个按钮
        this.disPower = true;
        this.clickPower();
      }

    },

    clickPower () {
      // 获取当前电源阀门对象数据
      var it = this.powerSensor;
      // 获取当前控制的websocket对象
      var ws = this.ws;
      // 获取值的对象
      var value = it.value;
      // 判断是开 还是关
      if (value == 1) {
        // 如果这个开关是开着的  则关闭
        ws.clearSensor(it.hd_device_sensor_id || it.id).then((res) => {
          if (res.code == 200) {
            this.disPower = false;
            this.isPower = it.value;
            this.$message({
              type: "success",
              message: "电源成功关闭"
            })
          } else {
            this.disPower = false;
            this.isPower = it.value;
            this.$message({
              type: "error",
              message: res ? res.msg : "电源开启失败"
            })
          }
        }).catch((res) => {
          this.disPower = false;
          this.isPower = it.value;
          this.$message({
            type: "error",
            message: res ? res.msg : "电源开启失败"
          })
        })
      } else {

        if (it.hd_device_sensor_id === undefined && it.id === undefined) {
          this.$message({
            type: "info",
            message: "设备离线，无法启动电源!"
          })
          return;
        }
        // 如果这个开关是关着的  则开启
        ws.openSensor(it.hd_device_sensor_id || it.id).then((res) => {
          if (res.code == 200) {
            this.disPower = false;
            this.isPower = it.value;
            this.$message({
              type: "success",
              message: "电源成功启动"
            })
          } else {
            this.disPower = false;
            this.isPower = it.value;
            this.$message({
              type: "error",
              message: res ? res.msg : "电源开启失败"
            })
          }
        }).catch(() => {
          this.disPower = false;
          this.isPower = it.value;
          this.$message({
            type: "error",
            message: res ? res.msg : "电源开启失败"
          })
        })
      }
    },

    /* 开始建立websocket链接 */
    createWebsocket () {
      // 创建ws的实例化对象
      this.ws = ws.get();
      // 绑定上报事件
      this.wsUploadSta = this.ws.onUploadSta(this.deviceWsUpdateFunction);
    },
  }
}
</script>

<style scoped>
.headBox {
  background: #131f2da8;
  /* width: 300px; */
  /* height: 180px; */
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 9999;
  color: #fff;
  padding: 2px;
  border-radius: 4px;
}
.row1 {
  background: #131f2da8;
  height: 75px;
  margin: 8px;
  display: flex;
  position: relative;
}
.head::after {
  content: "";
  position: absolute;
  left: 0;
  height: 100%;
  width: 3px;
  top: 0;
  border: solid 1px #1df2fa;
  border-right: none;
}
.head::before {
  content: "";
  position: absolute;
  right: 0;
  height: 100%;
  width: 3px;
  top: 0;
  border: solid 1px #1df2fa;
  border-left: none;
}
.row2 {
  display: flex;
  justify-content: space-between;
  margin: 8px;
}
.row2_btn {
  background: #131f2da8;
  padding: 3px;
  display: flex;
  width: 47%;
  text-align: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 8%;
  position: relative;
  align-items: center;
}
.row2_btn img {
  height: 19px;
  position: absolute;
  top: 6px;
  right: 6px;
}

.switch {
  position: relative;
}

.switch::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 999;
  top: 0;
  left: 0;
}

.row3 {
  /* background: #131f2dA8; */
  height: 40px;
  margin: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* padding: 0 12px; */
}
.headImage {
  width: 60px;
  height: 60px;
  padding: 4px;
  margin: 4px;
  flex-shrink: 0;
}
.headImage > img {
  width: 100%;
  height: 100%;
}

.a1 {
  width: 100%;
  padding: 10px;
}
.a2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50%;
}
.a3 {
  color: #0f9fcd;
  font-size: 14px;
}
.a4 {
  display: flex;
  align-items: center;
}
.a5 {
  margin-top: 2px;
  margin-right: 9px;
}
.a6 {
  height: 50%;
  display: flex;
  align-items: center;
}
.a7 {
  flex-shrink: 0;
}
.a8 {
  width: 100%;
  height: 3px;
  background: #31485a;
  margin-left: 9px;
  border-radius: 4px;
}
.a9 {
  background: #76ecae;
  width: 46%;
  height: 100%;
  border-radius: 4px;
}
.headIcon {
  cursor: pointer;
}
</style>