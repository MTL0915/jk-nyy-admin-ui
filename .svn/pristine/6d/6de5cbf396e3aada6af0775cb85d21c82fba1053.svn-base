<template>
  <div class="container">
    <!-- 设备类型 -->
    <div
      v-for="(deviceType,index1) in deviceTypeList"
      :key="index1"
      class="deviceTypeBoxModel xs_12 ms_12 mx_12"
    >
      <div style="padding:5px;font-size:20px;"><strong>{{ deviceType.name }}</strong></div>
      <!-- 设备 -->
      <div
        v-for="(device,index2) in deviceType.deviceList"
        :key="index2"
        class="deviceBoxModel xs_12 ms_12 mx_12"
      >
        <div style="padding:5px;font-size:20px;"><span>{{ device.name }}</span></div>
        <!-- 传感器 -->
        <div
          v-for="(sensor,index3) in device.sensorList"
          :id="'sensor'+sensor.id"
          :key="index3"
          :title="sensor.hd_sensor_type_code !=='101' && sensor.hd_sensor_type_code !=='102'?'历史曲线':''"
          :style="sensor.hd_sensor_type_code !=='101' && sensor.hd_sensor_type_code !=='102'?'cursor:pointer':''"
          class="sensorBoxModel xs_2 ms_6 mx_12"
          @click="clickSensor(sensor,device)"
        >
          <div><img
              :src="img_url+sensor.hd_sensor_type_small_image_path"
              style="width: 32;height: 32px;"
            ></div>
          <div>名称：{{ sensor.name }}</div>
          <div style="display: flex;">数据：
            <div v-if="sensor.hd_sensor_type_code === '101'">无</div>
            <div v-else-if="sensor.hd_sensor_type_code === '102'">无</div>
            <div v-else>
              <span>{{ sensor.value }}</span>
              <span>{{ sensor.hd_sensor_type_unit }}</span>
              <span
                v-show="sensor.state === 2"
                style="color:red;cursor:pointer"
                @click="showSensorErrorInfo(sensor.id)"
              >（数据异常）</span>
            </div>
          </div>
          <div>通道号：{{ sensor.channel }}</div>
          <div>时间：{{ parseTime(sensor.system_response_time) }}</div>
          <div v-if="sensor.hd_sensor_type_code =='101' || sensor.hd_sensor_type_code =='102'">操作：
            <el-radio-group
              v-if="sensor.hd_sensor_type_code =='101'"
              v-model="sensor.value2"
              size="small"
              @change="handelSwitch(sensor,index3,device.sensorList)"
            >
              <el-radio-button :label="1">打开</el-radio-button>
              <el-radio-button :label="0">关闭</el-radio-button>
            </el-radio-group>
            <el-radio-group
              v-if="sensor.hd_sensor_type_code === '102'"
              v-model="sensor.value2"
              size="small"
              @change="handelWindow(sensor,index3,device.sensorList)"
            >
              <el-radio-button
                key="8"
                label="8"
              >打开</el-radio-button>
              <el-radio-button
                key="9"
                label="9"
              >关闭</el-radio-button>
              <el-radio-button
                key="10"
                label="10"
              >暂停</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div v-if="device.chartShow">
          <!-- 实时曲线 -->
          <!-- <div class="sensorBoxModel xs_6 ms_6 mx_12">
            实时曲线
          </div> -->
          <!-- 历史查询 -->
          <div class="sensorBoxModel xs_12 ms_12 mx_12">
            <div style="width:100%;height:300px;">
              <div>
                <span>历史曲线</span>
                <el-button
                  type="primary"
                  plain
                  @click="queryData('day',device)"
                >天</el-button>
                <el-button
                  type="primary"
                  plain
                  @click="queryData('week',device)"
                >周</el-button>
                <el-button
                  type="primary"
                  plain
                  style="margin-right:10px;"
                  @click="queryData('month',device)"
                >月</el-button>
                <el-date-picker
                  v-model="device.startdatetime"
                  type="datetime"
                  placeholder="开始日期时间"
                  @input="refreshDate"
                />
                <el-date-picker
                  v-model="device.enddatetime"
                  type="datetime"
                  placeholder="结束日期时间"
                  @input="refreshDate"
                />
                <el-button
                  type="success"
                  style="margin-left:10px;"
                  @click="queryData('query',device)"
                >查询</el-button>
                <el-button
                  type="primary"
                  style="margin-left:10px;"
                  @click="close(device)"
                >关闭</el-button>
              </div>
              <div
                :ref="'chart'+device.id"
                :style="{height:'250px',width:'100%'}"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
    <loading ref="loading" />
    <!-- <SensorNowData ref="sensorNowData"/>
    <SensorHistoryData ref="sensorHistoryData" /> -->
  </div>
