<template>
  <div class="zengyabeng">
    <div class="device-name">增压泵</div>
    <div class="device-bg"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shebeiData: "",
    };
  },
  components: {
    
  },
  methods: {

  },
};
</script>

<style scoped>
.zengyabeng {
  display: flex;
  width: 63px;
  height: 147px;
  flex-direction: column;
  justify-content: space-between;
}
.zengyabeng .device-name {
  text-align: center;
}
.zengyabeng .device-bg {
  background: url(~@/assets/images/shuifeiji/增压泵竖立.png) no-repeat;
  width: 63px;
  height: 127px;
  background-size: 100% 100%;
  position: relative;
}
</style>