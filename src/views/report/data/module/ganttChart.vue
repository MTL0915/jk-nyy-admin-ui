<template>
  <div style="height:100%">
    <v-chart style="height:100%;width:100%" :options="option" :autoresize="true" />
  </div>
</template>
<script>
import { formatDate } from "@/utils/date"
import { valveSwitchTimeRecord } from "@/api/equip"
import "echarts/lib/chart/custom";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/polar";
import "echarts/lib/component/legend";
import "echarts/lib/component/title.js";
export default {
  props: {
    chooseDeviceList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      time: new Date(),
      option: {}
    }
  },
  mounted() {
    this.getSensorOpenTime()
  },
  methods: {
    //获取传感器设备开机时间
    getSensorOpenTime() {
      const data = {
        hd_device_sensor_ids: this.chooseDeviceList.join(","),
        start_time: formatDate(this.time, "yyyy-MM-dd") + " 00:00:00",
        end_time: formatDate(this.time, "yyyy-MM-dd hh:mm:ss")
        // start_time: "2021-01-19 00:00:00",
        // end_time: "2021-01-19 23:59:59"
      }
      valveSwitchTimeRecord(data).then(res => {
        const temp = []
        const yArr = []
        for (let i = 0; i < res.data.length; i++) {
          //开始初始化，默认选择有数据的10条数据展示
          if (this.chooseDeviceList.length > 10) {
            if (res.data[i].data.length > 0) {
              if (temp.length < 10) {
                temp.push(res.data[i])
              }
            }
          } else {
            //用户选择传感器设备时，展示用户所选择的的
            temp.push(res.data[i])
          }

        }
        //获取y轴data
        for(let j = 0; j < temp.length; j++) {
          yArr.push(`${temp[j].hd_device_name}-${temp[j].hd_device_sensor_name}`)
        }
        if (temp.length === 0) {
          this.$parent.ganttShow = false;
        } else {
          this.$parent.ganttShow = true;
        }
        this.option = {
          // grid: {
          //   containLabel: true
          // },
          grid: {
            top: "10px",
            bottom: "0",
            containLabel: true,
          },
          tooltip: {
            backgroundColor: "#0197F2",
            textStyle: {
              fontSize: 10
            },
            formatter: function (params) {
              const time = params.value[3]
              let totalTime = ""
              if (time < 60 && time !== null) {
                //一分钟以内
               totalTime = time + "秒";
              } else if (time < 3600) {
                //一小时以内
                totalTime = Math.floor(time / 60) + "分钟";
              } else if (time >= 3600 && time < 86400) {
                //一天以内
                totalTime =
                  parseInt(time / 3600) +
                  "小时" +
                  parseInt((time % 3600) / 60) +
                  "分钟";
              } else if (time >= 86400) {
                //超过一天
                totalTime =
                  parseInt(time / 86400) +
                  "天" +
                  parseInt((time % 86400) / 3600) +
                  "小时";
              }
              return params.name +'</br>'+ "运行时长：" + totalTime;
            }
          },
          xAxis: {
            type: "time",
            scale: true,
            boundaryGap: false
          },
          yAxis: {
            data: yArr
          },
              //缩放
          dataZoom: [{
            type: 'slider',
            show : false,
            filterMode: 'weakFilter',
            showDataShadow: false,
            top: 550,
            height: 10,
            borderColor: 'transparent',
            backgroundColor: '#e2e2e2',
            handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', //jshint ignore:line
            handleSize: 20,
            handleStyle: {
                shadowBlur: 6,
                shadowOffsetX: 1,
                shadowOffsetY: 2,
                shadowColor: '#aaa'
            },
            labelFormatter: '',
            start: 0,
            end: 70,
          }, {
            type: 'inside',
            filterMode: 'weakFilter'
          }],
          series: {
            type: 'custom',
            renderItem: function(params, api) {
              var categoryIndex = api.value(0);
              var start = api.coord([api.value(1), categoryIndex]);
              var end = api.coord([api.value(2), categoryIndex]);
              var height = api.size([0, 1])[1] * 0.6;

              var rectShape = echarts.graphic.clipRectByRect({
                  x: start[0],
                  y: start[1] - height / 2,
                  width: end[0] - start[0],
                  height: height
              }, {
                  x: params.coordSys.x,
                  y: params.coordSys.y,
                  width: params.coordSys.width,
                  height: params.coordSys.height
              });

              return rectShape && {
                  type: 'rect',
                  shape: rectShape,
                  style: api.style()
              };
            },
            encode: {
              x: [1, 2],
              y: 0
            },
            data: (function() {
              const result = []
              for (let i = 0; i < temp.length; i++) {
                for (let j = 0; j < temp[i].data.length; j = j + 2) {
                  const durationTime = Math.floor((temp[i].data[j+1] - temp[i].data[j]) / 1000)
                  result.push(
                    {
                      value: [i,formatDate(new Date(temp[i].data[j]), "yyyy-MM-dd hh:mm:ss"), formatDate(new Date(temp[i].data[j+1]), "yyyy-MM-dd hh:mm:ss"), durationTime],
                      itemStyle: {
                          normal: {
                              color: "#409EFF"
                          }
                      }
                    }
                  )
                }
              }
              return result
            })()
          }
        }
      })
    }
  },
  watch: {
    chooseDeviceList(val) {
      if (val.length != 0) {
        this.getSensorOpenTime()
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.chartTitle
  height 20px
  line-height 20px
  font-size 14px
</style>