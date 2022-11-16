<template>
  <div class="wrap">
    <div class="info location">
      <div class="iconDiv">
        <div class="iconBg">
        </div>
        <img
          class="infoIcon"
          :src='require("@/assets/planDeviceNew/info_jwd.png")'
        />
      </div>
      <div class="infoBg">
        {{locationDesc}}
      </div>
    </div>

    <div class="info state">
      <div class="iconDiv">
        <div class="iconBg">
        </div>
        <img
          class="infoIcon"
          :src='require("@/assets/planDeviceNew/state.png")'
        />
      </div>
      <div class="infoBg">
        设备状态：{{stateDesc}}
      </div>
    </div>

    <div class="info controlType">
      <div class="iconDiv">
        <div class="iconBg"></div>
        <img
          class="infoIcon"
          :src='require("@/assets/planDeviceNew/controltype.png")'
        />
      </div>
      <div class="infoBg">
        模式：{{controlTypeDesc}}
      </div>
    </div>
  </div>
</template>

<script>
import { getStateDes, getControlTypeDesc } from "@/utils/device_util";

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
      locationDesc: "111111,222222",
      stateDesc: "在线",
      controlTypeDesc: "远程手动控制",
    };
  },
  mounted() {},
  watch: {
    deviceInfo: {
      handler: function (deviceInfo) {
        var state = deviceInfo.state;
        this.stateDesc = getStateDes(state);

        var property_values = deviceInfo.innerStatus.property_values;
        if (property_values == undefined || property_values == null) {
          return;
        }
        var location = property_values.location;
        if (location && location.length >= 2) {
          this.locationDesc = location[1] + "," + location[0];
        }

        var controlType = property_values.controlType;
        this.controlTypeDesc = getControlTypeDesc(controlType);
      },
      deep: true,
    },
  },
  methods: {},
};
</script>

<style scoped>
.wrap {
  color: #fff;
}
.info {
  font-size: 18px;
  font-family: "微软雅黑";
  position: relative;
  margin-bottom: 20px;
}
.location {
  font-family: "方正姚体";
}
.infoIcon {
  position: absolute;
  width: 50%;
  top: 50%;
  left: 50%;
  z-index: 9;
  transform: translate(-50%, -50%);
}

.iconDiv {
  position: absolute;
  top: 50%;
  left: -23px;
  width: 50px;
  height: 50px;
  transform: translateY(-50%);
}
.iconBg {
  width: 100%;
  height: 100%;
  background: url("../../../../../assets/planDeviceNew/info_yuan.png") center
    no-repeat;
  background-size: 100% 100%;
  animation: xz 10s infinite linear;
}
.infoBg {
  background: url("../../../../../assets/planDeviceNew/info_bg.png") center
    no-repeat;
  background-size: 100% 100%;
  padding-left: 48px;
  padding: 10px 80px 10px 35px;
}
@keyframes xz {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>