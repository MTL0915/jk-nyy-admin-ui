<template>
  <div style="height:100%;">
    <!-- sim卡流量 -->
    <div style="height:100%;">
      <div style="text-align:right;">
        <el-date-picker
          v-model="selectTime"
          align="right"
          type="daterange"
          placeholder="选择日期"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @change="simFlowStatistics()"
          value-format="yyyy-MM-dd"
          size="mini"
        />
      </div>
      <div style="height:calc(100% - 50px)">
        <div
          style="height:100%;"
          v-if="showOption"
        >
          <v-chart
            style="width:100%;height:100%"
            :options="option"
            :autoresize="true"
          />
        </div>
        <div
          class="noData"
          v-else
        >
          暂无数据
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/polar";
import "echarts/lib/component/legend";
import "echarts/lib/component/title.js";
import { formatDate } from "@/utils/date"
import { getToken } from '@/utils/auth'
import { simFlowStatistics } from '@/api/iot_time_quantumrest'

export default {
  props: {
    device_id: {
      type: String,
      default: null
    },
    hd_device_sim_id: {
      type: String,
      default: null
    },
    iccid: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      selectTime: null,//查询时间段
      option: null,//echart配置
      showOption: false,//展示图表
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    formatDate,
    //初始化
    init () {
      let now = new Date()
      let time = []
      time.push(this.formatDate(new Date(now.getTime() - (7 * 86400000)), 'yyyy-MM-dd'))//七天前  
      time.push(this.formatDate(now, 'yyyy-MM-dd'))//当前时间
      this.selectTime = time
      this.simFlowStatistics()
    },
    //查询sim卡流量
    simFlowStatistics () {
      if (!this.selectTime) {
        this.$message.error('请输入时间范围')
        return
      }

      let startTime = this.selectTime[0] + ' 00:00:00'
      let endTime = this.selectTime[1] + ' 23:59:59'

      simFlowStatistics({
        device_id: this.device_id,
        hd_device_sim_id: this.hd_device_sim_id,
        iccid: this.iccid,
        startTime: startTime,
        endTime: endTime
      }).then(res => {
        if (res.code === 200) {
          if (res.data) {
            let xAxisData = []
            let serieData = []
            let unit = ''

            for (let i = 0; i < res.data.length; i++) {
              let d = res.data[i]
              if (d.unit) {
                unit = d.unit
              }
              xAxisData.push(this.formatDate(new Date(d.time), 'MM-dd hh:mm'))
              serieData.push(d.v)
            }
            if (xAxisData.length > 0) {
              this.showOption = true
            } else {
              this.showOption = false
            }
            this.option = this.initChat('使用流量', xAxisData, serieData, unit)
          }
          this.$forceUpdate()
        } else {
          this.$message.error(res.msg)
        }
      })


    },
    //初始图表
    initChat (name, xAxisData, serieData, unit) {
      if (unit === null || unit === undefined) {
        unit = ''
      }
      return Object.assign(
        {},
        {
          name: name,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: function (params) {
              return `<p>${'时间：' + params[0].axisValue}</p><p>${name + '：' + params[0].data + unit}</p>`
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: xAxisData,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: name,
              type: 'line',
              barMaxWidth: 30,
              barWidth: '60%',
              data: serieData,
              itemStyle: {
                color: '#02B4DD'
              }
            }
          ]
        }
      );
    },
  }
}
</script>
<style scoped>
.noData {
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100%;
  font-size: 28px;
}
</style>
