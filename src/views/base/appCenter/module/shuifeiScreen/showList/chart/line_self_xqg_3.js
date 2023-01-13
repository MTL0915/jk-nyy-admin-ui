import * as echarts from "echarts";
export function loadChart(myChart, content, xAxisData, sexIndex, name, dw) {
  myChart.clear();
  myChart.setOption(
    {
      color: "#41ccba",
      // legend: {
      //   data: ["温度", "ph", "溶氧量"],
      //   right: 10,
      //   selectedMode: "single",
      //   textStyle: {
      //     color: "#0ff"
      //   },
      //   inactiveColor: "#fff"
      // },
      tooltip: {
        trigger: "axis"
      },
      grid: {
        top: 35,
        right: 30,
        left: 20,
        bottom: 10,
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          data: xAxisData
        }
      ],
      yAxis: [
        {
          type: "value",
          name: "单位" + ": " + dw,
          axisLabel: {
            textStyle: {
              color: "#fff"
            }
          },
          nameTextStyle: {
            color: "#fff"
          },
          splitLine: {
            lineStyle: {
              color: "rgba(40,125,119,0.3)"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          axisTick: {
            show: false
          }
        }
      ],
      dataZoom: [
        {
          show: true,
          height: 20,
          xAxisIndex: [0],
          bottom: 0,
          start: 10,
          end: 100,
          handleIcon:
            "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
          handleSize: "110%",
          handleStyle: {
            color: "#d3dee5"
          },
          textStyle: {
            color: "#000"
          },
          borderColor: "#90979c"
        },
        {
          type: "inside",
          show: true,
          height: 15,
          start: 1,
          end: 35
        }
      ],
      series: [
        {
          name: name,
          type: "line",
          smooth: true,
          showSymbol: false,
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(1,231,234, 0.3)"
                  },
                  {
                    offset: 1,
                    color: "rgba(40,125,119,0.1)"
                  }
                ],
                false
              ),
              shadowColor: "rgba(40,125,119,0.1)",
              shadowBlur: 10
            }
          },
          data: content
        }
      ]
    },
    true
  );
  // myChart.on("legendselectchanged", function() {
  //   let option = this.getOption();
  //   if (sexIndex === 0) {
  //     option.yAxis[0].name = "单位：°C";
  //   } else if (sexIndex === 1) {
  //     option.yAxis[0].name = "";
  //   } else if (sexIndex === 2) {
  //     option.yAxis[0].name = "单位：mg/l";
  //   }
  //   myChart.setOption(option);
  // });
}
