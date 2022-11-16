<template>
  <!-- 入口界面 -->
  <div style="background: #ffffff;">
    <div style="display: flex;">
      <div style="width:30%">
        <div
          v-if="checkExist(fmDeviceSta.host_state)"
          class="fmDeviceStaDiv"
        >设备主机状态：{{getHostStateVal(fmDeviceSta.host_state)}}</div>
        <div
          v-if="checkExist(fmDeviceSta.ip)"
          class="fmDeviceStaDiv"
        >设备IP地址：{{fmDeviceSta.ip}}</div>
        <div
          v-if="checkExist(fmDeviceSta.radio)"
          class="fmDeviceStaDiv"
        >当前配方的比例：{{fmDeviceSta.radio}}</div>
        <div
          v-if="checkExist(fmDeviceSta.rtd_current_flow)"
          class="fmDeviceStaDiv"
        >当前流速：{{fmDeviceSta.rtd_current_flow}}m³/h</div>
        <div
          v-if="checkExist(fmDeviceSta.rtd_devs)"
          class="fmDeviceStaDiv"
        >当前打开的阀门：{{fmDeviceSta.rtd_devs}}</div>
        <div
          v-if="checkExist(fmDeviceSta.rtd_fml)"
          class="fmDeviceStaDiv"
        >当前配方：{{fmDeviceSta.rtd_fml}}</div>
        <div
          v-if="checkExist(fmDeviceSta.rtd_irr)"
          class="fmDeviceStaDiv"
        >当前运行的计划：{{fmDeviceSta.rtd_irr}}</div>
        <div
          v-if="checkExist(fmDeviceSta.rtd_remaining_time)"
          class="fmDeviceStaDiv"
        >当前事务的剩余运行时间：{{fmDeviceSta.rtd_remaining_time}}</div>
        <div
          v-if="checkExist(fmDeviceSta.rtd_setting_flow)"
          class="fmDeviceStaDiv"
        >当前设定的流量：{{fmDeviceSta.rtd_setting_flow}}m³/h</div>
        <div
          v-if="checkExist(fmDeviceSta.rtd_total_flow)"
          class="fmDeviceStaDiv"
        >当前的流量：{{fmDeviceSta.rtd_total_flow}}m³/h</div>
        <div
          v-if="checkExist(fmDeviceSta.setting_ec)"
          class="fmDeviceStaDiv"
        > EC设定值：{{fmDeviceSta.setting_ec}}mS/cm</div>
        <div
          v-if="checkExist(fmDeviceSta.setting_ph)"
          class="fmDeviceStaDiv"
        >PH设定值：{{fmDeviceSta.setting_ph}}</div>
        <div
          v-if="checkExist(fmDeviceSta.version)"
          class="fmDeviceStaDiv"
        >程序版本号：{{fmDeviceSta.version}}</div>
      </div>
      <div style="width:70%">
        <div style="text-align:right;margin-right:15px;">
          <el-select
            v-model="devId"
            placeholder="请选择"
            @change="getIrrFerSum()"
            size="mini"
            :disabled="!deviceOnline"
          >
            <el-option
              v-for="item in devList"
              :key="item._id"
              :label="item.dev_name"
              :value="item._id"
            >
            </el-option>
          </el-select>
          <el-date-picker
            v-model="irrFerSumTime"
            align="right"
            type="daterange"
            placeholder="选择日期"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            @change="getIrrFerSum()"
            :disabled="!deviceOnline"
            size="mini"
          />
        </div>
        <div style="height:100%;min-height:430px;">
          <jkfmIrrFerSumChat :irrFerSumList="irrFerSumList" />
        </div>
      </div>
    </div>
    <div>
      <div style="display: flex;justify-content: space-evenly;">

        <el-button
          type="primary"
          size="mini"
          @click="dev"
          :disabled="!deviceOnline"
        >阀门设置</el-button>

        <el-button
          type="primary"
          size="mini"
          @click="block"
          :disabled="!deviceOnline"
        >阀门组设置</el-button>

        <el-button
          type="primary"
          size="mini"
          @click="formula"
          :disabled="!deviceOnline"
        >配方设置</el-button>

        <el-button
          type="primary"
          size="mini"
          @click="plan"
          :disabled="!deviceOnline"
        >计划配置</el-button>

        <el-button
          type="primary"
          size="mini"
          @click="todayTask"
          :disabled="!deviceOnline"
        >今日任务</el-button>

        <el-button
          type="success"
          size="mini"
          @click="startPlan"
          :disabled="!deviceOnline"
        >启动计划</el-button>

        <el-button
          type="danger"
          size="mini"
          @click="stopPlan"
          :disabled="!(deviceOnline && checkUserPermission( ['ADMIN','DEVICE_ALL','DEVICE_EDIT']))"
        >停止计划</el-button>

        <el-dialog
          v-if="devDialogVisible"
          :visible.sync="devDialogVisible"
          append-to-body
          title="阀门设置"
          width="1500px"
        >
          <jkfmDev :device_id="device_id" />
        </el-dialog>

        <el-dialog
          v-if="blockDialogVisible"
          :visible.sync="blockDialogVisible"
          append-to-body
          title="阀门组设置"
          width="1500px"
        >
          <jkfmBlock :device_id="device_id" />
        </el-dialog>

        <el-dialog
          v-if="formulaDialogVisible"
          :visible.sync="formulaDialogVisible"
          append-to-body
          title="配方设置"
          width="1500px"
        >
          <jkfmFormula :device_id="device_id" />
        </el-dialog>

        <el-dialog
          v-if="planDialogVisible"
          :visible.sync="planDialogVisible"
          append-to-body
          title="计划设置"
          width="1200px"
        >
          <jkfmPlan
            :device_id="device_id"
            :sysDevList="sysDevList"
          />
        </el-dialog>

        <el-dialog
          v-if="todayTaskDialogVisible"
          :visible.sync="todayTaskDialogVisible"
          append-to-body
          title="今日任务"
          width="1200px"
        >
          <jkfmTodayTask :device_id="device_id" />
        </el-dialog>

        <el-dialog
          v-if="startPlanDialogVisible"
          :visible.sync="startPlanDialogVisible"
          append-to-body
          title="启动计划"
          width="1200px"
        >
          <jkfmStartPlan
            :device_id="device_id"
            :startPlanSuccessFunction="startPlanSuccessFunction"
            :rtd_irr="fmDeviceSta.rtd_irr"
          />
        </el-dialog>

      </div>
    </div>
  </div>
