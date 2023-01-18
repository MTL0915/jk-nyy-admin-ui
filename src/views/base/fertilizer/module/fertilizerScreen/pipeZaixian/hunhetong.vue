<template>
  <div class="hunhetong">
    <div class="device-name">混合桶</div>
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
.hunhetong {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 107px;
  height: 164px;
}
.hunhetong .device-name {
  text-align: center;
}
.hunhetong .device-bg {
  background: url(~@/assets/images/shuifeiji/混合桶.png) no-repeat;
  background-size: 100% 100%;
  width: 107px;
  height: 144px;
  position: relative;
}
</style>