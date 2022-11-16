<template>
  <!-- <video-model style='width:100%;height:100%;' :device_id='device_id' /> -->
  <iframe
    ref="video"
    :src="'/sxt?device_id='+device_id+'&playWay=play'"
    style="width:100%;height:100%"
  />
</template>

<script>
import videoModel from '@/views/base/video/module/Sxt.vue'
export default {
    components : {
        videoModel
    },
    data (){
      return {
        device_id : "SX01A-1900015",
      } 
    },
    methods :{
      set (url){
        this.device_id = url;
      }
      
    }
}
</script>

<style>

</style>