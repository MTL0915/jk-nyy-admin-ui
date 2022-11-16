<template>
  <div class='moisturize'>
    <div class='title'>
      <span>墒情检测数据</span>
    </div>
    <div
      class=''
      style='display:flex;position: relative;height: calc(100% - 10px);'
    >
      <div class='moisturize_line'></div>
      <div
        style='width: 50%;padding: 21px;'
        asd='1'
      >
        <div class='shendu'>
          <div class='shendu_name'>深度10cm</div>
          <div class='shendu_info'>
            <img :src="path+dataList[1].image_path" />
            <span>温度 {{ (dataList[1].value + dataList[1].unit) || "暂无数据"}}</span>
            <img :src="path+dataList[0].image_path" />
            <span>湿度 {{ (dataList[0].value + dataList[0].unit) || "暂无数据"}}</span>
          </div>
        </div>
        <div class='shendu'>
          <div class='shendu_name'>深度20cm</div>
          <div class='shendu_info'>
            <img :src="path+dataList[3].image_path" />
            <span>温度 {{(dataList[3].value + dataList[3].unit) || "暂无数据"}}</span>
            <img :src="path+dataList[2].image_path" />
            <span>湿度 {{(dataList[2].value + dataList[2].unit) || "暂无数据"}}</span>
          </div>
        </div>
        <div class='shendu'>
          <div class='shendu_name'>深度30cm</div>
          <div class='shendu_info'>
            <img :src="path+dataList[5].image_path" />
            <span>温度 {{(dataList[5].value + dataList[5].unit) || "暂无数据"}}</span>
            <img :src="path+dataList[4].image_path" />
            <span>湿度 {{(dataList[4].value + dataList[4].unit) || "暂无数据"}}</span>
          </div>
        </div>
      </div>

      <div style='width: 50%;'>
        <div
          class='echartsBox lines'
          style='margin-bottom: 5px;'
        >
          <div class='title'>
            <span>历史温度</span>
          </div>
          <div
            ref='wendus'
            id='wendu'
          >

          </div>
        </div>
        <div class='echartsBox lines'>
          <div class='title'>
            <span>历史湿度</span>
          </div>
          <div
            ref='sidu'
            id='wendu'
          >

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { queryDevice, findByHd_device_id } from "@/api/device.js"
import { selectSensorData2 } from '@/api/equip'
import echarts from 'echarts'
export default {
  data () {
    return {
      dataList: [],
      path: process.env.VR_IMGPATH
    }
  },
  mounted () {
    this.get();

    // setTimeout(()=>{

    // },1000)

  },
  methods: {

    get () {
      queryDevice({ rs_facilities_id: "40288ad26f32f9dc016f3582c89a0005" }).then((e) => {
        // 获取地块下面的采集器数据
        var CJ = e.data.content.find((e) => {
          return e.hd_device_type_code == 'JK-SQ'
        })
        // 根据采集器数据查传感器数据
        findByHd_device_id({ hd_device_id: CJ.id }).then((e) => {
          this.dataList = e.data;
          setTimeout(() => {
            this.loadWendu(this.dataList[1].id, this.dataList[1].name);
            this.loadSidu(this.dataList[0].id, this.dataList[0].name);
          }, 2000)
        })
      })
    },

    // 加载历史温度
    loadWendu (id, name) {
      // selectSensorData({
      //   sensor_ids: id
      // }).then((e) => {
      //   var data = e.data;
      //   var option = {
      //     tooltip: {
      //       trigger: 'axis'
      //     },
      //     legend: {
      //       show: false,
      //     },
      //     grid: {
      //       top: 20,
      //       bottom: 20,
      //     },
      //     xAxis: {
      //       type: 'category',
      //       boundaryGap: false,
      //       data: data.map((e) => { return e["时间"] })
      //     },
      //     yAxis: {
      //       type: 'value',
      //       axisLabel: {
      //         formatter: '{value} °C'
      //       }
      //     },
      //     series: [
      //       {
      //         name: name,
      //         type: 'line',
      //         data: data.map((e) => { return e[name] * 1 }),
      //       }
      //     ]
      //   };
      //   var WDecharts = echarts.init(this.$refs.wendus);
      //   WDecharts.setOption(option);
      // })
    },

    // 加载历史温度
    loadSidu (id, name) {
      // selectSensorData({
      //   sensor_ids: id
      // }).then((e) => {
      //   var data = e.data;
      //   var option = {
      //     tooltip: {
      //       trigger: 'axis'
      //     },
      //     legend: {
      //       show: false,
      //     },
      //     grid: {
      //       top: 20,
      //       bottom: 20,
      //     },
      //     xAxis: {
      //       type: 'category',
      //       boundaryGap: false,
      //       data: data.map((e) => { return e["时间"] })
      //     },
      //     yAxis: {
      //       type: 'value',
      //       axisLabel: {
      //         formatter: '{value} °C'
      //       }
      //     },
      //     series: [
      //       {
      //         name: name,
      //         type: 'line',
      //         data: data.map((e) => { return e[name] * 1 }),
      //       }
      //     ]
      //   };
      //   var SDecharts = echarts.init(this.$refs.sidu);
      //   SDecharts.setOption(option);
      // })
    }
  }
}
</script>

<style>
.moisturize {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 10px;
  padding-left: 20px;
  overflow: hidden;
}
.moisturize .shendu {
  position: relative;
  height: 33%;
  min-height: 80px;
}
.moisturize .shendu_info {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 12px 0;
}
.moisturize .shendu_info img {
  height: 22px;
}
.moisturize_line {
  position: absolute;
  left: 5px;
  width: 3px;
  background: #a9a9a9;
  border-radius: 15px;
  height: calc(100% - 15px);
}
.moisturize .shendu_name:after {
  content: "";
  position: absolute;
  left: -18px;
  top: 6px;
  padding: 5px;
  border-radius: 50%;
  background: #4bd3fd;
}
.echartsBox {
  height: calc(50% - 5px);
}
#wendu {
  height: calc(100% - 18px);
}
</style>