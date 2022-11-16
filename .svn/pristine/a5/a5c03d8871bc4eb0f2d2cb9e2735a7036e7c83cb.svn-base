<template>
  <div class="machine">
    <!-- <view-iframe ref="iframe" :src="src" /> -->
    <iframe :src="src" frameborder="no" style="width: 100%;height: 100%" scrolling="auto"/>
  </div>
</template>

<script>
import base64 from "@/utils/base64gb2312"
export default {
  data() {
    return {
      src: ''
    }
  },
  mounted() {
    this.src = base64.decode64gb2312(this.GetQueryString("thirdID"))
  },
  methods: {
    //获取url参数字段
    GetQueryString (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
    },
  }
}
</script>
<style lang="stylus" scoped>
.machine {
  width: calc(100% - 40px);
  height: calc(100% - 50px);
  background:#FFFFFF;
	position: absolute;
	top: 20px;
	left: 20px;
  overflow: hidden;
}
.machine iframe {
  margin-top: 0 !important;
}
</style>
