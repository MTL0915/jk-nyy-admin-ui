<template>
  <div
    class="device-main"
    style="margin:15px;margin-top:10px;height:100%;background-color:#FFF"
    :class='mode==="map3d"?"map3dMode":""'
    ref="device"
  >
    <div
      class="device-content"
      :class="mode==='map3d' ? 'map3dMode':'nomap3dMode'"
    >
      <div style="clear:both;display:flex;justify-content: space-around;align-items: center;">
        <div
          v-for="(item, index) in sensorList"
          :key="index"
          :class="item.id===hd_device_sensor_id?'selectSensor':''"
          @click="changeSensorChart(item)"
          row-key="hd_sensor_id"
          style="flex: 1;text-align: center;height: 80px;position:relative"
        >
          <img
            class="sensor_img"
            :class='mode==="map3d"?"map3dMode":""'
            :src="getLogo(item.hd_sensor_type_image_path)"
          />
          <div class="sensorname">{{item.name}}</div>
          <div
              class="sensorvalue"
              :class='"color_"+item.sta'
            >{{item.value}}{{item.hd_sensor_type_unit}}</div>
          <!-- <div
            class="sensor_div"
            @click="changeSensorChart(item)"
            :class="item.id===hd_device_sensor_id?'selectSensor':''"
          >
              <img
              class="sensor_img"
              :class='mode==="map3d"?"map3dMode":""'
              :src="getLogo(item.hd_sensor_type_image_path)"
            </div>
            <div class="sensorname">{{item.name}}</div>
            <div
              class="sensorvalue"
              :class='"color_"+item.sta'
            >{{item.value}}{{item.hd_sensor_type_unit}}</div>
          </div> -->
        </div>
      </div>
    </div>
    <div style="position:relative;clear:both;height:30px;line-height:30px">
      <div class="title">{{title}}</div>
      <select
        v-model="showType"
        v-show='mode==="map3d"'
        size="mini"
        placeholder="请选择"
        style="position: absolute;right: 0px;/* width: 20px; */top: 0px;top: 6px;color: #a29999;background: #0c0c0c00;border: none;border-radius: 5px;outline: none;"
        @change="changeType"
      >
        <option
          v-for="item in typeOptions"
          :key="item.value"
          :value="item.value"
        >{{item.label}}</option>
      </select>
      <el-select
        v-show='mode!="map3d"'
        v-model="showType"
        size="mini"
        placeholder="请选择"
        style="position: absolute;right: 20px;width:100px;top:0px;"
        @change="changeType"
      >
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div
      class="sensor_chart"
      style="height:calc(80% - 70px)"
      :class='mode==="map3d"?"map3dMode":""'
    >
      <div
        @resize='chartRefresh'
        style="width:100%;height:100%"
        ref="chart"
      />
    </div>
    <div
      v-show='isShowTime'
      style="float:right;font-size:1em;font-family:'黑体';margin-right:20px;height:20px;line-height:20px;margin-bottom:10px"
    >
      <div style="color:#4a4545">更新于:<span style="color:rgb(74, 138, 254)">{{system_response_time}}</span></div>
    </div>
  </div>
</template>

