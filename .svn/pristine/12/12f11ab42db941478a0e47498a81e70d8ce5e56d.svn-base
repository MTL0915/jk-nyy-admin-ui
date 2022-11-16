<template>
  <!-- 虫情识别饼图 -->
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
import { recognitionGroup } from "@/api/recognition";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/polar";
import "echarts/lib/component/legend";
import "echarts/lib/component/title.js";

export default {
  props: {
    hd_device_ids: {
      type: String,
      default: null
    },
    device_ids: {
      type: String,
      default: null
    },
    bs_base_id: {
      type: String,
      default: null
    },
    rs_facilities_id: {
      type: String,
      default: null
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
          this.recognitionGroup();
        }
      },
      immediate: true
    },
    rs_facilities_id: {
      handler: function () {
        if (this.flag) {
          this.recognitionGroup();
        }
      },
      immediate: true
    },
    hd_device_ids: {
      handler: function () {
        if (this.flag) {
          this.recognitionGroup();
        }
      },
      immediate: true
    },
    device_ids: {
      handler: function () {
        if (this.flag) {
          this.recognitionGroup();
        }
      },
      immediate: true
    },
    startTime: {
      handler: function () {
        if (this.flag) {
          this.recognitionGroup();
        }
      },
      immediate: true
    },
    endTime: {
      handler: function () {
        if (this.flag) {
          this.recognitionGroup();
        }
      },
      immediate: true
    }
  },
  data () {
    return {
      flag: true,
      option: {},
      colors: [
        '#22EE87',
        '#FCCF31',
        '#51B7FF',
        '#FD6585',
        '#018871',
        '#FFFF0D',
        '#1CAAE5',
        '#C91739',
        '#36FC89',
        '#B252F7',
      ],
    };
  },
  created () { },
  methods: {
    recognitionGroup () {
      this.flag = false;
      recognitionGroup({
        bs_base_id: this.bs_base_id || this.$store.state.baseinfo.cur_base_id,
        rs_facilities_id: this.rs_facilities_id,
        hd_device_ids: this.hd_device_ids,
        device_ids: this.device_ids,
        timeGroup: 3,//日
        deviceGroup: null,
        nameGroup: true,
        startTime: this.startTime,
        endTime: this.endTime,
        order: "asc",
      }).then(res => {
        this.flag = true;
        if (res.code === 200) {
          this.option = {};
          const xAxisData = []
          const seriesData = []
          const legendData = []
          //初始化x轴 种类
          for (let i = 0; i < res.data.length; i++) {
            const rData = res.data[i];
            let t = rData._id.time
            let n = rData._id.name

            //x轴
            for (let j = 0; j <= xAxisData.length; j++) {
              if (j == xAxisData.length) {
                xAxisData.push(t)
                break
              }
              if (xAxisData[j] === t) {
                break
              }
            }

            //种类
            for (let j = 0; j <= seriesData.length; j++) {
              if (j == seriesData.length) {
                seriesData.push({
                  name: n,
                  type: 'line',
                  stack: 'Total',
                  data: [],
                  itemStyle: { color: this.colors[i % 10] }
                })
                legendData.push(n)
                break
              }
              if (seriesData[j].name === n) {
                break
              }
            }
          }



          //处理种类data数组
          //   let timeIndex = 0
          for (let i = 0; i < res.data.length; i++) {
            let t = res.data[i]._id.time//时间
            let n = res.data[i]._id.name//名称
            let v = res.data[i].totalNum//数量

            for (let j = 0; j < xAxisData.length; j++) {
              if (xAxisData[j] === t) {
                for (let k = 0; k < seriesData.length; k++) {
                  if (seriesData[k].name === n) {
                    seriesData[k].data.push([j, v])
                    break
                  }
                }
                break
              }
            }
          }

          this.option = Object.assign(
            {},
            {
              // title: {
              //   text: '识别趋势'
              // },
              tooltip: {
                trigger: 'axis'
              },
              legend: {
                data: legendData
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xAxisData
              },
              yAxis: {
                type: 'value'
              },
              series: seriesData
            }
          );
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  }
}
</script>
