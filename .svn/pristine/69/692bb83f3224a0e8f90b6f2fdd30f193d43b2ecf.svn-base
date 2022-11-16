<template>
  <!-- 新水肥累计水肥图表 -->
  <div style="height:calc(100% - 28px);margin:0;padding:0;">
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
      style="height:100%"
    >
      <el-tab-pane
        label="累计用肥"
        name="ferSum"
        style="height:100%"
      >
        <div style="height:100%;">
          <v-chart
            style="width:100%;height:100%"
            :options="ferSumOption"
            :autoresize="true"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="累计用水"
        name="irrSum"
        style="height:100%"
      >
        <div style="height:100%;">
          <v-chart
            style="width:100%;height:100%"
            :options="irrSumOption"
            :autoresize="true"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="累计耗时"
        name="timeSum"
        style="height:100%"
      >
        <div style="height:100%;">
          <v-chart
            style="width:100%;height:100%"
            :options="timeSumOption"
            :autoresize="true"
          />
        </div>
      </el-tab-pane>

      <el-tab-pane
        label="EC"
        name="ec"
        style="height:100%"
      >
        <div style="height:100%;">
          <v-chart
            style="width:100%;height:100%"
            :options="ecOption"
            :autoresize="true"
          />
        </div>
      </el-tab-pane>

      <el-tab-pane
        label="PH"
        name="ph"
        style="height:100%"
      >
        <div style="height:100%;">
          <v-chart
            style="width:100%;height:100%"
            :options="phOption"
            :autoresize="true"
          />
        </div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/polar";
import "echarts/lib/component/legend";
import "echarts/lib/component/title.js";
import { formatDate } from "@/utils/date"

export default {
  props: {
    irrFerSumList: {
      type: Array,
      default: []
    }
  },
  watch: {
    irrFerSumList: {
      handler: function () {
        this.init();
      },
      immediate: true
    }
  },
  data () {
    return {
      activeName: 'ferSum',//默认选中累计用肥
      ferSumOption: {},//累计用肥 图表
      irrSumOption: {},//累计用水 图表
      timeSumOption: {},//累计耗时 图表
      ecOption: {},//EC 图表
      phOption: {},//PH 图表
    };
  },
  methods: {
    formatDate,
    init () {
      if (!this.irrFerSumList || this.irrFerSumList.length === 0) {
        return
      }
      let xAxisData = []// x轴时间
      let ferSumData = []//累计用肥数组
      let irrSumData = []//累计用水数组
      let timeSumData = []//累计耗时数组
      let setEcData = []//设定EC数组
      let avgEcData = []//平均EC数组
      let maxEcData = []//最大EC数组
      let minEcData = []//最小EC数组
      let setPhData = []//设定PH数组
      let avgPhData = []//平均PH数组
      let maxPhData = []//最大PH数组
      let minPhData = []//最小PH数组
      for (let i = 0; i < this.irrFerSumList.length; i++) {
        //统计时间
        xAxisData.push(this.formatDate(new Date(this.irrFerSumList[i].ifs_time), 'MM-dd hh:mm'))
        //累计用肥	单位：L
        ferSumData.push(this.irrFerSumList[i].ifs_fer_sum)
        //累计用水	单位：m3 
        irrSumData.push(this.irrFerSumList[i].ifs_irr_sum)
        //累计耗时	单位：min
        timeSumData.push(this.irrFerSumList[i].ifs_time_sum)
        //设定EC	单位：mS/cm
        setEcData.push(this.irrFerSumList[i].ifs_set_ec)
        //平均EC	单位：mS/cm
        avgEcData.push(this.irrFerSumList[i].ifs_avg_ec)
        //最大EC	单位：mS/cm
        maxEcData.push(this.irrFerSumList[i].ifs_max_ec)
        //最小EC	单位：mS/cm
        minEcData.push(this.irrFerSumList[i].ifs_min_ec)
        //设定PH
        setPhData.push(this.irrFerSumList[i].ifs_set_ph)
        //平均PH
        avgPhData.push(this.irrFerSumList[i].ifs_avg_ph)
        //最大PH
        maxPhData.push(this.irrFerSumList[i].ifs_max_ph)
        //最小PH
        minPhData.push(this.irrFerSumList[i].ifs_min_ph)

      }
      this.ferSumOption = this.initBarChat('累计用肥', xAxisData, ferSumData, 'L')
      this.irrSumOption = this.initBarChat('累计用水', xAxisData, irrSumData, 'm3')
      this.timeSumOption = this.initBarChat('累计耗时', xAxisData, timeSumData, 'min')

      let ecSeriesData = []
      ecSeriesData.push({
        name: '设定EC',
        type: 'line',
        barWidth: '60%',
        data: setEcData,
        itemStyle: {
          color: '#cc00ff'
        },
      })
      ecSeriesData.push({
        name: '平均EC',
        type: 'line',
        barWidth: '60%',
        data: avgEcData,
        itemStyle: {
          color: '#00B092'
        },
      })
      ecSeriesData.push({
        name: '最大EC',
        type: 'line',
        barWidth: '60%',
        data: maxEcData,
        itemStyle: {
          color: '#F36B64'
        },
      })
      ecSeriesData.push({
        name: '最小EC',
        type: 'line',
        barWidth: '60%',
        data: minEcData,
        itemStyle: {
          color: '#00B3DD'
        },
      })
      this.ecOption = this.initLineChat(xAxisData, ecSeriesData, 'mS/cm')

      let phSeriesData = []
      phSeriesData.push({
        name: '设定PH',
        type: 'line',
        barWidth: '60%',
        data: setPhData,
        itemStyle: {
          color: '#cc00ff'
        },
      })
      phSeriesData.push({
        name: '平均PH',
        type: 'line',
        barWidth: '60%',
        data: avgPhData,
        itemStyle: {
          color: '#00B092'
        },
      })
      phSeriesData.push({
        name: '最大PH',
        type: 'line',
        barWidth: '60%',
        data: maxPhData,
        itemStyle: {
          color: '#F36B64'
        },
      })
      phSeriesData.push({
        name: '最小PH',
        type: 'line',
        barWidth: '60%',
        data: minPhData,
        itemStyle: {
          color: '#00B3DD'
        },
      })
      this.phOption = this.initLineChat(xAxisData, phSeriesData, '')
    },
    //初始化柱状图
    initBarChat (name, xAxisData, serieData, unit) {
      if (unit === null || unit === undefined) {
        unit = ''
      }
      return Object.assign(
        {},
        {
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
    //初始化折线图
    initLineChat (xAxisData, seriesData, unit) {
      if (unit === null || unit === undefined) {
        unit = ''
      }
      return Object.assign(
        {},
        {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: function (params) {
              return `<p>${'时间：' + params[0].axisValue}</p>
              <p>${params[0].seriesName + '：' + params[0].data + unit}</p>
              <p>${params[1].seriesName + '：' + params[1].data + unit}</p>
              <p>${params[2].seriesName + '：' + params[2].data + unit}</p>
              <p>${params[3].seriesName + '：' + params[3].data + unit}</p>`
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
          series: seriesData
        }
      );
    },
  }
}
</script>
<style lang="stylus" scoped>
>>>.el-tabs__content
  height calc(100% - 50px) !important
</style>
