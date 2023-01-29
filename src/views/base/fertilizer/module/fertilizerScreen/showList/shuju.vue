<template>
  <div class="box">
    <div class="header">环境数据</div>
    <div class="contain" @mouseover="mouseover" @mouseout="mouseout">
      <div class="flex zhwl-card" v-if="navList.length > 0">
        <div
          class="row flex"
          v-for="(item, index) in navList"
          :key="index"
          :class="seleNavIndex == index ? 'row-active' : ''"
          @click="changNav(index)"
        >
          <img :src="item.src" style="width:45px;height:45px"/>
          <div style="color: #01ceeb; font-size:12px;text-align:center;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{ item.hd_device_sensor_name }}</div>
          <div style="text-align:center;">
            <span
              class="num"
              :style="{ color: item.status == '1' ? '#f00' : '' }"
              style="font-size: 12px;text-align:center;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;display: block;"
              :id="'num' + index"
              >{{ item.value }}{{ item.unit }}</span
            >
          </div>
        </div>
      </div>

      <div class="flex content">
        <div ref="chart" class="chart"></div>
      </div>
    </div>
  </div>
</template>

<script>
// import data from "./data/lineself-xqg-3";
import { loadChart } from "./chart/line_self_xqg_3";
import { formatDate } from '@/utils/date2'
import { selectSensorData2 } from '@/api/shuifei'
export default {
  name: "",
  props:["modelData"],
  components: {},
  data() {
    return {
      sensorIdArr:[],
      navbarData2:[],
      seleNavIndex: 0,
      navList: [
        // {
        //   name: "水温",
        //   src: require("@/assets/images/echarts/line/icon_wd.png"),
        //   value: "--",
        //   unit: "°C",
        //   status: 0,
        //   echartsData: [],
        //   xAxisData: []
        // },
        // {
        //   name: "pH值",
        //   src: require("@/assets/images/echarts/line/ico_ph.png"),
        //   value: "--",
        //   unit: "",
        //   status: 0,
        //   echartsData: [],
        //   xAxisData: []
        // },
        // {
        //   name: "溶解氧",
        //   src: require("@/assets/images/echarts/line/ico_rjy.png"),
        //   value: "--",
        //   unit: "mg/l",
        //   status: 0,
        //   echartsData: [],
        //   xAxisData: []
        // },
        // {
        //   name: "水位",
        //   src: require("@/assets/images/echarts/line/icon_sw.png"),
        //   value: "--",
        //   unit: "m",
        //   status: 0,
        //   echartsData: [],
        //   xAxisData: []
        // }
      ],
      // navList: [
      //   {
      //     device_id: null,
      //     hd_device_id: null,
      //     hd_device_name: null,
      //     hd_device_sensor_channel: 1,
      //     hd_device_sensor_id: "ff80808182c9b3eb0182edc0af771227",
      //     hd_device_sensor_name: "出水口水压",
      //     hd_device_type_code: null,
      //     hd_device_type_name: null,
      //     hd_sensor_type_code: "73",
      //     hd_sensor_type_id: "4028b8816c3d71ec016c3d827fb2000b",
      //     hd_sensor_type_name: "水压",
      //     productSfModelDetailConfig: null,
      //     productSfModelDetailId: "ff8080818599e1770185a51ee9ea0d25",
      //     productSfModelDetailType: "undefined"
      //   }
      // ],
      echartsData: {}
    };
  },
  created() {},
  computed: {},
  mounted() {
    // console.log("modelData",this.modelData)
    this.sensorIdArr = this.modelData.map((item)=>{
      return item.hd_device_sensor_id
    })
    // console.log("sensorIdArr",this.sensorIdArr)
    const promise = this.sensorIdArr.map((item) => {
      const data = {
        sensor_ids: item,
        group_type: 5,
        interval: 30
      }
      return selectSensorData2(data)
    })
    Promise.all(promise).then(values => {
        // console.log(values,"all"); 
        this.sensorHistoryData = values.map((item)=>{
          return item.data
        })
        // console.log("sensorHistoryData",this.sensorHistoryData)
        this.navList = JSON.parse(JSON.stringify(this.modelData))
        this.navList.map((it, index) => {
          this.sensorHistoryData.some(item => {
            if (item.sensor[0].hd_device_sensor_id == it.hd_device_sensor_id) {
              it.unit = item.sensor[0].hd_sensor_type_unit;
              it.value = item.sensor[0].hd_device_sensor_value;
              it.src = process.env.IMG_URL + item.sensor[0].hd_sensor_type_small_image_path;
              it.echartsData = item.sensor[0].data;
              it.xAxisData = item.timestamp.map(v =>
                formatDate(Number(v), 'hh:mm')
              );
              return true;
            }
          });
        });
        this.initEchart();
    }).catch((err) => {
        console.log(err,"allBad"); 
    });

    // console.log("navbarData", data.navbarData);
    // this.echartsData = data.echartsData;
    // this.navList.map((it, index) => {
    //   data.navbarData.some(item => {
    //     if (item.name === it.name) {
    //       it.unit = item.unit;
    //       it.channel = item.channel;
    //       it.value = item.value;
    //       if (index <= 2) {
    //         it.echartsData = this.echartsData[0][`wsenValue${it.channel}`];
    //         it.xAxisData = this.echartsData[0].response_timestamps.map(v =>
    //           formatDate(Number(v) * 1000, "yyyy-MM-dd")
    //         );
    //       } else {
    //         it.echartsData = this.echartsData[1][`wsenValue${it.channel}`];
    //         it.xAxisData = this.echartsData[1].response_timestamps.map(v =>
    //           formatDate(Number(v) * 1000, "yyyy-MM-dd")
    //         );
    //       }
    //       return true;
    //     }
    //   });
    // });
    
  },
  methods: {
    changNav(idx) {
      this.seleNavIndex = idx;
      this.dataLoad();
      clearInterval(this.timer);
      this.timer = null;
      this.zsShow();
    },
    initEchart() {
      this.chart = this.$echarts.init(this.$refs.chart);
      loadChart(
        this.chart,
        this.navList[this.seleNavIndex].echartsData,
        this.navList[this.seleNavIndex].xAxisData,
        this.seleNavIndex,
        this.navList[this.seleNavIndex].name,
        this.navList[this.seleNavIndex].unit
      );
      setTimeout(() => {
        this.zsShow();
      }, 200);
    },
    zsShow() {
      if (this.timer == null) {
        this.timer = setInterval(() => {
          if (this.seleNavIndex < this.navList.length - 1) {
            this.seleNavIndex++;
          } else {
            this.seleNavIndex = 0;
          }
          this.dataLoad();
        }, 10000);
      }
    },
    dataLoad() {
      if (!this.chart) {
        this.chart = this.$echarts.init(this.$refs.chart);
      }
      loadChart(
        this.chart,
        this.navList[this.seleNavIndex].echartsData,
        this.navList[this.seleNavIndex].xAxisData,
        this.seleNavIndex,
        this.navList[this.seleNavIndex].name,
        this.navList[this.seleNavIndex].unit
      );
      window.addEventListener("resize", () => {
        this.chart.resize();
      });
    },
    stop() {
      if (this.chart) {
        this.chart.dispose();
        this.chart = null;
      }
      window.removeEventListener("resize", this.chartResize);
      clearInterval(this.timer);
      this.timer = null;
    },
    mouseover() {
      clearInterval(this.timer);
      this.timer = null;
    },
    mouseout() {
      this.zsShow();
    }
  },
  watch: {},
  destroyed() {
    this.stop();
  }
};
</script>
<style scoped>
.box {
  height: calc(38% - 10px);
  position: relative;
  margin: 10px 0;
  border: 1px solid #288c9d;
  background: url(~@/assets/images/shuifeiji/sensor_bg.png) no-repeat;
}
.box .header {
  font-size: 20px;
  color: #78f7f7;
  text-align: center;
  height: 38px;
  line-height: 38px;
}

.contain{
  position:relative;
  height:calc(100% - 38px) !important;
  padding:10px;
  box-sizing:border-box;
  cursor:pointer;
}

.zhwl-card{
  width: 100%;
  height: 100px;
  justify-content: space-around;
  display: flex;
}

.zhwl-card .row{
    color:#fff;
    flex-direction:column;
    height:90px;
    justify-content:space-around;
    padding:4px 6px;
    border-radius:3px;
    /* flex:0 0 18%; */
    box-sizing:border-box;
    font-size:14px;
    cursor:pointer;
    background:url('~@/assets/images/echarts/line/jcsj_bj.png') center no-repeat;
    background-size:100% 100%;
    width:18.5%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.zhwl-card .row-active{
  background:url('~@/assets/images/echarts/line/jcsj_select.png') center no-repeat;
  background-size:100% 100%;
}

.content{
  position: relative;
  height:calc(100% - 100px);
}

.chart{
  height: 100%;
}

</style>