</template>
<script>
// import { getFacilitiesByBase } from '@/api/rs_facilities'
import { getDeviceTypeByFacilities, deviceList } from '@/api/device'
import { getNewsSensorList } from '@/api/hd_device_sensor'
import { parseTime } from '@/utils/index'
import loading from '@/components/loading'
import { openOrCloseChannel, handelWindow } from '@/utils/websocket_util'
// import SensorNowData from './SensorNowData'
// import SensorHistoryData from './SensorHistoryData'

import { getDayWsenData, getSomeDayWsenData, getWsenDataByStarttimeAndEndtime } from '@/api/device'
import { isFloat } from '@/utils/basetype'
import echarts from 'echarts'
import { formatDate } from '@/utils/date'
require('echarts/theme/macarons') // echarts theme
import Schart from 'vue-schart'

export default {
  components: {
    Schart,
    loading
  },
  props: {
  },
  data () {
    return {
      deviceTypeList: [],
      img_url: ''
    }
  },
  methods: {
    close (device) {
      device.sensorList.forEach(s => {
        $('#sensor' + s.id).removeClass('sensorCheckBoxModel')
      })
      device.chartShow = false
      this.$forceUpdate()
    },
    refreshDate () {
      this.$forceUpdate()
    },
    // 点击传感器
    clickSensor (sensor, device) {
      if (sensor.hd_sensor_type_code === '101' || sensor.hd_sensor_type_code === '102') {
        // 开关类传感器不进行图表展示
        return
      }
      device.sensorList.forEach(s => {
        $('#sensor' + s.id).removeClass('sensorCheckBoxModel')
      })
      // $('#sensor' + sensor.id).height($('#sensor' + sensor.id).height() - 2)
      $('#sensor' + sensor.id).addClass('sensorCheckBoxModel')
      this.$set(device, 'chartShow', true)
      this.$set(device, 'pitchOnSensor', sensor)
      this.$set(device, 'startdatetime', null)
      this.$set(device, 'enddatetime', null)
      this.$forceUpdate()
      this.queryData('day', device)
    },
    showData (hd_device_sensor_id) {
      this.historyVisible = true
      this.hd_device_sensor_id = hd_device_sensor_id
      this.getData()
    },
    initChart (device) {
      this.$set(device, 'chart', echarts.init(this.$refs['chart' + device.id][0], 'macarons'))
      if (device.showType === 'query') {
        this.setOptions2(device)
      } else {
        this.setOptions(device)
      }
      this.$forceUpdate()
    },
    setOptions (device) {
      var min = device.minValue
      var max = device.maxValue
      device.chart.setOption({
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
            data: device.chartData.xAxis
          }
        ],
        series: [
          {
            name: '数据',
            type: 'line',
            barWidth: '60%',
            data: device.chartData.datas,
            showAllSymbol: true,
            smooth: true
          }
        ]
      })
    },
    setOptions2 (device) {
      var min = device.minValue
      var max = device.maxValue
      device.chart.setOption({
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
            data: device.chartData.xAxis
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
            data: device.chartData.datas,
            showAllSymbol: true,
            symbol: 'none', // 这句就是去掉点的
            smooth: true
          }
        ]
      })
    },
    queryData (type, device) {
      this.$set(device, 'showType', type)
      this.getData(device)
    },
    showChartByType (data, device) {
      this.$set(device, 'minValue', 0)
      this.$set(device, 'maxValue', 0)
      this.$set(device, 'tableData', [])
      this.$set(device, 'chartData', { xAxis: [], datas: [] })
      for (let i = 0, len = data.response_times.length; i < len; i++) {
        var value = data.value[i]
        value = isFloat(value) ? parseFloat(value) : value

        if (value) {
          if (i === 0) {
            this.$set(device, 'minValue', value)
            this.$set(device, 'maxValue', value)
          } else {
            if (value < device.minValue) {
              this.$set(device, 'minValue', value)
            }
            if (value > device.maxValue) {
              this.$set(device, 'maxValue', value)
            }
          }
        }

        if (device.showType === 'day') {
          device.chartData.xAxis.push(data.response_times[i].substring(11, 13))
        } else if (device.showType === 'week' || device.showType === 'month') {
          device.chartData.xAxis.push(data.response_times[i].substring(5, 11))
        } else {
          device.chartData.xAxis.push(data.response_times[i])
        }
        device.chartData.datas.push(value)
      }
      this.$set(device, 'maxValue', parseInt(device.maxValue + 1))
      this.$set(device, 'minValue', parseInt(device.minValue))
      this.initChart(device)
    },
    getData (device) {
      var type = device.showType
      if (type === 'day') {
        getDayWsenData({ hd_device_sensor_id: device.pitchOnSensor.id }).then(res => {
          this.showChartByType(res.data, device)
        })
      } else if (type === 'week') {
        getSomeDayWsenData({ hd_device_sensor_id: device.pitchOnSensor.id }).then(res => {
          this.showChartByType(res.data, device)
        })
      } else if (type === 'month') {
        getSomeDayWsenData({ hd_device_sensor_id: device.pitchOnSensor.id, some_day: 30 }).then(res => {
          this.showChartByType(res.data, device)
        })
      } else if (type === 'query') {
        if (device.startdatetime === null || device.startdatetime === '') {
          this.$message.error('请选择开始日期时间!')
        }
        if (device.enddatetime === null || device.enddatetime === '') {
          device.enddatetime = new Date()
        }
        var starttime = formatDate(device.startdatetime, 'yyyy-MM-dd hh:mm:ss')
        var endtime = formatDate(device.enddatetime, 'yyyy-MM-dd hh:mm:ss')
        getWsenDataByStarttimeAndEndtime({ hd_device_sensor_id: device.pitchOnSensor.id, starttime: starttime, endtime: endtime }).then(res => {
          this.showChartByType(res.data, device)
        })
      }
    },

    // // 展示实时数据
    // showNowData(hd_device_sensor_id) {
    //   this.$refs.sensorNowData.showData(hd_device_sensor_id)
    // },
    // // 展示历史数据
    // showHistoryData(hd_device_sensor_id) {
    //   this.$refs.sensorHistoryData.showData(hd_device_sensor_id)
    // },
    handelSwitch (sensor, index, sensorList) {
      var hd_sensor_id = sensor.id

      var obj = sensorList[index]
      this.$refs.loading.openLoadInstance()

      openOrCloseChannel(hd_sensor_id, sensor.value2, this.$ws)
        .then(res => {
          obj.value = sensor.value2
          sensorList.splice(index, 1, obj)
          this.$refs.loading.closeLoadInstance()
          this.$forceUpdate()
        })
        .catch(err => {
          this.$message.error(err.msg)
          obj.value2 = sensor.value
          sensorList.splice(index, 1, obj)
          this.$refs.loading.closeLoadInstance()
          this.$forceUpdate()
        })
    },
    handelWindow (sensor, index, sensorList) {
      var hd_sensor_id = sensor.id

      var obj = sensorList[index]
      this.$refs.loading.openLoadInstance()
      handelWindow(hd_sensor_id, sensor.value2, this.$ws)
        .then(res => {
          obj.value = obj.value2
          sensorList.splice(index, 1, obj)
          this.$refs.loading.closeLoadInstance()
          this.$forceUpdate()
        })
        .catch(err => {
          this.$message.error(err.msg)
          obj.value2 = obj.value
          sensorList.splice(index, 1, obj)
          this.$refs.loading.closeLoadInstance()
          this.$forceUpdate()
        })
    },
    showSensorErrorInfo (id) {
      this.$alert(
        '数据异常',
        '异常信息',
        {
          confirmButtonText: '确定',
          dangerouslyUseHTMLString: true
        }
      )
    },
    parseTime,
    // 获取列表
    getList (rs_facilities_id) {
      const _this = this
      _this.img_url = process.env.IMG_URL
      if (rs_facilities_id) {
        // 查询地块下的设备类型
        getDeviceTypeByFacilities({ rs_facilities_id: rs_facilities_id }).then(res1 => {
          if (res1.code === 200) {
            _this.deviceTypeList = res1.data
            _this.deviceTypeList.forEach(deviceType => {
              // 查询该类型的设备
              deviceList({ hd_device_type_id: deviceType.id, rs_facilities_id: rs_facilities_id, size: 999 }).then(res2 => {
                if (res2.code === 200) {
                  deviceType.deviceList = res2.data.content
                  deviceType.deviceList.forEach(device => {
                    // _this.$set(device, 'startdatetime', 1585816427180)
                    // _this.$set(device, 'enddatetime', 1585816427180)
                    _this.getNewsSensorList(device, deviceType.deviceList)
                  })
                } else {
                  _this.$message.error(res2.msg)
                }
              })
            })
          } else {
            _this.$message.error(res1.msg)
          }
        })
      }
    },
    getNewsSensorList (device, list) {
      getNewsSensorList({ hd_device_id: device.id, size: 999 }).then(res3 => {
        if (res3.code === 200) {
          var lst = res3.data.content
          if (lst.length === 0) {
            for (var i = 0; i < list.length; i++) {
              if (list[i] === device) {
                list.splice(i, 1)
              }
            }
          } else {
            device.sensorList = res3.data.content
            device.sensorList.forEach(element => {
              var channelType = element.channelType
              if (channelType === 3 || channelType === 5) {
                var value = element.value
                element.value = isFloat(value) ? parseFloat(value).toFixed(2) : value
              } else if (channelType === 1) {
                element.value2 = element.value
              }
            })
          }
          this.$forceUpdate()
        } else {
          this.$message.error(res3.msg)
        }
      })
    }

  }
}
</script>
<style>
.container {
  overflow: hidden;
  background: #ffffff;
}

