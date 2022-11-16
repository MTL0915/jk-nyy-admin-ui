export function loadChartl(myChart, name, time) {
  var index = 0;
  var colorList = ["#f36c6c", "#e6cf4e", "#20d180", "#0093ff"];
  myChart.setOption({
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
      top: 5,
      left: 120
    },
    toolbox: {
      show: true
      // feature: {
      //   saveAsImage: {}
      // }
    },
    xAxis: {
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
    yAxis: {
      type: "category",
      inverse: true,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisPointer: {
        label: {
          show: true,
          margin: 5
        }
      },
      data: name,
      axisLabel: {
        margin: 100,
        fontSize: 11,
        align: "left",
        interval: "auto",
        color: "#333",
        rich: {
          a1: {
            color: "#fff",
            backgroundColor: colorList[0],
            width: 15,
            height: 15,
            align: "center",
            borderRadius: 2
          },
          a2: {
            color: "#fff",
            backgroundColor: colorList[1],
            width: 15,
            height: 15,
            align: "center",
            borderRadius: 2
          },
          a3: {
            color: "#fff",
            backgroundColor: colorList[2],
            width: 15,
            height: 15,
            align: "center",
            borderRadius: 2
          },
          b: {
            color: "#fff",
            backgroundColor: colorList[3],
            width: 15,
            height: 15,
            align: "center",
            borderRadius: 2
          }
        },
        formatter: function (params) {
          ;
          if (index == name.length) {
            index = 0;
          }
          index++;
          if (index - 1 < 3) {
            return ["{a" + index + "|" + index + "}" + "  " + params].join(
              "\n"
            );
          } else {
            return ["{b|" + index + "}" + "  " + params].join("\n");
          }
          // if (time > 600000) {
          //   return (time / (1000 * 60 * 60)).toLocaleString() +'小时';
          // }
        }
      }
    },
    series: [{
      z: 2,
      name: "value",
      type: "bar",
      barWidth: 14,
      barMinHeight: 5,
      barMaxHeight: 20,
      barCategoryGap: "50%" /*多个并排柱子设置柱子之间的间距*/ ,
      data: time,
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
  });
}
