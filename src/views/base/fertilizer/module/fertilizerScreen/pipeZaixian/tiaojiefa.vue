<template>
  <div class="tiaojiefa">
    <div class="device-name">调节阀</div>
    <div class="device-bg"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
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
</style>