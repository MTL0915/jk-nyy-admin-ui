<template>
  <el-dialog
    v-if="dialog"
    :visible.sync="dialog"
    append-to-body
    title="导出设备传感器数据"
    width="650px"
  >
    <div>
      <div style="text-align: center;">
        <el-select v-model="day" placeholder="请选择日期">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div v-show="day === 0" style="margin-top:15px;text-align: center;">
        选择日期：
        <el-date-picker
          size="mini"
          v-model="startTimeValue"
          value-format="yyyy-MM-dd HH:mm:ss"
          clearable
          type="datetime"
          @change="timeChange"
        />
        -
        <el-date-picker
          size="mini"
          v-model="endTimeValue"
          value-format="yyyy-MM-dd HH:mm:ss"
          clearable
          type="datetime"
          @change="timeChange"
        />
        <!-- <el-date-picker
          size="mini"
          v-model="timeValue"
          value-format="yyyy-MM-dd HH:mm:ss"
          clearable
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="timeChange"
        /> -->
      </div>
      <div style="text-align: right;margin-top:30px;">
        <el-button :loading="isBatch" size="mini" type="primary" @click="dcsj"
          >数据导出
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { getWsenDataByHd_device_id, deviceList } from "@/api/equip";
export default {
  props: {
    activeName: {
      type: String,
      default: ""
    },
    hd_device_id: {
      type: String,
      default: ""
    },
    hd_device_name: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      downloadLoading: false,
      timeValue: null,
      startTimeValue: null,
      endTimeValue: null,
      start_time: null,
      end_time: null,
      header: [],
      dialog: false,
      data: [],
      downloadNum: 0, //成功下载数
      multipleSelection: [],
      isBatch: false,
      day: 1,
      options: [
        {
          name: "今天",
          value: 1
        },
        {
          name: "最近7天",
          value: 7
        },
        {
          name: "最近15天",
          value: 15
        },
        {
          name: "最近30天",
          value: 30
        },
        {
          name: "最近一年",
          value: 365
        },
        {
          name: "自定义",
          value: 0
        }
      ]
    };
  },
  watch: {},
  methods: {
    dcsj() {
      var eTimestamp = 0;
      var sTimestamp = 0;
      if (this.day === 0) {
        if (this.endTimeValue) {
          eTimestamp = new Date(this.endTimeValue.replace(/-/g, "/")).getTime();
        }
        if (this.startTimeValue) {
          sTimestamp = new Date(
            this.startTimeValue.replace(/-/g, "/")
          ).getTime();
        }
      } else {
        eTimestamp = new Date().getTime();
        sTimestamp = eTimestamp - this.day * 86400000;
      }

      if (eTimestamp === 0 || sTimestamp === 0) {
        this.$message.error("请填写日期");
        return;
      }
      if (eTimestamp < sTimestamp) {
        this.$message.error("结束时间必须大于等于开始时间");
        return;
      }
      if (eTimestamp - sTimestamp > 366 * 86400000) {
        this.$message.error("日期跨度不能超过一年");
        return;
      }

      this.start_time = this.formatDate(
        new Date(sTimestamp),
        "yyyy-MM-dd hh:mm:ss"
      );
      this.end_time = this.formatDate(
        new Date(eTimestamp),
        "yyyy-MM-dd hh:mm:ss"
      );
      this.batchDownload();
    },
    // 批量导出
    batchDownload() {
      this.isBatch = true;
      var devices = this.$parent.$parent.multipleSelection;
      if (devices.length === 0) {
        this.$message.warning("请选择设备");
        return;
      }
      for (var i = 0; i < devices.length; i++) {
        this.downloadEX(devices[i], devices.length);
      }
    },
    downloadEX(device, num) {
      this.downloadLoading = true;
      getWsenDataByHd_device_id({
        hd_device_id: device.id,
        startPosition: 0,
        maxResult: 99999,
        start_time: this.start_time,
        end_time: this.end_time
      }).then(res => {
        if (res.code === 200) {
          this.total = res.data.count;
          import("@/vendor/Export2Excel").then(excel => {
            const tHeader = [];
            const filterVal = [];
            res.data.head.forEach(element => {
              tHeader.push(element.label);
              filterVal.push(element.prop);
            });
            const data = this.formatJson(filterVal, res.data.data);
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: device.name + "(" + device.device_id + ")"
            });
            if (this.isBatch) {
              this.downloadNum = this.downloadNum + 1;
              if (this.downloadNum === num) {
                this.downloadNum = 0;
                this.downloadLoading = false;
                this.isBatch = false;
              }
            } else {
              this.downloadLoading = false;
            }
          });
        }
      });
    },
    // 数据转换
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          return v[j];
        })
      );
    },
    timeChange() {
      this.start_time = null;
      this.end_time = null;
      if (this.timeValue) {
        this.start_time = this.timeValue[0];
      }
      if (this.timeValue) {
        this.end_time = this.timeValue[1];
      }
    },
    showDialog() {
      this.dialog = true;
    },
    formatDate(date, fmt) {
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
    padLeftZero(str) {
      return ("00" + str).substr(str.length);
    }
  }
};
</script>
