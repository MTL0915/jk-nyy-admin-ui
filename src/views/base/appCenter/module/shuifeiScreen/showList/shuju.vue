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
          <div style="color: #01ceeb">{{ item.name }}</div>
          <div>
            <span
              class="num"
              :style="{ color: item.status == '1' ? '#f00' : '' }"
              style="font-size: 20px"
              :id="'num' + index"
              >{{ item.value }}</span
            >{{ item.unit }}
          </div>
          <img :src="item.src" />
        </div>
      </div>

      <div class="flex content">
        <div ref="chart" class="chart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import data from "./data/lineself-xqg-3";
import { loadChart } from "./chart/line_self_xqg_3";
import { formatDate } from '@/utils/date2'
export default {
  name: "",
  components: {},
  data() {
    return {
      seleNavIndex: 0,
      navList: [
        {
          name: "水温",
          src: require("@/assets/images/echarts/line/icon_wd.png"),
          value: "--",
          unit: "°C",
          status: 0,
          echartsData: [],
          xAxisData: []
        },
        {
          name: "pH值",
          src: require("@/assets/images/echarts/line/ico_ph.png"),
          value: "--",
          unit: "",
          status: 0,
          echartsData: [],
          xAxisData: []
        },
        {
          name: "溶解氧",
          src: require("@/assets/images/echarts/line/ico_rjy.png"),
          value: "--",
          unit: "mg/l",
          status: 0,
          echartsData: [],
          xAxisData: []
        },
        {
          name: "水位",
          src: require("@/assets/images/echarts/line/icon_sw.png"),
          value: "--",
          unit: "m",
          status: 0,
          echartsData: [],
          xAxisData: []
        }
      ],
      echartsData: {}
    };
  },
  created() {},
  computed: {},
  mounted() {
    console.log("data", data.navbarData);
    this.echartsData = data.echartsData;
    this.navList.map((it, index) => {
      data.navbarData.some(item => {
        if (item.name === it.name) {
          it.unit = item.unit;
          it.channel = item.channel;
          it.value = item.value;
          if (index <= 2) {
            it.echartsData = this.echartsData[0][`wsenValue${it.channel}`];
            it.xAxisData = this.echartsData[0].response_timestamps.map(v =>
              formatDate(Number(v) * 1000, "yyyy-MM-dd")
            );
          } else {
            it.echartsData = this.echartsData[1][`wsenValue${it.channel}`];
            it.xAxisData = this.echartsData[1].response_timestamps.map(v =>
              formatDate(Number(v) * 1000, "yyyy-MM-dd")
            );
          }
          return true;
        }
      });
    });
    this.initEchart();
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
    height:80px;
    justify-content:space-around;
    padding:4px 6px;
    border-radius:3px;
    flex:0 0 18%;
    box-sizing:border-box;
    font-size:14px;
    cursor:pointer;
    background:url('~@/assets/images/echarts/line/jcsj_bj.png') center no-repeat;
    background-size:100% 100%;
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
