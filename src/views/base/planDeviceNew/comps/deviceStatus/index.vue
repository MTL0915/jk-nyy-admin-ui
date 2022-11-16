<template>
  <div>
    <div class="wrap">
      <div class="statusYuanDiv">
        <img
          :src='require("@/assets/planDeviceNew/head_icon.png")'
          style="cursor:pointer;"
          class="statusYuanImg"
          @click="showShowStatus()"
        >
        <div class="statusYuan">
          <!-- @click="fixedPosition" -->
        </div>
      </div>

      <div
        class="statusDiv"
        v-show="statusShow"
      >
        <img
          :src='require("@/assets/planDeviceNew/head_small.png")'
          style="position:absolute;top:-5px;right:-6px;cursor:pointer;"
          @click="hideShowStatus()"
        >
        <div class="status">
          <!-- 设备名称序列号 -->
          <div class="status-row status-info">
            <span>{{deviceInfo.name}}</span>
            <span>{{deviceInfo.device_id}}</span>
          </div>
          <div class="status-row status-switch">
            <span>电源开关</span>
            <div class='switch'>
              <el-switch
                v-model="powerStatus"
                v-loading="switchLoading"
                @change='switchPower'
                size="mini"
                active-color="#13ce66"
                inactive-color="#ff4949"
              > </el-switch>
            </div>
          </div>
          <div class="status-row">
            <span>电量</span>
            <div class="status-progress">
              <div class="progress">
                <div
                  class="progress-bar progress-bar-success progress-bar-striped active"
                  :style="{width:batVolPercentage+'%'}"
                ></div>
              </div>
              <span class="status-format">{{batVolPercentage}}<span style="font-size:14px">%</span></span>
            </div>
          </div>
          <div class="status-row">
            <span>速度</span>
            <div class="status-progress">
              <div class="progress">
                <div
                  class="progress-bar progress-bar-info progress-bar-striped active"
                  :style="{width:speedPercentage+'%'}"
                ></div>
              </div>
              <span class="status-format">{{speed}}<span style="font-size:14px">m/s</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { openChannel, closeChannel } from "@/utils/websocket_util.js";
export default {
  props: {
    deviceInfo: {
      type: Object,
    },
    deviceConf: {
      type: Object,
    },
  },
  components: {},
  data() {
    return {
      powerStatus: false, //电源状态
      switchLoading: false,
      batVolPercentage: 0, // 电量百分比
      speed: 0,
      speedPercentage: 0, // 速度百分比
      statusShow: true,
    };
  },
  mounted() {},
  watch: {
    deviceInfo: {
      handler: function (deviceInfo) {
        this.powerStatus = this.getPowerStatus();

        var batVol = deviceInfo.innerStatus.property_values
          ? deviceInfo.innerStatus.property_values.batVol
          : null;
        this.refreshBatVolPercentage(batVol);

        var speed = deviceInfo.innerStatus.property_values
          ? deviceInfo.innerStatus.property_values.speed
          : null;
        this.refreshSpeed(speed);
      },
      deep: true,
    },
  },
  methods: {
    hideShowStatus() {
      this.statusShow = false;
    },
    showShowStatus() {
      this.statusShow = true;
    },
    getPowerSensor() {
      var sensorInfos = this.deviceInfo.sensorInfos;
      if (!sensorInfos || sensorInfos.length == 0) {
        return null;
      }
      for (var i = 0, len = sensorInfos.length; i < len; i++) {
        var sensorInfo = sensorInfos[i];
        if (sensorInfo.hd_sensor_type_function_code === "POWER_SWITCH") {
          return sensorInfo;
        }
      }
      return null;
    },
    getPowerStatus() {
      var powerSensor = this.getPowerSensor();
      if (powerSensor != null) {
        return powerSensor.value === 0 ? false : true;
      }
      return false;
    },
    refreshSpeed(speed) {
      if (speed == null) {
        return;
      }
      this.speed = speed;
      var maxSpeed = 1.8;
      this.speedPercentage = parseInt((speed / maxSpeed) * 100);
    },
    speedPercentageFormat() {
      return this.speed + "m/s";
    },
    refreshBatVolPercentage(batVol) {
      if (batVol == null) {
        return;
      }
      // 获得配置信息
      var dataConfig = this.deviceConf;
      if (
        !dataConfig ||
        dataConfig.length == undefined ||
        dataConfig.length === 0
      ) {
        return 0;
      }
      // 获取配置信息中的最小电压
      var min = dataConfig.find((e) => {
        return e.name == "batVolLower";
      });
      min ? (min = parseInt(min.value)) : (min = 0);
      // 获取配置信息中的最大电压
      var max = dataConfig.find((e) => {
        return e.name == "batVolUpper";
      });
      max ? (max = parseInt(max.value)) : (max = 0);

      if (max === 0) {
        this.batVolPercentage = 0;
      } else if (parseInt(batVol) < min) {
        this.batVolPercentage = 0;
      } else {
        this.batVolPercentage = parseInt(
          ((batVol * 1 - min * 1) / (max * 1 - min * 1)) * 100
        );
      }
    },
    // 定位设备位置 将视角移动过去
    fixedPosition() {
      var property_values = this.deviceInfo.innerStatus.property_values;
      var p = null;
      if (property_values && property_values.location) {
        p = property_values.location;
      } else {
        p = this.$parent.position;
      }
      p = [p[1], p[0]];
      var z = 17;
      if (view.zoom > 17) {
        z = view.zoom;
      }
      this.$parent.mapCenter(p, z);
    },
    // 开关电源操作
    switchPower() {
      // 获取当前电源阀门对象数据
      var sensor = this.getPowerSensor();
      if (sensor == null) {
        this.powerStatus = !this.powerStatus;
        this.$message.error("无电源开关传感器，操作失败！");
        return;
      }
      // 设备正在操作
      if (this.switchLoading) {
        return;
      }
      // 判断电源是否启动
      var hd_device_sensor_id = sensor.hd_device_sensor_id;

      var changePowerStatus = this.powerStatus;
      if (changePowerStatus) {
        this.switchLoading = true;
        openChannel(hd_device_sensor_id, this.$ws)
          .then((res) => {
            this.powerStatus = true;
            this.switchLoading = false;
          })
          .catch((err) => {
            this.$message.error(err.msg);
            this.powerStatus = false;
            this.switchLoading = false;
          });
      } else {
        // 如果已经启动则提示他是否要关闭
        this.switchLoading = true;

        closeChannel(hd_device_sensor_id, this.$ws)
          .then((res) => {
            this.powerStatus = false;
            this.switchLoading = false;
          })
          .catch((err) => {
            this.$message.error(err.msg);
            this.powerStatus = true;
            this.switchLoading = false;
          });
        /*
                this.$confirm('此操作将关闭电源, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                }).catch(() => {
                    this.switchLoading = false;
                    this.powerStatus = !changePowerStatus;
                });
                */
      }
    },
  },
};
</script>

