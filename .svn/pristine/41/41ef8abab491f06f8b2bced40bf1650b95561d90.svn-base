<template>
  <div>
    <div style="display: flex;
    justify-content: space-between;
    padding: 10px;">
      <div>
        <el-date-picker
          unlink-panels
          v-model="timeValue"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="comfirm"
        />
      </div>
      <!-- <div>
        <el-select
          v-model="chooseValue"
          filterable
          placeholder="请选择"
          @change="areaChange"
        >
          <el-option
            v-for="item in areaOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div> -->
    </div>
    <div style="height:calc(100% - 115px);line-height: initial;">
      <div style="width:100%;height:100%;">
        <sxtTrafficChat
          v-if="initialize"
          :bs_base_id="$store.state.baseinfo.cur_base_id"
          :rs_facilities_id="rs_facilities_id"
          :startTime="start_time"
          :endTime="end_time"
        />
      </div>
    </div>
    <settingSensor ref="settingSensor" />
  </div>
</template>
<script>
import { formatDate } from "@/utils/date";
import monitChart from "./dataMonitChart";
import settingSensor from "./settingSensor";
import sxtTrafficChat from "@/views/base/video/module/sxtTrafficChat";
import { yingShiSxtTrafficLastTime } from '@/api/sxt'
export default {
  components: {
    monitChart,
    settingSensor,
    sxtTrafficChat
  },
  data () {
    return {
      initialize: false,
      timeType: [{ label: "秒", value: "1" }, { label: "分", value: "2" }],
      valueType: "current",
      day: 7,
      total: 0,
      page: 0,
      size: 9,
      dialogVisible: false,
      start_time: null,
      end_time: null,
      searchValue: "",
      switchValue: false,
      dialogSwitch: false,
      timeUserDefault: false,
      refreshTime: null,
      selectTime: "1",
      timeValue: [],
      areaOptions: [],
      chooseValue: "all",
      rs_facilities_id: ""

    };
  },
  mounted () {
    yingShiSxtTrafficLastTime({
      bs_base_id: this.$store.state.baseinfo.cur_base_id,
      rs_facilities_id: this.rs_facilities_id,
    }).then(res => {
      if (res.code === 200) {
        this.start_time = formatDate(new Date(res.data - 3600 * 1000 * 24 * 31), "yyyy-MM-dd")
        this.end_time = formatDate(new Date(res.data), "yyyy-MM-dd")
        this.timeValue.push(this.start_time)
        this.timeValue.push(this.end_time)
        this.initialize = true
      } else {
        this.start_time = formatDate(new Date(new Date().getTime() - 3600 * 1000 * 24 * 31), "yyyy-MM-dd")
        this.end_time = formatDate(new Date(), "yyyy-MM-dd")
        this.timeValue.push(this.start_time)
        this.timeValue.push(this.end_time)
        this.initialize = true
      }
    })
  },
  methods: {
    settingSensorTab () {
      this.$refs.settingSensor.dialogVisible = true;
      this.$nextTick(() => {
        if (this.chooseValue === "all") {
          this.$refs.settingSensor.chooseShow = true;
        } else {
          this.$refs.settingSensor.chooseShow = false;
        }
        this.$refs.settingSensor.chooseValue = this.chooseValue;
      });
    },
    areaChange (value) {
      this.page = 0;
      if (value === "all") {
        this.rs_facilities_id = "";
      } else {
        this.rs_facilities_id = value;
      }
    },
    comfirm () {
      this.start_time = this.timeValue[0]
      this.end_time = this.timeValue[1]
    },
  },
  watch: {

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
