<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="init()">
      <el-tab-pane label="折线图" name="first">
        <!--查询日期 -->
        <div style="text-align: right;margin: 15px;">
          <el-date-picker
            v-model="selectTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
            unlink-panels
            clearable
            @change="
              page = 1;
              yingShiSxtTrafficList();
            "
          >
          </el-date-picker>
        </div>
        <sxtTrafficChat
          style="height:500px;"
          :bs_base_id="bs_base_id"
          :rs_facilities_id="rs_facilities_id"
          :hd_device_id="hd_device_id"
          :device_id="device_id"
          :startTime="startTime"
          :endTime="endTime"
        />
        <!-- <v-chart style="width:100%;" :options="option" :autoresize="true" /> -->
      </el-tab-pane>
      <el-tab-pane label="表格" name="second">
        <!--查询日期 -->
        <div style="text-align: right;margin: 15px;">
          <el-date-picker
            v-model="selectTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
            unlink-panels
            clearable
            @change="
              page = 1;
              yingShiSxtTrafficList();
            "
          >
          </el-date-picker>
        </div>
        <!-- 摄像头流量 -->
        <el-table :data="data" style="width: 100%">
          <el-table-column width="150" prop="flowDate" label="日期">
            <template slot-scope="scope">
              {{ getDateStr(scope.row.flowDate) }}
            </template>
          </el-table-column>
          <!-- 多设备时展示 -->
          <el-table-column
            v-if="bs_base_id || rs_facilities_id"
            prop="device_name"
            label="设备名称"
          />
          <el-table-column
            v-if="bs_base_id || rs_facilities_id"
            width="120"
            prop="device_id"
            label="设备编号"
          />
          <el-table-column
            v-if="bs_base_id || rs_facilities_id"
            width="120"
            prop="deviceSerial"
            label="摄像头序列号"
          />
          <!-- 多设备时展示 -->
          <el-table-column width="80" prop="channel" label="通道号" />
          <el-table-column prop="hlsFlow" label="轻应用HLS地址预览消耗">
            <template slot-scope="scope">
              {{ conver(scope.row.hlsFlow) }}
            </template>
          </el-table-column>
          <el-table-column prop="appFlow" label="APP应用预览消耗">
            <template slot-scope="scope">
              {{ conver(scope.row.appFlow) }}
            </template>
          </el-table-column>
          <el-table-column prop="rtmpFlow" label="轻应用RTMP地址预览消耗">
            <template slot-scope="scope">
              {{ conver(scope.row.rtmpFlow) }}
            </template>
          </el-table-column>
          <el-table-column prop="flowCount" label="流量消耗汇总">
            <template slot-scope="scope">
              {{ conver(scope.row.flowCount) }}
            </template>
          </el-table-column>
        </el-table>
        <!--分页组件-->
        <el-pagination
          :total="total"
          :current-page="page"
          :page-size="size"
          style="margin-top: 8px;"
          layout="total, prev, pager, next"
          @current-change="pageChange"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { yingShiSxtTrafficList } from "@/api/sxt";
import { formatDate } from "@/utils/date";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/polar";
import "echarts/lib/component/legend";
import "echarts/lib/component/title.js";
import sxtTrafficChat from "./sxtTrafficChat";