@media screen and (max-width: 1099px) {
  .container .mx_0 {
    width: calc(4.166% - 16px);
    margin: 8px;
  }
  .container .mx_1 {
    width: calc(8.333% - 16px);
    margin: 8px;
  }
  .container .mx_2 {
    width: calc(16.666% - 16px);
    margin: 8px;
  }
  .container .mx_3 {
    width: calc(25% - 16px);
    margin: 8px;
  }
  .container .mx_4 {
    width: calc(33.333% - 16px);
    margin: 8px;
  }
  .container .mx_5 {
    width: calc(41.666% - 16px);
    margin: 8px;
  }
  .container .mx_6 {
    width: calc(50% - 16px);
    margin: 8px;
  }
  .container .mx_7 {
    width: calc(58.333% - 16px);
    margin: 8px;
  }
  .container .mx_8 {
    width: calc(66.666% - 16px);
    margin: 8px;
  }
  .container .mx_9 {
    width: calc(75% - 16px);
    margin: 8px;
  }
  .container .mx_10 {
    width: calc(83.333% - 16px);
    margin: 8px;
  }
  .container .mx_11 {
    width: calc(91.666% - 16px);
    margin: 8px;
  }
  .container .mx_12 {
    width: calc(100% - 16px);
    margin: 8px;
  }
}

