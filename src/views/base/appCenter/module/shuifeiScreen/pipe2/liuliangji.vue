<template>
  <div class="liuliangji">
    <div class="device-name">流量计</div>
    <div class="device-bg">
      <span class="device-data">{{ value }}m³/h</span>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    // 这里是拿到VueX的装置数组数据
    chuanganqiArr() {
      return this.$store.state.shuifei.pcArr;
    },
  },
  watch: {
    chuanganqiArr(chuanganqiArr) {
      for (var i = 0; i < chuanganqiArr.length; i++) {
        if (chuanganqiArr[i].name == "出水口流量") {
          this.value = chuanganqiArr[i].value;
          this.unit = chuanganqiArr[i].sensor_type_unit;
        }
      }
    },
  },
  data() {
    return {
      value: "未知",
      unit: "",
    };
  },
};
</script>

<style scoped>
.liuliangji {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 78px;
  height: 110px;
}
.liuliangji .device-name {
  text-align: center;
}
.liuliangji .device-bg {
  background: url(~@/assets/images/shuifeiji/流量计.png) no-repeat;
  width: 78px;
  height: 89px;
  background-size: 100% 100%;
  position: relative;
}
.device-data {
  position: absolute;
  bottom: 10%;
  width: 100%;
  display: inline-block;
  text-align: center;
}
</style>