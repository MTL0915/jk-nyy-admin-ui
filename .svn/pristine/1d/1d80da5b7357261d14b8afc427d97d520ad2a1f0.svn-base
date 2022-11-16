<template>
  <div style="background:#fff;min-width:1160px;overflow:hidden">
    <div class="calendar-title">
      <div v-show="!showMonth">
        <el-button
          type="primary"
          size="small"
          plain
          @click="toolShow = !toolShow"
        ><i class="el-icon-more"></i></el-button>
        <div style="display:inline-block;margin-left:20px;height:33px;border:1px solid #409EFF;border-radius:5px;">
          <span
            style="border-radius:5px 0 0 5px"
            class="switchDateType"
            :class="currentDateType == 'record'? 'active': ''"
            @click="currentDateType = 'record'"
          >记录</span>
          <span
            style="border-radius:0 5px 5px 0"
            class="switchDateType"
            :class="currentDateType == 'plan'? 'active': ''"
            @click="currentDateType = 'plan'"
          >计划</span>
        </div>
      </div>
      <div style="flex:1;text-align:center">
        <div v-show="!showMonth">
          <span
            @click="up"
            class="date-btn"
            style="margin-right:50px"
          >
            <i class="el-icon-arrow-left"></i>
          </span>
          <span
            class="date-text"
            style="cursor:pointer"
            @click="showMonth = true"
          >
            {{ panelYear }}年{{ panelMonth + 1 }}月
          </span>
          <span
            @click="next"
            class="date-btn"
            style="margin-left:50px"
          >
            <i class="el-icon-arrow-right"></i>
          </span>
        </div>

      </div>
      <div>
        <el-select
          v-model="archiveID"
          placeholder="请选择档案"
          size="small"
          @change="dataLoad"
        >
          <el-option
            v-for="item in archiveList"
            :key="item.id"
            :label="item.classification_name +'('+item.productBreed_name+')'"
            :value="item.id"
          >
            <span style="float: left">{{ item.classification_name+'('+item.productBreed_name+')' }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.rs_facilities_name }}</span>
          </el-option>
        </el-select>
        <el-button
          type="primary"
          size="small"
          @click="addFarm"
        >添加</el-button>
        <el-button
          type="success"
          size="small"
          @click="addPlan"
        >制定计划</el-button>
      </div>
    </div>
    <div style="display:flex">
      <div
        v-show="toolShow"
        style="height:100%;width:150px;font-size:12px;padding:10px;"
      >
        <div style="margin-bottom:10px">
          <span
            class="colorList"
            style="background: #409EFF"
          ></span><span>手动登记</span>
        </div>
        <div style="margin-bottom:10px">
          <span
            class="colorList"
            style="background: #67C23A"
          ></span><span>按时完成</span>
        </div>
        <div style="margin-bottom:10px">
          <span
            class="colorList"
            style="background: #DB7093"
          ></span><span>超时完成</span>
        </div>
        <div style="margin-bottom:10px">
          <span
            class="colorList"
            style="background: red"
          ></span><span>未完成</span>
        </div>
        <div style="margin-bottom:10px">
          <span
            class="colorList"
            style="background: #E6A23C"
          ></span><span>正在执行的计划</span>
        </div>
        <div style="margin-bottom:10px">
          <span
            class="colorList"
            style="background: #909399"
          ></span><span>已暂停的计划</span>
        </div>
        <div style="margin-bottom:10px">
          <span
            class="colorList"
            style="background: #F2F6FC"
          ></span><span>过期档案</span>
        </div>
      </div>
      <div
        style="flex:1"
        class="clearfix"
      >
        <!--每年12个月-->
        <div v-show="showMonth">
          <div class="calendar-month">
            <div
              class="monthBox"
              v-for="(month, index) in monthList"
              :key="index"
              :style="{background: currentDay.substr(0,4) == month.year && currentDay.substr(4,2)*1 == month.month ? '#fcf8e3':'#fff'}"
              @click="enterDay(month)"
            >
              <p style="height:16px">{{ month.all }}</p>
              <myChart
                v-if="Object.keys(handleData(month)).length > 0"
                :data="handleData(month)"
                style="height:calc(100% - 36px)"
              />
              <!-- <p>计划总数：{{ handleData(month).planNum }}</p>
              <p>已完成记录：{{ handleData(month).recordPlanFinishNum }}</p>
              <p>未完成记录：{{ handleData(month).recordPlanUnfinishedNum }}</p>
              <p>手动登记：{{ handleData(month).recordOneselfNum }}</p>
              <p v-html="'计划预计总时长：'+handleData(month).planDuration"></p>
              <p v-html="'计划实际总时长'+handleData(month).recordPlanDuration"></p>
              <p v-html="'手动登记总时长：'+handleData(month).recordOneselfDuration" v-show="month.month == 3"></p> -->
            </div>
          </div>
        </div>
        <!--月份 30天-->
        <div v-show="!showMonth">
          <div class="calendar_week">
            <span>周日</span>
            <span>周一</span>
            <span>周二</span>
            <span>周三</span>
            <span>周四</span>
            <span>周五</span>
            <span>周六</span>
          </div>
          <!--天数-->
          <div class="calendar-days">
            <div
              class="day"
              v-for="(day, index) in dayFullList"
              :key="index"
              @click="Daydetail(day)"
              :style="{background:currentDay == day? '#fcf8e3':day > getArchiveIDEndTime&getArchiveIDEndTime!='' ? '#F2F6FC':day < getArchiveIDStartTime&getArchiveIDStartTime!='' ? '#F2F6FC': '#fff'}"
              :class="!allowShow? 'notAllowed': ''"
              @mouseover="mouseover(day)"
              @mouseout="allowShow = true"
            >
              <div
                style="cursor:default;margin-bottom:5px"
                :style="{color: day.substring(4,6)*1 != panelMonth +1? '#ccc': '#000' }"
              >
                <span
                  style="display:inline-block;width:20px;height:20px;border-radius:50%;line-height:20px;text-align:center"
                  :style="{background:currentDay == day? '#5ab8f6':'#fff',color:currentDay == day? '#fff':''}"
                >
                  {{ day | filterDay}}
                </span>
                <span
                  class="task"
                  v-show="getDayRecord(day).length > 0 && currentDateType == 'record'"
                >
                  共{{getDayRecord(day).length}}项-{{getDayRecord(day).length - getDayRecord1(day).length}}项待完成
                </span>
                <!-- <span class="task" v-show="getDayPlan(day).length > 0 && currentDateType == 'plan'">
                  共{{getDayPlan(day).length}}项-{{getDayPlan(day).length - getDayPlan1(day).length}}项待完成
                </span> -->
              </div>
              <div
                v-for="(item,index1) in getDayRecord(day)"
                :key="index1"
                class="card"
                :class="getClass(item)"
                @click.stop="recordDetail(item)"
                v-show="currentDateType == 'record'"
              >
                <span>{{ item.name }}</span>
              </div>
              <div
                v-for="(item,index1) in getDayPlan(day)"
                :key="index1"
                class="card"
                :style="{background:item.sta == 1?'#E6A23C':'#909399'}"
                @click.stop="planDetail(item)"
                v-show="currentDateType == 'plan'"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <recordDrawer ref="recordDrawer" />
    <planDrawer ref="planDrawer" />
    <el-dialog
      title='添加农事记录'
      append-to-body
      :visible.sync="produceRecordFormDialogVisible"
      width="600px"
    >
      <produceRecordForm
        v-if="produceRecordFormDialogVisible"
        :recordId="recordId"
        :agroProduceArchiveId="archiveID"
        ref="produceRecordForm"
      />
    </el-dialog>
    <el-dialog
      title="新增农事计划"
      append-to-body
      width="600px"
      :visible.sync="producePlanFormDialogVisible"
      v-if="producePlanFormDialogVisible"
    >
      <producePlanForm
        :agroProducePlanId="agroProducePlanId"
        :agroProduceArchiveId="archiveID"
        ref="producePlanForm"
      />
    </el-dialog>
  </div>
