<template>
  <div style="height:100%">
    <v-chart style="height:100%;width:100%" :options="option" :autoresize="true" />
  </div>
</template>
<script>
import { formatDate } from "@/utils/date";
import { getEverydaySwitchTime } from '@/api/equip';
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/polar";
import "echarts/lib/component/legend";
import "echarts/lib/component/title.js";
export default {
  props: {
    chooseDeviceList: {
      type: Array,
      default: () => []
    },
    day: {
      type: Number,
      default: 7
    }
  },
  data() {
    return {
      time: new Date().getTime(),
      option: {}
    }
  },
  mounted() {
    this.getEverydaySwitchTime();
  },
  methods: {
    getEverydaySwitchTime() {
      const data = {
        hd_device_sensor_ids: this.chooseDeviceList.join(","),
        start_time: formatDate(new Date(this.time - this.day * 24 * 3600 * 1000), "yyyy-MM-dd") + " 00:00:00",
        end_time: formatDate(new Date(), "yyyy-MM-dd hh:mm:ss")
      }
      getEverydaySwitchTime(data).then(res => {
        const temp = [];
        res.data.sensor = res.data.sensor.reverse()
        for (let i = 0; i < res.data.sensor.length; i++) {
          const tempArr = [];
          //开始初始化，默认选择有数据的10条数据展示
          for (let j = 0; j < res.data.sensor[i].data.length; j++) {
            res.data.sensor[i].data[j] = (res.data.sensor[i].data[j] / 3600000).toFixed(2)
          }
          if (this.chooseDeviceList.length > 10) {
            if (temp.length < 10) {
              temp.push(res.data.sensor[i])
            }
          } else {
            //用户选择传感器设备时，展示用户所选择的的
            temp.push(res.data.sensor[i])
          }
          const colorList = ["#f36c6c","#e6cf4e","#20d180","#0093ff","#99cccc","#9999cc",
              "#99ff99","#66cccc","#ffcccc","#9999ff", "#ff9933","#99cc66", "#99cc99","#66cc99","#ccff66","#99cc00","#669900",
              "#3399cc","#ccffff","#ffffcc","#99ffff","#66ccff","#99ccff","#ccccff","#ffff99","#ccffcc", "#99cc33","#ffcc99", "#9966cc"];
          this.option = {
            tooltip: {
              trigger: 'axis',
              formatter: (function() {
                let htm = "{b}</br>"
                for (let i = 0; i < temp.length; i++) {
                  htm += `<div style="display:inline-block;width:10px;height:10px;background:${colorList[i]};border-radius:50%;margin-right:3px"></div>{a${i}} &nbsp;&nbsp;运行时长：{c${i}}小时</br>`
                }
                return htm
              })()
            },
            legend: {
              type: "scroll",
              show: true,
              top: "0",
              color: 'red'
            },
            grid: {
              top: "30",
              bottom: "0",
              left: "0",
              containLabel: true,
            },
            xAxis: {
              type: 'category',
              data: res.data.time
            },
            yAxis: {
              type: 'value'
            },
            series: (function(){
              const result = []
              for (let i = 0; i < temp.length; i++) {
                result.push({
                  name: temp[i].hd_device_sensor_name,
                  data: temp[i].data,
                  type: "line",
                  smooth: true,
                  itemStyle: {
                    color: colorList[i]
                  },
                  lineStyle: {
                    color: colorList[i]
                  }
                })
              }
              return result
            })()
          }
        }
      })
    }
  },
  watch: {
    chooseDeviceList() {
      this.getEverydaySwitchTime();
    },
    day() {
      this.getEverydaySwitchTime();
    }
  }
};
</script>