<template>
  <div class="locationAndSize" >
    <div style="height:100%">
      <div style="height:33%" class="controlDiv">
        <div class="controlImgDiv">
          <img v-if="actionStatus === 'forward'" style="transform: rotate(-90deg);" class="controlImg" :src='require("@/assets/img/gy/start_2.png")' @click="controlAction('forward')"></img>
          <img v-if="actionStatus !== 'forward'" style="transform: rotate(-90deg);" class="controlImg" :src='require("@/assets/img/gy/start_1.png")' @click="controlAction('forward')"></img>
        </div>
      </div>
      <div style="height:33%" class="controlDiv">
        <div class="controlImgDiv">
          <img v-if="actionStatus === 'stop'" style="transform: rotate(90deg);" class="controlImg" :src='require("@/assets/img/gy/stop_2.png")' @click="controlAction('stop')"></img>
          <img v-if="actionStatus !== 'stop'" style="transform: rotate(90deg);" class="controlImg" :src='require("@/assets/img/gy/stop_1.png")' @click="controlAction('stop')"></img>
        </div>
      </div>
      <div style="height:33%" class="controlDiv">
        <div class="controlImgDiv">
          <img v-if="actionStatus === 'back'" style="transform: rotate(90deg);" class="controlImg" :src='require("@/assets/img/gy/start_2.png")' @click="controlAction('back')"></img>
          <img v-if="actionStatus !== 'back'" style="transform: rotate(90deg);" class="controlImg" :src='require("@/assets/img/gy/start_1.png")' @click="controlAction('back')"></img>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GyControl',
  props: {
      // 设备信息
      device_id: {
          type: String,
          default: ""
      },
      ws: {
          type: Object,
          default: ()=>{}
      },
      property_values: {
          type: Object,
          default: ()=>{}
      },
      info: {
          type: Object,
          default: ()=>{}
      }
  },
  data() {
    return {
      actionStatus:"stop"
    }
  },
  computed: {
    data() {
      return {
        
      }
    }
  },
  watch:{
    info :function(data){
      this.actionStatus = data.property_values.actionStatus;
    }
  },
  created() {
    // dom载入后触发
    this.$nextTick(() => {
       
    })
  },
  mounted(){
    this.actionStatus = "stop";
  },
  methods: {
    controlAction(action){
      if (action === "forward"){
        this.controlForward();
      }else if (action === "back"){
        this.controlBack();
      }else {
       this. controlStop();
      }
    },
    controlForward(){
      this.$confirm('设备开启前进动作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        width: '250px'
      }).then(() => {
        this.forward();
      })
    },
    forward(){
       this.ws.setActionStatus({
         actionStatus:"forward"
       },res => {
         this.actionStatus = "forward";
         console.log(res);
       },error => {
         this.$message.error(error.msg);
       })
    },
    controlBack(){
      this.$confirm('设备开启后退动作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        width: '250px'
      }).then(() => {
        this.back();
      })
    },
    back(){
       this.ws.setActionStatus({
         actionStatus:"back"
       },res => {
         this.actionStatus = "back";
         console.log(res);
       },error => {
         this.$message.error(error.msg);
       });
    },
    controlStop(){
      this.$confirm('设备开启停止动作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        width: '250px'
      }).then(() => {
        this.ws.setActionStatus({
         actionStatus:"stop"
        },res => {
          this.actionStatus = "stop";
          console.log(res);
        },error => {
          this.$message.error(error.msg);
        });
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .locationAndSize {
    color:#FFF;
    height:100%;
  }
  .controlDiv{
    height:33%;
    position:relative;
  }
  .controlImgDiv{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .controlImgDiv img{
    cursor:pointer;
  }
</style>