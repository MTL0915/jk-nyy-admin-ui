<template>
  <div class="toolbar">
    <el-form>
      <el-row>
        <el-col style="width:315px">
          <el-form-item
            label="起始时间："
            prop="start_time"
          >
            <el-date-picker
              v-model="form.start_time"
              type="datetime"
              placeholder="选择日期时间"
            />
          </el-form-item>
        </el-col>
        <el-col style="width:315px">
          <el-form-item
            label="结尾时间："
            prop="end_time"
          >
            <el-date-picker
              v-model="form.end_time"
              type="datetime"
              placeholder="选择日期时间"
            />
          </el-form-item>
        </el-col>
        <el-col style="width:160px;display:none">
          <el-button @click="setValue()">提交</el-button>
        </el-col>
      </el-row>
    </el-form>

    <div class="flex in_sen_title">
      <p>历史曲线</p>
    </div>

    <!-- <div>
      <el-radio-group
        v-model="showType"
        @change="showTableOrChart()"
      >
        <el-radio-button label="图形" />
        <el-radio-button label="表格" />
      </el-radio-group>
    </div> -->

    <div
      v-show="chartDiv"
      ref="chart"
      :style="{'margin-top':'30px',height:height,width:width}"
    />
    <div
      v-show="tableDiv"
      style="margin-top:30px;"
      align="center"
    >
      <el-table
        :data="tableData"
        :height="table_height+'px'"
        border
        style="width: 95%;"
      >
        <el-table-column
          v-for="col in dataCols"
          :prop="col.value"
          :key="col.label"
          :label="col.label"
        />
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { selectSensorData2 } from '@/api/equip'
import { parseTime, objectArraySort } from '@/utils/index'
import { Loading } from 'element-ui'

export default {
  data () {
    return {
      width: '100%',
      height: '300px',
      chart: null,
      chartData: {
        time: [],
        data: [],
        Line: [],
        datas: []
      },
      showType: '图形',
      chartDiv: true,
      tableDiv: false,
      form: {
        start_time: new Date(new Date() - 30 * 24 * 60 * 60 * 1000),
        end_time: new Date()
      },
      group_type: 3, table_height: 300,
      tableData: [], dataCols: []
    }
  },
  computed: {
    ...mapGetters([
      'id'
    ])
  },
  methods: {
    // showTableOrChart () {
    //   if (this.showType === '表格') {
    //     this.chartDiv = false
    //     this.tableDiv = true
    //   } else {
    //     this.chartDiv = true
    //     this.tableDiv = false
    //   }
    // },
    setValue (sensorIds) {
      if (sensorIds) {
        this.sensorIds = sensorIds.join(',')
      }
      if (!this.sensorIds) {
        this.$message.warning('请先选择传感器')
        return
      }
      this.form.start_time = parseTime(this.form.start_time)
      this.form.end_time = parseTime(this.form.end_time)
      const loadingInstance = Loading.service({ fullscreen: true })
      selectSensorData2({
        sensor_ids: this.sensorIds,
        start_time: this.form.start_time,
        end_time: this.form.end_time,
        group_type: this.group_type
      }).then(res => {
        loadingInstance.close()
        // this.bindTableColumn(res.data)
        if (res.data.sensor.length > 0) {
          this.initChart(res.data)
        }
      }).catch(() => {
        loadingInstance.close()
      })
    },
    // bindTableColumn (data) {
    //   this.table_height = document.body.clientHeight - 480
    //   this.tableData = data
    //   this.dataCols = []
    //   if (data == null || data.length === 0) return false

    //   this.dataCols.push({ label: "时间", value: "时间" })
    //   for (var key in data[0]) {
    //     if (key === "时间") {
    //       continue
    //     }
    //     this.dataCols.push({ label: key, value: key })
    //   }
    // },
    setOptions (sj) {//{ time, data, Line, datas }
      this.chart.setOption({
        grid: {
          left: '5%',
          top: '15%',
          bottom: '10%',
          right: '5%'
        },
        legend: {
          type: 'scroll',
          data: function () {
            let array = []
            sj.sensor.map(v => {
              array.push(v.hd_device_name + ' ' + v.hd_device_sensor_name)
            })
            return array
          }(),
          itemWidth: 18,
          itemHeight: 12,
          textStyle: {
            color: '#0e2147',
            fontSize: 14
          }
        },
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            }
          },
          {
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
            data: function () {
              // let array = []
              // sj.time.map(v => {
              //   array.push(v)
              // })
              return sj.time
            }()
          }
        ],
        series: function () {
          let array = []
          sj.sensor.map(v => {
            let dataArray = []
            v.avg_data.map((q, w) => {
              let a = []
              a.push(sj.time[v.index[w]])
              a.push(q)
              dataArray.push(a)
            })
            array.push({
              symbolSize: 3,
              name: v.hd_device_name + ' ' + v.hd_device_sensor_name,
              type: 'line',
              yAxisIndex: 1,
              itemStyle: {
                normal: {
                  borderWidth: 5
                }
              },
              data: dataArray
            })
          })
          return array
        }()
      }, true)
    },
    initChart (sj) {
      this.chart = echarts.init(this.$refs.chart, 'macarons')
      this.setOptions(sj)
    }
  }
}
</script>
<style lang="stylus" scoped>
.in_sen_title
  border-bottom solid #dadddf 1px
  line-height 33px
  height 33px
  font-size 17px
  margin 0px
  background-color #eeede8
  padding 0 20px
  color #333

.flex
  display flex
  justify-content space-between

.el-input__inner
  height 25px

.toolbar
  margin 0px
  padding 0px
  padding-top 15px
  width 99%
</style>
