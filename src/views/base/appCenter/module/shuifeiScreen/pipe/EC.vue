<template>
  <div class="ec">
    <div class="device-name">EC传感器</div>
    <div class="device-bg">
      <span class="device-data">{{ value }}µS/cm</span>
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
        if (chuanganqiArr[i].name == "出水口EC") {
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
.ec {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 78px;
  height: 110px;
}
.ec .device-name {
  text-align: center;
}
.ec .device-bg {
  background: url(~@/assets/images/shuifeiji/EC传感器.png) no-repeat;
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