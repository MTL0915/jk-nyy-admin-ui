<template>
  <div style="height:100%;padding-bottom:10px">
    <div class="box">
      <div style="height:35px">
        <el-select v-model="chooseValue" filterable placeholder="请选择" size="small" @change="change">
          <el-option
            v-for="item in areaOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div style="flex:2;margin-top:15px;width:100%">
        <div class="card">
          <div class="box-card">
            <div style="height:20px;font-size:14px;line-height:20px;color:#aeb3c6">设备运行总时长排行</div>
            <div style="height:calc(100% - 20px)">
              <totalChart style="height:100%" :chooseDeviceList="chooseDeviceList" v-if="chooseDeviceList.length > 0" />
            </div>
          </div>
          <div class="box-card">
            <div style="height:20px;font-size:14px;line-height:20px;color:#aeb3c6">昨日运行时长统计</div>
            <div style="height:calc(100% - 20px)">
              <historyChart style="height:100%" :chooseDeviceList="chooseDeviceList" v-if="chooseDeviceList.length > 0" />
            </div>
          </div>
          <div class="box-card">
            <div style="height:20px;font-size:14px;line-height:20px;color:#aeb3c6">
              <span>设备运行趋势</span>
              <div style="display:inline-block;float:right">
                <el-select v-model="day" placeholder="请选择" size="mini">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <i class="el-icon-full-screen" style="height:20px;width:20px;margin-left:10px" @click="screen"></i>
                <i class="el-icon-setting" style="height:20px;width:20px;margin-left:10px" @click="choose"></i>
              </div>
            </div>
            <div style="height:calc(100% - 20px)">
              <everyChart style="height:100%" :chooseDeviceList="chooseDeviceList1" :day="day" v-if="chooseDeviceList1.length > 0" />
            </div>
          </div>
        </div>
      </div>
      <div style="margin-top:15px;flex:3;border:1px solid #ccc;border-radius:5px;padding:10px;width:100%">
        <div style="height:20px;font-size:14px;line-height:20px;color:#aeb3c6;text-align:center">
          <div style="height:20px;font-size:14px;line-height:20px;color:#aeb3c6">
            <span>今日设备运行时长明细</span>
            <div style="display:inline-block;float:right">
              <i class="el-icon-setting" style="height:20px;width:20px;margin-left:10px" @click="choose"></i>
            </div>
          </div>
        </div>
        <div style="height:calc(100% - 20px);position:relative">
          <ganttChart :chooseDeviceList="chooseDeviceList1" v-if="chooseDeviceList1.length > 0 && ganttShow" />
           <div v-if="!ganttShow" style="font-size:12px;color:#aeb3c6;left:50%;transform:translateX(-50%);position:absolute;top:30px">
            暂无数据
          </div>
        </div>
      </div>
    </div>

    <deviceList @chartChoose="chartChoose" ref="dialog" />
    <screenChart :chooseDeviceList="chooseDeviceList1" :day="day" ref="screen" />
  </div>
</template>
<script>
import ganttChart from "./ganttChart";
import deviceList from "./chooseDevice";
import totalChart from "./totalChart";
import historyChart from './historyChart';
import everyChart from './everyChart';
import screenChart from './screenChart';
import { getSwitchSensorsByBs_base_id, getSwitchSensorsByRs_facilities_id } from "@/api/hd_device_sensor";
import { findByBs_base_id } from '@/api/rs_facilities'
import { formatDate } from "@/utils/date";
export default {
  props: {
  },
  components: {
    ganttChart,
    totalChart,
    historyChart,
    everyChart,
    screenChart,
    deviceList
  },
  data() {
    return {
      chooseDeviceList: [],
      chooseDeviceList1: [],
      ganttShow: true,
      time: new Date(),
      day: 7,
      options: [
        {value: 7, label: "近7天"},
        {value: 15, label: "近15天"},
        {value: 30, label: "近30天"}
      ],
      areaOptions: [],
      chooseValue: 'all'
    }
  },
  mounted() {
    this.getDevice();
    this.getFindByBs_base_id();
  },
  methods: {
    screen() {
      this.$refs.screen.dialogVisible = true;
      this.$refs.screen.day1 = this.day;
    },
    chartChoose(item) {
      if (item.length == 0) {
        if (this.chooseValue === "all") {
          this.getDevice();
        } else {
          this.getDeviceByAreaID(this.chooseValue)
        }
        
      } else {
        this.chooseDeviceList1 = item
      }
    },
    choose() {
      this.$refs.dialog.dialogShow = true;
      if (this.chooseValue === "all") {
        this.$refs.dialog.getDevice();
      } else {
        this.$refs.dialog.getDeviceByAreaID(this.chooseValue)
      }
    },
    change(value) {
      if (value === 'all') {
        this.getDevice()
      } else {
        this.getDeviceByAreaID(value)
      }
    },
    // 根据基地获取地块
    getFindByBs_base_id() {
      this.areaOptions = [{id: 'all', name: "全部"}]
      const data = {
        bs_base_id: this.$store.state.baseinfo.cur_base_id
      }
      findByBs_base_id(data).then(res => {
        if (res.code === 200) {
          this.areaOptions = this.areaOptions.concat(res.data)
        }
      })
    },
    // 获取地块下开关类传感器
    getDeviceByAreaID(id) {
      const data = {
        rs_facilities_id: id
      }
      getSwitchSensorsByRs_facilities_id(data).then(res => {
        if (res.code === 200) {
          const ids = []
          for (let i = 0; i < res.data.length; i++) {
            ids.push(res.data[i].id);
          }
          this.chooseDeviceList = ids
          this.chooseDeviceList1 = ids
        }
      })
    },
    //根据基地获取开关类传感器设备
    getDevice() {
      const data = {
        bs_base_id: this.$store.state.baseinfo.cur_base_id
      }
      getSwitchSensorsByBs_base_id(data).then(res => {
        if (res.code === 200) {
          const ids = []
          for (let i = 0; i < res.data.length; i++) {
            ids.push(res.data[i].id);
          }
          this.chooseDeviceList = ids
          this.chooseDeviceList1 = ids
        }
      })
    },
  }
}
</script>
<style lang="stylus" scoped>
.box
  width 100%
  height 100%
  display flex
  flex-direction column
.card
  margin 0
  height 100%
  display flex
  width 100%
.box-card
  height 100%
  border 1px solid #ccc
  border-radius 5px
  padding 10px
  flex 1
  margin-right 15px
  box-sizing border-box
  >>>.el-input--mini .el-input__inner
    height 20px
    line-height 20px
    width 100px
  >>>.el-input__icon
    line-height 20px
.box-card:last-child
  margin-right 0
</style>