<template>
  <div style="height:100%;padding:10px 0">
    <div style="height:30px;line-height:30px;padding:0 5px">
      <div style="display:inline-block">
        <span v-for="(item, index) in tab" :key="index" class="tabCard" :class="day == item.value ? 'timeActive' : ''" @click="chooseTime(item)">{{item.name}}</span>
      </div>
      <div style="display:inline-block;height:30px;vertical-align: middle;">
        <i style="font-size:30px" class="el-icon-date"  @click="userDefined"></i>
      </div>
      <!-- <div style="display:inline-block;height:30px;">
        <span style="margin-right:5px">自动刷新</span>
        <el-switch
          :value="switchValue"
          @change="switchChange"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </div> -->
      <div style="float:right;display:inline-block">
        <div style="display:inline-block">
          <div style="height:35px">
            <el-select v-model="chooseValue" filterable placeholder="请选择" size="mini" @change="areaChange">
              <el-option
                v-for="item in areaOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
        <i class="el-icon-s-tools" style="padding:10px" @click="settingSensorTab"></i>
        <!-- <el-button type="primary" size="mini" @click="settingSensorTab">设置传感器</el-button> -->
        <!-- <i class="el-icon-refresh-right" style="font-size:20px;margin-left:5px;vertical-align:top;color:#aeb3c6;border:1px solid #ccc;height:28px;width:30px;text-align:center;line-height:28px;border-radius:3px"></i> -->
      </div>
    </div>
    <div style="height:30px;line-height:30px;margin-top:10px;padding:0 5px">
      <el-select v-model="valueType" placeholder="请选择" size="mini">
        <el-option
          v-for="item in valueOption"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <div class="userTime" v-show="!dialogVisible && userValue.length > 0">
        <span>{{ userValue[0] }} ~ {{ userValue[1] }}</span>
      </div>
      <div style="float:right;display:inline-block">
        <el-input
          clearable
          size="mini"
          placeholder="输入传感器名称搜索"
          v-model="searchValue">
          <el-button slot="append" size="mini" icon="el-icon-search" @click="searchData"></el-button>
        </el-input>
      </div>
    </div>
    <div style="height:calc(100% - 115px);line-height: initial;">
      <div class="chartBox" v-for="(item, index) in deviceList" :key="index" v-show="deviceList.length > 0">
        <div class="chart" >
          <monitChart
            :rs_facilities_name="item.rs_facilities_name"
            :name="item.name"
            :valueType="valueType"
            :start_time="start_time"
            :end_time="end_time"
            :id="item.id"
          />
        </div>
      </div>
      <div v-show="deviceList.length === 0" style="color:#aeb3c6;text-align:center;padding-top:30px">
        暂无数据
      </div>
    </div>
    <div style="height:35px;line-height:35px;margin-top:10px">
      <el-pagination
        background
        layout="total,prev, pager, next"
        :current-page="page + 1"
        page-size="9"
        @current-change="change"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog title="自定义" :visible.sync="dialogVisible" width="50%">
      <div style="text-align:center">
        <el-date-picker
          v-model="userValue"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-button type="primary" size="mini" @click="comfirm">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="自动刷新设置" :visible.sync="dialogSwitch" width="50%">
      <div style="line-height:initial">
        <p>选择刷新时间间隔：</p>
        <div style="margin-top:10px">
          <span
            class="timeTab"
            v-for="(time, index) in timeOption"
            :key="index"
            :class="refreshTime == time.value?'timeActive1': ''"
            @click="chooseTime1(time)"
          >
            {{ time.name }}
          </span>
        </div>
        <!-- <div style="margin-top:10px" v-show="timeUserDefault">
          <el-input placeholder="请输入内容" v-model="timeValue">
            <template slot="append">
              <el-select v-model="selectTime" >
                <el-option
                  v-for="(item, index) in timeType"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </template>
          </el-input>
        </div> -->
        <div style="margin-top:10px;text-align:center">
          <el-button type="primary" size="mini">确定</el-button>
        </div>
      </div>
    </el-dialog>
    <settingSensor ref="settingSensor" />
  </div>
