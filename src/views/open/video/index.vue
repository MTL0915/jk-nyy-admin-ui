<template>
  <div
    class="device-main"
    style="width:100%;height:100%"
  >
    <sxtifram
      ref="video"
      playWay="play"
      :hd_device_id="hd_device_id"
      :device_id="device_id"
      :unableControl="unableControl"
    />
    <!-- <iframe
      ref="video"
      :src="'/sxt?hd_device_id='+hd_device_id+'&playWay=play'"
      style="width:100%;height:100%"
    /> -->
  </div>
</template>

<script>
//import { getSxtUrlById } from '@/api/sxt'
//import vPlay from './Video.vue'
import sxtifram from '@/views/base/video/module/Sxt_ifram'
export default {
  name: 'OpenVideo',
  components: {
    sxtifram
  },
  data () {
    return {
      dialogVisible: false,
      hd_device_id: '',
      device_id: '',
      //type: '',
      unableControl:false,
      playWay: 'play',
      //definition: '',

      //childRow: {},
      //videoAdress: ''
    }
  },
  created () {

    this.$nextTick(() => {
      this.hd_device_id = this.$route.query.hd_device_id
      this.device_id = this.$route.query.device_id
      this.type = this.$route.query.type
      this.dialogVisible = true
      if (this.$route.query.unableControl === "true"){
        this.unableControl = true;
      }
    })
    // this.$nextTick(() => {
    //   this.hd_device_id = this.$route.query.hd_device_id
    //   this.device_id = this.$route.query.device_id
    //   this.type = this.$route.query.type
    //   this.definition = this.$route.query.definition

    //   if (!this.definition){
    //     this.definition = 'sd'
    //   }
    //   if (this.definition !== 'hd' ){
    //     this.definition = 'sd'
    //   }

    //   this.childRow.id = this.hd_device_id
    //   this.childRow.type = this.type
    //   if (this.hd_device_id) {
    //     getSxtUrlById({ hd_device_id: this.hd_device_id, protocol: 'hls', definition: this.definition }).then(res => {
    //       if (res.code === 200) {
    //         this.videoAdress = this.getHttpsUrl(res.data)
    //         this.dialogVisible = true
    //       } else {
    //         this.$message.error(res.msg)
    //       }
    //     })
    //   }else if (this.device_id){
    //     getSxtUrlById({ device_id: this.device_id, protocol: 'hls', definition: this.definition }).then(res => {
    //       if (res.code === 200) {
    //         this.videoAdress = this.getHttpsUrl(res.data)
    //         this.dialogVisible = true
    //       } else {
    //         this.$message.error(res.msg)
    //       }
    //     })
    //   }
    // })
  },
  methods: {
    // getHttpsUrl (url) {
    //   if (url && url.indexOf("https") > -1) {
    //     return url;
    //   }
    //   if (url && url.indexOf("http") > -1) {
    //     url = url.replace("http", "https");
    //     return url;
    //   }
    //   return url;
    // }
  }
}
</script>
<style scoped>
</style>