</template>
<script>
import { formatDate } from '@/utils/date'
import { agroProduceRecordTypeList, agroProduceRecordList, archiveMonthRecordAndPlan } from '@/api/agroProduceRecord'
import { getAgroProduceArchiveByMonth, getArchiveMonthStatistics } from '@/api/agroProduceArchive'
import recordDrawer from './recordDrawer'
import planDrawer from './planDrawer'
import produceRecordForm from './produceRecordForm'
import producePlanForm from './producePlanForm'
import myChart from "./module/charts"
export default {
  components: {
    recordDrawer,
    planDrawer,
    producePlanForm,
    produceRecordForm,
    myChart
  },
  computed: {
    getArchiveIDEndTime () {
      let time = ''
      for (let i = 0; i < this.archiveList.length; i++) {
        if (this.archiveList[i].id == this.archiveID) {
          time = this.archiveList[i].produceEndTime
          break;
        }
      }
      return time
    },
    getArchiveIDStartTime () {
      let time = ''
      for (let i = 0; i < this.archiveList.length; i++) {
        if (this.archiveList[i].id == this.archiveID) {
          time = this.archiveList[i].produceStartTime
          break;
        }
      }
      return time
    }
  },
  data () {
    return {
      currentDay:
        new Date().getFullYear() +
        "" +
        (new Date().getMonth() + 1 > 9
          ? new Date().getMonth() + 1
          : "0" + (new Date().getMonth() + 1)) +
        "" +
        (new Date().getDate() > 9
          ? new Date().getDate()
          : "0" + new Date().getDate()),
      dayFullList: [], //所有天数列表，前面空位补0
      dayList: [], //所有天数列表，前面空位补0
      panelYear: '', // 仪表盘显示的年份
      panelMonth: '', // 仪表盘显示的月份(从0开始)
      firstDay: '', // 每月第一天
      firstDayisWeek: '', // 每月第一天是星期几
      currentFirstDate: '',
      currentDateType: 'record',
      recordList: [], // 农事记录列表
      archiveList: [],
      archiveID: '',
      produceRecordFormDialogVisible: false,
      producePlanFormDialogVisible: false,
      toolShow: false,
      list: [], // 农事记录和计划列表
      produceStartTime: "",
      produceEndTime: "",
      showMonth: true,
      monthList: [],
      allowShow: true,
      totalData: []
    }
  },
  filters: {
    filterDay (value) {
      return parseInt(("" + value).slice(-2));
    }
  },
  // watch: {
  //   panelMonth(val) {
  //     if (this.panelMonth != "" && val !== "") {
  //       //检测月份变化
  //       this.calendarInit(this.panelYear, this.panelMonth);
  //     }

  //   },
  //   panelYear(val) {
  //     if (this.panelYear != "" && val !== "") {
  //       //检测年份变化
  //       this.calendarInit(this.panelYear, this.panelMonth);
  //     }

  //   },
  // },
  methods: {

    // 获取农事记录档案 月统计
    getArchiveMonth () {
      const data = {
        agro_produce_archive_id: this.archiveID
      }
      getArchiveMonthStatistics(data).then(res => {
        if (res.code === 200) {
          // res.data.map(item => {
          //   item.planDuration = this.getTime(item.planDuration)
          //   item.recordPlanDuration = this.getTime(item.recordPlanDuration)
          //   item.recordOneselfDuration = this.getTime(item.recordOneselfDuration)
          // })
          res.data.map(item => {
            item.planDuration = (item.planDuration / 3600000).toFixed(2)
            item.recordPlanDuration = (item.recordPlanDuration / 3600000).toFixed(2)
            item.recordOneselfDuration = (item.recordOneselfDuration / 3600000).toFixed(2)
          })
          this.totalData = res.data
        }
      })
    },
    getTime (time) {
      if (time == 0) {
        return 0;
      } else if (time < 60000 && time != 0) {
        return time / 1000 + "<em>秒</em>";
      } else if (time < 3600000) {
        return Math.floor(time / 60000) + "<em>分钟</em>";
      } else if (time >= 3600000 && time < 86400000) {
        return 0;
        //一天以内
        return parseInt(time / 3600000) + "<em>天</em>" + parseInt((time % 3600000) / 60000) + "<em>小时</em>";
      } else if (time >= 86400000) {
        //超过一天
        return parseInt(time / 86400000) + "<em>天</em>" + parseInt((time % 86400000) / 3600000) + "<em>小时</em>";
      }

    },
    // 月份数据处理
    handleData (item) {
      let obj = {}
      for (let i = 0; i < this.totalData.length; i++) {
        if (`${this.totalData[i].time.split("-")[0]}-${this.totalData[i].time.split("-")[1] * 1}` == `${item.year}-${item.month}`) {
          obj = this.totalData[i]
          break
        }
      }
      return obj
    },
    mouseover (day) {
      if ((day > this.getArchiveIDEndTime && this.getArchiveIDEndTime != '') || (day < this.getArchiveIDStartTime && this.getArchiveIDStartTime != '')) {
        this.allowShow = false
      } else {
        this.allowShow = true
      }
    },
    enterDay (item) {
      this.panelYear = item.year
      this.panelMonth = item.month - 1
      this.calendarInit(this.panelYear, this.panelMonth);
      this.showMonth = false
    },
    getClass (item) {
      if (item.recordSta == 1) {
        return 'recordFinish'
      } else if (item.recordSta == 2) {
        return 'finish'
      } else if (item.recordSta == 3) {
        return 'timeFinish'
      } else if (item.recordSta == 0) {
        return 'unfinish'
      }
    },
    addDate (date, n) {
      date.setDate(date.getDate() + n);
      return date;
    },
    addPlan () {
      this.agroProducePlanId = null
      this.producePlanFormDialogVisible = true
      this.$nextTick(() => {
        this.$refs.producePlanForm.form.start_time = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
      })
    },
    addFarm () {
      // if (this.currentDay > this.getArchiveIDEndTime) {
      //   this.$message({
      //     message: '记录开始时间不能超过档案时间',
      //     type: 'warning'
      //   })
      //   return;
      // }
      // if (this.currentDay  < this.getArchiveIDStartTime) {
      //   this.$message({
      //     message: '记录开始时间不能小于档案时间',
      //     type: 'warning'
      //   })
      //   return;
      // }
      this.recordId = null
      this.produceRecordFormDialogVisible = true
      this.$nextTick(() => {
        this.$refs.produceRecordForm.form.start_time = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
      })
    },
    // 农事计划详情
    planDetail (item) {
      let rs_facilities_name = ""
      let archiveName = ""
      for (let i = 0; i < this.archiveList.length; i++) {
        if (this.archiveList[i].id == this.archiveID) {
          rs_facilities_name = this.archiveList[i].rs_facilities_name
          archiveName = `${this.archiveList[i].classification_name}(${this.archiveList[i].productBreed_name})`
        }
      }
      this.$refs.planDrawer.drawer = true
      this.$refs.planDrawer.rs_facilities_name = rs_facilities_name
      this.$refs.planDrawer.archiveName = archiveName
      this.$refs.planDrawer.info.cycle = item.cycle
      this.$refs.planDrawer.info.duration = item.duration
      this.$refs.planDrawer.info.id = item.id
      this.$refs.planDrawer.info.name = item.name
      this.$refs.planDrawer.info.sta = item.sta
      this.$refs.planDrawer.info.time = item.time
      this.$refs.planDrawer.info.week = item.week
      this.$refs.planDrawer.info.startTime = item.startTime
      this.$refs.planDrawer.info.endTime = item.endTime

    },
    // 农事记录详情
    recordDetail (item) {
      let rs_facilities_name = ""
      let archiveName = ""
      for (let i = 0; i < this.archiveList.length; i++) {
        if (this.archiveList[i].id == this.archiveID) {
          rs_facilities_name = this.archiveList[i].rs_facilities_name
          archiveName = `${this.archiveList[i].classification_name}(${this.archiveList[i].productBreed_name})`
        }
      }
      this.$refs.recordDrawer.drawer = true
      this.$refs.recordDrawer.id = item.id
      this.$refs.recordDrawer.rs_facilities_name = rs_facilities_name
      this.$refs.recordDrawer.archiveName = archiveName
      this.$refs.recordDrawer.dataLoad()
    },
    //获取某天的农事记录
    getDayRecord (day) {
      const temp = []
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i] !== null && this.list[i].records) {
          for (let j = 0; j < this.list[i].records.length; j++) {
            if (this.list[i].records[j].startTime == day || this.list[i].records[j].createTime == day) {
              temp.push(this.list[i].records[j])
            }
          }
        }
      }
      return temp
    },
    //获取某天的农事计划
    getDayPlan (day) {
      const temp = []
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i] !== null && this.list[i].plans) {
          for (let j = 0; j < this.list[i].plans.length; j++) {
            if (this.list[i].plans[j].dayTime == day) {
              temp.push(this.list[i].plans[j])
            }
          }
        }
      }
      return temp
    },

    //获取某天的农事记录
    getDayRecord1 (day) {
      const temp = []
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i] !== null && this.list[i].records) {
          for (let j = 0; j < this.list[i].records.length; j++) {
            if (this.list[i].records[j].startTime == day) {
              if (this.list[i].records[j].recordSta != 0) {
                temp.push(this.list[i].records[j])
              }
            }
          }
        }
      }
      return temp
    },
    Daydetail (day) {
      let time = ""
      if (day == this.currentDay) {
        time = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
      } else {
        time = `${day.substr(0, 4)}-${day.substr(4, 2)}-${day.substr(6, 2)} 00:00:01 `
      }
      // 点击日历新增农事记录
      if (this.currentDateType == 'record') {
        if (day > this.getArchiveIDEndTime) {
          this.$message({
            message: '记录开始时间不能超过档案时间',
            type: 'warning'
          })
          return;
        }
        if (day < this.getArchiveIDStartTime) {
          this.$message({
            message: '记录开始时间不能小于档案时间',
            type: 'warning'
          })
          return;
        }
        this.recordId = null
        this.produceRecordFormDialogVisible = true
        this.$nextTick(() => {
          this.$refs.produceRecordForm.form.start_time = time
        })
      } else {
        this.agroProducePlanId = null
        this.producePlanFormDialogVisible = true
        this.$nextTick(() => {
          this.$refs.producePlanForm.form.start_time = time
        })
      }
    },
    getPreMonth (y, m, i) {
      return formatDate(new Date(this.addDate(new Date(y, m, 1), -i)), 'yyyyMMdd')
    },
    getNextMonth (y, m, i) {
      return formatDate(new Date(this.addDate(new Date(y, m, 1), +i)), 'yyyyMMdd')
    },
    // 获取生产档案
    getAagroProduceArchiveList () {
      //this.archiveID = ""
      const data = {
        bs_base_id: this.$store.state.baseinfo.cur_base_id,
        month: `${this.panelYear}-${this.panelMonth + 1}`
      }
      getAgroProduceArchiveByMonth(data).then(res => {
        if (res.code === 200) {
          const temp = []
          if (res.data.length > 0) {
            res.data.map(item => {
              item.produceStartTime = formatDate(new Date(item.produceStartTime), 'yyyyMMdd')
              item.produceEndTime = formatDate(new Date(item.produceEndTime), 'yyyyMMdd')
            })
            this.archiveList = res.data
            for (let i = 0; i < this.archiveList.length; i++) {
              temp.push(this.archiveList[i].id)
            }
            //this.archiveID = res.data[0].id
            if (this.archiveID == "") {
              this.archiveID = res.data[0].id
            } else {
              if (temp.indexOf(this.archiveID) == -1) {
                this.$confirm('当前档案不在此区间, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  type: 'warning'
                }).then(() => {
                  this.archiveID = res.data[0].id
                  this.calendarInit(this.panelYear, this.panelMonth);
                }).catch(() => {
                  // this.panelMonth = this.panelMonth - 1
                  this.archiveID = res.data[0].id
                  this.calendarInit(this.panelYear, this.panelMonth);
                });
              }
            }
            this.dataLoad()
          }
        }
      })
    },
    // 获取当前档案的时间区间
    getArchiveTime () {
      this.monthList = []
      for (let i = 0; i < this.archiveList.length; i++) {
        if (this.archiveList[i].id == this.archiveID) {
          // 用于展示月份
          this.produceStartTime = this.archiveList[i].produceStartTime;
          this.produceEndTime = this.archiveList[i].produceEndTime
        }
      }
      const year = this.produceStartTime.substr(0, 4)
      const yearLength = this.produceEndTime.substr(0, 4)
      const month = this.produceStartTime.substr(4, 2)
      const month1 = this.produceEndTime.substr(4, 2)
      if (year == yearLength) {
        for (let i = month * 1; i <= month1; i++) {
          this.monthList.push({
            year: year * 1,
            month: i,
            all: `${year}年${i}月`
          })
        }
      } else {
        for (let i = year * 1; i <= yearLength; i++) {
          if (i == year) {
            for (let j = month * 1; j <= 12; j++) {
              this.monthList.push({
                year: i,
                month: j,
                all: `${i}年${j}月`
              })
            }
          } else if (i != year && i != yearLength) {
            for (let j = 1; j <= 12; j++) {
              this.monthList.push({
                year: i,
                month: j,
                all: `${i}年${j}月`
              })
            }
          } else if (i == yearLength) {
            for (let j = 1; j <= month1; j++) {
              this.monthList.push({
                year: i,
                month: j,
                all: `${i}年${j}月`
              })
            }
          }
        }
      }
    },
    // 获取农事记录列表
    dataLoad () {
      const data = {
        id: this.archiveID,
        month: `${this.panelYear}-${this.panelMonth + 1}`
        // timeType:　'all'
      }
      this.getArchiveTime();
      this.getArchiveMonth();
      archiveMonthRecordAndPlan(data).then(res => {
        if (res.code === 200) {
          res.data.map(item => {
            if (item !== null) {
              if (item.records) {
                item.records.map(record => {
                  record.duration = (record.duration / 3600000).toFixed(1)
                  record.startTime = formatDate(new Date(record.startTime), 'yyyyMMdd')
                  record.createTime = formatDate(new Date(record.createTime), 'yyyyMMdd')
                })
              }
              if (item.plans) {
                item.plans.map(plan => {
                  plan.duration = (plan.duration / 3600000).toFixed(1)
                  plan.dayTime = formatDate(new Date(plan.time), 'yyyyMMdd')
                  plan.createTime = formatDate(new Date(plan.createTime), 'yyyyMMdd')
                  plan.startTime = formatDate(new Date(plan.startTime), 'yyyy-MM-dd')
                  plan.endTime = formatDate(new Date(plan.endTime), 'yyyy-MM-dd')
                  plan.time = formatDate(new Date(plan.time), 'yyyy-MM-dd hh:mm:ss')
                  plan.week = plan.cycle !== null ? plan.cycle.split(",") : []
                })
              }
            }
          })
          this.list = res.data
        }
      })
    },
    // 日历初始化  ==> 月
    calendarInit (year = new Date().getFullYear(), month = new Date().getMonth()) {
      let y = year
      let m = month
      this.panelYear = y
      this.panelMonth = m
      this.firstDay = new Date(y, m, 1).getDate() // 每月第一天
      this.lastDay = new Date(y, m + 1, 0).getDate() // 每月最后一天，即每月天数
      this.firstDayisWeek = new Date(y, m, 1).getDay() // 每月第一天为星期几
      let lastDateisWeek = new Date(y, m + 1, 1).getDay() // 每月最后一天为星期几
      let tempBegin = new Array(this.firstDayisWeek).fill(0) // 初始化星期长度并填充0
      let tempEnd = []
      // 填充上个月的日期
      if (this.firstDayisWeek == 1) {
        tempBegin[0] = this.getPreMonth(y, m, 1)
      } else if (this.firstDayisWeek == 2) {
        tempBegin[0] = this.getPreMonth(y, m, 2)
        tempBegin[1] = this.getPreMonth(y, m, 1)
      } else if (this.firstDayisWeek == 3) {
        tempBegin[0] = this.getPreMonth(y, m, 3)
        tempBegin[1] = this.getPreMonth(y, m, 2)
        tempBegin[2] = this.getPreMonth(y, m, 1)
      } else if (this.firstDayisWeek == 4) {
        tempBegin[0] = this.getPreMonth(y, m, 4)
        tempBegin[1] = this.getPreMonth(y, m, 3)
        tempBegin[2] = this.getPreMonth(y, m, 2)
        tempBegin[3] = this.getPreMonth(y, m, 1)
      } else if (this.firstDayisWeek == 5) {
        tempBegin[0] = this.getPreMonth(y, m, 5)
        tempBegin[1] = this.getPreMonth(y, m, 4)
        tempBegin[2] = this.getPreMonth(y, m, 3)
        tempBegin[3] = this.getPreMonth(y, m, 2)
        tempBegin[4] = this.getPreMonth(y, m, 1)
      } else if (this.firstDayisWeek == 6) {
        tempBegin[0] = this.getPreMonth(y, m, 6)
        tempBegin[1] = this.getPreMonth(y, m, 5)
        tempBegin[2] = this.getPreMonth(y, m, 4)
        tempBegin[3] = this.getPreMonth(y, m, 3)
        tempBegin[4] = this.getPreMonth(y, m, 2)
        tempBegin[5] = this.getPreMonth(y, m, 1)
      }
      // 填充下个月的日期
      if (lastDateisWeek == 1) {
        tempEnd = new Array(6).fill(0) // 初始化星期长度并填充0
        tempEnd[0] = this.getNextMonth(y, m + 1, 0)
        tempEnd[1] = this.getNextMonth(y, m + 1, 1)
        tempEnd[2] = this.getNextMonth(y, m + 1, 2)
        tempEnd[3] = this.getNextMonth(y, m + 1, 3)
        tempEnd[4] = this.getNextMonth(y, m + 1, 4)
        tempEnd[5] = this.getNextMonth(y, m + 1, 5)
      } else if (lastDateisWeek == 2) {
        tempEnd = new Array(5).fill(0) // 初始化星期长度并填充0
        tempEnd[0] = this.getNextMonth(y, m + 1, 0)
        tempEnd[1] = this.getNextMonth(y, m + 1, 1)
        tempEnd[2] = this.getNextMonth(y, m + 1, 2)
        tempEnd[3] = this.getNextMonth(y, m + 1, 3)
        tempEnd[4] = this.getNextMonth(y, m + 1, 4)
      } else if (lastDateisWeek == 3) {
        tempEnd = new Array(4).fill(0) // 初始化星期长度并填充0
        tempEnd[0] = this.getNextMonth(y, m + 1, 0)
        tempEnd[1] = this.getNextMonth(y, m + 1, 1)
        tempEnd[2] = this.getNextMonth(y, m + 1, 2)
        tempEnd[3] = this.getNextMonth(y, m + 1, 3)
      } else if (lastDateisWeek == 4) {
        tempEnd = new Array(3).fill(0) // 初始化星期长度并填充0
        tempEnd[0] = this.getNextMonth(y, m + 1, 0)
        tempEnd[1] = this.getNextMonth(y, m + 1, 1)
        tempEnd[2] = this.getNextMonth(y, m + 1, 2)
      } else if (lastDateisWeek == 5) {
        tempEnd = new Array(2).fill(0) // 初始化星期长度并填充0
        tempEnd[0] = this.getNextMonth(y, m + 1, 0)
        tempEnd[1] = this.getNextMonth(y, m + 1, 1)
      } else if (lastDateisWeek == 6) {
        tempEnd = new Array(1).fill(0) // 初始化星期长度并填充0
        tempEnd[0] = this.getNextMonth(y, m + 1, 0)
      }
      //let tempLast = [] // 初始化月份天数
      let tempLastFull = [] // 初始化完整月份的每天格式： 20201130
      for (let i = 1; i <= this.lastDay; i++) {
        // tempLast.push(i)
        tempLastFull.push('' + this.panelYear + this.addPreZero(this.panelMonth + 1) + this.addPreZero(i))
        //tempLastFull.push('' + this.panelYear + this.panelMonth + 1 + i)
        //this.dayList = [...tempBegin, ...tempLast]
        this.dayFullList = [...tempBegin, ...tempLastFull, ...tempEnd]
      }
      //this.dataLoad()
      this.getAagroProduceArchiveList()
    },
    addPreZero (num) {
      //小于9的需要添加0前缀
      return num > 9 ? num : "0" + num;
    },
    //上一月
    up () {
      if (this.panelMonth > 0) {
        this.panelMonth--;
      } else {
        this.panelYear--;
        this.panelMonth = 11;
      }
      this.calendarInit(this.panelYear, this.panelMonth);
    },
    //下一月
    next () {
      if (this.panelMonth < 11) {
        this.panelMonth++;
      } else {
        this.panelYear++;
        this.panelMonth = 1;
      }
      this.calendarInit(this.panelYear, this.panelMonth);
    },
  }
}
</script>
<style lang="stylus" scoped>
.calendar-title
  padding 10px
  display flex
  height 55px
  align-items center
  border-bottom 1px solid #ccc

