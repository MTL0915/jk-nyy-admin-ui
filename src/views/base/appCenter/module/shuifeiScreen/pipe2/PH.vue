<template>
  <div class="ph">
    <div class="device-name">PH传感器</div>
    <div class="device-bg">
      <span class="device-data">{{ PHValue }}</span>
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
        if (chuanganqiArr[i].name == "出水口pH") {
          this.PHValue = chuanganqiArr[i].value;
        }
      }
    },
  },
  data() {
    return {
      PHValue: "未知",
    };
  },
};
</script>

<style scoped>
.ph {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 78px;
  height: 110px;
}
.ph .device-name {
  text-align: center;
}
.ph .device-bg {
  background: url(~@/assets/images/shuifeiji/PH传感器.png) no-repeat;
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