<script>
import {
  getDayWsenData,
  getSomeDayWsenData,
  getWsenDataByStarttimeAndEndtime
} from "@/api/device";
import { findByHd_device_idOrDevice_id } from "@/api/hd_device_sensor";
import { isFloat } from "@/utils/basetype";
import echarts from "echarts";
import { formatDate } from "@/utils/date";
require("echarts/theme/macarons"); // echarts theme
import Schart from "vue-schart";
export default {
  name: "DeviceShow",
  data () {
    return {
      DOMAIN: process.env.DOMAIN,
      isShowTime: true,
      id: "",
      hd_device_id: "",
      sensorList: [],
      system_response_time: "",
      title: "",
      hd_device_sensor_id: "",
      chartData: {
        xAxis: [],
        datas: []
      },
      showType: "week",
      typeOptions: [
        {
          label: "24小时",
          value: "day"
        },
        {
          label: "近一周",
          value: "week"
        },
        {
          label: "近一个月",
          value: "month"
        }
      ],
      minValue: 0,
      maxValue: 30
    };
  },
  components: {},
  created () {
    this.$nextTick(() => {
      this.hd_device_id = this.$route.query.hd_device_id;
      this.device_id = this.$route.query.device_id;
      // 添加模式配置
      this.mode = this.$route.query.mode;
      if (this.mode === "map3d") {
        this.isShowTime = false; //隐藏更新时间

      }
      if (this.hd_device_id || this.device_id) {
        this.getSensorList(this.hd_device_id, this.device_id);
      }
    });

    window.addEventListener("resize", () => {
      this.chart && this.chart.resize();
    })

    // let hd_device_sensor_id = this.$route.query.hd_device_sensor_id;
    // if (hd_device_sensor_id) {
    //   u hd_device_sensor_id;
    //   this.showData(hd_device_sensor_id);
    // }
  },
  methods: {
    chartRefresh () {

    },
    changeType () {
      this.getData();
    },
    changeSensorChart (item) {
      if (item) {
        this.showData(item);
      }
    },
    getLogo (img) {
      if (img === null) {
        return "/static/img/lg/ck-1.jpg";
      }
      if (img.indexOf("blob") > -1) {
        return img;
      }
      //return process.env.IMG_URL + img;
      return "https://" + this.DOMAIN + img
    },
    getSensorList () {
      findByHd_device_idOrDevice_id(this.hd_device_id, this.device_id).then(res => {
        if (res.code === 200) {
          this.chooseIndex = null;
          this.showSensorList(res.data);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    showSensorList (data) {

      this.sensorList = data;
      if (data && data.length > 0) {
        this.system_response_time = formatDate(
          new Date(data[0].system_response_time),
          "yyyy-MM-dd hh:mm"
        );
        this.showData(data[0]);
      }
    },
    showData (item) {
      if (item.hd_sensor_type_unit) {
        this.$set(this, 'title', item.name + "(" + item.hd_sensor_type_unit + ")")
        // this.title = item.name + "(" + item.hd_sensor_type_unit + ")";
      } else {
        this.$set(this, 'title', item.name)
        // this.title = item.name
      }
      // this.hd_device_sensor_id = item.id;
      this.$set(this, 'hd_device_sensor_id', item.id)

      this.getData();
    },
    initChart () {
      this.chart = echarts.init(this.$refs.chart, "macarons");
      this.setOptions(this.chartData);
    },
    setOptions ({ xAxis, datas }) {
      var min = this.minValue;
      var max = this.maxValue;
      this.chart.setOption({
        backgroundColor: this.mode === 'map3d' ? '#ffffff00' : undefined,
        grid: {
          left: "2%",
          top: "5%",
          bottom: "2%",
          right: "5%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        yAxis: [
          {
            min: min,
            max: max,
            type: "value",
            position: "left",
            nameTextStyle: {
              color: "#00FFFF"
            },
            splitLine: {
              lineStyle: {
                type: "dashed",
                color: "rgba(135,140,147,0.8)"
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: "{value}",
              color: this.mode === 'map3d' ? '#ffffff' : "#0e2147",
              fontSize: this.mode === 'map3d' ? 8 : 14
            }
          }
        ],
        xAxis: [
          {
            type: "category",
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#6A989E"
              }
            },
            axisLabel: {
              inside: false,
              textStyle: {
                color: this.mode === 'map3d' ? '#ffffff' : "#0e2147", // x轴颜色
                fontWeight: "normal",
                fontSize: this.mode === 'map3d' ? 8 : 14,
                lineHeight: this.mode === 'map3d' ? 12 : 22
              }
            },
            data: xAxis
          }
        ],
        series: [
          {
            name: "数据",
            type: "line",
            barWidth: "60%",
            data: datas,
            showAllSymbol: true,
            smooth: true
          }
        ]
      });
    },

    queryData (type) {
      this.showType = type;
      this.getData();
    },
    showChartByType (data) {
      this.tableData = [];
      this.chartData.xAxis = [];
      this.chartData.datas = [];
      for (let i = 0, len = data.response_times.length; i < len; i++) {
        var value = data.value[i];
        value = isFloat(value) ? parseFloat(value) : value;

        if (value) {
          if (i === 0) {
            this.minValue = value;
            this.maxValue = value;
          } else {
            if (value < this.minValue) {
              this.minValue = value;
            }
            if (value > this.maxValue) {
              this.maxValue = value;
            }
          }
        }

        if (this.showType === "day") {
          this.chartData.xAxis.push(
            data.response_times[i].substring(11, 13) + "点"
          );
        } else if (this.showType === "week" || this.showType === "month") {
          this.chartData.xAxis.push(data.response_times[i].substring(5, 11));
        }
        this.chartData.datas.push(value);
      }
      this.maxValue = this.maxValue + 1;
      this.minValue = parseInt(this.minValue);
      this.maxValue = parseInt(this.maxValue);
      this.initChart();
    },
    getData () {
      var type = this.showType;
      if (type === "day") {
        getDayWsenData({ hd_device_sensor_id: this.hd_device_sensor_id }).then(
          res => {
            this.showChartByType(res.data);
          }
        );
      } else if (type === "week") {
        getSomeDayWsenData({
          hd_device_sensor_id: this.hd_device_sensor_id
        }).then(res => {
          this.showChartByType(res.data);
        });
      } else if (type === "month") {
        getSomeDayWsenData({
          hd_device_sensor_id: this.hd_device_sensor_id,
          some_day: 30
        }).then(res => {
          this.showChartByType(res.data);
        });
      }
    }
  }
};
</script>

<style>
@media screen and (max-width: 800px) {
  body {
    font-size: 12px;
  }
}
@media screen and (min-width: 801px) {
  body {
    font-size: 16px;
  }
}
</style>

<style scoped>
.selectSensor {
  background: #eaeaea85;
}
.device-main {
  background-color: #ededed;
  color: #000;
}
.device-main >>> .sensor_img {
  /* width: 30%; */
  height: 30%;
}
.device-main >>> .title {
  height: 30px;
  line-height: 30px;
  clear: both;
  font-family: "黑体";
  color: #1bd3ca;
  font-size: 1.3em;
  text-align: center;
}
.device-main >>> .sensor_div {
  cursor: pointer;
  text-align: center;
  margin-right: 4%;
  width: 100%;
  height: 100%;
}

.device-main >>> .sensorname {
  text-align: center;
  font-size: 0.9em;
  font-family: "黑体";
}

.device-main >>> .sensorvalue {
  text-align: center;
  font-size: 1em;
  font-family: "黑体";
  color: #bc446c;
  position: absolute;
  bottom: 3px;
  left: 50%;
  transform: translateX(-50%);
}

.device-main >>> .sensorvalue.color_1 {
  color: #24f124;
}

.device-main >>> .sensorvalue.color_2 {
  color: yellow;
}

.device-main >>> .sensorvalue.color_3 {
  color: red;
}

.device-main >>> .sensorvalue.color_4 {
  color: red;
}

.device-main >>> .sensor_chart {
  clear: both;
  padding-bottom: 10px;
}

.device-main.map3dMode {
  margin: 0 !important;
  background-color: #00000000 !important;
  color: #fff;
}

.device-content.map3dMode {
  padding-top: 8px;
}

.device-content.nomap3dMode {
  height: 20%;
}

.sensor_img.map3dMode {
  display: none;
}

.sensor_chart.map3dMode {
  height: calc(100% - 78px) !important;
  padding-bottom: 0;
}
</style>