.calendar_week
  display flex
  justify-content space-between

  span
    display inline-block
    flex 1
    height 34px
    line-height 34px
    text-align center
    border-right 1px solid #ccc

  span:first-child
    border-left 1px solid #ccc

.calendar_week1
  display flex

.weekBox
  flex 1

  span
    display block
    height 34px
    line-height 34px
    text-align center
    border-right 1px solid #ccc

.calendar-days
  border 1px solid #ccc

  .day
    position relative
    box-sizing border-box
    padding 10px
    width 14.2857%
    height 200px
    display inline-block
    float left
    border-right 1px solid #ccc
    border-bottom 1px solid #ccc

  .day:nth-child(7n+7)
    border-right none

.calendar-month
  font-size 0
  border-left 1px solid #ccc

  .monthBox
    font-size 14px
    width 14.2857%
    padding 10px
    height 200px
    float left
    display inline-block
    box-sizing border-box
    border-right 1px solid #ccc
    border-bottom 1px solid #ccc

.notAllowed
  cursor not-allowed

.task
  margin-left 5px
  color rgb(90, 184, 246)
  font-size 14px
  white-space nowrap
  position absolute
  top 10px
  right 10px
  width calc(100% - 45px)
  text-align right
  overflow hidden

.active
  background #409EFF
  color #fff

.switchDateType
  display inline-block
  height 32px
  line-height 32px
  padding 0 15px
  cursor pointer

.date-btn
  display inline-block
  font-size 30px

.date-text
  display inline-block
  font-size 30px
  width 200px

.card
  float left
  height 20px
  font-size 14px
  line-height 20px
  max-width 150px
  padding 0 7px
  margin 5px
  border-radius 10px
  color #fff
  overflow hidden
  cursor pointer

.colorList
  display inline-block
  width 16px
  height 16px
  margin-right 5px
  vertical-align middle

.recordFinish
  background #409EFF

.finish
  background #67C23A

.timeFinish
  background #DB7093

.unfinish
  background red
</style>