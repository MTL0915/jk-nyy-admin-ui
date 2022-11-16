<template>
  <div
    class='expEcharts'
    style="background: #000000A8;height: 100%;overflow: auto;"
  >
    <div
      class="model right_top_model"
      style="position: relative;"
    >
      <div style="align-content:flex-start;flex-wrap: wrap;">
        <div
          class="mini_box"
          style="margin:0px;"
        >
          <div
            v-for="(items, index) in sensorList"
            :key="index"
            class="right_top_data"
            :style="
              index === rightTopEchartsTypeChoose
                ? 'background: #cfffff00'
                : 'background: #ffffff00'
            "
          >
            <div
              style="display:flex;color:#455a64;padding-top: 12px;"
              @click="rightTopEchartsTypeClick(items, index)"
            >
              <img
                v-show='false'
                class="right_top_data_img"
                :src="urls + items.hd_sensor_type_small_image_path"
              />
              <div style="flex:1;text-align: center;margin:auto;">
                <p
                  style="width:100%;font-size: 16px;margin:0 auto;padding:0;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;width: auto;"
                  :style="{
                    color:
                      items.state == 2
                        ? 'red'
                        : items.state == 3 || items.state == 4
                        ? '#afaf36'
                        : '#068D74'
                  }"
                >
                  <span v-show="items.state != 2">{{ items.value }}{{ items.unit }}</span>
                  <span
                    style="font-size:13px"
                    v-show="items.state == 2"
                  >数据异常</span>
                </p>
                <span style="display:inline-block;width:100%;font-size:12px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;">{{ items.name }}</span>
              </div>
              <img
                v-show="items.state == 2"
                src="@/assets/img/warn.png"
                style="width:15px;height:15px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="position:relative">
      <div
        class="timeTypeChose"
        style="width:315px;text-align:center;"
      >
        <span
          @click="chooseTime(1, '1')"
          :class="dayChoose == '1' ? 'timeActive' : ''"
        >今天</span>
        <span
          @click="chooseTime(7, '7')"
          :class="dayChoose == '7' ? 'timeActive' : ''"
        >7天</span>
        <span
          @click="chooseTime(15, '15')"
          :class="dayChoose == '15' ? 'timeActive' : ''"
        >15天</span>
        <span
          @click="chooseTime(30, '30')"
          :class="dayChoose == '30' ? 'timeActive' : ''"
        >30天</span>
        <span
          @click="userDefined()
          "
          :class="dayChoose == 'userDefined' ? 'timeActive' : ''"
        >自定义</span>
      </div>
      <div
        style="position:absolute;top:35px;left:50%;transform:translateX(-50%);;width:315px"
        v-show="dayChoose == 'userDefined'"
      >
        <div
          class="timeStart"
          @click="timeStartShow = true"
        >
          <img
            src="@/assets/images/timeStart.jpg"
            style="vertical-align:center"
          /><span>
            {{ start_time }}
          </span>
        </div>
        <div
          class="timeEnd"
          @click="timeEndShow = true"
        >
          <img
            src="@/assets/images/timeEnd.jpg"
            style="vertical-align:center"
          /><span>{{ end_time }}</span>
        </div>
      </div>
      <div
        style="position:absolute;top:70%;width:100%;font-size:8px;display: flex;justify-content: space-around;"
        v-for="(item, index) in echartOption.sensor"
        :key="index"
        v-show="item.hd_device_sensor_id == currentID && type != 'maxAndMin'"
      >
        <div style="display:flex;text-align:center;margin-top:15px">
          <p style="margin-bottom:3px;color: #0196f2">最大值：</p>
          <p style='color: #8a8484'>{{ item.max || "暂无数据" }}</p>
        </div>
        <div style="display:flex;text-align:center;margin-top:15px">
          <p style="margin-bottom:3px;color: #0196f2">最小值：</p>
          <p style='color: #8a8484'>{{ item.min || "暂无数据" }}</p>
        </div>
      </div>
    </div>
    <div style="height:220px;width:100%;">
      <v-chart
        v-for="(item, index) in echartOption.sensor"
        :key="index"
        style="width:100%;height:100%;margin-top:15px"
        :options="item.echart"
        :autoresize="true"
        v-show="currentID === item.hd_device_sensor_id"
      />
    </div>
    <div class="typeChose">
      <div
        class="typeText"
        @click="chooseType('实时')"
      >
        <span :class="type == 'current' ? 'active' : ''">实时</span>
      </div>
      <div
        class="typeText"
        @click="chooseType('平均')"
      >
        <span :class="type == 'avg' ? 'active' : ''">平均</span>
      </div>
      <div
        class="typeText"
        @click="chooseType('最大&最小')"
      >
        <span :class="type == 'maxAndMin' ? 'active' : ''">最大&最小</span>
      </div>
    </div>
    <!-- <div class="tab" v-if="show">
      <div
        class="tabCard"
        v-for="(item, i) in echartOption.sensor"
        :key="i"
        v-show="item.hd_sensor_type_code != '22'"
        :style="{
          color:
            echartOption.currentID === item.hd_device_sensor_id ? '#0093FF' : ''
        }"
        @click="chooseTab(item)"
      >
        {{ item.hd_device_sensor_name }}
      </div>
    </div> -->
    <!--开始时间-->
    <van-popup
      v-model="timeStartShow"
      position="bottom"
      v-if="mobilePlatform"
    >
      <van-datetime-picker
        v-model="currentTime1"
        @cancel="timeStartShow = false"
        @confirm="confirm($event, 'start')"
        type="date"
      />
    </van-popup>
    <!--结束时间-->
    <van-popup
      v-model="timeEndShow"
      position="bottom"
      v-if="mobilePlatform"
    >
      <van-datetime-picker
        v-model="currentTime2"
        @cancel="timeEndShow = false"
        @confirm="confirm($event, 'end')"
        type="date"
      />
    </van-popup>
    <el-dialog
      v-if="!mobilePlatform"
      :visible.sync="timeStartShow"
      append-to-body
      title="自定义"
      width="700px"
      @close="timeStartShow = false"
    >
      <div style="text-align:center;">
        选择日期：
        <el-date-picker
          size="mini"
          v-model="currentTime1"
          type="date"
        />
        <el-button
          @click="confirm"
          type="primary"
          size="mini"
        >确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      v-if="!mobilePlatform"
      :visible.sync="timeEndShow"
      append-to-body
      title="自定义"
      width="700px"
      @close="timeEndShow = false"
    >
      <div style="text-align:center;">
        选择日期：
        <el-date-picker
          size="mini"
          v-model="currentTime2"
          type="date"
        />
        <el-button
          @click="confirm"
          type="primary"
          size="mini"
        >确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { get } from "@/api/index";
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/scatter";
import "echarts/lib/chart/candlestick";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/polar";
import "echarts/lib/component/legend";
import "echarts/lib/component/title.js";
// import "echarts/lib/component/visualMap";
import "echarts/lib/component/legendScroll";
import {
  getFacilitiesDetails,
  getDetailById
} from "@/api/equip";
export default {
  // props: {
  //   ids: {
  //     type: String,
  //     default: ""
  //   },
  //   currentID: {
  //     type: String,
  //     default: ""
  //   },
  //   mobilePlatform: {
  //     type: Boolean,
  //     default: true
  //   }
  // },
  data () {
    return {
      mobilePlatform: false,
      ids: "",
      currentID: "",
      userDefinedDialog: false,
      timeStartShow: false,
      timeEndShow: false,
      currentTime1: new Date(),
      currentTime2: new Date(),
      warnValue: {}, //传感器预警值对象
      start_time: "",
      end_time: "",
      group_type: 5, //默认查询 实时数据；1、按年，2、按月，3、按天，4、按小时
      value: "",
      day: 1, //查询天数，默认1天
      dayChoose: "1",
      menu: [], //左侧菜单
      type: "current", //查询类型，current:实时，avg: 平均，maxAndMin：最大&最小
      groupFunction: "",
      echartOption: {},
      option: {
        color: "#0196F2",
        grid: {
          top: "20%",
          bottom: "30%",
          left: "40px",
          right: "5%"
        },
        yAxis: {
          type: "value",
          position: "left",
          offset: 0,
          scale: true,
          splitLine: { show: false },
          axisTick: { show: false },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#666"
            }
          },
          axisLabel: {
            color: "#ffffff"
          }
        },
        series: [
          {
            type: "line",
            smooth: true
            //label: { normal: { show: true, position: "top" } },
          }
        ]
      },
      facilities_name: "",
      rightTopTypeChoose: 0,
      rightTopEchartsTypeChoose: 0,
      sensorList: [],
      urls: process.env.IMG_URL,
      selectedDevice: "",
      collectSensor: [],
      rs_facilities_id: "",
      hd_device_id: ""
    };
  },
  mounted () {
    //初始化
    //this.rs_facilities_id = this.$route.query.rs_facilities_id;
    this.hd_device_id = this.$route.query.hd_device_id;
    this.type = "current";
    this.day = 1;
    this.group_type = 5;
    this.getEquipDetail();
    // if (this.$route.query.rs_facilities_id) {
    //   this.getAreaDetail();
    // } else if (!this.$route.query.rs_facilities_id && this.$route.query.hd_device_id) {
    //   this.getEquipDetail();
    // }

    //this.getSensorData(this.group_type);
  },
  methods: {
    //获取设备详情
    getEquipDetail () {
      const tempIDS = [];
      getDetailById({ hd_device_id: this.hd_device_id }).then(res => {
        this.selectedDevice = res.data.name;
        var wind = "";
        res.data.sensor.map(item => {
          if (item.hd_sensor_type_code == "22") {
            item.unit = "";
            var s = item.hd_device_sensor_value;
            if (s <= 22.5 || s >= 337.5) {
              item.value = "北风";
            } else if (s <= 67.5) {
              item.value = "东北风";
            } else if (s <= 112.5) {
              item.value = "东风";
            } else if (s <= 157.5) {
              item.value = "东南风";
            } else if (s <= 202.5) {
              item.value = "南风";
            } else if (s <= 247.5) {
              item.value = "西南风";
            } else if (s <= 292.5) {
              item.value = "西风";
            } else if (s <= 337.5) {
              item.value = "西北风";
            }
          }
        });
        this.sensorList = res.data.sensor;
        this.sensorList.map(v => {
          tempIDS.push(v.id);
        });
        this.ids = tempIDS.join(",")
        this.getSensorTb();
        this.getSensorData(this.group_type);
      })
    },
    // rightTopTypeClick (item) {
    //   //this.currentIds = [];
    //   const tempIDS = [];
    //   this.rightTopTypeChoose = item.id;
    //   this.sensorList = item.sensorList;
    //   this.sensorList.map(v => {
    //    tempIDS.push(v.id);
    //   });
    //   this.ids = tempIDS.join(",");
    //   this.rightTopEchartsTypeChoose = 0;
    //   this.getSensorTb();
    //   this.getSensorData(this.group_type);
    // },
    //点击传感器切换
    rightTopEchartsTypeClick (item, index) {
      this.rightTopEchartsTypeChoose = index;
      this.getSensorTb();
    },
    //切换传感器
    getSensorTb () {
      var sensor = this.sensorList[this.rightTopEchartsTypeChoose];
      if (sensor.hd_sensor_type_code !== "22") {
        this.currentID = sensor.id;
      }
    },
    //获取地块详情
    // getAreaDetail() {
    //   const tempIDS = [];
    //   getFacilitiesDetails({rs_facilities_id: this.rs_facilities_id}).then(res => {
    //     console.log(res.data);
    //      this.facilities_name = res.data.facilitiesInfo.name;
    //              if (res.data.collectSensor.length > 0) {
    //       res.data.collectSensor.map(items => {
    //         var wind = "";
    //         items.sensorList.map(item => {
    //           if (item.hd_sensor_type_code == "22") {
    //             var s = item.hd_device_sensor_value;
    //             if (s <= 22.5 || s >= 337.5) {
    //               item.hd_device_sensor_value = "北风";
    //             } else if (s <= 67.5) {
    //               item.hd_device_sensor_value = "东北风";
    //             } else if (s <= 112.5) {
    //               item.hd_device_sensor_value = "东风";
    //             } else if (s <= 157.5) {
    //               item.hd_device_sensor_value = "东南风";
    //             } else if (s <= 202.5) {
    //               item.hd_device_sensor_value = "南风";
    //             } else if (s <= 247.5) {
    //               item.hd_device_sensor_value = "西南风";
    //             } else if (s <= 292.5) {
    //               item.hd_device_sensor_value = "西风";
    //             } else if (s <= 337.5) {
    //               item.hd_device_sensor_value = "西北风";
    //             }
    //             wind = item.hd_device_sensor_id + "," + wind;
    //           }
    //         });
    //         items.wind = wind;
    //       });
    //       this.collectSensor = res.data.collectSensor;
    //       if (this.$route.query.hd_device_id) {
    //         for (let i in this.collectSensor) {
    //           if (this.hd_device_id === this.collectSensor[i].hd_device_id) {
    //             this.selectedDevice = this.collectSensor[i].hd_device_name;
    //             this.rightTopTypeChoose = i;
    //             break;
    //           }
    //         }
    //       } else {
    //         this.selectedDevice = this.collectSensor[0].hd_device_name;
    //       }

    //       this.sensorList =
    //         res.data.collectSensor[this.rightTopTypeChoose].sensorList;
    //       this.sensorList.map(v => {
    //         tempIDS.push(v.hd_device_sensor_id);
    //       });
    //       this.ids = tempIDS.join(",")
    //       this.getSensorTb();
    //       this.getSensorData(this.group_type);
    //       // this.rightTopShow = true;
    //     }
    //   })
    // },
    formatDate (date, fmt) {
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      let o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds()
      };
      for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + "";
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? str : this.padLeftZero(str)
          );
        }
      }
      return fmt;
    },
    padLeftZero (str) {
      return ("00" + str).substr(str.length);
    },
    //时间选择
    confirm (value, type) {
      var time = 0;
      var time2 = 0;
      if (this.mobilePlatform) {
        if (type === "start") {
          time = new Date(this.end_time).getTime() - new Date(value).getTime();
          time2 = new Date().getTime() - new Date(value).getTime();
          this.start_time = this.newDate(value);
        } else {
          time =
            new Date(value).getTime() - new Date(this.start_time).getTime();
          this.end_time = this.newDate(value);
        }
      } else {
        time = this.currentTime2.getTime() - this.currentTime1.getTime();
        time2 = new Date().getTime() - this.currentTime1.getTime();
        this.start_time = this.newDate(this.currentTime1);
        this.end_time = this.newDate(this.currentTime2);
      }
      if (time2 < 0) {
        if (this.mobilePlatform) {
          this.$toast("开始时间已大于当前时间！");
        } else {
          this.$message.error("开始时间已大于当前时间！");
        }
      }
      if (time < 0) {
        if (this.mobilePlatform) {
          this.$toast("结束时间必须大于结束时间！");
        } else {
          this.$message.error("结束时间必须大于结束时间！");
        }
        return;
      }
      if (time > (31 * 24 * 60 * 60 * 1000)) {
        if (this.mobilePlatform) {
          this.$toast("时间跨度不能大于一个月！");
        } else {
          this.$message.error("时间跨度不能大于一个月！");
        }
        return
      }
      this.timeStartShow = false;
      this.timeEndShow = false;
      this.userDefinedDialog = false;
      this.day = time / (24 * 60 * 60 * 1000);
      if (this.day > 1 && this.type != "current") {
        this.group_type = 3;
      } else if (this.day == 1 && this.type != "current") {
        this.group_type = 4;
      }
      this.getSensorData(this.group_type);
    },
    //时间格式化
    newDate (time) {
      return (
        time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate()
      );
    },
    //自定义按钮事件
    userDefined () {
      this.dayChoose = "userDefined";
      if (this.type == "avg" || this.type == "maxAndMin") {
        this.group_type = 4;
      }
      this.end_time = this.newDate(new Date());
      const time = new Date(this.end_time).getTime() - 24 * 60 * 60 * 1000;
      this.start_time = this.newDate(new Date(time));
      this.day = 1;
      this.getSensorData(this.group_type);
    },

    chooseTab (item) {
      this.currentID = item.hd_device_sensor_id;
    },
    //实时、平均、最大&最小  tab卡事件
    chooseType (value) {
      //平均
      if (value == "平均") {
        this.groupFunction = "";
        this.type = "avg";
        if (this.dayChoose === "userDefined") {
          //自定义查询平均，1天的，默认查询24小时，超过1天，按天查询
          if (this.day == 1) {
            this.group_type = 4;
            this.getSensorData(this.group_type);
          } else {
            this.group_type = 3;
            this.getSensorData(this.group_type);
          }
          return;
        }
        if (this.day == 1) {
          this.group_type = 4;
          //const interval = 24;
          this.getSensorData(this.group_type);
        }
        if (this.day == 7) {
          this.group_type = 3;
          //const interval = 7;
          this.day = 7;
          this.getSensorData(this.group_type);
        }
        if (this.day == 15) {
          this.group_type = 3;
          //const interval = 15;
          this.day = 15;
          this.getSensorData(this.group_type);
        }
        if (this.day == 30) {
          this.group_type = 3;
          //const interval = 30;
          this.day = 30;
          this.getSensorData(this.group_type);
        }
      } else if (value == "最大&最小") {
        //最大&最小
        this.type = "maxAndMin";
        this.groupFunction = "min,max";
        if (this.day === 1) {
          this.group_type = 4;
          //const interval = 24;
          this.getSensorData(this.group_type);

        } else {
          this.group_type = 3;
          this.getSensorData(this.group_type);
        }
      } else if (value == "实时") {
        //实时
        this.type = "current";
        this.groupFunction = "";
        this.group_type = 5;
        this.getSensorData(this.group_type);
      }
    },
    //时间初始化
    initTime () {
      const time = new Date().getTime();
      const num = (this.day - 1) * 24 * 60 * 60 * 1000;
      const start = new Date(time - num);
      const y = start.getFullYear();
      const M =
        start.getMonth() + 1 > 9
          ? start.getMonth() + 1
          : "0" + (start.getMonth() + 1);
      const d = start.getDate() > 9 ? start.getDate() : "0" + start.getDate();
      return `${y}-${M}-${d} 00:00:00`;
    },
    //时间选择
    chooseTime (value, text) {
      this.dayChoose = text;
      this.day = value;
      //实时
      if (this.type === "current") {
        this.group_type = 5;
        this.getSensorData(this.group_type);
        //平均值
      } else if (this.type === "avg") {
        if (value == 1) {
          this.group_type = 4;
          this.day = 1;
          //const interval = 24;
          this.getSensorData(this.group_type);
        }
        if (value == 7) {
          this.group_type = 3;
          this.day = 7;
          //const interval = 7;
          this.getSensorData(this.group_type);
        }
        if (value == 15) {
          this.group_type = 3;
          //const interval = 15;
          this.day = 15;
          this.getSensorData(this.group_type);
        }
        if (value == 30) {
          this.group_type = 3;
          //const interval = 30;
          this.day = 30;
          this.getSensorData(this.group_type);
        }
        //最大&最小值
      } else if (this.type === "maxAndMin") {
        if (value === 1) {
          this.group_type = 4;
          //const interval = 24;
          this.day = 1;
          this.getSensorData(this.group_type);
        } else {
          this.group_type = 3;
          this.getSensorData(this.group_type);
        }
      }
    },
    //数值转风向
    windChange (s) {
      if (s <= 22.5 || s >= 337.5) {
        return "北风";
      } else if (s <= 67.5) {
        return "东北风";
      } else if (s <= 112.5) {
        return "东风";
      } else if (s <= 157.5) {
        return "东南风";
      } else if (s <= 202.5) {
        return "南风";
      } else if (s <= 247.5) {
        return "西南风";
      } else if (s <= 292.5) {
        return "西风";
      } else if (s <= 337.5) {
        return "西北风";
      }
    },
    //获取传感器预警值
    getWarnValue () {
      const data = {
        hd_device_sensor_ids: this.ids
      };
      get(
        "/hd/hd_device_sensor/listWarnValueByHd_device_sensor_ids",
        data
      ).then(res => {
        if (res.code === 200) {
          this.warnValue = res.data;
        }
      });
    },
    //获取传感器数据，并生成对应的echarts图表数据
    getSensorData (group_type, interval) {
      this.getWarnValue();
      const xArr = [];
      const wind = [];
      let windText = "";
      const that = this;
      const data = {
        sensor_ids: this.ids,
        group_type: group_type
      };
      if (this.dayChoose == "userDefined") {
        data.start_time = this.start_time + " 00:00:00";
        data.end_time = this.end_time + " 23:59:59";
        if (this.groupFunction) {
          data.groupFunction = this.groupFunction;
        }
      } else {
        //data.end_time = this.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss")
        data.start_time = this.initTime();
        if (this.groupFunction) {
          data.groupFunction = this.groupFunction;
        }
      }
      var requestURL = "";
      if (this.mobilePlatform) {
        requestURL = "/nyy/admin/hd/hd_device_sensor/selectSensorData2";
      } else {
        requestURL = "/hd/hd_device_sensor/selectSensorData2";
      }

      get(requestURL, data).then(res => {
        //res.data.start_time = this.initTime();
        if (this.groupFunction === "min,max" && this.type === "maxAndMin") {
          //若是最大最小值，走该逻辑
          if (group_type === 4) {
            for (let i in res.data.time) {
              xArr.push(res.data.time[i].substring(8, 13) + "点");
            }
          } else {
            for (let i in res.data.time) {
              xArr.push(res.data.time[i].substring(5, 10));
            }
          }

          res.data.sensor.map(item => {
            res.data.name = item.hd_device_name;
            res.data.device_id = item.device_id;
            const temparr = new Array(xArr.length).fill([]);
            for (let i = 0; i < item.index.length; i++) {
              temparr[item.index[i]] = [
                item.min_data[i],
                item.max_data[i],
                item.min_data[i],
                item.max_data[i]
              ];
            }

            item.echart = Object.assign({}, this.option, {
              tooltip: {
                backgroundColor: "#0197F2",
                textStyle: {
                  fontSize: 10,
                },
                trigger: "axis",
                axisPointer: {
                  type: "cross"
                },
                formatter: function (params) {
                  let index = params[0].dataIndex;
                  let Htm = `${item.hd_device_sensor_name}</br>${res.data.time[
                    index
                  ].substring(0, 16)}</br>
                  最大值：${temparr[index][1] || "暂无"}
                  ${item.hd_sensor_type_unit}</br>
                  最小值：${temparr[index][0] || "暂无"}${item.hd_sensor_type_unit}
                  `;
                  return Htm;
                }
              },
              xAxis: {
                data: xArr
              },
              yAxis: {
                name: item.hd_sensor_type_unit,
                axisLabel: {
                  color: "#ffffff"
                }
              },
              series: [
                {
                  type: "k",
                  barWidth: 3,
                  itemStyle: {
                    // borderColor:'#fff',
                    borderWidth: 0,
                    opacity: 0.4,
                    color: {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: "grey" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "grey" // 100% 处的颜色
                        }
                      ]
                    }
                  },
                  emphasis: {
                    itemStyle: {
                      opacity: 1,
                      borderWidth: 0,
                      color: {
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                          {
                            offset: 0,
                            color: "rgb(90,161,244)" // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: "rgb(114,198,126)" // 100% 处的颜色
                          }
                        ]
                      }
                    }
                  },
                  data: temparr
                },
                {
                  type: "scatter",
                  color: "rgb(114,198,126)",
                  itemStyle: {
                    opacity: 1
                  },
                  symbolSize: 10,
                  z: 10,
                  data: (function () {
                    const arr = [];
                    for (let i in item.index) {
                      arr.push([xArr[item.index[i]], item.min_data[i]]);
                    }
                    return arr;
                  })()
                },
                {
                  type: "scatter",
                  color: "rgb(90,161,244)",
                  itemStyle: {
                    opacity: 1
                  },
                  label: {
                    normal: {
                      show: false
                    }
                  },
                  symbolSize: 10,
                  z: 20,
                  data: (function () {
                    const arr = [];
                    for (let i in item.index) {
                      arr.push([xArr[item.index[i]], item.max_data[i]]);
                    }
                    return arr;
                  })()
                }
              ]
            });
          });
        } else {
          //把预警值添加到传感器数值对象里
          res.data.sensor.map(item => {
            for (let key in this.warnValue) {
              if (key == item.hd_device_sensor_id) {
                item.warn_upper = this.warnValue[key].warn_upper
                item.warn_lower = this.warnValue[key].warn_lower
              }
            }
          });
          //实时或者平均值，用该逻辑
          if (group_type === 5) {
            if (this.day === 1) {
              for (let i in res.data.time) {
                xArr.push(res.data.time[i].substring(11, 19));
              }
            } else {
              for (let i in res.data.time) {
                xArr.push(res.data.time[i].substring(8, 16));
              }
            }
            for (let i in res.data.sensor) {
              if (res.data.sensor[i].hd_sensor_type_code === "22") {
                res.data.sensor[i].data.map(item => {
                  wind.push(this.windChange(item));
                });
                res.data.sensor[i].data = wind;
                windText = "";
              }
            }
          } else if (group_type === 4) {
            for (let i in res.data.time) {
              xArr.push(res.data.time[i].substring(8, 13) + "点");
            }
            for (let i in res.data.sensor) {
              if (res.data.sensor[i].hd_sensor_type_code === "22") {
                res.data.sensor[i].avg_data.map(item => {
                  wind.push(this.windChange(item));
                });
                res.data.sensor[i].avg_data = wind;
                windText = "";
              }
              res.data.sensor[i].data = res.data.sensor[i].avg_data;
            }
          } else {
            for (let i in res.data.time) {
              xArr.push(res.data.time[i].substring(5, 10));
            }
            for (let i in res.data.sensor) {
              if (res.data.sensor[i].hd_sensor_type_code === "22") {
                res.data.sensor[i].avg_data.map(item => {
                  wind.push(this.windChange(item));
                });
                res.data.sensor[i].avg_data = wind;
                windText = "";
              }
              res.data.sensor[i].data = res.data.sensor[i].avg_data;
            }
          }
          res.data.sensor.map(item => {
            //获取最大最小值
            let maxAndMinArr = [];
            item.data.map(v => {
              if (v !== null) {
                maxAndMinArr.push(v);
              }
            });
            maxAndMinArr.sort((a, b) => {
              return a - b;
            });
            item.min = maxAndMinArr[0];
            item.max = maxAndMinArr[maxAndMinArr.length - 1];

            res.data.name = item.hd_device_name;
            res.data.device_id = item.device_id;

            item.echart = Object.assign({}, this.option, {
              tooltip: {
                backgroundColor: "#0197F2",
                textStyle: {
                  fontSize: 10,
                },
                trigger: "axis",
                axisPointer: {
                  type: "cross"
                },
                formatter: function (params) {
                  let index = params[0].dataIndex;
                  // let Htm = `${xArr[index]}&nbsp;${yArr[index]}${item.unit}`;
                  let Htm = "";
                  if (
                    that.$store.state.user.user.orgCode == "jk" ||
                    that.$store.state.user.user.orgCode == "jk-000"
                  ) {
                    Htm = `${item.hd_device_sensor_name}</br>${res.data.time[index].substring(0, 16)}&nbsp;&nbsp;
                      ${params[0].value[1] || "暂无"}${item.hd_sensor_type_unit}`;
                  } else {
                    if (params[0].value[1] == null) {
                      Htm = ""
                    } else {
                      Htm = `${item.hd_device_sensor_name}</br>${res.data.time[index].substring(0, 16)}&nbsp;&nbsp;
                        ${params[0].value[1]}${item.hd_sensor_type_unit}`;
                    }
                  }

                  return Htm;
                }
              },
              series: [
                {
                  data: (function () {
                    const arr = [];
                    for (let i in item.index) {
                      arr.push([xArr[item.index[i]], item.data[i]]);
                    }
                    return arr;
                  })(),
                  type: "line",
                  smooth: true,
                  connectNulls: (function () {
                    if (
                      that.$store.state.user.user.orgCode == "jk" ||
                      that.$store.state.user.user.orgCode == "jk-000"
                    ) {
                      //运维人员及超级管理员权限，能查看异常点
                      return false;
                    } else {
                      //一般账号权限，不能查看异常点
                      return true;
                    }
                  })(),
                  areaStyle: {
                    normal: {
                      type: "default",
                      color: "#0196f28a"
                    }
                  }
                }
              ],
              xAxis: [
                {
                  offset: 20,
                  axisTick: (function () {
                    return { show: false, interval: 0 };
                  })(),
                  axisLine: {
                    show: false,
                    lineStyle: {
                      color: "#ffffff"
                    }
                  },
                  data: xArr
                },
                (function () {
                  if (group_type !== 5) {
                    return null;
                  } else if (
                    group_type == 5 &&
                    item.hd_sensor_type_code == 21
                  ) {
                    return {
                      name: windText,
                      type: "category",
                      position: "bottom",
                      offset: 0,
                      axisTick: {
                        show: false,
                        alignWithLabel: true
                      },
                      axisLine: {
                        show: false,
                        lineStyle: {
                          color: "#0196f2"
                        }
                      },
                      axisLabel: {
                        show: true,
                        textStyle: {
                          color: "#336666",
                          fontSize: 15,
                          backgroundColor: "#CCFFFF",
                          borderRadius: 5,
                          padding: [2, 4]
                        }
                      },
                      nameTextStyle: {
                        color: "#585858",
                        padding: [0, 0, -30]
                      },
                      nameLocation: "start",
                      data: wind
                    }
                  }
                })()
              ],
              yAxis: {
                name: item.hd_sensor_type_unit,
                axisLabel: {
                  color: "#ffffff"
                }
              },
              visualMap: (function () {
                if (item.warn_upper == null || item.warn_lower == null) {
                  return null;
                } else {
                  return {
                    top: 10,
                    right: 10,
                    show: false,
                    pieces: [
                      {
                        gt: 0,
                        lte: item.warn_upper,
                        color: "#ffde33"
                      },
                      {
                        gt: item.warn_upper,
                        lte: item.warn_lower,
                        color: "#0196f2"
                      },
                      {
                        gt: item.warn_lower,
                        color: "#ffde33"
                      }
                    ],
                    outOfRange: {
                      color: "#0196f2"
                    }
                  };
                }
              })()
            });
          });
        }
        this.echartOption = res.data;
      });
    }
  },
  watch: {
    //监听传感器id值的变化
    ids () {
      this.type = "current";
      this.group_type = 5;
      this.getSensorData(this.group_type);
    },
    //监听当前传感器id值的变化
    currentID () {
      for (let i in this.echartOption.sensor) {
        if (
          this.currentID === this.echartOption.sensor[i].hd_device_sensor_id
        ) {
          this.echartOption.currentID = this.currentID;
          break;
        }
      }
    },
    timeStartShow (val) {
      if (val) {
        this.$emit("startTime", true);
      } else {
        setTimeout(() => {
          this.$emit("startTime", false);
        }, 200);
      }
    },
    timeEndShow (val) {
      if (val) {
        this.$emit("startTime", true);
      } else {
        setTimeout(() => {
          this.$emit("startTime", false);
        }, 200);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.expEcharts::-webkit-scrollbar
  width 0

span
  cursor pointer

.tab
  width calc(100% - 20px)
  height 30px
  white-space nowrap
  overflow-x auto

.tabCard
  padding 2px 5px
  display inline-block
  text-align center
  padding 5px
  font-size 12px
  color #ccc

.echartName
  font-size 12px
  margin-bottom 10px
  color #18BCA2
  display inline-block
  width 50%

.right
  >>>.van-dropdown-menu__item
    justify-content flex-end

.left
  >>>.van-dropdown-menu__item
    justify-content flex-start

// element-ui
.el-dropdown-link
  cursor pointer
  color #409EFF

.el-icon-arrow-down
  font-size 12px

.typeChose
  display flex
  padding 10px 30px
  font-size 12px
  color #ffffff

.typeText
  flex 1
  text-align center

  span
    padding 5px 0

.active
  border-bottom 2px solid #0196f2
  color #0196f2

.timeActive
  background #0196f2

.timeTypeChose
  border-radius 5px
  overflow hidden
  background #0196f226
  color #fff
  font-size 12px
  margin 0 auto

  span
    padding 7px 0
    text-align center
    width 60px
    display inline-block

.timeStart, .timeEnd
  display inline-block
  width 49%

  img
    vertical-align middle

>>>.van-overlay
  top 66px

.right_top_model 
  width 100%
  color #000000

.btn_model
  height 170px

.video_model1
  height 300px

.info_model
  height 300px

.cgq_model
  height calc(100% - 300px)
  padding 10px 2px 10px 10px

.app_box_right
  width calc(100% - 300px)
  height 100%
  display flex
  align-content flex-start
  flex-wrap wrap

.model_name
  padding-bottom 3px
  font-size 14px
  color #aeb3c6
  padding 5px 10px
  position relative

.mini_box
  display flex
  width 100%
  min-height 68px
  flex-wrap wrap

.right_top_data
  background #FFFFFF00
  border-radius 5px
  flex 1

.right_top_data_img
  width 30px
  height 30px
  align-self center
</style>
