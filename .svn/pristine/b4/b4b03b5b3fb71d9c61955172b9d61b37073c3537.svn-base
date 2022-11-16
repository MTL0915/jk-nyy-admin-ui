<template>
  <div ref="chart" style="width:100%;min-height:170px">
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import Schart from 'vue-schart'
export default {
  name: 'lineChart',
  components: {
    Schart
  },
  props:{
    chartData:{
      type:Object,
      default:{
        xAxis: [],
        datas: []
      }
    }
  },
  data () {
    return {
      minValue: 0,
      maxValue: 30,
    }
  },
  watch:{
    
  },
  methods: {
    showChart (chartData) {
      this.setMinValueAndMaxValue(chartData.datas);
      this.chart = echarts.init(this.$refs.chart, 'macarons')
      this.setOptions(chartData)
    },
    setOptions ({ xAxis, datas }) {
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
                return x
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
    setMinValueAndMaxValue (data) {
      if (data === null) {
        return;
      }
      
      for (let i = 0, len = data.length; i < len; i++) {
        var value = data[i];

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
      }
      
      this.maxValue = this.maxValue + 1
      this.minValue = parseInt(this.minValue)
      this.maxValue = parseInt(this.maxValue)
    }
  }
}
</script>

<style lang="stylus" scoped></style>
