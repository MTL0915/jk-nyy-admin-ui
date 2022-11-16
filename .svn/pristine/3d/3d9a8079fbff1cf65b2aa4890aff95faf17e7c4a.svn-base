<template>
  <div
    style="padding-bottom: 30px;"
    class="Content"
  >
    <el-dialog
      id="history_dialog"
      :visible.sync="historyVisible"
      title="传感器历史数据"
      class="history_dialog_header1"
      append-to-body
      width="900px"
      top="10vh"
    >
      <div style="width:100%;height:300px;">
        <div>
          <span>历史曲线 </span>
          <el-button
            type="primary"
            plain
            @click="queryData('day')"
          >天</el-button>
          <el-button
            type="primary"
            plain
            @click="queryData('week')"
          >周</el-button>
          <el-button
            type="primary"
            plain
            style="margin-right:10px;"
            @click="queryData('month')"
          >月</el-button>
          <el-date-picker
            v-model="startdatetime"
            type="datetime"
            placeholder="开始日期时间"
          />
          <el-date-picker
            v-model="enddatetime"
            type="datetime"
            placeholder="结束日期时间"
          />

          <el-button
            type="success"
            style="margin-left:10px;"
            @click="queryData('query')"
          >查询</el-button>
        </div>

        <div
          ref="chart"
          :style="{height:'250px',width:'100%'}"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getDayWsenData, getSomeDayWsenData, getWsenDataByStarttimeAndEndtime } from '@/api/device'
import { isFloat } from '@/utils/basetype'
import echarts from 'echarts'
import { formatDate } from '@/utils/date'
require('echarts/theme/macarons') // echarts theme
import Schart from 'vue-schart'
export default {
  name: 'SensorHistoryData',
  components: {
    Schart
  },
  data() {
    return {
      historyVisible: false,
      hd_device_sensor_id: '',
      chartData: {
        xAxis: [],
        datas: []
      },
      showType: 'day',
      minValue: 0,
      maxValue: 30,
      startdatetime: null,
      enddatetime: null

    }
  },
  methods: {
    showData(hd_device_sensor_id) {
      this.historyVisible = true
      this.hd_device_sensor_id = hd_device_sensor_id
      this.getData()
    },
    initChart() {
      this.chart = echarts.init(this.$refs.chart, 'macarons')
      if (this.showType === 'query') {
        this.setOptions2(this.chartData)
      } else {
        this.setOptions(this.chartData)
      }
    },
    setOptions({ xAxis, datas }) {
      var min = this.minValue
      var max = this.maxValue
      this.chart.setOption({
        grid: {
          left: '5%',
          top: '5%',
          bottom: '10%',
          right: '2%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
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
    setOptions2({ xAxis, datas }) {
      var min = this.minValue
      var max = this.maxValue
      this.chart.setOption({
        grid: {
          left: '5%',
          top: '5%',
          bottom: '10%',
          right: '2%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
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
        dataZoom: [{
          type: 'inside'
        }],
        series: [
          {
            name: '数据',
            type: 'line',
            barWidth: '60%',
            data: datas,
            showAllSymbol: true,
            symbol: 'none', // 这句就是去掉点的
            smooth: true
          }
        ]
      })
    },
    queryData(type) {
      this.showType = type
      this.getData()
    },
    showChartByType(data) {
      this.minValue = 0
      this.maxValue = 0
      this.tableData = []
      this.chartData.xAxis = []
      this.chartData.datas = []
      for (let i = 0, len = data.response_times.length; i < len; i++) {
        var value = data.value[i]
        value = isFloat(value) ? parseFloat(value) : value

        if (value) {
          if (i === 0) {
            this.minValue = value
            this.maxValue = value
          } else {
            if (value < this.minValue) {
              this.minValue = value
            }
            if (value > this.maxValue) {
              this.maxValue = value
            }
          }
        }

        if (this.showType === 'day') {
          this.chartData.xAxis.push(data.response_times[i].substring(11, 13))
        } else if (this.showType === 'week' || this.showType === 'month') {
          this.chartData.xAxis.push(data.response_times[i].substring(5, 11))
        } else {
          this.chartData.xAxis.push(data.response_times[i])
        }
        this.chartData.datas.push(value)
      }
      this.maxValue = this.maxValue + 1
      this.minValue = parseInt(this.minValue)
      this.maxValue = parseInt(this.maxValue)
      this.initChart()
    },
    getData() {
      var type = this.showType
      if (type === 'day') {
        getDayWsenData({ hd_device_sensor_id: this.hd_device_sensor_id }).then(res => {
          this.showChartByType(res.data)
        })
      } else if (type === 'week') {
        getSomeDayWsenData({ hd_device_sensor_id: this.hd_device_sensor_id }).then(res => {
          this.showChartByType(res.data)
        })
      } else if (type === 'month') {
        getSomeDayWsenData({ hd_device_sensor_id: this.hd_device_sensor_id, some_day: 30 }).then(res => {
          this.showChartByType(res.data)
        })
      } else if (type === 'query') {
        if (this.startdatetime === null || this.startdatetime === '') {
          this.$message.error('请选择开始日期时间!')
        }
        if (this.enddatetime === null || this.enddatetime === '') {
          this.enddatetime = new Date()
        }
        var starttime = formatDate(this.startdatetime, 'yyyy-MM-dd hh:mm:ss')
        var endtime = formatDate(this.enddatetime, 'yyyy-MM-dd hh:mm:ss')
        getWsenDataByStarttimeAndEndtime({ hd_device_sensor_id: this.hd_device_sensor_id, starttime: starttime, endtime: endtime }).then(res => {
          this.showChartByType(res.data)
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.history_dialog_header1 >>> .el-dialog__header
  padding-top 10px

.history_dialog_header1 >>> .el-dialog__headerbtn
  top 13px

.history_dialog_header1 >>> .el-dialog__body
  padding 10px 20px

.history_dialog_header1 >>> .el-button
  padding 10px 25px

.history_dialog_header1 >>> .button-is-selected
  background #1890ff
  border-color #1890ff
  color #FFFFFF

.history_dialog_header1 >>> .button-is-not-selected
  color #1890ff
  background #e8f4ff
  border-color #a3d3ff
</style>
