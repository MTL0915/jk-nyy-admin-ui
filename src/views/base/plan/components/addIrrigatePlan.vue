<template>
  <div>
    <div style="margin-bottom:10px"><el-button size="mini" type="primary" @click="$parent.addShow = false">返回列表</el-button></div>
    <el-steps :active="active" finish-status="success">
      <el-step title="选择模板" />
      <el-step title="第二步" />
      <el-step title="第三步" />
      <el-step title="第四步" />
      <el-step title="第五步" />
      <el-step title="完成" />
    </el-steps>
    <!--第一步-->
    <div class="chooseCard" v-show="active == 0">
      <div class="card userDefault" @click="addDefault">
        自定义模板
      </div>
      <div class="card" @click="defaultPlanOne">
        <p>推荐计划</p>
        <div class="recommend">
          <div style="flex:1">
            <p style="padding:5px 0">名称：计划1</p>
            <p style="padding:5px 0">每天灌溉：1次</p>
          </div>
          <div style="flex:1">
            <p style="padding:5px 0">周期：1个月</p>
            <p style="padding:5px 0">每天灌溉时长：30分钟</p>
            
          </div>
        </div>
        <p style="padding:5px 0">灌溉时间：08:00~08:30</p>
        <p style="padding:5px 0">每周灌溉：1,2,3,4,5,6,7</p>
      </div>
      <div class="card" @click="defaultPlanTwo">
        <p>推荐计划</p>
        <div class="recommend">
          <div style="flex:1">
            <p style="padding:5px 0">名称：计划2</p>
            <p style="padding:5px 0">每天灌溉：2次</p>
          </div>
          <div style="flex:1">
            <p style="padding:5px 0">周期：1个月</p>
            <p style="padding:5px 0">每天灌溉时长：60分钟</p>
          </div>
        </div>
        <p style="padding:5px 0">灌溉时间：08:00~08:30、19：00~19：30</p>
        <p style="padding:5px 0">每周灌溉：1,2,3,4,5,6,7</p>
      </div>
    </div>
    <!--第二步-->
    <div v-show="active == 1" style="width:1000px;margin:20px auto">
      <div style="margin-bottom:10px;width:500px" class="name">
        <el-input v-model="name" placeholder="请输入计划名称"><template slot="prepend">计划名称：</template></el-input>
      </div>
      <p style="padding-bottom:10px;font-size:14px">选择每周灌溉日</p>
      <div class="timeCard">
        <el-row
          gutter="5"
          type="flex"
          justify="left"
          style="margin-bottom:10px"
        >
          <el-col span="3" class="time" v-for="(items, index) in timeList0" :key="index">
            <span
              class="day"
              :style="{
                background: time.indexOf(items.time) > -1 ? '#18BCA2' : ''
              }"
              @click="chooseTime(items)"
              >{{ items.name }}</span
            >
          </el-col>
        </el-row>
      </div>
      <div>
        <span style="display:inline-block;width:50%;padding:10px 0">设置每日灌溉时间</span>
        <div style="margin-bottom:10px" v-show="!addShow">
          <el-button size="mini" type="primary" @click="addTime"><i class="el-icon-plus"></i>添加</el-button>
          <el-button size="mini" type="danger" @click="delShow = !delShow"><i class="el-icon-delete"></i>删除</el-button>
        </div>
      </div>
      <div>
        <div
          v-for="(item, index) in dataList"
          :key="index"
          style="display:inline-block;padding-right:10px;cursor:pointer"
        >
          <div style="border-radius:0;padding:5px 0;" :border="true">
            <div class="flex">
              <div class="codeord">
                <span>第{{ index + 1 }}个阶段</span>
              </div>
              <div class="flex-row">
                <el-time-select
                  style="width:100px;"
                  v-model="item.startTime"
                  size="mini"
                  is-range
                  @change="change($event,{ index, name: 'startTime' })"
                  :editable="false"
                  :clearable="false"
                  :picker-options="{
                    start: '00:00',
                    step: '00:15',
                    end: '23:59'
                  }"
                  placeholder="请选择">
                </el-time-select>
              </div>
              <div>至</div>
              <div class="flex-row">
                <el-time-select
                  style="width:100px;"
                  v-model="item.endTime"
                  @change="change($event,{ index, name: 'endTime' })"
                  size="mini"
                  is-range
                  :editable="false"
                  :clearable="false"
                  :picker-options="{
                    start: '00:00',
                    step: '00:15',
                    end: '23:59'
                  }"
                  placeholder="请选择">
                </el-time-select>
              </div>
              <div style="width:45px;margin-left:5px" v-show="delShow">
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="delTime(index)" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="text-align:center;margin-top:30px">
        <el-button size="mini" type="primary" @click="active = 0">上一步</el-button>
        <el-button size="mini" type="primary" @click="three">下一步</el-button>
      </div>
    </div>
    <!--第三步-->
    <div v-show="active == 2" style="width:1000px;margin:20px auto">
      <p style="font-size:14px;margin:10px 0">设置计划有效时间</p>
      <div class="chooseDate">
        <div style="cursor:pointer">
          <div style="display:inline-block;margin-right:30px">
            开始时间：
            <el-date-picker
              v-model="startDate"
              @change="dateChange($event, 'startDate')"
              type="date"
              :editable="false"
              :clearable="false"
              value-format="yyyy-MM-dd"
              placeholder="开始时间">
            </el-date-picker>
          </div>
          <div style="display:inline-block;">
            结束时间：
            <el-date-picker
              v-model="endDate"
              @change="dateChange($event, 'endDate')"
              type="date"
              value-format="yyyy-MM-dd"
              :editable="false"
              :clearable="false"
              placeholder="结束时间">
            </el-date-picker>
          </div>
        </div>
      </div>
      <p style="font-size:12px;padding:10px">
        注：开始时间不配置，将从本周第一个灌溉日开始生效;结束时间不配置，计划将永久有效!
      </p>
      <div style="text-align:center;margin-top:30px">
        <el-button size="mini" type="primary" @click="active = 1">上一步</el-button>
        <el-button size="mini" type="primary" @click="four">下一步</el-button>
      </div>
    </div>
    <!--第四步-->
    <div v-show="active == 3" style="width:1000px;margin:20px auto">
      <p style="padding:10px 0">选择要控制的阀门</p>
      <el-table
        :data="FMList"
        border
        :show-overflow-tooltip="false"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        />
        <el-table-column
          prop="name"
          label="阀门名称"
        />
        <el-table-column
          prop="rs_facilities_name"
          label="所在地块"
        />
      </el-table>
      <div style="text-align:center;margin:30px">
        <el-button size="mini" type="primary" @click="active = 2">上一步</el-button>
        <el-button size="mini" type="primary" @click="five">下一步</el-button>
      </div>
    </div>
    <!--第五步-->
    <div v-show="active == 4" style="width:1000px;margin:20px auto">
      <p style="padding:10px 0">选择本次计划要施肥的肥桶</p>
      <el-table
        :data="FTlist"
        border
        :show-overflow-tooltip="false"
        ref="multipleTable1"
        @selection-change="handleSelectionChange1"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        />
        <el-table-column
          prop="name"
          label="肥桶名称"
        />
        <el-table-column
          prop="now_capacity"
          label="剩余容量"
        />
        <el-table-column
          prop="total_capacity"
          label="容量"
        />
      </el-table>
      <div style="text-align:center;margin:30px">
        <el-button size="mini" type="primary" @click="active = 3">上一步</el-button>
        <el-button size="mini" type="primary" @click="active = 5">下一步</el-button>
      </div>
    </div>
        <!--第六步-->
    <div v-show="active == 5" style="width:1000px;margin:20px auto;font-size:14px">
      <div class="info finalCard">
        <div class="infoCard">
          <span>计划时长：</span> <span>{{ totalDate }}天</span>
        </div>
        <div class="infoCard">
          <span>每日灌溉：</span> <span>{{ everyDayTime }}分钟</span>
        </div>
        <div class="infoCard">
          <span>每周灌溉：</span> <span>{{ time.length }}天</span>
        </div>
      </div>
      <div class="finalCard">
        <div style="display:flex;align-items:center;margin-bottom:10px">
          <div style="flex: 0 0 80px">每周灌溉日:</div>
          <div style="flex:1">
            <div class="finalTimeList">
              <div class="timeDay" v-for="(item, i) in finalTime" :key="i">
                <span
                  class="finalDay"
                  :style="{
                    background: time.indexOf(item.time) > -1 ? '#18BCA2' : ''
                  }"
                >
                  {{ item.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="finalWeek">
          <div style="flex: 0 0 100px">每周灌溉时间:</div>
          <div style="flex:1;font-size:12px">
            <span
              style="display:inline-block;margin:2px"
              v-for="(item, index) in dataList"
              :key="index"
            >
              {{ item.startTime }}~{{ item.endTime }}
            </span>
          </div>
        </div>
        <div class="finalWeek">
          <div style="flex: 0 0 80px">计划有效期:</div>
          <div style="flex:1;font-size:12px">
            {{ startDate }} 至 {{ endDate }}
          </div>
        </div>
        <div class="finalWeek" v-show="FTresult.length > 0">
          <div style="flex: 0 0 80px">选中的肥桶:</div>
          <div style="flex:1;font-size:12px">
            <div
              class="choosed"
              v-for="(item, index) in FTresult"
              :key="index"
            >
              <p>{{ item.name }}</p>
              <span style="color:red">{{ item.per }} %</span>
            </div>
          </div>
        </div>
        <div style="display:flex;align-items:center;margin-bottom:10px">
          <div style="flex: 0 0 80px">选中的阀门:</div>
          <div style="flex:1;font-size:12px">
            <span
              class="chooseFM"
              v-for="(item, index) in FMresult"
              :key="index"
              >{{ item.name }}</span
            >
          </div>
        </div>
      </div>
      <div style="text-align:center;margin:30px">
        <el-button size="mini" type="primary" @click="active = 4">上一步</el-button>
        <el-button size="mini" type="primary" @click="commit">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  facilitiesAfterMap,
  irrigationFT,
  addDeviceIrrigationPlan,
  updateDeviceIrrigationPlan
  } from "@/api/equip";
import bus from "@/components/common/bus.js";
export default {
  data() {
    return {
      device_id: "ff8080817300eb5f017302cbdd790008",
      active: 0,
      delShow: false,
      headerShow: true,
      timeList0: [
        { name: "周一", time: "1" },
        { name: "周二", time: "2" },
        { name: "周三", time: "3" },
        { name: "周四", time: "4" },
        { name: "周五", time: "5" },
        { name: "周六", time: "6" },
        { name: "周日", time: "7" }
      ],
      finalTime: [
        { name: "一", time: "1" },
        { name: "二", time: "2" },
        { name: "三", time: "3" },
        { name: "四", time: "4" },
        { name: "五", time: "5" },
        { name: "六", time: "6" },
        { name: "日", time: "7" }
      ],
      timeList1: [
        { name: "1天", time: 1 },
        { name: "2天", time: 2 },
        { name: "3天", time: 3 },
        { name: "5天", time: 5 },
        { name: "15天", time: 15 },
        { name: "1个月", time: 30 },
        { name: "2个月", time: 60 },
        { name: "3个月", time: 90 }
      ],
      name: "", //计划名称
      FMList: [],
      FTlist: [],
      timeList: [], //定时器所有时间段
      startDate: `${new Date().getFullYear()}-${
        new Date().getMonth() + 1 > 9
          ? new Date().getMonth() + 1
          : "0" + (new Date().getMonth() + 1)
      }-${
        new Date().getDate() > 9
          ? new Date().getDate()
          : "0" + new Date().getDate()
      }`, //灌溉开始日期
      endDate: "", //结束开始日期
      totalDate: "", //计划时长
      everyDayTime: 0, //每日灌溉时长
      FMresult: [], //选中的阀门列表
      FTresult: [], //选择的肥桶列表
      FMresultIDS: [], //选中阀门id,用于修改时获取对应ID的对象
      FTresultIDS: [],  //选中肥桶id,用于修改时获取对应ID的对象
      strategy_id: "", //计划任务id，用于修改判断
      time: [],
      dataList: [
        {
          startTime: "",
          endTime: ""
        }
      ],
      day_minute: ""
    }
  },
  created() {
    bus.$on("irrigateActive", active => {
      this.active = active
    })
  },
  methods: {
    //修改时选中已有阀门
    toggleSelection(rows) {
      rows.forEach(row => {
        this.$refs.multipleTable.toggleRowSelection(row);
      });
    },
    //修改时选中已有肥桶
    toggleSelection1(rows) {
      rows.forEach(row => {
        this.$refs.multipleTable1.toggleRowSelection(row);
      });
    },
    //提交计划
    commit() {
      const fm = [];
      const ft = [];
      for (let i in this.FMresult) {
        fm.push(this.FMresult[i].id);
      }
      for (let i in this.FTresult) {
        ft.push(this.FTresult[i].id);
      }
      const data = {
        name: this.name,
        weeks: this.time.join(","),
        dayTimes: this.dataList,
        startDate: this.startDate,
        endDate: this.endDate,
        hd_device_sensor_ids: fm,
        fertilizer_bucket_ids: ft,
        hd_device_id: this.device_id
      };
      if (this.strategy_id == "") {
        addDeviceIrrigationPlan(data).then(
          res => {
            if (res.code === 200) {
              this.$message({
                message: "保存成功",
                type: "success"
              })
            }
            this.$parent.addShow = false
            this.$parent.dataLoad();
          }
        );
      } else {
        data.strategy_id = this.strategy_id;
        updateDeviceIrrigationPlan(data).then(
          res => {
            if (res.code === 200) {
              this.$message({
                message: "保存成功",
                type: "success"
              })
              this.$parent.addShow = false
              this.$parent.dataLoad();
            }
          }
        );
      }
    },
    handleSelectionChange1(value) {
      if (this.FTresult.length > 0 && value.length == 0) {
        //处理自动触发时，没有值的情况
        return;
      }
      this.FTresult = value
    },
    handleSelectionChange(value) {
      if (this.FMresult.length > 0 && value.length == 0) {
        //处理自动触发时，没有值的情况
        return;
      }
      this.FMresult = value
    },
    five() {
      if (this.FMresult.length === 0) {
        this.$message({
          message: "请选择阀门",
          type: "warning"
        })
        return;
      }
      const data = {
        hd_device_id: this.device_id
      };
      //获取肥桶列表
      irrigationFT(data).then(res => {
        if (res.code === 200) {
          this.FTresult = [];
          res.data.map(item => {
            if (!item.now_capacity || item.now_capacity == null) {
              item.now_capacity = 0
            }
            item.per = Math.floor(
              (item.now_capacity / item.total_capacity) * 100
            );
            for (let i in this.FTresultIDS) {
              if (item.id == this.FTresultIDS[i]) {
                this.FTresult.push(item);
                break;
              }
            }
          });
          this.FTlist = res.data;
          this.active = 4;
          this.$nextTick(() => {
            this.toggleSelection1(this.FTresult);
          })
        }
      });
    },
    four() {
      const start = new Date(this.startDate).getTime();
      const end = new Date(this.endDate).getTime();
      if (this.endDate == "" || this.startDate == "") {
        this.$message({
          message: "时间不能为空",
          type: "warning"
        })
        return;
      }
      if (start > end) {
        this.$message({
          message: "计划开始时间不能大于结束时间",
          type: "warning"
        })
        return;
      }
      const diff =
        new Date(this.endDate).getTime(new Date(this.endDate)) -
        new Date(this.startDate).getTime(new Date(this.startDate));
      this.totalDate = diff / (1000 * 60 * 60 * 24);
      const data = {
        hd_device_id: this.device_id
      };
      //获取已配置拓扑图阀门列表
      facilitiesAfterMap(data).then(
        res => {
          if (res.code === 200) {
            let arr = []
            this.FMresult = []
            for (let i = 0; i < res.data.length; i++) {
              arr = arr.concat(res.data[i].valves)
            }
            for (let j = 0; j < arr.length; j++) {
              for (let k = 0; k < this.FMresultIDS.length; k++) {
                if (arr[j].id == this.FMresultIDS[k]) {
                  this.FMresult.push(arr[j])
                  break;
                }
              }
            }
            this.FMList = arr;
            this.active = 3;
            this.$nextTick(() => {
              this.toggleSelection(this.FMresult);
            })
          }
        }
      );
    },
    three() {
      this.everyDayTime = 0;
      let flag = this.dataList.map(v => {
        return (
          Object.keys(v).length ==
          Object.values(v).filter(val => val !== "").length
        );
      });
      if (this.name == "") {
        this.$message({
          message: "计划名称不能为空",
          type: "warning"
        })
        return;
      }
      if (this.time.length == 0) {
        this.$message({
          message: "请选择每周灌溉日",
          type: "warning"
        })
        return;
      }
      if (this.timeList.length == 0) {
        this.$message({
          message: "灌溉时间不能为空",
          type: "warning"
        })
        return;
      }
      if (flag.some(v => v === false)) {
        //存在有空值的定时器
        this.$message({
          message: "存在空时间段",
          type: "warning"
        })
        return;
      }
      for (let i in this.dataList) {
        if (
          this.dataList[i].startTime.split(":").join("") >
          this.dataList[i].endTime.split(":").join("")
        ) {
          this.$message({
          message: "开始时间不能大于结束时间",
          type: "warning"
        })
          return;
        }
      }
      for (let i in this.dataList) {
        const end = this.dataList[i].endTime;
        const start = this.dataList[i].startTime;
        this.everyDayTime +=
          Number(end.split(":")[0] * 60) +
          Number(end.split(":")[1]) -
          (Number(start.split(":")[0] * 60) + Number(start.split(":")[1]));
      }
      this.active = 2;
    },
    dateChange(value, item) {
      if (item == "startDate") {
        this.startDate = value
      } else if (item == "endDate") {
        this.endDate = value
      }
    },
    change(value, setp) {
      this.setp = setp
      //对设置好的定时器进行对应的判断
      this.timeList.push(value);
      //对设置好的定时器进行对应的判断
      // if (this.setp.name === "endTime") {
      //   if (this.dataList[this.setp.index].startTime === "") {
      //     // this.$message({
      //     //   message: "请先选择开始时间",
      //     //   type: "warning"
      //     // })
      //     return;
      //   }
      // }
      this.dataList[this.setp.index][this.setp.name] = value;
    },
    //删除时间选择
    delTime(i) {
      this.dataList.splice(i, 1);
      this.timeList.splice(2 * i, 2);
      this.$message({
        message: "删除成功",
        type: "success"
      })
    },
    //添加时间选择
    addTime() {
      const obj = {
        startTime: "",
        endTime: ""
      };
      this.dataList.push(obj);
    },
    //周期选取
    chooseTime(item) {
      if (this.time.indexOf(item.time) == -1) {
        this.time.push(item.time);
      } else {
        const i = this.time.indexOf(item.time);
        this.time.splice(i, 1);
      }
    },
    //自定义
    addDefault() {
      this.strategy_id = "";
      this.active = 1;
      this.time = [];
      this.timeList = [];
      this.FMresult = [];
      this.FTresult = []
      this.FMresultIDS = [];
      this.FTresultIDS = [];
      this.name = "";
      this.dataList = [
        {
          startTime: "",
          endTime: ""
        }
      ];
      this.startDate = `${new Date().getFullYear()}-${
        new Date().getMonth() + 1 > 9
          ? new Date().getMonth() + 1
          : "0" + (new Date().getMonth() + 1)
      }-${
        new Date().getDate() > 9
          ? new Date().getDate()
          : "0" + new Date().getDate()
      }`;
      this.endDate = "";
    },
    //推荐默认计划1
    defaultPlanOne() {
      this.strategy_id = "";
      this.FMresult = [];
      this.FTresult = []
      this.FMresultIDS = [];
      this.FTresultIDS = [];
      this.active = 1;
      this.name = "计划1";
      this.time = ["1", "2", "3", "4", "5", "6", "7"];
      this.dataList = [
        {
          startTime: "08:30",
          endTime: "09:00"
        }
      ];
      this.timeList = ["08:30", "09:00"];
      this.startDate = `${new Date().getFullYear()}-${
        new Date().getMonth() + 1 > 9
          ? new Date().getMonth() + 1
          : "0" + (new Date().getMonth() + 1)
      }-${
        new Date().getDate() > 9
          ? new Date().getDate()
          : "0" + new Date().getDate()
      }`;
      const dateList = this.startDate.split("-");
      if (+dateList[1] + 1 > 12) {
        this.endDate = `${+dateList[0] + 1}-01-${dateList[2]}`;
      } else {
        this.endDate = `${dateList[0]}-${
          +dateList[1] + 1 > 9 ? +dateList[1] + 1 : "0" + (+dateList[1] + 1)
        }-${dateList[2]}`;
      }
    },
    //推荐默认计划2
    defaultPlanTwo() {
      this.strategy_id = "";
      this.FMresult = [];
      this.FTresult = []
      this.FMresultIDS = [];
      this.FTresultIDS = [];
      this.active = 1;
      this.name = "计划2";
      this.time = ["1", "2", "3", "4", "5", "6", "7"];
      this.dataList = [
        {
          startTime: "08:30",
          endTime: "09:00"
        },
        {
          startTime: "19:00",
          endTime: "19:30"
        }
      ];
      this.timeList = ["08:30", "09:00", "19:00", "19:30"];
      this.startDate = `${new Date().getFullYear()}-${
        new Date().getMonth() + 1 > 9
          ? new Date().getMonth() + 1
          : "0" + (new Date().getMonth() + 1)
      }-${
        new Date().getDate() > 9
          ? new Date().getDate()
          : "0" + new Date().getDate()
      }`;
      const dateList = this.startDate.split("-");
      if (+dateList[1] + 1 > 12) {
        this.endDate = `${+dateList[0] + 1}-01-${dateList[2]}`;
      } else {
        this.endDate = `${dateList[0]}-${
          +dateList[1] + 1 > 9 ? +dateList[1] + 1 : "0" + (+dateList[1] + 1)
        }-${dateList[2]}`;
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.chooseCard
  display flex
  width 1000px
  margin 20px auto
.card
  flex 1
  height 200px
  border 1px solid #cccccc
  border-radius 5px
  margin 5px
  cursor pointer
  padding 10px
.userDefault
  line-height 200px
  text-align center
  font-size 20px
.card:hover
  background rgba(0,0,0,0.1)
.recommend
  margin-top 20px
  display flex
  font-size 14px
.day
  display inline-block
  padding 10px 15px
  color #ffffff
  background #ccc
  border-radius 5px
  cursor pointer
.flex
  display flex
  align-items center
.codeord
  width 70px
.flex-row
  display flex
  align-self center
  cursor pointer
.info
  display flex
  margin 20px 0
.infoCard
  flex 1
.finalTimeList
  display flex
  justify-content center
.finalWeek
  display flex
  align-items center
  margin-bottom 10px
  padding 10px 0
.timeDay
  flex 1
  text-align center
.finalDay
  display inline-block
  padding 10px 20px
  border-radius 5px
  font-size 10px
  color #ffffff
  background #ccc
.choosed
  display inline-block
  margin 5px
  width 50px
  height 60px
  color #fff
  background #18A0EA
  border-radius 5px
  text-align center
  p
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    margin 10px 0
.chooseFM
  display inline-block
  font-size 10px
  padding 10px 15px
  border-radius 5px
  background #18A0EA
  color #fff
  text-align center
  margin 5px
</style>