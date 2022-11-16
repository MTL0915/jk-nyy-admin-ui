<template>
  <div style="height:100%;margin:0;padding:0">
    <div style="height: calc(100% - 40px)">
      <v-chart
        style="width:100%;height:100%"
        :options="option"
        :autoresize="true"
      />
    </div>
  </div>
</template>
<script>
import { yingShiSxtTrafficList } from "@/api/sxt";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/polar";
import "echarts/lib/component/legend";
import "echarts/lib/component/title.js";

export default {
  props: {
    bs_base_id: {
      default: null,
      type: String
    },
    rs_facilities_id: {
      default: null,
      type: String
    },
    hd_device_id: {
      default: null,
      type: String
    },
    device_id: {
      default: null,
      type: String
    },
    startTime: {
      default: null,
      type: String
    },
    endTime: {
      default: null,
      type: String
    }
  },
  watch: {
    bs_base_id: {
      handler: function () {
        if (this.flag) {
          this.yingShiSxtTrafficList();
        }
      },
      immediate: true
    },
    rs_facilities_id: {
      handler: function () {
        if (this.flag) {
          this.yingShiSxtTrafficList();
        }
      },
      immediate: true
    },
    hd_device_id: {
      handler: function () {
        if (this.flag) {
          this.yingShiSxtTrafficList();
        }
      },
      immediate: true
    },
    device_id: {
      handler: function () {
        if (this.flag) {
          this.yingShiSxtTrafficList();
        }
      },
      immediate: true
    },
    startTime: {
      handler: function () {
        if (this.flag) {
          this.yingShiSxtTrafficList();
        }
      },
      immediate: true
    },
    endTime: {
      handler: function () {
        if (this.flag) {
          this.yingShiSxtTrafficList();
        }
      },
      immediate: true
    }
  },
  data () {
    return {
      flag: true,
      option: {}
    };
  },
  created () { },
  methods: {
    conver (limit) {
      var size = "";
      if (limit < 0.1 * 1024) {
        //如果小于0.1KB转化成B
        size = limit.toFixed(2) + "B";
      } else if (limit < 0.1 * 1024 * 1024) {
        //如果小于0.1MB转化成KB
        size = (limit / 1024).toFixed(2) + "KB";
      } else if (limit < 0.1 * 1024 * 1024 * 1024) {
        //如果小于0.1GB转化成MB
        size = (limit / (1024 * 1024)).toFixed(2) + "MB";
      } else {
        //其他转化成GB
        size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
      }

      var sizestr = size + "";
      var len = sizestr.indexOf("\.");
      var dec = sizestr.substr(len + 1, 2);
      if (dec == "00") {
        //当小数点后为00时 去掉小数部分
        return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
      }
      return sizestr;
    },
    yingShiSxtTrafficList () {
      this.flag = false;
      yingShiSxtTrafficList({
        bs_base_id: this.bs_base_id,
        rs_facilities_id: this.rs_facilities_id,
        hd_device_id: this.hd_device_id,
        device_id: this.device_id,
        startTime: this.startTime,
        endTime: this.endTime,
        page: 0,
        size: 10000,
        echarts: true
      }).then(res => {
        this.flag = true;
        if (res.code === 200) {
          if (res.data.sxt.length === 0) {
            this.option = {};
            return;
          }
          //echarts
          const seriesArr = [];
          const nameArr = [];
          for (let i = 0; i < res.data.sxt.length; i++) {
            const sxt = res.data.sxt[i];
            nameArr.push(sxt.device_name);
            let d = [];
            for (let j = 0; j < sxt.values.length; j++) {
              d.push([sxt.indexs[j], sxt.values[j]]);
            }
            seriesArr.push({
              name: sxt.device_name,
              type: "line",
              stack: "流量",
              smooth: true,
              areaStyle: {},
              emphasis: {
                focus: "series"
              },
              data: d
            });
          }
          this.option = Object.assign(
            {},
            {
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  type: "cross",
                  label: {
                    backgroundColor: "#6a7985"
                  }
                },
                formatter: (params, ticket, callback) => {
                  let Htm = `${params[0].axisValue}<br/>`;
                  for (let k = 0; k < params.length; k++) {
                    let s = this.conver(params[k].data[1]);
                    Htm += `${params[k].marker}<span>${params[k].seriesName
                      }：${s}</span><br/>`;
                  }
                  return Htm;
                }
              },
              legend: {
                data: nameArr
              },
              toolbox: {
                feature: {
                  saveAsImage: {}
                }
              },
              grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
              },
              yAxis: {
                type: "value",
                axisLabel: {
                  formatter: params => {
                    return this.conver(params);
                  }
                }
              },
              xAxis: {
                type: "category",
                boundaryGap: false,
                data: res.data.time
              },
              series: seriesArr
            }
          );
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  }
};
</script>
