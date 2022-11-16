<template>
  <div class="jiayashifeibeng">
    <!--操作装置等待-->
    <loading ref="loading" />
    <div
      class="device-bg"
      :class="[shebeiData.value ? 'device-bg_on' : 'device-bg_off']"
    >
      <i
        @click="
          btnClick($event, shebeiData.hd_device_sensor_id, shebeiData.value)
        "
        ref="btn"
        :code="shebeiData.channel"
        class="btn_s"
        :class="[shebeiData.value ? 'btn_on' : 'btn_off']"
      ></i>
    </div>
    <div class="device-name">加压施肥泵</div>
  </div>
</template>

<script>
import { openOrCloseChannel } from "@/utils/websocket_util.js";
import loading from "../loading";
export default {
  data() {
    return {
      shebeiData: "",
    };
  },
  components: {
    loading,
  },
  computed: {
    // 这里是拿到VueX的装置数组数据
    shebeiArr() {
      return this.$store.state.shuifei.pkArr;
    },
  },
  watch: {
    shebeiArr(shebeiArr) {
      // 过滤出加压施肥泵
      for (var i = 0; i < shebeiArr.length; i++) {
        if (shebeiArr[i].name.indexOf("施肥（增压）泵") != -1) {
          this.shebeiData = shebeiArr[i];
        }
      }
    },
  },
  methods: {
    // 控制按钮开关
    // 注肥阀控制按钮开关
    btnClick(e, id, value) {
      var targetBtn = e.currentTarget;
      var code = targetBtn.getAttribute("code");
      code = Number(code); // 转变成数字

      var hd_sensor_id = id;
      var oldValue = value;
      this.$refs.loading.openLoadInstance();
      var newValue = oldValue == "0" ? 1 : 0;

      openOrCloseChannel(hd_sensor_id, newValue, this.$ws)
        .then((res) => {
          console.log(res);
          this.shebeiData.value = newValue;
          this.$refs.loading.closeLoadInstance();
          // 异步完成之后对vuex进行操作，改变按钮与水流
          // 获取目前开关的情况，根据情况切换，并保存到vuex里
          const index = this.$store.state.shuifei.openKey.indexOf(code);
          if (index === -1) {
            this.$store.commit("ADD_CODE", code);
          } else {
            this.$store.commit("DEL_CODE", index);
          }
          // 事件总线触发流水事件
          this.$bus.$emit("waterEvent");
        })
        .catch((err) => {
          this.$message.error(err.msg);
          this.shebeiData.value = oldValue;
          this.$refs.loading.closeLoadInstance();
        });
    },
  },
};
</script>

<style scoped>
.jiayashifeibeng {
  display: flex;
  justify-content: space-between;
  width: 123px;
  height: 103px;
}
.jiayashifeibeng .device-name {
  writing-mode: tb-rl;
  text-align: center;
}
.jiayashifeibeng .device-bg {
  width: 118px;
  height: 103px;
  background-size: 100% 100%;
  position: relative;
}
.jiayashifeibeng .device-bg_on {
  background: url(~@/assets/images/shuifeiji/加压施肥泵on.png) no-repeat;
}
.jiayashifeibeng .device-bg_off {
  background: url(~@/assets/images/shuifeiji/加压施肥泵off.png) no-repeat;
}
.btn_s {
  width: 25px;
  height: 25px;
  cursor: pointer;
  z-index: 1;
  background-size: cover;
  position: absolute;
  top: 50%;
  margin-top: -8.5px;
  left: 57%;
}

.btn_on {
  background-image: url(~@/assets/images/shuifeiji/on.png);
}

.btn_off {
  background-image: url(~@/assets/images/shuifeiji/off.png);
}
</style>