<template>
  <div class="card-item x-size-2">
    <div class="x-card">
      <div class="card-header">
        <div class="title-container">
          <a data-track-id="card-header-title" target="_self" title="" href="#">
            <!--182-->
            <span class="title">气象数据</span>
          </a>
          <!-- <span class="sub-title">前24小时</span> -->
        </div>
        <div class="option-container">
          <span class="option"><!--185--></span>
          <span class="menu"><i class="iconfont icon-console-more-option"/></span>
        </div>
      </div>
      <div class="card-body" style="height:80%">
        <iframe src="https://www.seniverse.com/weather/weather.aspx?uid=U7E978EFEE&l=zh-CHS&p=SMART&a=1&u=C&s=1&m=0&x=1&d=5&fc=000000&bgc=&bc=&ti=0&in=0&li=" frameborder="0" style="width:100%;height:100%"/>
        <!--
        <div class="item-container content-container">
          <div class="list-block">
            <div><img style="width: 32;height: 32px;" src="http://121.32.129.19:8100/picture/iot/upload/sensor/2020-03-21/688b6b6a-73ea-4dc8-8cf3-4e3948d95c1b.png" ></div>
            <div>大气温度</div>
            <div>1.50</div>
          </div>
          <div class="list-block">
            <div><img style="width: 32;height: 32px;" src="http://121.32.129.19:8100/picture/iot/upload/sensor/2020-03-21/e6949aa5-5aa5-4a7b-98a0-35121e9b2196.png" ></div>
            <div>大气湿度</div>
            <div>1.50</div>
          </div>
          <div class="list-block">
            <div><img style="width: 32;height: 32px;" src="http://121.32.129.19:8100/picture/iot/upload/sensor/2020-03-21/6620cd4a-5ec5-4cf7-8a5d-ef1dea2dc1ac.png" ></div>
            <div>风向</div>
            <div>1.50</div>
          </div>
          <div class="list-block">
            <div><img style="width: 32;height: 32px;" src="http://121.32.129.19:8100/picture/iot/upload/sensor/2020-03-20/e78663d8-9232-4f48-a257-b99c7db2eeec.png" ></div>
            <div>雨量累计</div>
            <div>0.00</div>
          </div>
          <div class="list-block">
            <div><img style="width: 32;height: 32px;" src="http://121.32.129.19:8100/picture/iot/upload/sensor/2020-03-21/d8a8ac60-f98f-4f26-8e10-9fc9a220f6cf.png" ></div>
            <div>土壤温度</div>
            <div>1.50</div>
          </div>
          <div class="list-block">
            <div><img style="width: 32;height: 32px;" src="http://121.32.129.19:8100/picture/iot/upload/sensor/2020-03-21/efe9e042-f2f0-408a-ab3e-6d40ff544131.png" ></div>
            <div>气压</div>
            <div>993.20</div>
          </div>
          <div class="list-block">
            <div><img style="width: 32;height: 32px;" src="http://121.32.129.19:8100/picture/iot/upload/sensor/2020-03-20/783b5eb0-26d3-49e9-9e7b-d4340860e547.png" ></div>
            <div>光照度</div>
            <div>993.20</div>
          </div>
        </div>
        <div class="list-chart">
          <div ref="chart1" class="echart"/>
        </div>
        -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
export default {
  name: 'Qxz',
  data() {
    return {}
  },
  mounted: function() {
    this.loadCharts()
  },
  computed: {
    ...mapGetters(['id'])
  },
  methods: {
    loadCharts() {
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [{
          type: 'category',
          data: ['2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06'],
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          }
        }],
        yAxis: [{
          type: 'value',
          splitNumber: 4,
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#DDD'
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#333'
            }
          },
          nameTextStyle: {
            color: '#999'
          },
          splitArea: {
            show: false
          }
        }],
        series: [{
          name: '课时',
          type: 'line',
          data: [23, 60, 20, 36, 23, 85],
          lineStyle: {
            normal: {
              width: 1,
              color: {
                type: 'linear',

                colorStops: [{
                  offset: 0,
                  color: '#A9F387' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#48D8BF' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              },
              shadowColor: 'rgba(72,216,191, 0.3)',
              shadowBlur: 1,
              shadowOffsetY: 2
            }
          },
          itemStyle: {
            normal: {
              color: '#fff',
              borderWidth: 2,
              /* shadowColor: 'rgba(72,216,191, 0.3)',
                      shadowBlur: 100,*/
              borderColor: '#A9F387'
            }
          },
          smooth: true
        }]
      }
      const chart1 = echarts.init(this.$refs.chart1, 'macarons')
      chart1.setOption(option)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.item-container{
  padding-top:15px;
}
.list-block{
  width:50px;
}
.list-chart{
  min-width: 522px;
  height:80px;
  .echart{
    width:99%;
    height:100%;
  }
}
</style>
