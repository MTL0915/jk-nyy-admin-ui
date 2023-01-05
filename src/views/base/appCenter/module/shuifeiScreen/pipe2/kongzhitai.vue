<template>
  <div class="kongzhitai">
    <div class="device-name">控制台</div>
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
.kongzhitai {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 112px;
  height: 129px;
}
.kongzhitai .device-name {
  text-align: center;
}
.kongzhitai .device-bg {
  background: url(~@/assets/images/shuifeiji/控制台.png) no-repeat;
  background-size: 100% 100%;
  width: 112px;
  height: 109px;
  position: relative;
}
</style>