import * as echarts from "echarts";
// import * as echarts from "echarts";
export function loadCharts(myChart, xData, line, type, unit) {
  if (myChart) {
    myChart.clear();
  }
  if (xData.length > 0) {
    // 设置
    myChart.setOption({
      tooltip: {
        trigger: "item",
        padding: 1,
        formatter: function(param) {
          var resultTooltip =
            "<div style='background:rgba(13,5,30,.6);border:1px solid rgba(255,255,255,.2);padding:5px;border-radius:3px;color:#fff;'>" +
            "<div style='text-align:center;'>" +
            param.name +
            "</div>" +
            "<div style='padding-top:5px;'>" +
            "<span style=''> " +
            type +
            ": </span>" +
            "<span style=''>" +
            param.value +
            "</span><span>" +
            unit +
            "</span>" +
            "</div>" +
            "</div>";
          return resultTooltip;
        }
      },
      grid: {
        left: 15,
        top: 30,
        // top: 42,
        right: "12%",
        bottom: 3,
        // bottom: 47
        containLabel: true
      },
      legend: {
        show: false,
        icon: "circle",
        orient: "horizontal",
        top: 21,
        right: "3%",
        itemWidth: 6,
        itemHeight: 6,
        // itemGap: 30,
        textStyle: {
          color: "#FFFFFF",
          fontSize: 18
        }
      },
      yAxis: [
        {
          type: "category",
          data: xData,
          axisLabel: {
            interval: 0, // 强制显示所有标签
            // rotate: 10, //倾斜度 -90 至 90 默认为0
            textStyle: {
              color: "#FEFEFE",
              fontSize: 12
            },
            margin: 10 //刻度标签与轴线之间的距离。
            // align: "center"
            // padding: [14, 0, 0, 0]
          },
          axisLine: {
            show: true, //显示x轴
            lineStyle: {
              color: "#808F9F",
              width: 2
            }
          },
          axisTick: {
            show: false //不显示刻度
          },
          boundaryGap: true,
          splitLine: {
            show: false,
            width: 0.08,
            lineStyle: {
              type: "solid",
              color: "#03202E"
            }
          }
        }
      ],
      xAxis: [
        {
          type: "value",
          name: unit,
          // name: "（单位：" + unit + "）", //Y轴坐标名称 or 单位
          nameTextStyle: {
            color: "#02A7FD",
            fontSize: 10,
            // align: "left",
            padding: [0, 0, -5, 0]
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#1D4380",
              type: "solid"
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: true, //显示y轴
            lineStyle: {
              color: "#02A7FD",
              width: 2
            }
          },
          axisLabel: {
            textStyle: {
              color: "#02A7FD",
              fontSize: 12
            },
            margin: 4
          }
        }
      ],
      series: [
        // {
        //   //柱底圆片
        //   name: "",
        //   type: "pictorialBar",
        //   symbolSize: [20, 7],
        //   symbolOffset: [0, 4],
        //   z: 12,
        //   itemStyle: {
        //     normal: {
        //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //         {
        //           offset: 0,
        //           // color: "#01ABFF"
        //           color: "#0094E0"
        //         },
        //         {
        //           offset: 1,
        //           // color: "#009FEC"
        //           color: "#39BBFF"
        //         }
        //       ])
        //     }
        //   },
        //   data: line
        // },

        //柱体
        {
          name: type,
          type: "bar",
          barWidth: line.length > 5 ? 8 : 12,
          barGap: "2%",
          label: {
            normal: {
              show: true,
              position: "right",
              fontSize: 16,
              fontFamily: "electronicFont",
              color: "#fff"
              // offset: [-3, -5]
            }
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  // color: "#01ABFF"
                  color: "#0094E0"
                },
                {
                  offset: 1,
                  // color: "#009FEC"
                  color: "#C0EAB0"
                }
              ])
            }
          },

          data: line
        }

        // //柱顶圆片
        // {
        //   name: "",
        //   type: "pictorialBar",
        //   symbolSize: [20, 7],
        //   symbolOffset: [0, -4],
        //   z: 12,
        //   symbolPosition: "end",
        //   itemStyle: {
        //     normal: {
        //       color: new echarts.graphic.LinearGradient(
        //         0,
        //         0,
        //         0,
        //         1,
        //         [
        //           {
        //             offset: 0,
        //             // color: "#01ABFF"
        //             color: "#1CEBC7"
        //           },
        //           {
        //             offset: 1,
        //             // color: "#018ED6"
        //             color: "#56D5FC"
        //           }
        //         ],
        //         false
        //       )
        //     }
        //   },
        //   data: line
        // }
      ]
    });
  } else {
    //空状态
    // myChart.clear();
    const msgOption = {
      title: {
        show: true,
        textStyle: {
          color: "grey",
          fontSize: 20
        },
        text: "暂无数据",
        left: "center",
        top: "center"
      },
      xAxis: {
        show: false
      },
      yAxis: {
        show: false
      },
      series: []
    };
    myChart.setOption(msgOption);
  }
}
