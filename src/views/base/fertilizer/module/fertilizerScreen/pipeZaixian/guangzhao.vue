<template>
  <div class="guangzhao">
    <div class="device-bg">
      <div class="device-name">光照强度</div>
      <div class="device-data">150W/m2</div>
    </div>
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
.guangzhao {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 165px;
  height: 124px;
}
.guangzhao .device-name {
  text-align: center;
  font-size: 16px;
  padding-top: 65px;
}
.guangzhao .device-data {
  text-align: center;
  font-size: 20px;
  padding-top: 10px;
}
.guangzhao .device-bg {
  background: url(~@/assets/images/shuifeiji/光照强度.png) no-repeat;
  background-size: 100% 100%;
  width: 165px;
  height: 124px;
  position: relative;
}
</style>