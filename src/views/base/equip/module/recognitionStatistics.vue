<template>
  <!-- 识别数量统计 -->
  <div style="width:100%;height:100%;">
    <div style="text-align:right;">
      <el-date-picker
        size="mini"
        v-model="selectTime"
        type="datetimerange"
        value-format="yyyy-MM-dd HH:mm:ss"
        unlink-panels
        align="right"
      />
      <el-button
        type="primary"
        size="mini"
        @click="selectData()"
      >查询</el-button>
    </div>
    <div style="display:flex;height:100%;">
      <div style="width:30%;height:100%;">
        <recognitionStatisticsChat1
          :hd_device_ids="hd_device_ids"
          :device_ids="device_ids"
          :bs_base_id="bs_base_id"
          :rs_facilities_id="rs_facilities_id"
          :startTime="startTime"
          :endTime="endTime"
        />
      </div>
      <div style="width:69%;height:100%;">
        <recognitionStatisticsChat2
          :hd_device_ids="hd_device_ids"
          :device_ids="device_ids"
          :bs_base_id="bs_base_id"
          :rs_facilities_id="rs_facilities_id"
          :startTime="startTime"
          :endTime="endTime"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate, parseDate } from '@/utils/date'
import recognitionStatisticsChat1 from './recognitionStatisticsChat1'
import recognitionStatisticsChat2 from './recognitionStatisticsChat2'
export default {
  components: {
    recognitionStatisticsChat1,
    recognitionStatisticsChat2
  },
  data () {
    return {
      selectTime: null,//查询时间
      startTime: null,
      endTime: null
    }
  },
  props: {
    hd_device_ids: {
      type: String,
      default: null
    },
    device_ids: {
      type: String,
      default: null
    },
    bs_base_id: {
      type: String,
      default: null
    },
    rs_facilities_id: {
      type: String,
      default: null
    },
    recognitionDataStartTime: {
      type: String,
      default: null
    },
    recognitionDataEndTime: {
      type: String,
      default: null
    }
  },
  created () {
    //外部传入初始化时间
    if (this.recognitionDataStartTime && this.recognitionDataEndTime) {
      this.selectTime = [this.recognitionDataStartTime, this.recognitionDataEndTime]
    }
    this.selectData()
  },
  methods: {
    //日期转换
    formatDate,
    parseDate,
    //查询数据
    selectData () {
      if (!this.selectTime) {
        let date = new Date()
        let eTime = this.formatDate(date, 'yyyy-MM-dd hh:mm:ss')//默认此刻
        let sTime = this.formatDate(new Date(date.getTime() - (7 * 24 * 60 * 60 * 1000)), 'yyyy-MM-dd hh:mm:ss')//默认七天前
        this.selectTime = [sTime, eTime]
      }
      let sTimestamp = this.parseDate(this.selectTime[0]).getTime();
      let eTimestamp = this.parseDate(this.selectTime[1]).getTime();
      if (eTimestamp - sTimestamp > (366 * 86400000)) {
        this.$message.error("日期跨度不能超过一年");
        return;
      }
      this.startTime = this.selectTime[0]
      this.endTime = this.selectTime[1]
      // //测试数据
      // this.device_ids = 'CJ02A-2120031'
      // this.bs_base_id = '2c9082ba8025c41e018025c956ea0000'
    }
  }
}
</script>
