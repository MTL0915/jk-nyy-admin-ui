<template>
  <div class="head-container">
    <!-- <div style="display:flex">
      <div
        class="el-form-item__content"
        style="line-height:24px;width:100%"
      >
        <el-select
          v-model="type_value"
          placeholder="请选择"
          style="width:115px;"
          @change="changeType"
        >
          <el-option
            v-for="item in type_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-cascader
          v-model="sensorIds"
          :options="deviceData"
          :collapse-tags="true"
          :props="{expandTrigger:'hover', multiple: true,label:'name',value:'id' }"
          placeholder="请选择或搜索传感器"
          clearable
          style="width:400px"
        />

        <el-button
          type="success"
          style="margin-left:10px;cursor:pointer"
          @click="handleSubmit"
        >查询</el-button>
      </div>
      <div>
        <el-select
          v-model="dk_id"
          size="mini"
          placeholder="请选择"
          @change="clickDK"
        >
          <el-option
            v-for="(item, index) in dkList"
            :key="index"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
    </div> -->

    <keep-alive>
      <component ref="chart" style="height:100%" :is="currentTabComponent" />
    </keep-alive>
    <!-- <el-dialog
      title="选择设备"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
    >
      <deviceList exportData="true" />
    </el-dialog> -->
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// import TimeCurve from './TimeCurve'
// import DateCurve from './DateCurve'
// import HistoryCurve from './HistoryCurve'
import runningTime from "./runningTime";
import dataMonit from "./dataMonit";
import baseSxtTraffic from "./baseSxtTraffic";
import energy from "./energy";
// import { getUserSensorTypeByBaseId, getFacilitiesDeviceSensorByBaseId, getDeviceSensorByBaseId } from '@/api/report'
// import { findByBs_base_id } from "@/api/rs_facilities";
// import Treeselect from '@riophae/vue-treeselect'
// import '@riophae/vue-treeselect/dist/vue-treeselect.css'
// import deviceList from '@/views/base/equip/index'

export default {
  components: {
    // TimeCurve,
    // DateCurve,
    // HistoryCurve,
    // Treeselect,
    runningTime,
    dataMonit,
    energy,
    baseSxtTraffic
    // deviceList
  },
  data() {
    return {
      dialogVisible: false,
      loadData: false,
      sensorIds: [],
      currentTabComponent: null,
      type_value: "1",
      type_options: [
        {
          label: "按地块",
          value: "1"
        },
        {
          label: "按设备",
          value: "2"
        },
        {
          label: "按传感器",
          value: "3"
        }
      ],
      deviceData: []
      // normalizer (node) {
      //   return {
      //     id: node.id,
      //     label: node.name,
      //     children: node.children
      //   }
      // },
    };
  },
  // computed: {
  //   ...mapGetters([
  //     'id'
  //   ])
  // },
  created() {
    //this.changeType()
  },
  methods: {
    // changeType () {
    //   this.sensorIds = []
    //   if (this.type_value === '1') {
    //     getFacilitiesDeviceSensorByBaseId({ bs_base_id: this.$store.state.baseinfo.cur_base_id }).then(res => {
    //       this.deviceData = res.data
    //     }).catch({})
    //   } else if (this.type_value === '2') {
    //     getDeviceSensorByBaseId({ bs_base_id: this.$store.state.baseinfo.cur_base_id }).then(res => {
    //       this.deviceData = res.data
    //     }).catch({})
    //   } else if (this.type_value === '3') {
    //     getUserSensorTypeByBaseId({ bs_base_id: this.$store.state.baseinfo.cur_base_id }).then(res => {
    //       this.deviceData = res.data
    //     }).catch({})
    //   } else {
    //     getFacilitiesDeviceSensorByBaseId({ bs_base_id: this.$store.state.baseinfo.cur_base_id }).then(res => {
    //       this.deviceData = res.data
    //     }).catch({})
    //   }
    // },
    chooseChart(label) {
      //this.loadData = true
      // if (label === '实时曲线') {
      //   this.currentTabComponent = TimeCurve
      // } else if (label === '日均曲线') {
      //   this.currentTabComponent = DateCurve
      // } else if (label === '历史曲线') {
      //   this.currentTabComponent = HistoryCurve
      // } else if (label === '导出数据') {
      //   this.dialogVisible = true
      // } else
      if (label === "设备运行时长") {
        this.currentTabComponent = runningTime;
      } else if (label === "数据监控") {
        this.currentTabComponent = dataMonit;
      } else if (label === "摄像头流量") {
        this.currentTabComponent = baseSxtTraffic;
      }
      // else if (label === '能耗统计') {
      //   this.currentTabComponent = energy
      // }
    }
    // handleSubmit () {

    //   if (this.loadData) {

    //     this.$refs.chart.setValue(this.sensorIds)
    //   } else {
    //     this.$message.warning('请先选择曲线类型')
    //   }
    // }
  }
};
</script>

<style lang="scss">
.head-container {
  height: 100%;
  width: calc(100% - 20px);
  overflow: hidden;
  // padding: 15px;
  // .vue-treeselect >>> .vue-treeselect__multi-value {
  //   margin: 0;
  // }
  // .el-cascader__tags{
  // 	top:0px !important;
  // }
  // .el-form-item__content .el-input__inner {
  //   height: 40px !important;
  // }
}
</style>
