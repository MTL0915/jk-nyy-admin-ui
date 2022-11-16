<template>
  <div class="device-main">
      <div style="position: absolute;top: 3px;left: 250px;background-color: rgba(255, 255, 255, 0);">
           <el-button type="primary" size="mini" @click="showInnerVideo()">室内实景</el-button>
           <el-button type="success" size="mini" @click="showOuterVideo()">室外实景</el-button>
        </div>
      <iframe style="width:100%;height:100%" ref="videoIframe" :src="src" />
  </div>
</template>

<script>
import NavMenu from './components/NavMenu';
import DeviceContent from './components/Content';
import MapContent from '../base/plan/Plan';
export default {
  name: 'MyDevice',
  components: {
    NavMenu,
    DeviceContent,
    MapContent
  },
  data() {
    return {
      src:"",
      bs_base_id: this.$store.state.baseinfo.cur_base_id,
    }
  },
  created(){
    this.$nextTick(() => {
      this.showInnerVideo();
    })
  },
  methods: {
    showInnerVideo(){
      this.src = "http://121.32.129.19:8100/vision_ui/#/autoLogin?code=34c5d45a4e9196f47c27a1f060f0c0701a7fd52a0b478be4022cef745314fed2&device_id=SX01A-2000072&model=sd";
    },
    showOuterVideo(){
      this.src = "http://121.32.129.19:8100/vision_ui/#/autoLogin?code=34c5d45a4e9196f47c27a1f060f0c0701a7fd52a0b478be4022cef745314fed2&device_id=SX01A-2000054&model=sd";
    },
    getChildValue(rs_facilities_id) {
      this.$refs.childNode.cur_page = 1;
      this.$refs.childNode.rs_facilities_id = rs_facilities_id;
      this.$refs.childNode.getData();
    }
  }
};
</script>

<style>
.device-main {
  position: absolute;
  top: 20px;
  left: 20px;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
}
.device-content {
}
.el-tabs--border-card {
  height: 100%;
}
.el-tabs--border-card > .el-tabs__content {
  height: calc(100% - 45px);
  overflow: auto;
}
::-webkit-scrollbar {
  width: 6px;
  background-color: #FFF;
}
::-webkit-scrollbar-thumb {
  border-radius: 7px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #e8e8e8;
}
</style>