@media (min-width: 1100px) and (max-width: 1600px) {
  .container .ms_0 {
    width: calc(4.166% - 16px);
    margin: 8px;
  }
  .container .ms_1 {
    width: calc(8.333% - 16px);
    margin: 8px;
  }
  .container .ms_2 {
    width: calc(16.666% - 16px);
    margin: 8px;
  }
  .container .ms_3 {
    width: calc(25% - 16px);
    margin: 8px;
  }
  .container .ms_4 {
    width: calc(33.333% - 16px);
    margin: 8px;
  }
  .container .ms_5 {
    width: calc(41.666% - 16px);
    margin: 8px;
  }
  .container .ms_6 {
    width: calc(50% - 16px);
    margin: 8px;
  }
  .container .ms_7 {
    width: calc(58.333% - 16px);
    margin: 8px;
  }
  .container .ms_8 {
    width: calc(66.666% - 16px);
    margin: 8px;
  }
  .container .ms_9 {
    width: calc(75% - 16px);
    margin: 8px;
  }
  .container .ms_10 {
    width: calc(83.333% - 16px);
    margin: 8px;
  }
  .container .ms_11 {
    width: calc(91.666% - 16px);
    margin: 8px;
  }
  .container .ms_12 {
    width: calc(100% - 16px);
    margin: 8px;
  }
}

@media screen and (min-width: 1600px) {
  .container .xs_0 {
    width: calc(4.166% - 16px);
    margin: 8px;
  }
  .container .xs_1 {
    width: calc(8.333% - 16px);
    margin: 8px;
  }
  .container .xs_2 {
    width: calc(16.666% - 16px);
    margin: 8px;
  }
  .container .xs_3 {
    width: calc(25% - 16px);
    margin: 8px;
  }
  .container .xs_4 {
    width: calc(33.333% - 16px);
    margin: 8px;
  }
  .container .xs_5 {
    width: calc(41.666% - 16px);
    margin: 8px;
  }
  .container .xs_6 {
    width: calc(50% - 16px);
    margin: 8px;
  }
  .container .xs_7 {
    width: calc(58.333% - 16px);
    margin: 8px;
  }
  .container .xs_8 {
    width: calc(66.666% - 16px);
    margin: 8px;
  }
  .container .xs_9 {
    width: calc(75% - 16px);
    margin: 8px;
  }
  .container .xs_10 {
    width: calc(83.333% - 16px);
    margin: 8px;
  }
  .container .xs_11 {
    width: calc(91.666% - 16px);
    margin: 8px;
  }
  .container .xs_12 {
    width: calc(100% - 16px);
    margin: 8px;
  }
}

.deviceTypeBoxModel {
  float: left;
  min-height: 180px;
  box-shadow: 00x 0px 3px #000000;
  background: #ffffff;
  border: 1px dashed #000;
}
.deviceBoxModel {
  float: left;
  min-height: 180px;
  box-shadow: 00x 0px 3px #000000;
  background: #42332c1f;
}
.sensorBoxModel {
  float: left;
  /* min-height: 150px; */
  box-shadow: 00x 0px 3px #000000;
  margin: 2px;
  /* background: #42332c83; */
}
.sensorCheckBoxModel {
  background: #42332c36;
}
</style>
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
