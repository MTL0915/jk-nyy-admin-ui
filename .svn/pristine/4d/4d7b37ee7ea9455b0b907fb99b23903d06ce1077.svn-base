<template>

  <div class="app_loader" v-show='show'>

    <!-- 黑色则找 -->
    <div class="cover"/>

    <div class="loader-4"/>

    <img class="icon" src="@/assets/img/Plan/favicon.png" >

  </div>

</template>

<script>
// 数据管理工具
// import datas from '../mapUtil/data.js'
import { mapGetters } from 'vuex'

export default {
  name: 'AppLoader',
  data() {
    return {
      // 进度
      schedule : 0, 
      show : false,
    }
  },
  mounted (){
    
    this.loader();
  },
  computed: {
    ...mapGetters([
      'id',
      'token',
      'user'
    ])
  },
  methods: {

    loader () {
      // 加载基地数据
      this.getMapJdByBs_org_id();
    },

    getMapJdByBs_org_id (){
      // 加载基地数据
      datas.getMapJdByBs_org_id(this.user.id,()=>{
        this.setSchedule( 100 );
        console.log("根据用户获取基地数据成功____"+this.schedule+"%");
      });
    },

    // 进度变化
    setSchedule ( schedule ){
      this.schedule += schedule;
      if( this.schedule >= 100 ){
        this.show = false; 
      }
    },

  }
}

</script>

<style>
  .app_loader { position:absolute;top: 0;left: 0;width: 100%; height: 100%; z-index: 999999999; }
  .app_loader .cover {
    height: 100%;
    background: #ffffff;
    opacity: 0.85;
  }
  .app_loader .loader-4 {
    border: 7px double #e4947b;
    -webkit-animation: ball-turn 1s linear infinite;
    animation: ball-turn 1s linear infinite;
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    padding: 137px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }

  .app_loader .loader-4:before,  .loader-4:after { content: ""; position: absolute; width: 12px; height: 12px; background: #ff5722; border-radius: 50%; bottom: 0; right: 37px; }
  .app_loader .loader-4:after { left: 37px; top: 0; }

  @-webkit-keyframes ball-turn {
    0% {
    -webkit-transform: translate(-50%,-50%) rotate(0deg);
    transform: translate(-50%,-50%) rotate(0deg);
    }
    100% {
    -webkit-transform: translate(-50%,-50%) rotate(360deg);
    transform: translate(-50%,-50%) rotate(360deg);
    }
  }
  @keyframes ball-turn {
    0% {
    -webkit-transform: translate(-50%,-50%) rotate(0deg);
    transform: translate(-50%,-50%) rotate(0deg);
    }
    100% {
    -webkit-transform: translate(-50%,-50%) rotate(360deg);
    transform: translate(-50%,-50%) rotate(360deg);
    }
  }

  .app_loader .icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }

</style>
