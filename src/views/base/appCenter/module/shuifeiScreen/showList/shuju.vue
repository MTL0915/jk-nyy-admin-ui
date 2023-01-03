<template>
  <div class="box">
    <div class="header">环境数据</div>
    <div class="boxContont">
      <div class="toggleHeader">
        <!-- 标签切换 -->
        <div class="tags_box">
          <div v-for="(item, index) in modelData" :key="item.productSfModelDetailId" class="tags">
            <div
              :class="{ isActive: index == xzIndex }"
              class="tags_box_item_box"
              @click="sensorCollectClick(item, index)"
            >
              <i :class="`icon-code-`+item.hd_sensor_type_code"></i>
              <span class="icon-sensor-name">{{item.hd_device_sensor_name}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="toggleBody">
        <div v-if="xzIndex == 0" class="toggle-body-item">
          <sensorEch
            style="padding-top:5px;width:100%;height:100%;"
            v-if="currentID"
            :ids="currentIds.join(',')"
            :currentID="currentID"
            :mobilePlatform="false"
          />
        </div>
        <div v-if="xzIndex == 1" class="toggle-body-item">
          <div ref="chart2" class="chart" />
        </div>
        <div v-if="xzIndex == 2" class="toggle-body-item">
          <div ref="chart3" class="chart" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loadChartZ } from "./chart/zcData";
import sensorEch from './chart/sensorEch';
export default {
  props:["modelData"],
  data() {
    return {
      List: ["风速", "湿度", "光照", "温度", "气压", "雨量"],
      xzIndex: 0,
      chart1: null,
      chart2: null,
      chart3: null,
      currentID:'',
      currentIds:[]
    };
  },
  components: {
    sensorEch,
  },
  computed: {

  },
  mounted() {
    this.HandelToggle(0)
    this.modelData.forEach((item,index,array)=>{
      this.currentIds.push(item.hd_device_sensor_id)
    })
    this.currentID = this.currentIds[0]
    console.log(this.currentIds,this.currentID)
  },
  methods: {
    HandelToggle(index) {
      this.xzIndex = index;
      if (this.chart1) {
        window.removeEventListener("resize", () => {
          this.chart1.resize();
        });
        this.chart1.dispose();
        this.chart1 = null;
      }
      if (this.chart2) {
        window.removeEventListener("resize", () => {
          this.chart2.resize();
        });
        this.chart2.dispose();
        this.chart2 = null;
      }
      if (this.chart3) {
        window.removeEventListener("resize", () => {
          this.chart3.resize();
        });
        this.chart3.dispose();
        this.chart3 = null;
      }

      if (index == 0) {
        setTimeout(() => {
          this.getData1();
        },200);
      }
      if (index == 1) {
        setTimeout(() => {
          this.getData2();
        },200);
      }
      if (index == 2) {
        setTimeout(() => {
          this.getData3();
        },200);
      }
    },

    //点击采集类传感器
    sensorCollectClick (item, index) {
      if (item.hd_sensor_type_code !== '22') {
        this.currentID = item.hd_device_sensor_id;
      }
    },

    getData1() {
      this.chart1 = this.$echarts.init(this.$refs.chart1);
      let resultArr = [];
      let resultYear = [];
      let datas = [];
      let unit = "";
      // resultArr = ["风速", "峰值"];
      resultArr = ["风速"];
      resultYear = [0, 4, 8, 12, 16, 20];
      datas = [
        {
          datas: [40, 50, 63, 60, 78, 56],
          name: "风速",
          times: [0, 4, 8, 12, 16, 20],
        },
        // {
        //   datas: [570, 640, 420, 780, 800, 700],
        //   name: "峰值",
        //   times: [0, 4, 8, 12, 16, 20],
        // },
      ];
      unit = "m/s";
      loadChartZ(this.chart1, resultArr, resultYear, datas, unit);
      window.addEventListener("resize", () => {
        this.chart1.resize();
      });
    },
    getData2() {
      this.chart2 = this.$echarts.init(this.$refs.chart2);
      let resultArr = [];
      let resultYear = [];
      let datas = [];
      let unit = "";
      // resultArr = ["风速", "峰值"];
      resultArr = ["湿度"];
      resultYear = [0, 4, 8, 12, 16, 20];
      datas = [
        {
          datas: [10, 20, 43, 33, 21, 15],
          name: "湿度",
          times: [0, 4, 8, 12, 16, 20],
        },
      ];
      unit = "%rh";
      loadChartZ(this.chart2, resultArr, resultYear, datas, unit);
      window.addEventListener("resize", () => {
        this.chart2.resize();
      });
    },
    getData3() {
      this.chart3 = this.$echarts.init(this.$refs.chart3);
      let resultArr = [];
      let resultYear = [];
      let datas = [];
      let unit = "";
      // resultArr = ["风速", "峰值"];
      resultArr = ["温度"];
      resultYear = [0, 4, 8, 12, 16, 20];
      datas = [
        {
          datas: [8, 7, 10, 14, 15, 12],
          name: "温度",
          times: [0, 4, 8, 12, 16, 20],
        },
      ];
      unit = "°C";
      loadChartZ(this.chart3, resultArr, resultYear, datas, unit);
      window.addEventListener("resize", () => {
        this.char32.resize();
      });
    },
  },
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
.boxContont{
  padding: 10px;
  height: calc(100% - 38px)
}
.toggleHeader{
  height: 100px;
}
.tags_box{
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.tags{
  text-align: center;
  cursor: pointer;
}
.tags_box_item_box{
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 风速 */
.icon-code-21{
  display: inline-block;
  width: 48px;
  height: 48px;
  background: url(~@/assets/images/shuifeiji/icon_fs.png) no-repeat;
}
/* 雨量 */
.icon-code-26{
  display: inline-block;
  width: 48px;
  height: 48px;
  background: url(~@/assets/images/shuifeiji/icon_yl.png) no-repeat;
}
/* 温度 */
.icon-code-23{
  display: inline-block;
  width: 48px;
  height: 48px;
  background: url(~@/assets/images/shuifeiji/icon_wd.png) no-repeat;
}
/* 气压 */
.icon-code-25{
  display: inline-block;
  width: 48px;
  height: 48px;
  background: url(~@/assets/images/shuifeiji/icon_qy.png) no-repeat;
}
/* 风向 这里暂时光照*/
.icon-code-22{
  display: inline-block;
  width: 48px;
  height: 48px;
  background: url(~@/assets/images/shuifeiji/icon_gz.png) no-repeat;
}
/* 湿度 */
.icon-code-24{
  display: inline-block;
  width: 48px;
  height: 48px;
  background: url(~@/assets/images/shuifeiji/icon_sd.png) no-repeat;
}
.icon-sensor-name{
  margin-top: 5px;
}
.toggleBody{
  height: 100%;
}

.toggle-body-item{
  height: calc(100% - 100px)
}
.chart{
  width: 100%;
  height: 100%;
}


/* 临时 */
/* 风速 */
.icon-code-71{
  display: inline-block;
  width: 48px;
  height: 48px;
  background: url(~@/assets/images/shuifeiji/icon_fs.png) no-repeat;
}
/* 雨量 */
.icon-code-32{
  display: inline-block;
  width: 48px;
  height: 48px;
  background: url(~@/assets/images/shuifeiji/icon_yl.png) no-repeat;
}
/* 温度 */
.icon-code-31{
  display: inline-block;
  width: 48px;
  height: 48px;
  background: url(~@/assets/images/shuifeiji/icon_wd.png) no-repeat;
}
</style>
