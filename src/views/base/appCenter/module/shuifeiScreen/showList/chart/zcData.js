import * as echarts from "echarts";
// export function loadChart(myChart,resultArr,nyear,bfData, fData, czUnit) {
export function loadChartZ(myChart, resultArr, nyear, datas, czUnit) {
  // 颜色设置
  myChart.setOption({
    tooltip: {
      //鼠标滑过交叉点的提示样式，默认是黑色半透明状态
      trigger: "axis",
      axisPointer: {
        label: {
          //X轴坐标文字样式
          show: true,
          backgroundColor: "#fff",
          color: "#556677",
          borderColor: "rgba(0,0,0,0)",
          shadowColor: "rgba(0,0,0,0)",
          shadowOffsetY: 0,
        },
        lineStyle: {
          width: 0,
        },
      },
      backgroundColor: "#fff",
      textStyle: {
        color: "#5c6c7c",
      },
      padding: [10, 10],
      extraCssText: "box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)",
    },
    legend: {
      //右上角线类型标记
      top: "5%",
      data: resultArr,
      textStyle: {
        fontSize: 13,
        color: "#fff",
      },
    },
    //
    grid: {
      top: "25%",
      left: "5%",
      right: "5%",
      bottom: "1%",
      containLabel: true,
    },
    //横坐标设置
    xAxis: {
      type: "category",
      // boundaryGap: false, //坐标轴两边留白
      axisLabel: {
        //坐标轴刻度标签的相关设置。
        interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
        //	margin:15,
        textStyle: {
          color: "#fff",
          fontStyle: "normal",
          fontFamily: "微软雅黑",
          fontSize: 14,
        },
        //rotate:50,
      },
      axisTick: {
        //坐标轴刻度相关设置。
        show: false,
      },
      axisLine: {
        //坐标轴轴线相关设置
        lineStyle: {
          color: "#fff",
        },
      },
      splitLine: {
        //坐标轴在 grid 区域中的分隔线。
        show: false,
        lineStyle: {
          color: "#fff",
        },
      },
      data: nyear,
    },
    //纵坐标设置
    yAxis: [
      {
        type: "value",
        name: "单位：" + czUnit, //Y轴坐标名称 or 单位
        splitLine: {
          lineStyle: {
            //grid 区域内横坐标的线样式 此时为虚线
            type: "dashed",
            color: "#276796",
          },
        },
        axisTick: {
          //坐标轴刻度相关设置。
          show: false,
        },
        axisLabel: {
          //坐标轴刻度标签的相关设置。
          interval: 1, //设置为 1，表示『隔一个标签显示一个标签』
          //	margin:15,
          textStyle: {
            color: "#fff",
            fontStyle: "normal",
            fontFamily: "微软雅黑",
            fontSize: 14,
          },
          formatter: "{value}",
          //rotate:50,
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#fff",
          },
        },
      },
      {
        type: "value",
        name: "单位：（吨）",
        splitLine: {
          lineStyle: {
            //grid 区域内横坐标的线样式 此时为虚线
            type: "dashed",
            color: "#276796",
          },
        },
        axisTick: {
          //坐标轴刻度相关设置。
          show: false,
        },
        axisLabel: {
          //坐标轴刻度标签的相关设置。
          interval: 1, //设置为 1，表示『隔一个标签显示一个标签』
          //	margin:15,
          textStyle: {
            color: "#fff",
            fontStyle: "normal",
            fontFamily: "微软雅黑",
            fontSize: 14,
          },
          formatter: "{value}",
          //rotate:50,
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#fff",
          },
        },
      },
    ],
    series: [
      {
        name: resultArr[0],
        type: "line",
        tooltip: {
          valueFormatter: function(value) {
            return value + "种";
          },
        },
        smooth: true,
        itemStyle: {
          normal: {
            color: "#63E09E",
            //交叉点的阴影样式
            lineStyle: {
              color: "#63E09E",
              width: 3,
            },
            areaStyle: {
              //曲线图覆盖的地方为渐变色
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "rgba(248,137,64,0)",
                },
                {
                  offset: 1,
                  color: "rgba(99,224,158,0.5)",
                },
              ]),
            },
          },
        },
        symbol: "circle", //数据交叉点样式
        symbolSize: 5, //数据交叉点尺寸
        data: datas[0]["datas"],
      },
      {
        name: resultArr[1],
        type: "bar",
        barWidth: 20,
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function(value) {
            return value + "亩";
          },
        },
        smooth: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#DC8E53" },
            { offset: 0.5, color: "#DC8E53" },
            { offset: 1, color: "#A35049" },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#DC8E53" },
              { offset: 0.5, color: "#DC8E53" },
              { offset: 1, color: "#A35049" },
            ]),
          },
        },
        // data: fData,
        data: datas[1]["datas"],
      },
    ],
  });
}