</template>
<script>
import { getNewsSensorList } from "@/api/device";
import { formatDate } from "@/utils/date";
import monitChart from "./dataMonitChart";
import settingSensor from "./settingSensor";
import { findByBs_base_id } from '@/api/rs_facilities'
export default {
  components: {
    monitChart,
    settingSensor
  },
  data() {
    return {
      tab: [
        { name: "近7天", value: 7},
        { name: "近15天", value: 15},
        { name: "近30天", value: 30}
      ],
      valueOption: [
        {label: "实时", value: "current"},
        {label: "平均值", value: "avg"},
        {label: "最大&最小", value: "max,min"}
      ],
      timeOption: [
        {name: "5秒", value: 5000},
        {name: "10秒", value: 10000},
        {name: "30秒", value: 30000},
        {name: "1分钟", value: 60000},
        {name: "2分钟", value: 120000},
        {name: "5分钟", value: 300000},
        {name: "自定义", value: 0}
      ],
      timeType: [
        {label: "秒", value: "1"},
        {label: "分", value: "2"}
      ],
      valueType: "current",
      day: 7,
      total: 0,
      page: 0,
      size: 9,
      dialogVisible: false,
      start_time: "",
      end_time: "",
      userValue: "",
      deviceList: [],
      searchValue: "",
      switchValue: false,
      dialogSwitch: false,
      timeUserDefault: false,
      refreshTime: null,
      selectTime: "1",
      timeValue: null,
      areaOptions: [],
      chooseValue: "all",
      rs_facilities_id: ""
    }
  },
  mounted() {
    this.computeTime();
    this.getNewsSensorList();
    this.getFindByBs_base_id()
  },
  methods: {
    settingSensorTab() {
      this.$refs.settingSensor.dialogVisible = true;
      this.$nextTick(() => {
        if (this.chooseValue === "all") {
         this.$refs.settingSensor.chooseShow = true;
        } else {
          this.$refs.settingSensor.chooseShow = false
        }
        this.$refs.settingSensor.chooseValue = this.chooseValue
      })
    },
    areaChange(value) {
      this.page = 0;
      if (value === 'all') {
        this.rs_facilities_id = ""
      } else {
        this.rs_facilities_id = value
      }
      this.getNewsSensorList()
    },
    chooseTime1(time) {
      this.refreshTime = time.value;
      if (time.value == 0) {
        this.timeUserDefault = true;
      } else {
        this.timeUserDefault = false;
      }
    },
    //自动刷新按钮
    switchChange(value) {
      if (value) {
        this.dialogSwitch = true;
      } else {
        this.switchValue = false;
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
    //搜索
    searchData() {
      this.page = 0;
      this.getNewsSensorList()
    },
    comfirm() {
      if (new Date(this.userValue[1]).getTime() - new Date(this.userValue[0]).getTime() > 31 * 24 * 3600 * 1000) {
        this.$message({
          message: '时间间隔不得超过1个月',
          type: 'warning'
        })
        return
      }
      this.dialogVisible = false;
      this.start_time = this.userValue[0] + " 00:00:00";
      this.end_time = this.userValue[1] + " 23:59:59"
    },
    computeTime() {
      const time = new Date().getTime() - (this.day - 1) * 24 * 60 * 60 * 1000
      this.start_time = formatDate(new Date(time), "yyyy-MM-dd") + " 00:00:00"
      this.end_time = formatDate(new Date(), "yyyy-MM-dd hh:mm:ss")
    },
    //自定义时间
    userDefined() {
      this.dialogVisible = true;
    },
    //选择时间
    chooseTime(item) {
      this.userValue = [];
      this.day = item.value;
      this.computeTime();
    },
    //分页
    change(e) {
      this.page = e -1;
      this.getNewsSensorList();
    },
    //获取传感器列表
    getNewsSensorList() {
      const data = {
        bs_base_id: this.$store.state.baseinfo.cur_base_id,
        isFilter: true,
        page: this.page,
        keyword: this.searchValue,
        size: this.size,
        type: "collect"
      }
      if (this.rs_facilities_id !== "") {
        data.rs_facilities_id = this.rs_facilities_id
      }
      getNewsSensorList(data).then(res => {
        // if (res.data.totalElements == 0) {
        //   this.$message({
        //     message: "没有搜索到相应内容",
        //     type: "warning"
        //   })
        //   return;
        // }
        this.total = res.data.totalElements;
        this.deviceList = res.data.content;
      });
    }
  },
  watch: {
    searchValue(val) {
      if (val == "") {
        this.page = 0;
        this.getNewsSensorList()
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.tabCard
  background #E8ECFA
  display inline-block
  height 30px
  line-height 20px
  font-size 12px
  padding 5px
  margin-right 3px
  cursor pointer
.timeActive
  background #5D7BE0
>>>.el-input--mini .el-input__inner
  width 120px
.userTime
  height 28px
  display inline-block
  border 1px solid #ccc
  border-radius 5px
  padding 0 5px
  font-size 12px
.chartBox
  display inline-block
  height 33.33333%
  width 33.33333%
  box-sizing border-box
  padding 5px
.chart
  border 1px solid #cccccc
  border-radius 5px
  min-height 150px
  width 100%
  height 100%
  padding 5px
.timeTab
  display inline-block
  padding 6px 15px
  background #C0C4CC
  border-radius 5px
  color #ffffff
  font-size 14px
  margin 0 10px
  cursor pointer
.timeActive1
  background #67C23A
</style>