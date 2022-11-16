export function loadChart(myChart) {
  // 颜色设置
  let angle = 0; //角度，用来做简单的动画效果的
  myChart.setOption({
    color: ["#B785DE", "#63E09E", "#03DAE6", "#FFD306", "#DE6C0F"],
    tooltip: {
      trigger: "item",
      formatter: "{b} : {c} ({d}%)"
    },

    calculable: true,
    series: [{
        type: "pie",
        radius: ["78%", "79%"],
        hoverAnimation: false,
        labelLine: {
          normal: {
            show: false,
            length: 30,
            length2: 55
          },
          emphasis: {
            show: false
          }
        },
        name: "",
        data: [{
          name: "",
          value: 0,
          itemStyle: {
            normal: {
              color: "#0B4A6B"
            }
          }
        }]
      },
      {
        type: "pie",
        radius: ["84%", "85%"],
        hoverAnimation: false,
        labelLine: {
          normal: {
            show: false,
            length: 30,
            length2: 55
          },
          emphasis: {
            show: false
          }
        },
        name: "",
        data: [{
          name: "",
          value: 0,
          itemStyle: {
            normal: {
              color: "#0B4A6B"
            }
          }
        }]
      },
      {
        name: "ring5",
        type: "custom",
        coordinateSystem: "none",
        renderItem: function (params, api) {
          return {
            type: "arc",
            shape: {
              cx: api.getWidth() / 2,
              cy: api.getHeight() / 2,
              r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.8,
              startAngle: ((0 + angle) * Math.PI) / 180,
              endAngle: ((90 + angle) * Math.PI) / 180
            },
            style: {
              stroke: "#0CD3DB",
              fill: "transparent",
              lineWidth: 2
            },
            silent: true
          };
        },
        data: [0]
      },
      {
        name: "ring5",
        type: "custom",
        coordinateSystem: "none",
        renderItem: function (params, api) {
          return {
            type: "arc",
            shape: {
              cx: api.getWidth() / 2,
              cy: api.getHeight() / 2,
              r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.8,
              startAngle: ((180 + angle) * Math.PI) / 180,
              endAngle: ((270 + angle) * Math.PI) / 180
            },
            style: {
              stroke: "#0CD3DB",
              fill: "transparent",
              lineWidth: 2
            },
            silent: true
          };
        },
        data: [0]
      },
      {
        name: "ring5",
        type: "custom",
        coordinateSystem: "none",
        renderItem: function (params, api) {
          return {
            type: "arc",
            shape: {
              cx: api.getWidth() / 2,
              cy: api.getHeight() / 2,
              r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.85,
              startAngle: ((270 + -angle) * Math.PI) / 180,
              endAngle: ((40 + -angle) * Math.PI) / 180
            },
            style: {
              stroke: "#0CD3DB",
              fill: "transparent",
              lineWidth: 2
            },
            silent: true
          };
        },
        data: [0]
      },
      {
        stack: "a",
        type: "pie",
        radius: ["20%", "73%"],
        roseType: "area",
        zlevel: 10,
        label: {
          normal: {
            show: true,
            formatter: function (params) {
              return params.name;
            },
            padding: [2, 5, 2, 5],
            backgroundColor: "rgba(5,77,149,0.8)",
            shadowColor: "#00ECEF",
            shadowBlur: 4,
            borderRadius: 5,
            textStyle: {
              fontSize: 14,
              color: "#fff"
            },
            lineHeight: 24,
            position: "outside"
          },
          emphasis: {
            show: true
          }
        },
        labelLine: {
          normal: {
            show: true,
            length: 20,
            length2: 30,
            lineStyle: {
              width: 1
            }
          },
          emphasis: {
            show: false
          }
        },
        data: [{
          'name': '北京',
          'value': 25
        }, {
          'name': '上海',
          'value': 20
        }, {
          'name': '广州',
          'value': 18
        }, {
          'name': '深圳',
          'value': 15
        }, {
          'name': '海外',
          'value': 9
        }]
      }
    ]
  });
  // function getCirlPoint(x0, y0, r, angle) {
  //     let x1 = x0 + r * Math.cos(angle * Math.PI / 180)
  //     let y1 = y0 + r * Math.sin(angle * Math.PI / 180)
  //     return {
  //         x: x1,
  //         y: y1
  //     }
  // }

  function draw() {
    angle = angle + 3;
    let option = myChart.getOption();
    myChart.setOption(option, true);
    //window.requestAnimationFrame(draw);
  }

  setInterval(function () {
    //用setInterval做动画感觉有问题
    draw();
  }, 100);
}