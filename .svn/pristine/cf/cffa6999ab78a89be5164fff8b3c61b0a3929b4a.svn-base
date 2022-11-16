<template>
  <div class="device-main">

    <iframe
      style="width:100%;height:100%"
      src="https://i.svrvr.com/v2/pano/#/pano/9b387699d4"
    />

    <!-- <iframe style="width:100%;height:100%" src="https://i.svrvr.com/?a=wapview&id=d89598" /> -->
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
  data () {
    return {
      DOMAIN: process.env.DOMAIN,
      src: "https://" + process.env.DOMAIN + "/vision_ui/vision_ui#/autoLogin?code=34c5d45a4e9196f47c27a1f060f0c0701a7fd52a0b478be4022cef745314fed2&device_id=SX01A-2000072&model=sd",
      bs_base_id: this.$store.state.baseinfo.cur_base_id,
    }
  },
  methods: {
    showInnerVideo () {
      this.src = "https://" + this.DOMAIN + "/vision_ui/vision_ui#/autoLogin?code=34c5d45a4e9196f47c27a1f060f0c0701a7fd52a0b478be4022cef745314fed2&device_id=SX01A-2000072&model=sd";
    },
    showOuterVideo () {
      this.src = "https://" + this.DOMAIN + "/vision_ui/vision_ui#/autoLogin?code=34c5d45a4e9196f47c27a1f060f0c0701a7fd52a0b478be4022cef745314fed2&device_id=SX01A-2000054&model=sd";
    },
    getChildValue (rs_facilities_id) {
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
  background-color: #fff;
}
::-webkit-scrollbar-thumb {
  border-radius: 7px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #e8e8e8;
}
</style>
