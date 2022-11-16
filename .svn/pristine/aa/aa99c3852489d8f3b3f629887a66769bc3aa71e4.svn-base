<template>
  <div style="height:100%">
    <v-chart :options="option" :autoresize="true" style="width:100%;height:100%;" />
  </div>
</template>
<script>
import { get } from "@/api/index";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/polar";
import "echarts/lib/component/legend";
import "echarts/lib/component/title.js";
import "echarts/lib/component/legendScroll";
export default {
  props: {
    data : {
      type: Object,
      default: () => {}
    }

  },
  data() {
    return {
      option: {}
    }
  },
  mounted() {
    console.log(this.data);
    this.getData();
  },
  methods: {
    getData() {
      this.option =  {
        grid: {
          top: "30",
          bottom: "0",
          left: "10",
          containLabel: true,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
          // formatter: (function(params) {
          //   let htm = ""
          //   htm = `${JSON.stringify(params[0])}`
          //   return htm
          // })()
        },
        xAxis: {
            type: 'category',
            data: [this.data.time]
          },
        yAxis: [
          {
            name: '总数(个)',
            type: 'value'
          },
          {
            name: '时长(/h)',
            type: 'value'
          }
        ],
        series: [{
          name: '计划数',
          data: [this.data.planNum],
          type: 'bar',
          yAxisIndex: 0
        },
        {
          name: '已完成',
          data: [this.data.recordPlanFinishNum],
          type: 'bar',
          yAxisIndex: 0
        },
        {
          name: '未完成',
          data: [this.data.recordPlanUnfinishedNum],
          type: 'bar',
          yAxisIndex: 0
        },
        {
          name: '手动登记',
          data: [this.data.recordOneselfNum],
          type: 'bar',
          yAxisIndex: 0
        },
        {
          name: '计划预计总时长',
          data: [this.data.planDuration],
          type: 'bar',
          yAxisIndex: 1
        },{
          name: '计划实际总时长',
          data: [this.data.recordPlanDuration],
          type: 'bar',
          yAxisIndex: 1
        },
        {
          name: '手动登记总时长',
          data: [this.data.recordOneselfDuration],
          type: 'bar',
          yAxisIndex: 1
        }
        ]
      }
    }
  }
}
</script>