</template>
<script>

import { getDev, getSysDev, getSta, stopPlan, getIrrFerSum } from '@/utils/jkfm_websocket_util'
import jkfmDev from './JkfmDev'
import jkfmBlock from './JkfmBlock'
import jkfmFormula from './JkfmFormula'
import jkfmPlan from './JkfmPlan'
import jkfmTodayTask from './JkfmTodayTask'
import jkfmStartPlan from './JkfmStartPlan'
import jkfmIrrFerSumChat from './JkfmIrrFerSumChat'
import checkUserPermission from '@/utils/user_permission'

export default {
  components: {
    jkfmDev, jkfmBlock, jkfmFormula, jkfmPlan, jkfmTodayTask, jkfmStartPlan, jkfmIrrFerSumChat
  },
  props: {
    device_id: {
      type: String,
      default: null
    },
    offLineFunction: {
      type: Function
    }
  },
  data () {
    return {
      deviceOnline: false,//设备在线
      devDialogVisible: false,//阀门弹窗
      blockDialogVisible: false,//阀门组弹窗
      formulaDialogVisible: false,//配方弹窗
      planDialogVisible: false,//计划弹窗
      todayTaskDialogVisible: false,//今日任务弹窗
      startPlanDialogVisible: false,//启动计划弹窗
      sysDevList: [],//系统设备列表
      devId: null,//选中的阀门ID
      devList: [],//阀门列表
      fmDeviceSta: {
        channelValue: [],//通道数据
        host_state: null,//设备主机状态
        ip: null,
        radio: null,//当前配方的比例
        rtd_current_flow: null,//当前流速 单位：m³/h
        rtd_devs: null,//当前打开的阀门
        rtd_fml: null, //当前配方
        rtd_irr: null,//当前运行的计划
        rtd_remaining_time: null,//当前事务的剩余运行时间 单位：mm:ss
        rtd_setting_flow: null,//当前设定的流量 单位：m³/h
        rtd_total_flow: null,//当前的流量	单位：m³/h
        setting_ec: null,//EC设定值	单位：mS/cm
        setting_ph: null,//PH设定值
        version: null,//程序版本号
      },
      hostStateOptions: [
        { name: '无此设备', val: -1 },
        { name: '离线', val: 0 },
        { name: '正常运行', val: 1 },
        { name: '休眠中', val: 2 },
        { name: '充电中', val: 3 },
        { name: '故障', val: 4 },
      ],
      pickerOptions: {//约束时间范围,水肥机保存数据最多是一个月
        disabledDate (time) {
          return time.getTime() > Date.now() || time.getTime() < (Date.now() - (31 * 86400000));
        },
      },
      irrFerSumTime: null,//查询累计水肥时间
      irrFerSumList: [],//累计水肥数据
    }
  },
  mounted () {
    if (this.$route.query.device_id) {
      this.device_id = this.$route.query.device_id
    }
    this.init()
  },
  methods: {
    //判断权限
    checkUserPermission,
    //初始化
    init () {
      this.initFmDeviceSta()
      this.getSysDev()
      this.getSta()
      this.initIrrFerSum()
    },
    //初始化累计水肥(第一次进来默认加载)
    initIrrFerSum () {
      getDev(this.device_id, this.$ws)
        .then(res => {
          if (res.code === 200) {
            this.devList = res.data.msgbd_content
            this.devId = this.devList[0]._id
            let now = new Date()
            let time = []
            time.push(new Date(now.getTime() - (7 * 86400000)))//七天前
            time.push(now)//当前时间
            this.irrFerSumTime = time
            this.getIrrFerSum()
            this.$forceUpdate()
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.msg)
        });
    },
    //获取累计水肥 (不存数据库,直接通过协议获取)
    getIrrFerSum () {
      if (this.devList.length === 0) {
        return
      }
      if (!this.devId) {
        return
      }
      if (!this.irrFerSumTime) {
        return
      }
      let time = this.irrFerSumTime[0].getTime() + '-' + (this.irrFerSumTime[1].getTime() + 86400000)
      this.irrFerSumList = []
      getIrrFerSum(this.device_id, this.devId, time, this.$ws)
        .then(res => {
          if (res.code === 200) {
            this.irrFerSumList = res.data.msgbd_content
            this.$forceUpdate()
          } else {
            this.$message.error(res.msg)

          }
        }).catch(err => {
          this.$message.error(err.msg)
        });
    },
    //初始化水肥状态
    initFmDeviceSta () {
      this.fmDeviceSta = {
        channelValue: [],//通道数据
        host_state: null,//设备主机状态
        ip: null,
        radio: null,//当前配方的比例
        rtd_current_flow: null,//当前流速 单位：m³/h
        rtd_devs: null,//当前打开的阀门
        rtd_fml: null, //当前配方
        rtd_irr: null,//当前运行的计划
        rtd_remaining_time: null,//当前事务的剩余运行时间 单位：mm:ss
        rtd_setting_flow: null,//当前设定的流量 单位：m³/h
        rtd_total_flow: null,//当前的流量	单位：m³/h
        setting_ec: null,//EC设定值	单位：mS/cm
        setting_ph: null,//PH设定值
        version: null,//程序版本号
      }
    },
    //获取设备主机状态
    getHostStateVal (val) {
      for (let i = 0; i < this.hostStateOptions.length; i++) {
        if (val === this.hostStateOptions[i].val) {
          return this.hostStateOptions[i].name
        }
      }
      return '正常'
    },
    //判断是否存在
    checkExist (val) {
      if (val !== null && val !== undefined) {
        return true
      }
      return false
    },
    //获取设备运行状态
    getSta () {
      getSta(this.device_id, this.$ws)
        .then(res => {
          if (res.code === 200) {
            this.fmDeviceSta = res.data.property_values.msgbd_content
            this.deviceOnline = true
            this.$forceUpdate()
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.msg)
        });
      // setTimeout(() => {
      //   if (!this.deviceOnline) {
      //     this.$message.error('设备已离线')
      //     this.offLineFunction()
      //   }
      // }, 30000);
    },
    //点击阀门
    dev () {
      this.devDialogVisible = true
    },
    //点击阀门组
    block () {
      this.blockDialogVisible = true
    },
    //点击配方
    formula () {
      this.formulaDialogVisible = true
    },
    //点击计划
    plan () {
      this.planDialogVisible = true
    },
    //点击今日任务
    todayTask () {
      this.todayTaskDialogVisible = true
    },
    //点击启动计划
    startPlan () {
      this.startPlanDialogVisible = true
    },
    //点击停止计划
    stopPlan () {
      stopPlan(this.device_id, this.$ws)
        .then(res => {
          if (res.code === 200) {
            this.$message.success('停止成功')
            this.getSta()
            this.$forceUpdate()
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.msg)
        });
    },
    //获取系统设备
    getSysDev () {
      getSysDev(this.device_id, this.$ws)
        .then(res => {
          if (res.code === 200) {
            this.sysDevList = res.data.msgbd_content
            this.deviceOnline = true
            this.$forceUpdate()
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.msg)
        });
    },
    //启动计划成功回调
    startPlanSuccessFunction () {
      this.getSta()
      this.startPlanDialogVisible = false
    },
  }
}
</script>
<style scoped>
.fmDeviceStaDiv {
  margin: 15px;
  font-size: 20px;
  /* width: 49%;
  display: inline-block;
  text-align: center; */
}
</style>
