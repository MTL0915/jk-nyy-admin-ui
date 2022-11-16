<template>
  <div class="dashboard-container">
    <div class="content-wrapper">
      <div style="height: 65px;">
        <myResources />
      </div>
      <div style="height: calc(100% - 80px);margin-top:15px;">
        <myMap />
      </div>
    </div>
    <updatePass ref="updatePass" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import qxz from './charts/qxz'
import myMap from './charts/myMap'
import msg from './charts/msg'
import szjc from './charts/szjc'
import status from './charts/status'
import myResources from './charts/myResources'
import updatePass from '@/views/system/user/center/updatePass'
import { needUpdatePass } from '@/api/user'

export default {
  name: 'DashboardAdmin',
  components: { qxz, msg, szjc, status, myResources, myMap, updatePass },
  data () {
    return {
    }
  },
  mounted: function () {
    this.loadStatusCharts()
    this.needUpdatePass()
  },
  computed: {
    ...mapGetters([
      'id'
    ])
  },
  methods: {
    needUpdatePass () {
      needUpdatePass().then(res => {
        if (res.data) {
          this.$refs.updatePass.title = '为确保您的账户安全，建议修改初始密码'
          this.$refs.updatePass.dialog = true
        }
      })
    },
    loadStatusCharts () {
      var m2R2Data = [
        { value: 335, legendname: '种类01', name: '种类01  335', itemStyle: { color: '#8d7fec' } },
        { value: 310, legendname: '种类02', name: '种类02  310', itemStyle: { color: '#5085f2' } }
      ]
      var options = {
        tooltip: {
          trigger: 'item',
          formatter: function (parms) {
            var str = parms.seriesName + '</br>' +
              parms.marker + '' + parms.data.legendname + '</br>' +
              '数量：' + parms.data.value + '</br>' +
              '占比：' + parms.percent + '%'
            return str
          }
        },
        series: [
          {
            name: '标题',
            type: 'pie',
            center: ['35%', '50%'],
            radius: ['40%', '65%'],
            label: {
              normal: {
                show: false
              }
            },
            data: m2R2Data
          }
        ]
      }
      //const chart1 = echarts.init(this.$refs.chart1, 'macarons')
      //chart1.setOption(options)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.dashboard-container {
  overflow:hidden;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: #fff;
  z-index: 89;
  background: #f5f5f6;
  .content-wrapper {
    min-width: 1104px;
    height: 100%;
    padding: 20px;
    .card-item {
      flex: 1 0 auto;
    }
    .drag-wrapper {
      height: 220px;
      transition: height 0.5s;
    }
  }
  .x-size-2 {
    min-width: 450px;
  }
  .x-size-3 {
    min-width: 352px;
  }
  .x-card {
    position: relative;
    box-sizing: border-box;
    height: 100%;
    padding: 10px;
    background: #ffffff;
    box-shadow: 0 5px 15px rgba(57, 98, 254, 0.02),
      0 3px 6px rgba(117, 108, 254, 0.12);
    border: none;
    font-size: 12px;
    color: #999999;
    line-height: 20px;
    .card-header {
      height: 16px;
      .title-container {
        display: inline-block;
        margin-left: 10px;
        .title {
          font-size: 14px;
          color: #333333;
          line-height: 16px;
          font-weight: bolder;
        }
      }
    }
  }
  .card-body {
    margin-top: 10px;
    height: 166px;
    position: relative;
    background-color: #ffffff;
  }
  .content-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .x-circle-text {
    width: 100px;
    padding: 10px;
    margin: 0 auto;
    text-align: center;
    .value {
      width: 100px;
      height: 100px;
      border-radius: 50px;
      background: #f5f5f5;
      margin-bottom: 10px;
      h5 {
        display: inline-block;
        margin-top: 26px;
        max-width: 94px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: bold;
        font-size: 34px;
        color: #000000;
        line-height: 48px;
      }
    }
  }
  .x-size-small .x-rect-text {
    min-width: 180px;
    height: 48px;
  }
  .x-pure-text-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
  }
  .x-size-small .x-pure-text {
    min-width: 140px;
    height: 41px;
  }
  .x-pure-text {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 10px;
    .name {
      margin-left: 10px;
      font-size: 12px;
      color: #666666;
      line-height: 20px;
      .status {
        left: 5px;
        font-size: 8px;
        line-height: 8px;
      }
      .status:before {
        font-family: "iconfont";
        content: "\e757";
        font-size: 30px;
        position: relative;
        margin-right: 2px;
      }
      .icon {
        font-size: 28px;
        line-height: 28px;
      }
    }
    .value {
      margin-right: 10px;
      padding-top: 10px;
    }
    .status.success {
      color: #2cb663;
    }
    .status.error {
      color: #fa0000;
    }
    .status.warning {
      color: #f8fc19;
    }
    .status.info {
      color: #a1a1a1;
    }
    .status.primary {
      color: #46ccf5;
    }
    .status {
      position: relative;
      font-size: 12px;
      line-height: 16px;
    }
  }
  .x-rect-text {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    background: #f5f5f5;
    .name {
      margin-left: 20px;
      font-size: 12px;
      color: #666666;
      line-height: 20px;
    }
    .value {
      margin-right: 20px;
    }
  }
  a,
  a:visited,
  a:hover,
  a:active {
    text-decoration: none;
    color: #108cee;
  }
}
.box {
  //display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  align-items: center;
  .rect {
    width: calc(25% - 35px + 8px);
    height: 100%;
    margin-left: 35px;
    background: #ffffff;
    box-shadow: 0 5px 15px rgba(57, 98, 254, 0.02),
      0 3px 6px rgba(117, 108, 254, 0.12);
    border: none;
    float: left;
    .img-block {
      width: 75px;
      height: 100%;
      float: left;
    }
    .icon {
      width: 48px;
      height: 48px;
      display: block;
      margin-left: 15px;
      padding-top: 15px;
    }
    .content {
      float: left;
      width: calc(100% - 75px);
      text-align: center;
    }
    .value {
      padding-top: 7px;
      color: #19233c;
      width: 100%;
      text-align: center;
      font-weight: bold;
      font-size: 25px;
      color: #696969;
      line-height: 30px;
    }
    .title {
      font-size: 12px;
      color: grey;
    }
    .option {
      margin-right: 20px;
      font-size: 12px;
      line-height: 20px;
      cursor: pointer;
      a {
        color: #999999;
      }
    }
  }
}
.first-rect {
  margin-left: 0px !important;
}
</style>
