<template>
  <div style="height:100%;margin:0;padding:0">
    <div style="height:20px;color:#aeb3c6;">
      <span>{{ rs_facilities_name }}-{{ name }} </span>
      <div style="display:inline-block;float:right">
        <i class="el-icon-message-solid" style="margin-right:5px" @click="showTrigger"></i>
        <i class="el-icon-full-screen" @click="screen"></i>
      </div>
    </div>
    <div style="height:20px;color:#aeb3c6;font-size:12px;text-align:right">
      <span style="margin-right:10px">最大值：{{ max || "-" }}</span><span>最小值：{{ min || "-" }}</span>
    </div>
    <div style="height: calc(100% - 40px)">
      <v-chart style="width:100%;height:100%" :options="option" :autoresize="true" />
    </div>
    <WarnConfig ref="warnConfig" />
    <dataMonitScreen :name="name" :option="option" ref="monitScreen" />
  </div>
</template>
<script>
import { formatDate } from "@/utils/date";
import WarnConfig from "@/views/base/equip/module/WarnConfig";
import dataMonitScreen from "./dataMonitScreen";
import { selectSensorData2 } from "@/api/hd_device_sensor"
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/scatter";
import "echarts/lib/chart/candlestick";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/polar";
import "echarts/lib/component/legend";
import "echarts/lib/component/title.js";
import "echarts/lib/component/visualMap";
import "echarts/lib/component/legendScroll";
import "echarts/lib/component/markArea";
export default {
  components: {
    WarnConfig,
    dataMonitScreen
  },
  props: {
    id: {
      type: String,
      default: ""
    },
    start_time: {
      type: String,
      default: ""
    },
    end_time: {
      type: String,
      default: ""
    },
    valueType: {
      type: String,
      default: ""
    },
    rs_facilities_name: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      option: {},
      info: {},
      min: "",
      max: ""
      //id: "ff808081720984e101722c83be6d032d",
    }
  },
  mounted() {
    this.selectSensorData()
  },
  methods: {
    screen() {
      this.$refs.monitScreen.dialogVisible = true;
    },
    showTrigger() {
      let config_json = this.info.hd_sensor_config_json;
      if (config_json != null) {
        this.$refs.warnConfig.tableData = config_json;
      } else {
        this.$refs.warnConfig.tableData = [];
      }
      this.$refs.warnConfig.id = this.info.hd_device_sensor_id;
      this.$refs.warnConfig.valueLevelVisible = true;
      this.$refs.warnConfig.parentObj = this.info;
    },
    //数值转风向
    windChange (s) {
      if (s <= 22.5 || s >= 337.5) {
        return "北风";
      } else if (s <= 67.5) {
        return "东北风";
      } else if (s <= 112.5) {
        return "东风";
      } else if (s <= 157.5) {
        return "东南风";
      } else if (s <= 202.5) {
        return "南风";
      } else if (s <= 247.5) {
        return "西南风";
      } else if (s <= 292.5) {
        return "西风";
      } else if (s <= 337.5) {
        return "西北风";
      }
    },
    selectSensorData() {
      let group_type = 5;
      const that = this;
      const data = {
        sensor_ids: this.id,
        start_time: this.start_time,
        end_time: this.end_time
      }
      if (this.valueType == "current") {
        data.group_type = 5;
        group_type = 5;
      } else {
        data.groupFunction = this.valueType;
        //如果时间为当天，则以小时显示，否则以天显示
        if (this.start_time.split(" ")[0] == this.end_time.split(" ")[0]) {
          data.group_type = 4
          group_type = 4
        } else {
          data.group_type = 3;
          group_type = 3
        }
      }
      selectSensorData2(data).then(res => {
        //最大最小值
        let maxAndMinArr = [];
        if (res.data.sensor[0].data || res.data.sensor[0].avg_data) {
          const data = res.data.sensor[0].data || res.data.sensor[0].avg_data
          for (let i = 0; i < data.length; i++) {
            if (data[i] !== null) {
              maxAndMinArr.push(data[i]);
            }
          }
          maxAndMinArr.sort((a, b) => {
            return a - b;
          });
          this.min = maxAndMinArr[0];
          this.max = maxAndMinArr[maxAndMinArr.length - 1];
        } else {
          const min = [];
          const max = [];
          for (let i = 0; i < res.data.sensor[0].min_data.length; i++) {
            if (res.data.sensor[0].min_data[i] !== null) {
              min.push(res.data.sensor[0].min_data[i]);
            }
          }
          for (let i = 0; i < res.data.sensor[0].max_data.length; i++) {
            if (res.data.sensor[0].max_data[i] !== null) {
              max.push(res.data.sensor[0].max_data[i]);
            }
          }
          min.sort((a, b) => {
            return a - b;
          });
          max.sort((a, b) => {
            return b - a;
          });
          this.min = min[0]
          this.max = max[0]
        }
        this.info = {}
        this.info = res.data.sensor[0]
        // const windText = "dd";
        // const wind = [];
        const xArr = [];
        if (this.valueType == "max,min") {
          //最大最小值
          if (group_type === 4) {
            for (let i in res.data.time) {
              xArr.push(res.data.time[i].substring(8, 13) + "点");
            }
          } else {
            for (let i in res.data.time) {
              xArr.push(res.data.time[i].substring(5, 10));
            }
          }
          const temparr = new Array(xArr.length).fill([]);
          for (let i = 0; i < res.data.sensor[0].index.length; i++) {
            temparr[res.data.sensor[0].index[i]] = [
              res.data.sensor[0].min_data[i],
              res.data.sensor[0].max_data[i],
              res.data.sensor[0].min_data[i],
              res.data.sensor[0].max_data[i]
            ];
          }
          this.option = {
            tooltip: {
              backgroundColor: "#0197F2",
              textStyle: {
                fontSize: 10
              },
              trigger: "axis",
              axisPointer: {
                type: "cross"
              },
              formatter: function(params) {
                let index = params[0].dataIndex;
                let Htm = `${res.data.time[
                  index
                ].substring(0, 16)}</br>${res.data.sensor[0].hd_device_sensor_name}</br>
                最大值：${temparr[index][1] || "暂无"}
                ${res.data.sensor[0].hd_sensor_type_unit}</br>
                最小值：${temparr[index][0] || "暂无"}${res.data.sensor[0].hd_sensor_type_unit}
                `;
                return Htm;
              }
            },
            grid: {
              top: "30",
              bottom: "0",
              containLabel: true,
            },
            xAxis: {
              offset: -5,
              axisTick: { show: false },
              axisLine: {
                show: false,
                lineStyle: {
                  color: "#666"
                }
              },
              data: xArr
            },
            yAxis: {
              type: "value",
              position: "left",
              offset: 0,
              scale: true,
              splitLine: { show: false },
              axisTick: { show: false },
              splitNumber: 3,
              axisLine: {
                show: false,
                lineStyle: {
                  color: "#666"
                }
              },
              name: res.data.sensor[0].hd_sensor_type_unit
            },
            series: [
              {
                type: "k",
                barWidth: 3,
                itemStyle: {
                  // borderColor:'#fff',
                  borderWidth: 0,
                  opacity: 0.4,
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "grey" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "grey" // 100% 处的颜色
                      }
                    ]
                  }
                },
                emphasis: {
                  itemStyle: {
                    opacity: 1,
                    borderWidth: 0,
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "rgb(90,161,244)" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "rgb(114,198,126)" // 100% 处的颜色
                        }
                      ]
                    }
                  }
                },
                data: temparr
              },
              {
                type: "scatter",
                color: "rgb(114,198,126)",
                itemStyle: {
                  opacity: 1
                },
                symbolSize: 10,
                z: 10,
                data: (function() {
                  const arr = [];
                  for (let i in res.data.sensor[0].index) {
                    arr.push([xArr[res.data.sensor[0].index[i]], res.data.sensor[0].min_data[i]]);
                  }
                  return arr;
                })()
              },
              {
                type: "scatter",
                color: "rgb(90,161,244)",
                itemStyle: {
                  opacity: 1
                },
                label: {
                  normal: {
                    show: false
                  }
                },
                symbolSize: 10,
                z: 20,
                data: (function() {
                  const arr = [];
                  for (let i in res.data.sensor[0].index) {
                    arr.push([xArr[res.data.sensor[0].index[i]], res.data.sensor[0].max_data[i]]);
                  }
                  return arr;
                })()
              }
            ]
          }
        } else {
          //平均值或 实时数据
          if (group_type === 5) {
          for (let i in res.data.time) {
            xArr.push(res.data.time[i].substring(8, 16));
          }
            // if (this.day === 1) {
            //   for (let i in res.data.time) {
            //     xArr.push(res.data.time[i].substring(11, 19));
            //     xArr1.push(res.data.time[i].substring(11, 19));
            //   }
            // } else {
            //   for (let i in res.data.time) {
            //     xArr1.push(res.data.time[i]);
            //     xArr.push(res.data.time[i].substring(8, 19));
            //   }
            // }
            // for (let i in res.data.sensor) {
            //   if (res.data.sensor[i].hd_sensor_type_code === "22") {
            //     res.data.sensor[i].data.map(item => {
            //       wind.push(this.windChange(item));
            //     });
            //     res.data.sensor[i].data = wind;
            //     windText = "";
            //   }
            // }
          } else if (group_type === 4) {
            for (let i in res.data.time) {
              xArr.push(res.data.time[i].substring(8, 13) + "点");
            }
            res.data.sensor[0].data = res.data.sensor[0].avg_data;
            // for (let i in res.data.sensor) {
            //   if (res.data.sensor[i].hd_sensor_type_code === "22") {
            //     res.data.sensor[i].avg_data.map(item => {
            //       wind.push(this.windChange(item));
            //     });
            //     res.data.sensor[i].avg_data = wind;
            //     windText = "";
            //   }
            //   res.data.sensor[i].data = res.data.sensor[i].avg_data;
            // }
          } else {
            for (let i in res.data.time) {
              xArr.push(res.data.time[i].substring(5, 10));
            }
            // for (let i in res.data.sensor) {
            //   if (res.data.sensor[i].hd_sensor_type_code === "22") {
            //     res.data.sensor[i].avg_data.map(item => {
            //       wind.push(this.windChange(item));
            //     });
            //     res.data.sensor[i].avg_data = wind;
            //     windText = "";
            //   }
            //   res.data.sensor[i].data = res.data.sensor[i].avg_data;
            // }
            res.data.sensor[0].data = res.data.sensor[0].avg_data;
          }
          if (res.data.sensor[0].hd_sensor_config_json) {
            res.data.sensor[0].hd_sensor_config_json = JSON.parse(
              res.data.sensor[0].hd_sensor_config_json
            );
          } else {
            res.data.sensor[0].hd_sensor_config_json = [];
          }
          this.option = {
            tooltip: {
              backgroundColor: "#0197F2",
              textStyle: {
                fontSize: 10
              },
              trigger: "axis",
              axisPointer: {
                type: "cross"
              },
              formatter: function(params) {
                let index = params[0].dataIndex;
                // let Htm = `${xArr[index]}&nbsp;${yArr[index]}${item.unit}`;
                // let Htm = `${item.hd_device_sensor_name}</br>${
                //   params[0].name
                let Htm = "";
                let color = "";
                let text = "";
                if (res.data.sensor[0].hd_sensor_config_json != null) {
                  for (
                    let i = 0;
                    i < res.data.sensor[0].hd_sensor_config_json.length;
                    i++
                  ) {
                    if (
                      params[0].value[1] * 1 >
                        res.data.sensor[0].hd_sensor_config_json[i].start_value * 1 &&
                      res.data.sensor[0].hd_sensor_config_json[i].end_value * 1 >=
                        params[0].value[1] * 1
                    ) {
                      color = res.data.sensor[0].hd_sensor_config_json[i].color;
                      text = res.data.sensor[0].hd_sensor_config_json[i].name;
                    }
                  }
                }

                if (
                  that.$store.state.user.user.orgCode == "jk" ||
                  that.$store.state.user.user.orgCode == "jk-000"
                ) {
                  Htm = `${res.data.time[index].substring(0, 16)}</br>
                  ${res.data.sensor[0].hd_device_sensor_name}&nbsp;&nbsp${params[0].value[1] || "暂无"}
                  ${res.data.sensor[0].hd_sensor_type_unit} </br>
                  ${text}<div style="background:${color};width:10px;height:10px;border-radius:50%;display:inline-block;margin-left:5px"></div>
                  `;
                } else {
                  if (params[0].value[1] == null) {
                    Htm = "";
                  } else {
                    Htm = `${res.data.time[index].substring(0, 16)}</br>
                    ${res.data.sensor[0].hd_device_sensor_name}&nbsp;&nbsp${params[0].value[1]}${res.data.sensor[0].hd_sensor_type_unit}</br>
                  ${text}<div style="background:${color};width:10px;height:10px;border-radius:50%;display:inline-block;margin-left:5px"></div>
                  `;
                  }
                }
                return Htm;
              }
            },
            grid: {
              top: "30",
              bottom: "0",
              containLabel: true,
            },
            series: [
              {
                data: (function() {
                  const arr = [];
                  for (let i in res.data.sensor[0].index) {
                    arr.push([xArr[res.data.sensor[0].index[i]], res.data.sensor[0].data[i]]);
                  }
                  return arr;
                })(),
                type: "line",
                smooth: true,
                connectNulls: (function() {
                  if (
                    that.$store.state.user.user.orgCode == "jk" ||
                    that.$store.state.user.user.orgCode == "jk-000"
                  ) {
                    //运维人员及超级管理员权限，能查看异常点
                    return false;
                  } else {
                    //一般账号权限，不能查看异常点
                    return true;
                  }
                })(),
                itemStyle:(function(){
                  if (res.data.sensor[0].hd_sensor_config_json && res.data.sensor[0].hd_sensor_config_json.length > 0) {
                    return ""
                  } else {
                    return  {
                      color: "#0196f28a"
                    }
                  }
                })(),
                lineStyle:(function(){
                  if (res.data.sensor[0].hd_sensor_config_json && res.data.sensor[0].hd_sensor_config_json.length > 0) {
                    return ""
                  } else {
                    return  {
                      color: "#0196f28a"
                    }
                  }
                })(),
                areaStyle: (function(){
                  if (res.data.sensor[0].hd_sensor_config_json && res.data.sensor[0].hd_sensor_config_json.length > 0) {
                    return {}
                  } else {
                    return  {
                      normal: {
                          type: "default",
                          color: "#0196f28a"
                        }
                    }
                  }
                })(),
                //markArea: that.rank(xArr1)
              }
            ],
            xAxis: [
              {
                offset: -5,
                axisTick: { show: false, interval: 0 },
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: "#666"
                  }
                },
                data: xArr
              },
              // (function(){
              //   if (group_type !== 5) {
              //     return null;
              //   } else if (
              //     group_type == 5 &&
              //     res.data.sensor[0].hd_sensor_type_code == 21
              //   ) {
              //     return {
              //     name: windText,
              //     type: "category",
              //     position: "bottom",
              //     offset: 0,
              //     axisTick: {
              //       show: false,
              //       alignWithLabel: true
              //     },
              //     axisLine: {
              //       show: false,
              //       lineStyle: {
              //         color: "#0196f2"
              //       }
              //     },
              //     axisLabel: {
              //       show: true,
              //       textStyle: {
              //         color: "#336666",
              //         fontSize: 15,
              //         backgroundColor: "#CCFFFF",
              //         borderRadius: 5,
              //         padding: [2, 4]
              //       }
              //     },
              //     nameTextStyle: {
              //       color: "#585858",
              //       padding: [0, 0, -30]
              //     },
              //     nameLocation: "start",
              //     data: wind
              //   }
              //     }
              // })()
            ],
            yAxis: {
              type: "value",
              offset: 5,
              scale: true,
              splitLine: { show: false },
              axisTick: { show: false },
              splitNumber: 3,
              axisLine: {
                show: false,
                lineStyle: {
                  color: "#666"
                }
              },
              // name: res.data.sensor[0].hd_sensor_type_unit
            },
            visualMap: (function() {
              if (
                res.data.sensor[0].hd_sensor_config_json == null ||
                res.data.sensor[0].hd_sensor_config_json.length == 0
              ) {
                return null;
              } else {
                const arr = [];
                for (let i = 0; i < res.data.sensor[0].hd_sensor_config_json.length; i++) {
                  arr.push({
                    gt: res.data.sensor[0].hd_sensor_config_json[i].start_value * 1,
                    lte: res.data.sensor[0].hd_sensor_config_json[i].end_value * 1,
                    color: res.data.sensor[0].hd_sensor_config_json[i].color,
                    label: res.data.sensor[0].hd_sensor_config_json[i].name
                  });
                }
                return {
                  top: 0,
                  left: "center",
                  itemWidth: 8,
                  itemHeight: 8,
                  textGap: 3,
                  // dimension: 0,
                  // seriesIndex: 0,
                  itemSymbol: "circle",
                  orient: "horizontal",
                  pieces: arr,
                  outOfRange: {
                    color: "#ccc"
                  }
                };
              }
            })()
          }
        }
        
      })
    }
  },
  watch: {
    id() {
      this.selectSensorData()
    },
    start_time() {
      this.selectSensorData()
    },
    end_time() {
      this.selectSensorData()
    },
    valueType() {
      this.selectSensorData()
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>