<template>
  <div class="view_content">
    DDD
    <iframe src = "http://192.168.33.180:8013/InsideAutoLogin?code=be50209db87f0fbc7b730b3d483917d840bccbbff5ae2ec8d1cc58b6835b98b4a5ee9cd913ea41d6&to=/nj/nj" />
  </div>
</template>

<script>

export default {
  components: {

  },
  data() {
    return {
      src: ''
    }
  },
  computed: {
  },
  created() {
    
  }
}
</script>

<style >
.view_content {
  width: calc(100% - 40px);
  height: calc(100% - 50px);
  background:#FFFFFF;
	position: absolute;
	top: 20px;
	left: 20px;
}
.view_content iframe {
  width: 100%;
  height: 100%;
}
</style>
