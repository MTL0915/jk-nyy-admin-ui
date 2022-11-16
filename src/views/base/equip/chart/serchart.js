export function loadCharts(myChart, data, name) {
  ;
  myChart.clear();
  if (data) {
    myChart.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        top: "5%",
        left: "1%",
        right: "3%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: {
        type: "category",
        data: data.response_times
      },
      yAxis: {
        type: "value",
        itemStyle: {
          //折线拐点标志的样式
          color: "#058cff"
        }
      },
      series: {
        name: name,
        type: "line",
        smooth: true,
        data: data[name]
      }
    });
  }
}