export default {
  components: {
    sxtTrafficChat
  },
  props: {
    bs_base_id: {
      default: null,
      type: String
    },
    rs_facilities_id: {
      default: null,
      type: String
    },
    hd_device_id: {
      default: null,
      type: String
    },
    device_id: {
      default: null,
      type: String
    }
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      activeName: "first",
      data: null,
      selectTime: null,
      startTime: null,
      endTime: null,
      page: 1,
      size: 10,
      total: 0,
      echartsPage: 0,
      echartsSize: 10000,
      option: {}
    };
  },
  created() {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
    this.selectTime = [start, end];
  },
  methods: {
    formatDate,
    getDateStr(datetime) {
      return formatDate(new Date(datetime), "yyyy年MM月dd日");
    },
    conver(limit) {
      var size = "";
      if (limit < 0.1 * 1024) {
        //如果小于0.1KB转化成B
        size = limit.toFixed(2) + "B";
      } else if (limit < 0.1 * 1024 * 1024) {
        //如果小于0.1MB转化成KB
        size = (limit / 1024).toFixed(2) + "KB";
      } else if (limit < 0.1 * 1024 * 1024 * 1024) {
        //如果小于0.1GB转化成MB
        size = (limit / (1024 * 1024)).toFixed(2) + "MB";
      } else {
        //其他转化成GB
        size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
      }

      var sizestr = size + "";
      var len = sizestr.indexOf("\.");
      var dec = sizestr.substr(len + 1, 2);
      if (dec == "00") {
        //当小数点后为00时 去掉小数部分
        return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
      }
      return sizestr;
    },
    init() {
      this.page = 1;
      this.yingShiSxtTrafficList();
    },
    pageChange(val) {
      this.page = val;
      this.yingShiSxtTrafficList();
    },
    yingShiSxtTrafficList() {
      if (this.selectTime) {
        this.startTime = this.selectTime[0];
        this.endTime = this.selectTime[1];
      } else {
        this.startTime = null;
        this.endTime = null;
      }
      yingShiSxtTrafficList({
        bs_base_id: this.bs_base_id,
        rs_facilities_id: this.rs_facilities_id,
        hd_device_id: this.hd_device_id,
        device_id: this.device_id,
        startTime: this.startTime,
        endTime: this.endTime,
        page: this.activeName === "first" ? this.echartsPage : this.page - 1, //echarts || table
        size: this.activeName === "first" ? this.echartsSize : this.size, //echarts || table
        echarts: this.activeName === "first" ? true : false
      }).then(res => {
        if (res.code === 200) {
          if (this.activeName === "first") {
            // if (res.data.sxt.length === 0) {
            //   this.option = {};
            //   return;
            // }
            // //echarts
            // const seriesArr = [];
            // const nameArr = [];
            // for (let i = 0; i < res.data.sxt.length; i++) {
            //   const sxt = res.data.sxt[i];
            //   nameArr.push(sxt.device_name);
            //   let d = [];
            //   for (let j = 0; j < sxt.values.length; j++) {
            //     d.push([sxt.indexs[j], sxt.values[j]]);
            //   }
            //   seriesArr.push({
            //     name: sxt.device_name,
            //     type: "line",
            //     stack: "流量",
            //     smooth: true,
            //     areaStyle: {},
            //     emphasis: {
            //       focus: "series"
            //     },
            //     data: d
            //   });
            // }
            // this.option = Object.assign(
            //   {},
            //   {
            //     tooltip: {
            //       trigger: "axis",
            //       axisPointer: {
            //         type: "cross",
            //         label: {
            //           backgroundColor: "#6a7985"
            //         }
            //       },
            //       formatter: (params, ticket, callback) => {
            //         let Htm = `${params[0].axisValue}<br/>`;
            //         for (let k = 0; k < params.length; k++) {
            //           let s = this.conver(params[k].data[1]);
            //           Htm += `${params[k].marker}<span>${
            //             params[k].seriesName
            //           }：${s}</span><br/>`;
            //         }
            //         return Htm;
            //       }
            //     },
            //     legend: {
            //       data: nameArr
            //     },
            //     toolbox: {
            //       feature: {
            //         saveAsImage: {}
            //       }
            //     },
            //     grid: {
            //       left: "3%",
            //       right: "4%",
            //       bottom: "3%",
            //       containLabel: true
            //     },
            //     yAxis: {
            //       type: "value"
            //     },
            //     xAxis: {
            //       type: "category",
            //       boundaryGap: false,
            //       data: res.data.time
            //     },
            //     series: seriesArr
            //   }
            // );
          } else {
            //table
            this.data = res.data.content;
            this.total = res.data.totalElements;
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  }
};
</script>
