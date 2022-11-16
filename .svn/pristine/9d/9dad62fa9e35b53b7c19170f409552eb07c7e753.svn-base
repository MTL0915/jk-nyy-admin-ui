<template>
  <div style="height:100%;">
    <!-- 电量统计-->
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
          @change="batteryLeftByDeviceChannel()"
          value-format="yyyy-MM-dd"
          size="mini"
        />
      </div>
      <div style="height:calc(100% - 50px)">
        <el-tabs style="height:100%;">
          <el-tab-pane
            v-for="(item,index) in optionsList"
            :key="index"
            style="height:100%;"
          >
            <div slot="label">
              <span>{{item.name}}</span>
            </div>
            <div style="height:100%;">
              <v-chart
                style="width:100%;height:100%"
                :options="item"
                :autoresize="true"
              />
            </div>
          </el-tab-pane>
        </el-tabs>
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

export default {
  props: {
    device_id: {
      type: String,
      default: null
    },
    channels: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      selectTime: null,//查询时间段
      optionsList: [],//echart配置列表
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    formatDate,
    init () {
      let now = new Date()
      let time = []
      time.push(this.formatDate(new Date(now.getTime() - (7 * 86400000)), 'yyyy-MM-dd'))//七天前  
      time.push(this.formatDate(now, 'yyyy-MM-dd'))//当前时间
      this.selectTime = time
      this.batteryLeftByDeviceChannel()
    },
    //查询耗电量
    batteryLeftByDeviceChannel () {
      if (!this.selectTime) {
        this.$message.error('请输入时间范围')
        return
      }

      let startTime = this.selectTime[0] + ' 00:00:00'
      let endTime = this.selectTime[1] + ' 23:59:59'

      const config = {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }
      }

      this.optionsList = []
      this.$axios.post(process.env.BASE_API + '/iot_time_quantumrest/batteryLeftByDeviceChannel',
        {
          device_id: this.device_id,
          channels: this.channels,
          startTime: startTime,
          endTime: endTime,
          sort: "asc"
        }, config).then(res => {
          if (res.data.code === 200) {
            if (res.data.data) {
              for (let i = 0; i < res.data.data.length; i++) {
                let device = res.data.data[i]
                if (device.sensors) {
                  for (let j = 0; j < device.sensors.length; j++) {
                    let sensor = device.sensors[j]
                    let option = this.initChat(sensor.name, sensor.time, sensor.value, sensor.unit)
                    this.optionsList.push(option)
                  }
                }
              }
            }
            this.$forceUpdate()
          } else {
            this.$message.error(res.data.msg)
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
              type: 'bar',
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
<style lang="stylus" scoped>
>>> .el-tabs__content
  height calc(100% - 50px)
</style>
