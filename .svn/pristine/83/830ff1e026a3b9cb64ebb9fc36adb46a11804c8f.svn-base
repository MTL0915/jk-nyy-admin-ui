<template>
  <div
    ref="login"
    class="login"
  >
    <iframe
      ref="iframeBox"
      :src="'/login?custom_base_id='+custom_base_id+'&sx='+sx"
      class="iframe"
    ></iframe>
    <div class="shade"></div>
  </div>
</template>
<script>
export default {
  props: {
    custom_base_id: {
      type: String,
      default: null
    },
    sx: {
      type: Number,
      default: 0
    }
  },
  mounted () {
    var login = this.$refs.login;
    var xw = document.body.offsetWidth
    var xh = document.body.offsetHeight
    var width = login.offsetWidth;
    var height = xh / xw * width
    var bw = width / xw;
    var bh = height / xh;
    this.$refs.iframeBox.style.cssText = `
      width : ${xw}px;height: ${xh}px;transform: scale(${bw}, ${bh});transform-origin: 0 0;
    `;
  }
};
</script>
<style lang="stylus" scoped>
.login
  width 100%
  height 100%
  position relative
  overflow hidden

.shade
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  z-index 10

.iframe
  border 0px
  width 100%
  height 100%
  position absolute
  frameborder 0
  left 0
</style>