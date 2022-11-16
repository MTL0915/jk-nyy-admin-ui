export function loadChartq(myChart, times, files, windDirection, dataName) {
  myChart.clear();
  if (files) {
    myChart.setOption({
      color: ['#21f4e3', '#da70d6', '#32cd32', '#6495ed'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function (params) {
          let Htm = `${params[0].name}</br>${files[0].hd_device_sensor_name}&nbsp;&nbsp;${params[0].value}&nbsp;${files[0].hd_sensor_type_unit}`
          return Htm;
        }
      },
      grid: {
        top: "5%",
        left: "2%",
        right: "2%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: function () {
        var ary = [{
          offset: 0,
          type: "category",
          position: 'bottom',
          data: times
        }];
        if (windDirection) {
          ary.push({
            offset: 20,
            type: "category",
            position: 'bottom',
            data: windDirection
          })
        }
        return ary
      }(),
      yAxis: {
        type: "value"
      },
      series: function () {
        var ary = [];
        for (var i in files) {
          ary.push({
            name: files[i].hd_device_name,
            data: files[i][dataName],
            type: 'line',
            barWidth: '60%',
            smooth: true
          })
        }
        return ary;
      }()
    });
  }
}
