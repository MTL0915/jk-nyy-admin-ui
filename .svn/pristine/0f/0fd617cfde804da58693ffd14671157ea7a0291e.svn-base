<template>
  <div class="card-item" style="max-width: 350px;height:400px">
    <div class="x-card" style="height: 100%;">
      <div class="card-header">
        <div class="title-container">
          <a data-track-id="card-header-title" target="_self" title="" href="#">
            <span class="title">设备动态</span>
          </a>
        </div>
        <div class="option-container">
          <span class="option"><!--185--></span>
          <span class="menu"><i class="iconfont icon-console-more-option"></i></span>
        </div>
      </div>
      <div class="card-body">
          <div class="item-container content-container">
            <el-timeline :reverse="reverse">
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :timestamp="activity.timestamp">
                {{activity.content}}
              </el-timeline-item>
            </el-timeline>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import echarts from 'echarts';
require('echarts/theme/macarons'); // echarts theme
export default {
  name: 'msg',
  data() {
    return {
      reverse: true,
      activities: [{
        content: '开启设备（SC01A-1900006）',
        timestamp: '2020-03-15'
      }, {
        content: '设备（SC01A-1900006）传感器温度过高',
        timestamp: '2020-03-13'
      }, {
        content: '设备（SC01A-1900006）绑定成功',
        timestamp: '2020-03-11'
      }]
    };
  },
  mounted: function() {
  },
  computed: {
    ...mapGetters(['id'])
  },
  methods: {

  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.item-container{
  padding-top:15px;
}
.list-block{
  width:50px;
}
.list-chart{
  width: 522px;
  height:80px;
  .echart{
    width:100%;
    height:100%;
  }
}
</style>
