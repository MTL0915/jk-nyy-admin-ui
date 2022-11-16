<template>
  <div
    style="padding-bottom: 30px;"
    class="Content"
  >
    <el-dialog
      id="history_dialog"
      :visible.sync="nowDialogVisible"
      title="传感器实时数据"
      class="history_dialog_header1"
      append-to-body
      width="800px"
      top="10vh"
    >
      <div style="width:100%;height:100%">
        <div ref="chart" />
        <div>

          <el-radio-group
            v-model="showType"
            @change="showTableOrChart()"
          >
            <el-radio-button label="图形" />
            <el-radio-button label="表格" />
          </el-radio-group>
        </div>
        <div
          style="margin-top:30px;width:100%;"
          align="center"
        >
          <div
            v-show="chart"
            style="width:750px"
          >
            <div
              ref="chart"
              :style="{width:'750px',height:'300px'}"
            />
          </div>

          <div v-show="table">
            <el-table
              :data="tableShowData"
              :cell-style="tableCellStyle"
              border
              style="width: 100%"
            >
              <el-table-column
                prop="time"
                label="上传时间"
                style="width:50%"
                align="center"
              >
                <template slot-scope="scope">
                  <i class="el-icon-time" />
                  <span style="margin-left: 10px">{{ scope.row.time }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="value"
                label="数值"
                align="center"
              />
            </el-table>
            <el-pagination
              :total="tableNum"
              layout="prev, pager, next"
              @current-change="pageChange($event)"
            />
          </div>
        </div>

      </div>
    </el-dialog>
  </div>
</template>

<script>

import { getWsenData } from '@/api/device'
import { isFloat } from '@/utils/basetype'
import { formatDate } from '@/utils/date'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import Schart from 'vue-schart'
export default {
  name: 'SensorNowData',
  components: {
    Schart
  },
  data() {
    return {
      width: '100%',
      nowDialogVisible: false,
      hd_device_sensor_id: '',
      showType: '图形',
      showNum: 50,
      table: false,
      chart: false,
      minValue: 0,
      maxValue: 30,
      chartData: {
        xAxis: [],
        datas: []
      },
      tableData: [],
      tableShowData: [],
      tableCellStyle: {
        'padding-top': '8px',
        'padding-bottom': '8px'
      },
      tableNum: 0,
      tableCurrentPage: 1

    }
  },
  methods: {
    showData(hd_device_sensor_id) {
      this.nowDialogVisible = true
      this.hd_device_sensor_id = hd_device_sensor_id
      this.getData()
    },
    pageChange(value) {
      this.tableCurrentPage = value
      this.showTable()
    },
    showTableOrChart() {
      if (this.showType === '表格') {
        this.chart = false
        this.table = true

        this.showTable()
      } else {
        this.chart = true
        this.table = false

        this.initChart()
      }
    },
    showTable() {
      var tableData = this.tableData.reverse()
      var start = (this.tableCurrentPage - 1) * 10
      var end = this.tableCurrentPage * 10
      if (end > tableData.length) {
        end = tableData.length
      }

      this.tableShowData = []
      for (var i = start; i < end; i++) {
        this.tableShowData.push(tableData[i])
      }
    },
    getData() {
      getWsenData({ hd_device_sensor_id: this.hd_device_sensor_id, maxResult: this.showNum }).then(res => {
        this.tableData = []
        this.chartData.xAxis = []
        this.chartData.datas = []

        for (let i = 0, len = res.data.times.length; i < len; i++) {
          var time = res.data.times[i]
          var value = res.data.value[i]
          value = isFloat(value) ? parseFloat(value) : value
          this.tableData.push({
            'time': time,
            'value': value
          })

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

          this.chartData.xAxis.push(time)
          this.chartData.datas.push(value)
        }
        this.maxValue = this.maxValue + 1
        this.minValue = parseInt(this.minValue)
        this.maxValue = parseInt(this.maxValue)

        this.showTableOrChart()
        this.tableNum = this.tableData.length
      })
    },
    initChart() {
      this.chart = echarts.init(this.$refs.chart, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ xAxis, datas }) {
      var min = this.minValue
      var max = this.maxValue
      this.chart.setOption({
        grid: {
          left: '5%',
          top: '5%',
          bottom: '10%',
          right: '5%'
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
              formatter: function(x) {
                return x.substring(11, 16)
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
            smooth: true
          }
        ]
      })
    },
    queryData(type) {
      if (type === 'day') {
        //
      } else if (type === 'week') {
        //
      } else if (type === 'month') {
        //
      } else if (type === 'query') {
        if (this.queryDate === null || this.queryDate === '') {
          this.$message.error('请选择开始日期与结束日期!')
          return
        }
        var startDate = new Date(this.queryDate[0])
        var endDate = new Date(this.queryDate[1])
        console.log(startDate)
        console.log(endDate)
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
