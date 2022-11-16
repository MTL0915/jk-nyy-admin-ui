<template>
  <div class="tiaojiefa">
    <div class="device-name">调节阀</div>
    <div class="device-bg">
      <!-- <i
        ref="btn"
        class="btn_s"
        :class="[btnStatus ? 'btn_on' : 'btn_off']"
      ></i> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnStatus: true,
    };
  },
};
</script>

<style scoped>
.tiaojiefa {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 74px;
  height: 77px;
}
.tiaojiefa .device-name {
  text-align: center;
}
.tiaojiefa .device-bg {
  background: url(~@/assets/images/shuifeiji/调节阀.png) no-repeat;
  background-size: 100% 100%;
  width: 74px;
  height: 57px;
  position: relative;
}
.btn_s {
  width: 25px;
  height: 25px;
  z-index: 1;
  background-size: cover;
  position: absolute;
  bottom: 5px;
  left: 50%;
  margin-left: -12.5px;
  cursor: not-allowed;
}

.btn_on {
  background-image: url(~@/assets/images/shuifeiji/on.png);
}

.btn_off {
  background-image: url(~@/assets/images/shuifeiji/off.png);
}
</style>