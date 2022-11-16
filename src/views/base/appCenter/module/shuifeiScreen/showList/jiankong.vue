<template>
  <div class="box">
    <div class="header">视频监控</div>
    <div class='boxContont'>
      <!-- <iframe src=''  style='border:1px solid #288c9d;width:100%;height:100%'></iframe> -->
      <video src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" style='width:100%;height:100%' controls></video>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
.box{
    height: calc(32% - 10px);
    position: relative;
    margin: 10px 0;
    border: 1px solid #288c9d;
}

.box .header {
  font-size: 20px;
  color: #78F7F7;
  text-align: center;
  height: 38px;
  line-height: 38px;
}
.boxContont{
  padding: 10px;
  height: calc(100% - 58px)
}
</style>