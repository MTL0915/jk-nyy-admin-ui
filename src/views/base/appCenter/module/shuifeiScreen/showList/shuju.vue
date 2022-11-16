<template>
  <div class="box">
    <div class="header">环境数据</div>
    <div class="boxContont">
      <div class="toggleHeader">
        <!-- 标签切换 -->
        <div class="tags_box">
          <div v-for="(item, index) in List" :key="item.id" class="tags">
            <div
              :class="{ isActive: index == xzIndex }"
              @click="HandelToggle(index)"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <div class="toggleBody">
        <div v-if="xzIndex == 0" class="toggle-body-item">
          <div ref="chart1" class="chart" />
        </div>
        <div v-if="xzIndex == 1" class="toggle-body-item">
          2
        </div>
        <div v-if="xzIndex == 2" class="toggle-body-item">
          3
        </div>
        <div v-if="xzIndex == 3" class="toggle-body-item">
          4
        </div>
        <div v-if="xzIndex == 4" class="toggle-body-item">
          5
        </div>
        <div v-if="xzIndex == 5" class="toggle-body-item">
          6
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loadChartZ } from "./chart/zcData";
// import { timerMixin } from "@/util/mixin/timerMixin";
// import { mapGetters } from "vuex";
export default {
  // mixins: [timerMixin],
  data() {
    return {
      List: ["风速", "湿度", "光照", "温度", "气压", "雨量"],
      xzIndex: 0,
      active: 0,
      yzmjList: [],
      chart1: null,
      chart2: null,
      chart3: null,
    };
  },
  computed: {
    // ...mapGetters(["homeData"]),
  },
  mounted() {
    this.HandelToggle(0)
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
        this.char3t.dispose();
        this.chart3 = null;
      }

      if (index == 0) {
        setTimeout(() => {
          this.getData1();
        },200);
      }
      if (index == 1) {

      }
    },

    getData1() {
      this.chart1 = this.$echarts.init(this.$refs.chart1);
      let resultArr = [];
      let resultYear = [];
      let datas = [];
      let unit = "";
      resultArr = ["面积", "产值"];
      resultYear = [2016, 2017, 2018, 2019, 2020, 2021];
      datas = [
        {
          datas: [40, 50, 63, 60, 78, 56],
          name: "面积",
          times: [2016, 2017, 2018, 2019, 2020, 2021],
        },
        {
          datas: [570, 640, 420, 780, 800, 700],
          name: "产值",
          times: [2016, 2017, 2018, 2019, 2020, 2021],
        },
      ];
      unit = "万亩";
      loadChartZ(this.chart1, resultArr, resultYear, datas, unit);
      window.addEventListener("resize", () => {
        this.chart1.resize();
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
  height: calc(100% - 58px)
}
.toggleHeader{
  height: 100px;
}
.tags_box{
  display: flex;
  align-items: center;
}
.tags{
  width: 16.6%;
  text-align: center;
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
</style>
