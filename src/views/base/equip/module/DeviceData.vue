<template>
  <div>
    <div style="width:100%;height:100%;">
      <div style="text-align: right;width: 100%;">
        <el-select
          v-model="selected_property"
          placeholder="请选择属性"
          size="small"
          style="width:150px"
          @change="getData"
        >
          <el-option
            v-for="item in device_propertys"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-radio-group
          v-model="type"
          size="small"
          @change="getData"
        >
          <el-radio-button label="now">最新</el-radio-button>
          <el-radio-button label="day">天</el-radio-button>
          <el-radio-button label="week">周</el-radio-button>
          <el-radio-button label="month">月</el-radio-button>
        </el-radio-group>

        <el-date-picker
          v-model="datetimerange"
          type="datetimerange"
          size="small"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束结束"
        >
        </el-date-picker>

        <el-button
          type="success"
          size="small"
          @click="queryDevicePropertyData"
        >查询</el-button>

      </div>

      <div
        ref="chart"
        style="width:100%;height:170px"
      ></div>
    </div>
  </div>

</template>

<script>
import { getDevicePropertyData, getHourData, getDayData } from '@/api/hd_device_property'
import { isFloat } from '@/utils/basetype'
import { formatDate } from '@/utils/date'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import Schart from 'vue-schart'
export default {
  name: 'DeviceData',
  components: {
    Schart
  },
  data () {
    return {
      device_propertys: [{ 'label': '设备内部温度', 'value': 'dTemp' }, { 'label': '电池电压', 'value': 'batVol' }, { 'label': '太阳能板电压', 'value': 'solarVol' }],
      selected_property: 'dTemp',
      hd_device_id: '',
      chartData: {
        xAxis: [],
        datas: []
      },
      type: 'now',
      minValue: null,
      maxValue: null,
      datetimerange: ""
      // startdatetime: null,
      // enddatetime: null

    }
  },
  methods: {
    showData (hd_device_id) {
      this.hd_device_id = hd_device_id
      this.getData()
    },
    getData () {
      var hd_device_id = this.hd_device_id
      var type = this.type
      if (type === 'day') {
        getHourData({
          'hd_device_id': hd_device_id,
          'time_order': 1,
          'names': this.selected_property
        }).then(res => {
          var data = res.data
          this.showChartByType(data, this.selected_property)
        })
      } else if (type === 'week') {
        getDayData({
          'hd_device_id': hd_device_id,
          'time_order': 1,
          'names': this.selected_property,
          'some_day': 7
        }).then(res => {
          var data = res.data
          this.showChartByType(data, this.selected_property)
        })
      } else if (type === 'month') {
        getDayData({
          'hd_device_id': hd_device_id,
          'time_order': 1,
          'names': this.selected_property,
          'some_day': 30
        }).then(res => {
          var data = res.data
          this.showChartByType(data, this.selected_property)
        })
      } else if (type === 'now') {
        getDevicePropertyData({
          'hd_device_id': hd_device_id,
          'time_order': 1,
          'names': this.selected_property,
          'maxResult': 15
        }).then(res => {
          var data = res.data
          this.showChartByType(data, this.selected_property)
        })
      }
    },
    queryDevicePropertyData () {
      var hd_device_id = this.hd_device_id;
      var datetimerange = this.datetimerange;
      if (datetimerange == "" || datetimerange.length != 2) {
        this.$message.error("查询时间不能为空!");
        return;
      }

      var startTime = formatDate(datetimerange[0], 'yyyy-MM-dd hh:mm:ss');
      var endTime = formatDate(datetimerange[1], 'yyyy-MM-dd hh:mm:ss');

      if ((datetimerange[1].getTime() - datetimerange[0].getTime()) > 15 * 24 * 3600 * 1000) {
        this.$message.error("查询时间范围不能超出15天!");
        return;
      }

      getDevicePropertyData({
        'hd_device_id': hd_device_id,
        'time_order': 1,
        'startTime': startTime,
        'endTime': endTime,
        'names': this.selected_property,
        'maxResult': 1000000
      }).then(res => {
        var data = res.data
        this.showChartByType(data, this.selected_property)
      })
    },
    initChart (type) {
      this.chart = echarts.init(this.$refs.chart, 'macarons')
      this.setOptions(this.chartData, type)
    },
    setOptions ({ xAxis, datas }, type) {
      var min = this.minValue
      var max = this.maxValue
      this.chart.setOption({
        grid: {
          left: '5%',
          top: '5%',
          bottom: '15%',
          right: '2%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        dataZoom: [
          {   // 这个dataZoom组件，默认控制x轴。
            type: 'inside', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
          }
        ],
        yAxis: [
          {
            min: min,
            max: max,
            type: 'value',
            position: 'left',
            nameTextStyle: {
              color: '#00FFFF'
            },
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: 'rgba(135,140,147,0.8)'
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: '{value}',
              color: '#0e2147',
              fontSize: 14
            }
          }
        ],
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#6A989E'
              }
            },
            axisLabel: {
              formatter: function (x) {
                if (type === 'now') {
                  return x.substring(11, 16)
                } else {
                  return x
                }
              },
              inside: false,
              textStyle: {
                color: '#0e2147', // x轴颜色
                fontWeight: 'normal',
                fontSize: '14',
                lineHeight: 22
              }

            },
            data: xAxis
          }
        ],
        series: [
          {
            name: '数据',
            type: 'line',
            barWidth: '60%',
            data: datas,
            showAllSymbol: true,
            smooth: true
          }
        ]
      })
    },
    showChartByType (data, selected_property) {
      if (data === null) {
        return;
      }
      this.maxValue = null
      this.minValue = null
      this.tableData = []
      this.chartData.xAxis = []
      this.chartData.datas = []
      for (let i = 0, len = data.response_times.length; i < len; i++) {
        var value = data[selected_property][i]
        value = isFloat(value) ? parseFloat(value) : value

        // if (value) {
        //   if (i === 0) {
        //     this.minValue = value
        //     this.maxValue = value
        //   } else {
        //     if (value < this.minValue) {
        //       this.minValue = value
        //     }
        //     if (value > this.maxValue) {
        //       this.maxValue = value
        //     }
        //   }
        // }

        if (this.type === 'day') {
          this.chartData.xAxis.push(data.response_times[i].substring(11, 13))
        } else if (this.type === 'now') {
          // this.chartData.xAxis.push(data.response_times[i].substring(11, 16))
          this.chartData.xAxis.push(data.response_times[i])
        } else if (this.type === 'week' || this.type === 'month') {
          this.chartData.xAxis.push(data.response_times[i].substring(5, 11))
        } else {
          this.chartData.xAxis.push(data.response_times[i])
        }
        this.chartData.datas.push(value)
        if (this.maxValue === null || value > this.maxValue) {
          this.maxValue = value
        }
        if (this.minValue === null || value < this.minValue) {
          this.minValue = value
        }
      }
      this.maxValue = this.maxValue + 1
      this.minValue = parseInt(this.minValue)
      this.maxValue = parseInt(this.maxValue)
      this.initChart(this.type)
    }
  }
}
</script>

<style lang="stylus" scoped></style>
