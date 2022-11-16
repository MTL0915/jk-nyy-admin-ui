<template>
  <div class="card-item" style="width: 100%;height:100%">
    <div class="x-card" style="height: 100%;width: 100%;">
      <div class="card-header">
        <div class="title-container">
          <a data-track-id="card-header-title" target="_self" title="" href="#"><!--182-->
            <span class="title">基地地图</span>
          </a>
        </div>
        <div class="option-container">
          <span class="option"><!--185--></span>
          <span class="menu">
            <i class="iconfont icon-console-more-option"/>
          </span>
        </div>
      </div>
      <div style="padding-top: 15px;width:100%;height: calc(100% - 15px);position: relative;">
          <div class='mapCover' @click='goUrl'>
            <!-- <div @click='goUrl'>进入一张图</div> -->
          </div>
          <map-box :isBack='true' :callBack='callBack' :isCoverMode='isCoverMode' :base_id='this.$store.state.baseinfo.cur_base_id' ref="map"/>
          <!-- <iframe class='mapBox' :src='"./map3d?isCoverMode=false&isBack=true&base_id="+this.$store.state.baseinfo.cur_base_id'></iframe> -->
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { baseStatistics } from '@/api/baseinfo'
// import mapBox from './map.vue'
import mapBox from '@/views/base/plan3d/index.vue'
export default {
  name: 'MyMap',
  components: {
    mapBox
  },
  data() {
    return {
      isCoverMode: true,
      w: 0,
      h: 0,
      t: 0,
      l: 0
    }
  },
  computed: {
    ...mapGetters(['id'])
  },
  mounted: function() {
  },
  created() {
  },
  methods: {
    fullScreen () {
      this.$router.push({ path: '/mydevicedata/map', query: {} })
    },

    callBack (){
      var dom = this.$refs.map.$el;
      // 改变为固定宽高
      $(dom).animate({ top: this.t+"px" , left: this.l+"px", width: this.w+"px", height: this.h+"px" });
      // 隐藏掉侧边栏
      $(".sidebar-container.el-scrollbar").animate({ left: "0%" })
      setTimeout(()=>{ 
        this.isCoverMode = true;
        dom.style.position = "";
        dom.style.width='100%';
        dom.style.height='100%';
      },1000)
    },

    goUrl (){
      // window.open("./map3d?base_id="+this.$store.state.baseinfo.cur_base_id);
      var dom = this.$refs.map.$el;
      // 首先确定当前宽高
      this.w = dom.offsetWidth;
      this.h = dom.offsetHeight;
      // 改变为固定宽高
      dom.style.width = this.w + "px";
      dom.style.height = this.h + "px";
      // 改变定位方式
      dom.style.position = "fixed";
      dom.style.zIndex = "999999";
      this.t = dom.offsetTop;
      this.l = dom.offsetLeft;
      // 加载css延迟动画属性
      // dom.style.transition = "all 0.25s";
      // 获取当前屏幕的宽高
      var xwidth = window.innerWidth;
      var xheight = window.innerHeight;
      $(dom).animate({ top: "0px" , left: "0px", width: xwidth+"px", height: xheight+"px" });
      // 隐藏掉侧边栏
      $(".sidebar-container.el-scrollbar").animate({ left: "-100%" })
      // 开始赋值进行延迟动画
      setTimeout(()=>{      
        this.isCoverMode = false;
      },1000)
    }
  }
}
</script>

<style>
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.fullScreen {
  position: absolute;
  right: 15px;
  top: 15px;
  color: #000;
  cursor: pointer;
  transition: all 0.25s;
  padding-bottom: 3px;
}
.fullScreen:hover {
  color: #0072ff;
}
.fullScreen::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  transition: all 0.25s;
  height: 1px;
  background: #0072ff;
}
.fullScreen:hover:after {
  width: 100%;
}

.mapCover {
  position:absolute;
  z-index:22;
  background: #00000000;
  transition: background 0.25s;
  top: 15px;
  left: 0;
  bottom: 0px;
  right: 0;
  cursor: pointer;
}
.mapCover:hover {
  // background: #000000A1;
}
.mapCover:hover > div {
  opacity: 1;
}
.mapCover > div {
  position:absolute;top:50%;left:50%;transform: translate(-50%,-50%);padding: 10px;background: #fff;border-radius: 6px;color: #04a2ff;opacity: 0;
  cursor: pointer;
}

.mapBox {
  width: 100%;
  height: 100%;
}

</style>
