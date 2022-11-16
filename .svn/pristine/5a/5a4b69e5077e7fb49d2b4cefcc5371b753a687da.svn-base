<template>
  <!-- 导航模式 -->
  <div class='map3dOm'>
    <!-- 地图模块 -->
    <JKMap3d :loadMap='loadMap'></JKMap3d>
    <!-- 导航模式 -->
    <!--<comp-taskmode class='comp-taskmode'></comp-taskmode>-->
    <!-- 加載 -->
    <!--<comp-loading></comp-loading>-->
  </div>
</template>

<script>
import { getDetailById } from '@/api/equip'
// import compTaskmode from './comps/taskMode/planNavigationtask'
// import compLoading from './comps/loading.vue'
export default {
  components: {
    // compTaskmode,
    // compLoading
  },
  props: {
    position: {
      type: Array,
      default: () => []
    },
    route: {
      type: Array,
      default: () => []
    },
    device_id: {
      type: String,
      default: ""
    }
  },
  data (){
    return {
      view: null,
      device: []
    }
  },
  mounted (){

  },
  methods: {

    // 数据加载完毕
    datLoad (){
      
    },

    // 加载地图
    loadMap ( view ){
      // 赋值view对象
      this.view = view;
      // 获取设备数据
      this.getDetailById();
    },

    // 显示点
    showPoint (){
      // 首先判断是否存在点
      if( this.position ){
        // 如果存在点 显示点的位置
        
      };
    },

    // 获取设备信息
    getDetailById (id){
      if( this.device_id ){
        // 如果设备id存在的时候
        getDetailById({
          device_id: this.device_id
        }).then((e)=>{
          // 设备信息
          this.deviceData = e.data;
          // 首先判断设备状态
          if( e.state === 0 ){
            this.deviceData.state
          }
        })
      }
    }
  }
}
</script>

<style scoped>
  .comp-taskmode {
    position:absolute;
    left: 0;
    top: 0;
  }

  .map3dOm {
    height: 100%;
  }

</style>