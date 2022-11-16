<template>
  <div>
    <!-- 数据Echart图 -->
    <div class="equip_component_div right_top_model">
      <div> 
        <div class="component_title_div" style="float: left;" >历史曲线</div>
        <div style="float: right;">
          <div @click="viewCollectedData" style="margin-top: -2px;padding-right: 5px;cursor: pointer;" >
            <i class="el-icon-more fullScreen"></i>
          </div>
        </div>
        <div style="clear: both;"></div>
      </div>

      <sensorEcharts 
        style="padding-top:5px;width:100%;height:220px;"
        :currentID="currentID"
        :ids="currentIds.join(',')"
        :mobilePlatform="false"
      />
      <!--传感器列表数据-->
      <collectedData ref="collectedData" />
    </div>
  </div>
</template>

<script>

import sensorEcharts from '@/views/sensorEcharts';
import CollectedData from '@/views/base/equip/module/CollectedData';

export default {
  name: 'sensorDataShow',
  components: { sensorEcharts,CollectedData},
  mixins: [], //混入
  props:{
    currentIds:{
      type:Array,
      default:[]
    },
    currentID:{
      type:String,
      default:""
    },
    hd_device_id:{
      type:String,
      default:""
    }
  },
  data() {
    return {
    }
  },
 
  created() {
    // dom载入后触发
    this.$nextTick(() => {
    })
  },
  watch:{
  },
  methods: {
    // 查看传感器数据
    viewCollectedData () {
      this.$refs.collectedData.showDialog(this.hd_device_id)
    },
  }
}
</script>

<style lang="stylus" scoped>

</style>