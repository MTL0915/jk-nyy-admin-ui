<template>
  <div>
    <div
      class="wrap"
      v-show="btnshow"
    >
      <div class="operationbtns">
        <!-- 一键呼唤 -->
        <!-- <img
          class="btn01"
          :src='require("@/assets/planDeviceGdc/btn01.png")'
          ref="01Btn"
          data-type="01"
          data-compname="01"
          @click="showOrHideComp('01',$event)"
        /> -->

        <!-- 自动巡航 -->
        <img
          class="btn02"
          :src='require("@/assets/planDeviceGdc/btn02.png")'
          ref="02Btn"
          data-type="02"
          data-compname="02"
          @click="showOrHideComp('02',$event)"
        />

        <!-- 预置点 -->
        <img
          class="btn03"
          :src='require("@/assets/planDeviceGdc/btn03.png")'
          ref="03Btn"
          data-type="03"
          data-compname="03"
          @click="showOrHideComp('03',$event)"
        />

        <!-- 参数设置 -->
        <img
          class="btn04"
          :src='require("@/assets/planDeviceGdc/btn04.png")'
          ref="deviceAttributeConfigBtn"
          data-type="04"
          data-compname="deviceAttributeConfig"
          @click="showOrHideComp('04',$event)"
        />

        <!-- 实时监控 -->
        <img
          class="btn05"
          :src='require("@/assets/planDeviceGdc/btn05.png")'
          ref="videoMonitorBtn"
          data-type="05"
          data-compname="videoMonitor"
          @click="showOrHideComp('05',$event)"
        />

      </div>
    </div>
    <img
      class="btnshow"
      :src='require("@/assets/planDeviceNew/btnshow.png")'
      @click="showBtnDiv()"
    />
  </div>
</template>

<script>
export default {
  props: {
    showCompFunc: {
      type: Function,
    },
    hideCompFunc: {
      type: Function,
    },
  },
  components: {},
  data () {
    return {
      btnshow: true,
    };
  },
  mounted () { },
  watch: {
    deviceInfo: {
      handler: function (deviceInfo) { },
      deep: true,
    },
  },
  methods: {
    showBtnDiv () {
      this.btnshow = !this.btnshow;
    },
    showOrHideComp (type, $event) {
      var el = event.currentTarget;
      this.showOrHideDom(type, el);
    },
    showOrHideDom (type, el) {
      var compName = $(el).data("compname");
      if ($(el).hasClass("active")) {
        this.hideCompFunc && this.hideCompFunc(compName);
      } else {
        this.showCompFunc && this.showCompFunc(compName);
      }
    },
    showComp (compName) {
      var el = this.$refs[compName + "Btn"];
      if (!el) {
        return;
      }
      $(el).addClass("active");
      var type = $(el).data("type");
      el.src = require("@/assets/planDeviceGdc/btn" + type + "_active.png");
    },
    hideComp (compName) {
      var el = this.$refs[compName + "Btn"];
      if (!el) {
        return;
      }
      $(el).removeClass("active");
      var type = $(el).data("type");
      el.src = require("@/assets/planDeviceGdc/btn" + type + ".png");
    },
  },
};
</script>

<style scoped>
.wrap {
  color: #fff;
  height: 70px;
  width: 100%;
  background-image: url("../../../../../assets/planDeviceNew/btn_div_bg.png");
  padding-left: 80px;
  position: relative;
}
.operationbtns {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: calc(100% - 60px);
}
.operationbtns img {
  cursor: pointer;
  width: 100px;
  height: 94px;
  position: relative;
  top: -24px;
}
.operationbtns img.active {
  animation: jump 1s infinite linear;
}
.btnshow {
  position: absolute;
  right: 15px;
  top: 20px;
  cursor: pointer;
}

@keyframes jump {
  0% {
    top: -24px;
  }
  50% {
    top: -42px;
  }
  100% {
    top: -24px;
  }
}

@media (max-width: 1024px) {
  .operationbtns img {
    cursor: pointer;
    width: 50px;
    height: 47px;
    position: relative;
    top: 1px;
  }
  @keyframes jump {
    0% {
      top: -8px;
    }
    50% {
      top: -24px;
    }
    100% {
      top: -8px;
    }
  }
  .operationbtns {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: calc(100% - 42px);
  }
  .wrap {
    color: #fff;
    height: 50px;
    width: 100%;
    background-image: url("../../../../../assets/planDeviceNew/btn_div_bg.png");
    padding-left: 80px;
    position: relative;
  }
  .btnshow {
    position: absolute;
    right: 5px;
    top: 10px;
    cursor: pointer;
  }
}
</style>