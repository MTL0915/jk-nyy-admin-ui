<template>
  <div style="height:100%;overflow:hidden">
    <v-chart
      style="width:100%;height:100%;margin:auto"
      :options="option"
      :autoresize="true"
    />
  </div>
</template>
<script>const color = ['#0E7CE2', '#FF8352', '#E271DE', '#F8456B', '#00FFFF', '#4AEAB0',"#f36c6c",
  "#e6cf4e",
  "#20d180",
  "#0093ff",
  "#99ffcc",
  "#99cccc",
  "#9999cc",
  "#ffcc66",
  "#ccff99",
  "#99ff99",
  "#66cccc",
  "#ffcccc",
  "#9999ff",
  "#ff9933",
  "#99cc66",
  "#99cc99",
  "#66cc99",
  "#ccff66",
  "#99cc00",
  "#669900",
  "#3399cc",
  "#ccffff",
  "#ffffcc",
  "#99ffff",
  "#66ccff",
  "#99ccff",
  "#ccccff",
  "#ffff99",
  "#ccffcc",
  "#99cc33",
  "#ffcc99",
  "#9966cc"];
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/polar";
import "echarts/lib/component/legend";
import "echarts/lib/component/title.js";
import "echarts/lib/component/legendScroll";
export default {
  props: {
    xArr: {
      type: Array,
      default: () => []
    },
    yArr: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    unit: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      option: {}
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.option = {
        tooltip: {
          trigger: 'axis',
          formatter: '{b}年：{c}'+this.unit,
          axisPointer: {
            type: 'shadow',
            label: {
              backgroundColor: '#6a7985'
            }
          },
          textStyle: {
            color: '#fff',
            fontStyle: 'normal',
            fontSize: 12
          }
        },
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#CDCDCD"
            }
          },
          axisLabel: {
            color: "#CDCDCD",
            textStyle: {
              fontSize: 12
            }
          },
          data: this.xArr
        },
        // yAxis: {
        //   name: `${this.title}(${this.unit})`,
        //   splitLine: { show: false },
        //   // axisTick: { show: false },
        //   type: 'value'
        // },
        yAxis: {
          axisLine: {
            show: false,
            lineStyle: {
              color: "#CDCDCD"
            }
          },
          splitLine: { show: true },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#CDCDCD",
              fontSize: 10,
              lineHeight: 10
            }
          },
          type: "value"
        },
        series: [{
          data: this.yArr,
          barMaxWidth:20,
          type: 'bar',
          showBackground: false,
          itemStyle: {   
            normal:{  
　　　　　　　　//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
              // color: function (params){
              //     return color[params.dataIndex];
              // },
              color: "#3DC4F1",
              barBorderRadius: 10
            },
            //鼠标悬停时：
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
          },
        }]
      }
    }
  }
}
</script>