<template>
  <div style="height:100%">
    <v-chart style="height:100%;width:100%" :options="option" :autoresize="true" v-if="!show" />
    <div v-if="show" style="font-size:12px;color:#aeb3c6;text-align:center;margin-top:30px">
      暂无数据
    </div>
  </div>
</template>
<script>
import { valveOpenTimeSort } from '@/api/equip';
import { formatDate } from "@/utils/date"
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
      time: new Date().getTime() - 24*60*60*1000,
      option: {},
      show: false
    }
  },
  mounted() {
    this.valveOpenTimeSort()
  },
  methods: {
        //获取开机总时长
    valveOpenTimeSort () {
      valveOpenTimeSort({
        hd_device_sensor_ids: this.chooseDeviceList.join(","),
        start_time: formatDate(new Date(this.time), "yyyy-MM-dd") + " 00:00:00",
        end_time: formatDate(new Date(this.time), "yyyy-MM-dd") + " 23:59:59",
        // start_time: "2020-10-14 00:00:00",
        // end_time: '2020-10-14 23:59:59',
        isSort: true
      }).then(res => {
        const _this = this;
        var scName = [];
        var continueTime = [];
        var cxName = [];
        var zscTime = [];
        const totalList = [];
        if (res.data.totalList.length ==0) {
          this.show = true;
        } else {
          this.show = false;
        }
        for (let i = 0; i < res.data.totalList.length; i++) {
          if (this.chooseDeviceList.length > 10) {
            if (totalList.length < 10) {
              totalList.push(res.data.totalList[i])
            }
          } else {
            totalList.push(res.data.totalList[i])
          }
        }
        var totalListLength =totalList.length > 10 ? 10 : totalList.length;
        for (let index = 0; index < totalListLength; index++) {
          const element =totalList[index];
          cxName.push(element.hd_device_sensor_name);
          zscTime.push(element.totalOpenTime);
        }
        const colorList = ["#f36c6c", "#e6cf4e", "#20d180", "#0093ff"];
        let index = 0;
        this.option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            },
            //formatter: "{b}:{c} 小时"
            formatter: function (params) {
              // if (index == name.length) {
              //   index = 0;
              // }
              // index++;
              if (params[0].value > 86400000) {
                return (
                  "<br/>" +
                  "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
                  params[0].name +
                  " : " +
                  Number(
                    (params[0].value / 86400000).toFixed(2)
                  ) +
                  " 天<br/>"
                );
              } else if (params[0].value > 3600000) {
                return (
                  "<br/>" +
                  "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
                  params[0].name +
                  " : " +
                  Number(
                    (params[0].value / 3600000).toFixed(2)
                  ) +
                  " 小时<br/>"
                );
              } else if (params[0].value > 60000) {
                return (
                  "<br/>" +
                  "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
                  params[0].name +
                  " : " +
                  Number(
                    (params[0].value / 60000).toFixed(1)
                  ) +
                  " 分钟<br/>"
                );
              } else {
                return (
                  "<br/>" +
                  "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
                  params[0].name +
                  " : " +
                  Number(
                    (params[0].value / (1000)).toFixed(0)
                  ) +
                  " 秒<br/>"
                );
              }
            }
          },
          legend: {
            show: false
          },
          grid: {
            top: "10",
            bottom: "0",
            left: "0",
            containLabel: true,
          },
          toolbox: {
            show: true
            // feature: {
            //   saveAsImage: {}
            // }
          },
          yAxis: {
            type: "value",
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            }
          },
          xAxis: {
            type: "category",
            data: cxName,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              fontSize: 10,
              color: "#333"
            }
          },
          series: [{
            z: 2,
            name: "value",
            type: "bar",
            barWidth: 14,
            barMinHeight: 5,
            barMaxHeight: 20,
            data: zscTime,
            itemStyle: {
              normal: {
                color: function (params) {
                  // build a color map as your need.
                  var colorList = [
                    "#f36c6c",
                    "#e6cf4e",
                    "#20d180",
                    "#0093ff",
                    "#0093ff",
                    "#0093ff",
                    "#0093ff",
                    "#0093ff",
                    "#0093ff",
                    "#0093ff",
                    "#0093ff"
                  ];
                  return colorList[params.dataIndex];
                }
              }
            }
          }]
        }
      });
    },
  },
  watch: {
    chooseDeviceList() {
      this.valveOpenTimeSort()
    }
  }
}
</script>