<template>
  <div class="device-main">
    <div class="device-content"><device-content ref="childNode" /></div>
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
  },
  methods: {
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