<style scoped>
.wrap * {
  user-select: none !important;
}
.wrap {
  color: #fff;
  position: relative;
}
.statusYuanDiv {
  left: -40px;
  top: 5px;
  position: absolute;
  width: 120px;
  height: 120px;
}
.statusYuan {
  width: 100%;
  height: 100%;
  position: relative;
  background: url("../../../../../assets/planDeviceNew/head_yuan.png") center
    no-repeat;
  background-size: 100% 100%;
  animation: xz 10s infinite linear;
}
@keyframes xz {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.statusYuanImg {
  width: 70%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  z-index: 9;
}
.statusDiv {
  background: url("../../../../../assets/planDeviceNew/head.png") center
    no-repeat;
  background-size: 100% 100%;
  width: 421px;
  height: 208px;
  font-family: "微软雅黑";
}
.status {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-37%, -50%);
  width: 67%;
}

.status-row {
  display: flex;
  justify-content: space-between;
  height: 30px;
  line-height: 30px;
  color: #f8f8f8;
  font-size: 16px;
}

.status-row >>> .el-progress__text {
  color: #00d5d8;
}

.status-row >>> .el-progress-bar__outer {
  color: #797a7b91;
}

.status-info {
  font-size: 18px;
  color: #0ff;
}
.status-progress {
  display: flex;
  width: 240px;
  align-items: center;
}
.status-format {
  font-size: 18px;
  margin-left: 10px;
  color: #0ff;
}
.status-switch {
  font-size: 16px;
  margin-bottom: 5px;
}

.progress {
  height: 18px;
  background: #fff;
  border-radius: 25px;
  margin-bottom: 0;
  position: relative;
  width: 100%;
  overflow: hidden;
}

.progress .progress-bar {
  border: none;
  box-shadow: none;
  -webkit-animation: 2s linear 0s normal none infinite running
      progress-bar-stripes,
    animate-positive 1s;
  animation: 2s linear 0s normal none infinite running progress-bar-stripes,
    animate-positive 1s;
  height: 100%;
  transition: width 0.6s ease;
}

.progress-bar-success {
  background-color: #5cb85c;
}

.progress-bar-info {
  background-color: #5bc0de;
}

.progress-bar-striped,
.progress-striped .progress-bar {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 40px 40px;
}
@-webkit-keyframes animate-positive {
  0% {
    width: 0;
  }
}
@keyframes animate-positive {
  0% {
    width: 0;
  }
}
@keyframes progress-bar-stripes {
  from {
    background-position: 40px 0;
  }
  to {
    background-position: 0 0;
  }
}

@media (max-width: 1024px) {
  .statusYuanDiv {
    width: 90px;
    height: 90px;
    left: -30px;
    top: 8px;
  }
  .statusDiv{
    width: 320px;
    height: 170px;
  }
  .deviceStatusContainer{
    left: 40px;
  }
}
</style>