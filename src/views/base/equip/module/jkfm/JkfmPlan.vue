<template>
  <!-- 新水肥计划 -->
  <div>
    <div>
      <el-tabs
        tab-position="left"
        @tab-click="planClick"
      >
        <el-tab-pane
          v-for="(item,index) in planList"
          :key="index"
        >
          <div
            slot="label"
            style="hight:100px;"
          >
            <span>{{item.irr_name}}</span>
            <span><i class="el-icon-date"></i></span>
          </div>
          <div>
            <div style="text-align:center;margin-bottom:25px;">
              <el-input
                size="mini"
                v-model="item.irr_name"
                style="width:200px"
                :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
              />
            </div>
            <!-- 事务 -->
            <div>
              <div
                v-for="(t,index2) in item.tasks"
                :key="index2"
                class="taskDiv"
              >
                <div style="display: flex;justify-content: space-between;">
                  <div @click="editTask(t,index2)">
                    <el-button
                      size="mini"
                      type="primary"
                      circle
                    > {{index2+1}}</el-button>
                    <!-- <span class="taskIndex"></span> -->
                    <span v-if="t.it_db_id>0">{{getBlockName(t.it_db_id)}}</span>
                    <span v-if="t.it_dev_id>0">{{getDevName(t.it_dev_id)}}</span>
                    <span>（使用配方：{{getFormulaName(t.it_fml_id)}}）</span>
                    <span>灌溉</span>
                    <span v-if="t.it_flow>0">{{t.it_flow}}m³</span>
                    <span v-if="t.it_flow>0 && t.it_span_time>0">|</span>
                    <span v-if="t.it_span_time>0">{{t.it_span_time}}min</span>
                  </div>
                  <div>
                    <el-button
                      type="primary"
                      size="mini"
                      @click="editTask(t,index2)"
                      :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
                    >编辑</el-button>
                    <el-button
                      type="danger"
                      size="mini"
                      @click="deleteTask(item.tasks,index2)"
                      :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
                    >删除</el-button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 循环 -->
            <div style="font-size: 26px;margin-bottom: 15px;">
              循环次数：<el-input
                v-model="item.irr_recircle_time"
                size="mini"
                style="width:100px"
                @change="initPlanTimeStr(plan)"
                :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
              ></el-input>
              　　　
              循环间隔：<el-input
                v-model="item.irr_recircle_interval_time"
                size="mini"
                style="width:100px"
                @change="initPlanTimeStr(plan)"
                :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
              ></el-input>min
            </div>

            <!-- 运行时间 irr_control_way 0手动 1时间-->
            <div
              class="planLine"
              v-if="item.irr_control_way===1"
            >
              <div @click="timeDialogVisible = true">
                <i class="el-icon-time" />
                {{item.timeStr}}
              </div>
              <el-button
                type="danger"
                size="mini"
                @click="deletePlanTime(item)"
                :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
              >删除</el-button>
            </div>

            <!-- 光辐射 -->
            <div
              v-if="item.radInfo && item.radInfo!==''"
              class="planLine"
              @click="editRad()"
            >
              <div>
                <i class="el-icon-sunny" />
                {{item.radInfo}}
              </div>
            </div>

            <!-- 液位 -->
            <div
              class="planLine"
              v-if="item.irr_level_id>0"
            >
              <div @click="levelDialogVisible = true">
                <i class="el-icon-ship" />
                {{getLevelDevStr(item)}}：高液位 {{item.irr_level_max}}m，低液位 {{item.irr_level_min}}m
              </div>
              <el-button
                type="danger"
                size="mini"
                @click="deletePlanLevel(item)"
                :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
              >删除</el-button>
            </div>

            <!-- 操作 -->
            <div style="display: flex;justify-content: space-around;">
              <el-button
                size="mini"
                :type="item.irr_enable===0?'danger':'success'"
                @click="changePlanEnable(item)"
                :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
              >
                {{item.irr_enable===0?'禁用':'启用'}}
              </el-button>

              <el-button
                size="mini"
                :type="(item.tasks && item.tasks.length!==0)?'success':'primary'"
                @click="addTask()"
                :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
              >添加</el-button>

              <el-button
                size="mini"
                :type="item.irr_control_way===0?'primary':'success'"
                @click="timeDialogVisible = true"
              >时间</el-button>

              <el-button
                size="mini"
                @click="editRad()"
                :type="checkRadActivate(item)?'success':'primary'"
              >光辐射</el-button>

              <!--   <el-button
                size="mini"
                type="primary"
              >湿度</el-button> -->

              <el-button
                size="mini"
                :disabled="levelDevList.length===0"
                @click="editLevel(item)"
                :type="(item.irr_level_id && item.irr_level_id!==0)?'success':'primary'"
              >液位</el-button>

              <el-button
                size="mini"
                type="primary"
                @click="savePlan"
                :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
              >保存</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>

      <!-- 事务弹窗 -->
      <el-dialog
        v-if="taskDialogVisible"
        :visible.sync="taskDialogVisible"
        append-to-body
        title="请按顺序选择设备"
        width="800px"
      >
        <div
          style="display:flex;font-size: 21px;"
          v-if="taskStep === 1"
        >
          <div style="width:50%">
            <div style="text-align:center;margin-bottom: 10px;">阀门</div>
            <div>
              <div
                v-for="(item,index) in devList"
                :key="index"
                style="width:50%;display: inline-block;text-align: center;margin-bottom: 10px;"
              >
                <el-checkbox
                  :value="getDevValue(item)"
                  @change="devChange(item)"
                  :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
                />{{item.dev_name}}
              </div>
            </div>
          </div>
          <div style="width:50%">
            <div style="text-align:center;margin-bottom: 10px;">设备组</div>
            <div>
              <div
                v-for="(item,index) in blockList"
                :key="index"
                style="width:50%;display: inline-block;text-align: center;"
              >
                <el-checkbox
                  :value="getBlockValue(item)"
                  @change="blockChange(item)"
                  :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
                /> {{item.db_name}}
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="taskStep === 2"
          style="font-size: 21px;"
        >
          <div style="text-align:center;margin-bottom: 10px;"> 请选择配方</div>
          <div>
            <div
              v-for="(item,index) in formulaList"
              :key="index"
              style="width:50%;display: inline-block;text-align: center;margin-bottom: 10px;"
            >
              <el-checkbox
                :value="getFormulaValue(item)"
                @change="formulaChange(item)"
                :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
              />{{item.fml_name}}
            </div>
          </div>

          <div style="display: flex;justify-content: space-around;margin: 15px;">
            <div>灌溉时长(min)：
              <el-input
                v-model="task.it_span_time"
                size="mini"
                style="width:100px;"
                :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
              />
            </div>
            <div>灌溉量(m³)：
              <el-input
                v-model="task.it_flow"
                size="mini"
                style="width:100px;"
                :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
              />
            </div>
          </div>
        </div>
        <div style="text-align:right;">
          <el-button
            v-if="taskStep === 1"
            size="mini"
            type="primary"
            @click="nextTaskStep()"
          >下一步</el-button>
          <el-button
            v-if="taskStep === 2"
            size="mini"
            type="primary"
            @click="taskStep = 1"
          >上一步</el-button>
          <el-button
            v-if="taskStep === 2"
            size="mini"
            type="primary"
            @click="saveTask()"
            :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
          >确定</el-button>
        </div>
      </el-dialog>

      <!-- 时间弹窗 -->
      <el-dialog
        v-if="timeDialogVisible"
        :visible.sync="timeDialogVisible"
        append-to-body
        title="时间配置"
        width="800px"
      >
        <el-tabs
          v-model="timeDialogActiveName"
          @tab-click="handleClick"
        >
          <el-tab-pane
            label="周计划"
            name="weekPlan"
          >
            <div>
              <div style="text-align: center;margin-bottom: 20px;">
                启动时间:<el-time-picker
                  size="mini"
                  v-model="plan.irr_start_time"
                  value-format="HH:mm"
                  format="HH:mm"
                  :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
                >
                </el-time-picker>
              </div>
              <div class="weekClass">
                <div
                  v-for="(item,index) in plan.weeks"
                  :key="index"
                >
                  <el-checkbox
                    :value="item === '1'"
                    @change="weekChange(index)"
                    :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
                  />{{weekOptions[index].name}}
                </div>
              </div>
              <div class="saveButton">
                <el-button
                  type="primary"
                  size="mini"
                  @click="changePlanTime(0,plan)"
                  :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
                >确定</el-button>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane
            label="日期计划"
            name="datePlan"
          >
            <div class="dateClass">
              <div>
                <span class="demonstration">开始日期</span>
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  class="dateInput"
                  size="mini"
                  v-model="plan.irr_span_day0"
                  type="date"
                  placeholder="选择日期"
                  :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
                />
              </div>
              <div>
                <span class="demonstration">启动时间</span>
                <el-time-picker
                  size="mini"
                  v-model="plan.irr_start_time"
                  value-format="HH:mm"
                  format="HH:mm"
                  class="dateInput"
                  :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
                >
                </el-time-picker>
              </div>
            </div>
            <div class="dateClass">
              <div>
                <span class="demonstration">结束日期</span>
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  class="dateInput"
                  size="mini"
                  v-model="plan.irr_span_day1"
                  type="date"
                  placeholder="选择日期"
                  :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
                />
              </div>
              <div>
                <span class="demonstration">间隔天数</span>
                <el-input-number
                  class="dateInput"
                  v-model="plan.irr_span_day2"
                  :min="0"
                  size="mini"
                  :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
                />
              </div>
            </div>
            <div class="saveButton">
              <el-button
                type="primary"
                size="mini"
                @click="changePlanTime(1,plan)"
                :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
              >确定</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>

      <!-- 光辐射弹窗 -->
      <el-dialog
        v-if="radDialogVisible"
        :visible.sync="radDialogVisible"
        append-to-body
        title="光辐射计划"
        width="800px"
        @close="getRad()"
      >
        <div>
          <div
            v-for="(item,index) in radList"
            :key="index"
          >
            <div>
              <div style="text-align:center;font-size:20px;margin-bottom:15px;">
                光辐射计划{{index+1}}
              </div>
              <div class="radDiv">
                启动时段：
                <el-time-picker
                  size="mini"
                  is-range
                  v-model="item.rad_edit_time"
                  value-format="HH:mm"
                  format="HH:mm"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  placeholder="选择时间范围"
                  :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
                >
                </el-time-picker>
              </div>
              <div class="radDiv">
                累积量：
                <el-input
                  v-model="item.rad_radiation_setting"
                  size="mini"
                  style="width:100px;"
                  :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
                />J/cm²
              </div>
              <div class="radDiv">
                最小休息时间：
                <el-input
                  v-model="item.rad_min_rest_time"
                  size="mini"
                  style="width:100px;"
                  :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
                />min
              </div>
              <div class="radDiv">
                最大休息时间：
                <el-input
                  v-model="item.rad_max_rest_time"
                  size="mini"
                  style="width:100px;"
                  :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
                />min
              </div>
              <div class="radDiv">
                时段状态
                <el-radio
                  v-model="item.rad_enable"
                  :label="1"
                  :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
                >启用</el-radio>
                <el-radio
                  v-model="item.rad_enable"
                  :label="0"
                  :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
                >禁用</el-radio>
              </div>
              <div class="radDiv">
                <div style="display:flex;">
                  <div>
                    触发程序：
                  </div>
                  <div v-if="checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])">
                    <el-tag
                      :key="index2"
                      v-for="(irr,index2) in item.irrs"
                      closable
                      :disable-transitions="false"
                      @close="deleteRadIrr(item,index2)"
                    >
                      {{irr.irr_name}}
                    </el-tag>
                  </div>
                  <div v-else>
                    <el-tag
                      :key="index2"
                      v-for="(irr,index2) in item.irrs"
                    > {{irr.irr_name}}</el-tag>
                  </div>
                </div>
              </div>
              <div class="radDiv">
                <el-button
                  size="mini"
                  type="success"
                  @click="radAddPlan(item)"
                  :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
                >添加计划
                </el-button>
                <el-button
                  size="mini"
                  type="primary"
                  @click="setRad (item)"
                  :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
                >保存
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
      <!-- 光辐射添加计划 -->
      <el-dialog
        v-if="radAddPlanDialogVisible"
        :visible.sync="radAddPlanDialogVisible"
        append-to-body
        title="添加计划"
        width="800px"
      >
        <div>
          <div
            v-for="(item,index) in planList"
            :key="index"
            style="width:50%;display: inline-block;text-align: center;margin-bottom: 10px;"
          >
            <el-checkbox
              :value="getRadAddPlanValue(item)"
              @change="radAddPlanChange(item)"
              :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
            />{{item.irr_name}}
          </div>
          <div class="saveButton">
            <el-button
              type="primary"
              size="mini"
              @click="changeRadPlan()"
              :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
            >确定
            </el-button>
          </div>
        </div>
      </el-dialog>
      <!-- 液位弹窗 -->
      <el-dialog
        v-if="levelDialogVisible"
        :visible.sync="levelDialogVisible"
        append-to-body
        title="液位编辑"
        width="800px"
      >
        <div>
          <div class="centerBottom">
            <span class="demonstration">选择液位</span>
            <el-select
              v-model="plan.irr_level_id_ls"
              placeholder="请选择"
              size="mini"
              class="dateInput"
              clearable
              :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
            >
              <el-option
                v-for="item in levelDevList"
                :key="item._id"
                :label="item.dev_name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="centerBottom">
            <span class="demonstration">液位上限</span>
            <el-input
              class="dateInput"
              size="mini"
              v-model="plan.irr_level_max"
              :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
            />
          </div>
          <div class="centerBottom">
            <span class="demonstration">液位下限</span>
            <el-input
              class="dateInput"
              size="mini"
              v-model="plan.irr_level_min"
              :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
            />
          </div>
          <div class="saveButton">
            <el-button
              type="primary"
              size="mini"
              @click="changeLevel(plan)"
              :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
            >确定
            </el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getPlan, setPlan, getTask, getFormula, getDev, getBlock, getRad, setRad, getRadIrr } from '@/utils/jkfm_websocket_util'
import { formatDate } from "@/utils/date"
import checkUserPermission from '@/utils/user_permission'

export default {
  props: {
    device_id: {
      type: String,
      default: null,
    },
    sysDevList: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      value1: null,
      weekOptions: [//一周
        { name: '周日', index: '0', value: 1000000 },
        { name: '周六', index: '1', value: 100000 },
        { name: '周五', index: '2', value: 10000 },
        { name: '周四', index: '3', value: 1000 },
        { name: '周三', index: '4', value: 100 },
        { name: '周二', index: '5', value: 10 },
        { name: '周一', index: '6', value: 1 },
      ],
      planList: [],//计划列表
      plan: null,//选中计划
      task: null,//选中事务
      rad: null,//选中光辐射
      devList: [],//阀门列表
      devValueList: [],//点击选中的阀门列表
      blockValueList: [],//点击选中阀门组列表
      blockList: [],//设备组列表
      formulaList: [],//配方列表
      taskDialogVisible: false,//编辑事务弹窗
      taskStep: 1,//1选择阀门 2选择配方
      radList: [],//光源辐射列表
      radDialogVisible: false,//光源辐射弹窗
      radAddPlanDialogVisible: false,//光辐射添加计划
      radAddPlanList: [],//光辐射添加计划列表
      timeDialogVisible: false,//时间弹窗
      timeDialogActiveName: 'weekPlan',//默认选中周计划
      levelDialogVisible: false,//液位弹窗
      levelDevList: [],
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    //判断权限
    checkUserPermission,
    formatDate,
    //初始化
    init () {
      if (this.device_id) {
        this.getPlan()
        this.getFormula()
        this.getDev()
        this.getBlock()
        this.getRad()
        this.getSysDev()
      }
    },
    //判断水肥设置后返回是否成功
    checkJkfmReturnSuccess (data) {
      if (data) {
        if (data.message_body) {
          if (data.message_body.msgbd_result === 0) {
            return true
          } else {
            this.$message.error(data.message_body.msgbd_result_detail)
            return false
          }
        }
      }
      return false
    },
    //保存计划
    savePlan () {
      let plan = JSON.parse(JSON.stringify(this.plan))
      let weekNum = 0
      for (let i = 0; i < plan.weeks.length; i++) {
        if (plan.weeks[i] === '1') {
          weekNum = weekNum + this.weekOptions[i].value
        }
      }
      let msgbd_content = {
        irr: plan,
        tasks: plan.tasks,
      }
      msgbd_content.irr.irr_running_day = parseInt(weekNum, 2);
      msgbd_content.irr.irr_time = new Date().getTime()
      if (msgbd_content.irr.irr_running_condition === 1) {//日期计划
        msgbd_content.irr.irr_span_day = msgbd_content.irr.irr_span_day0 + ';' + msgbd_content.irr.irr_span_day1 + ';' + msgbd_content.irr.irr_span_day2
      } else {//周计划
        msgbd_content.irr.irr_span_day = "0"
      }
      delete msgbd_content.irr.tasks
      delete msgbd_content.irr.weeks

      setPlan(this.device_id, msgbd_content, this.$ws, this.$store.state.user.user.name)
        .then(res => {
          if (res.code === 200) {
            if (this.checkJkfmReturnSuccess(res.data)) {
              this.$message.success(res.msg)
            } else {
              this.init()
            }
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.msg)
        });
    },
    //初始化液位
    initLevel (plan) {
      if (plan.irr_level_id && plan.irr_level_id !== 0) {
        plan.irr_level_id_ls = plan.irr_level_id
      } else {
        plan.irr_level_id_ls = null
      }
    },
    //编辑液位
    editLevel (plan) {
      this.initLevel(plan)
      this.levelDialogVisible = true
    },
    //修改液位
    changeLevel (plan) {
      if (plan.irr_level_id_ls) {
        plan.irr_level_id = plan.irr_level_id_ls
      } else {
        plan.irr_level_id = 0
      }
      this.levelDialogVisible = false
    },
    //修改计划时间配置
    changePlanTime (runningCondition, plan) {
      plan.irr_control_way = 1
      this.timeDialogVisible = false
      if (runningCondition === 0) {
        plan.irr_running_condition = 0
      } else if (runningCondition === 1) {
        plan.irr_running_condition = 1
        if (plan.irr_span_day0 === null) {
          this.$message.error('开始日期不能为空')
          return
        }
        if (plan.irr_span_day1 === null) {
          this.$message.error('结束日期不能为空')
          return
        }
        if (plan.irr_span_day2 === null) {
          this.$message.error('间隔天数不能为空')
          return
        }
      }
      //计划时间文字设置
      this.initPlanTimeStr(plan)
      this.$forceUpdate()
    },

    figureOutPlanEndTime (startTime, m) {
      let s = startTime.split(':')
      let addMin = m % 60
      let min = Number(s[1]) + addMin

      let addHour = Math.floor(m / 60)
      if (min >= 60) {
        min = min - 60
        addHour = addHour + 1
      }
      let hour = (Number(s[0]) + addHour) % 24
      return (((hour < 10) ? ('0' + hour) : hour) + ':' + ((min < 10) ? ('0' + min) : min))

    },
    //周计划 星期选中/取消选中
    weekChange (index) {
      if (this.plan.weeks[index] === '1') {
        this.plan.weeks[index] = '0'
      } else {
        this.plan.weeks[index] = '1'
      }
      this.$forceUpdate()
    },
    //光辐射计划文本提示
    getRadEnableStr (plan) {
      let radInfo = ''
      if (this.radList) {
        for (let i = 0; i < this.radList.length; i++) {
          if (this.radList[i].irrs && this.radList[i].rad_enable === 1) {//光辐射时段启用
            for (let j = 0; j < this.radList[i].irrs.length; j++) {
              if (this.radList[i].irrs[j]._id === plan._id) {
                radInfo = (radInfo + this.radList[i].rad_start_time + '-' + this.radList[i].rad_stop_time + '; ')

              }
            }
          }
        }
      }
      plan.radInfo = radInfo
      this.$forceUpdate()
    },
    //获取选中液位名称
    getLevelDevStr (plan) {
      if (plan.irr_level_id && plan.irr_level_id != 0) {
        for (let i = 0; i < this.levelDevList.length; i++) {
          if (this.levelDevList[i]._id === plan.irr_level_id) {
            return this.levelDevList[i].dev_name
          }
        }
      }
      return ''
    },
    //判断光辐射是否激活
    checkRadActivate (plan) {
      let flag = false
      if (this.radList) {
        for (let i = 0; i < this.radList.length; i++) {
          if (this.radList[i].irrs && this.radList[i].rad_enable === 1) {//光辐射时段启用
            for (let j = 0; j < this.radList[i].irrs.length; j++) {
              if (this.radList[i].irrs[j]._id === plan._id) {
                // this.$set(plan, 'radInfo', (plan.radInfo + '光辐射计划' + (i + 1) + ":" + this.radList[i].rad_start_time + '-' + this.radList[i].rad_stop_time + '; '))
                flag = true
              }
            }
          }
        }
      }
      return flag
    },
    //光辐射关联的计划变更
    changeRadPlan () {
      this.rad.irrs = []
      for (let i = 0; i < this.radAddPlanList.length; i++) {
        for (let j = 0; j < this.planList.length; j++) {
          if (this.planList[j]._id === this.radAddPlanList[i]) {
            this.rad.irrs.push(this.planList[j])
          }
        }
      }
      this.radAddPlanDialogVisible = false
      this.$forceUpdate()
    },
    //标记光辐射选中计划
    getRadAddPlanValue (plan) {
      for (let i = 0; i < this.radAddPlanList.length; i++) {
        if (this.radAddPlanList[i] === plan._id) {
          return true
        }
      }
      return false
    },
    //勾选光辐射选中计划/取消光辐射选中计划
    radAddPlanChange (plan) {
      for (let i = 0; i <= this.radAddPlanList.length; i++) {
        if (i == this.radAddPlanList.length) {
          this.radAddPlanList.push(plan._id)
          break
        } else if (plan._id === this.radAddPlanList[i]) {
          this.radAddPlanList.splice(i, 1)
          break
        }
      }
      this.$forceUpdate()
    },
    //为光辐射添加计划
    radAddPlan (item) {
      let checked = false
      this.radAddPlanList = []
      this.rad = item
      for (let i = 0; i < item.irrs.length; i++) {
        this.radAddPlanList.push(item.irrs[i]._id)
        if (item.irrs[i]._id === this.plan._id) {
          checked = true
        }
      }
      if (!checked) {//点击时候自动将当前计划勾选
        this.radAddPlanList.push(this.plan._id)
      }
      this.radAddPlanDialogVisible = true
    },

    //获取系统设备
    getSysDev () {
      if (this.sysDevList.length === 0) {
        getSysDev(this.device_id, this.$ws)
          .then(res => {
            if (res.code === 200) {
              this.sysDevList = res.data.msgbd_content
              this.initSysDev()
              this.$forceUpdate()
            } else {
              this.$message.error(res.msg)
            }
          }).catch(err => {
            this.$message.error(err.msg)
          });
      } else {
        this.initSysDev()
      }
    },
    //初始化液位
    initSysDev () {
      this.levelDevList = []
      for (let i = 0; i < this.sysDevList.length; i++) {
        //液位
        if (this.sysDevList[i].dev_attr1 === '液位传感器'
          && this.sysDevList[i].dev_usefor === '营养液罐'
          && this.sysDevList[i].dev_enable === 1) {
          this.levelDevList.push(this.sysDevList[i])
        }
      }
    },
    //获取已经加入光辐射时段的灌溉计划
    getRadIrr (rad) {
      getRadIrr(this.device_id, rad._id, this.$ws)
        .then(res => {
          if (res.code === 200) {
            rad.irrs = res.data.msgbd_content
            this.getRadEnableStr(this.plan)
            this.$forceUpdate()
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.msg)
        });
    },
    //删除光辐射时段的灌溉计划
    deleteRadIrr (rad, index) {
      rad.irrs.splice(index, 1)
      this.$forceUpdate()
    },
    //获取光辐射
    getRad () {
      getRad(this.device_id, this.$ws)
        .then(res => {
          if (res.code === 200) {
            let list = res.data.msgbd_content
            for (let i = 0; i < list.length; i++) {
              this.getRadIrr(list[i])
              let rad_edit_time = []
              rad_edit_time.push(list[i].rad_start_time)
              rad_edit_time.push(list[i].rad_stop_time)
              list[i].rad_edit_time = rad_edit_time
            }
            this.radList = list
            this.$forceUpdate()
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.msg)
        });
    },
    //设置光辐射计划
    setRad (rad) {
      if (rad.rad_edit_time && rad.rad_edit_time.length === 2) {
        rad.rad_start_time = rad.rad_edit_time[0]
        rad.rad_stop_time = rad.rad_edit_time[1]
      }
      let rad2Irr = []
      for (let i = 0; i < rad.irrs.length; i++) {
        rad2Irr.push({
          r2i_irr_id: rad.irrs[i]._id
        })
      }
      let msgbd_content = {
        radiaton: rad,
        rad2Irr: rad2Irr
      }
      setRad(this.device_id, msgbd_content, this.$ws, this.$store.state.user.user.name)
        .then(res => {
          if (res.code === 200) {
            if (this.checkJkfmReturnSuccess(res.data)) {
              this.$message.success(res.msg)
            } else {
              this.init()
            }
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.msg)
        });
    },
    //获取附属设备(获取阀门)
    getDev () {
      getDev(this.device_id, this.$ws)
        .then(res => {
          if (res.code === 200) {
            this.devList = res.data.msgbd_content
            this.$forceUpdate()
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.msg)
        });
    },
    //获取设备名称
    getDevName (id) {
      for (let i = 0; i < this.devList.length; i++) {
        if (this.devList[i]._id === id) {
          return this.devList[i].dev_name
        }
      }
      return ''
    },
    //获取编组(设备组)
    getBlock () {
      getBlock(this.device_id, this.$ws)
        .then(res => {
          if (res.code === 200) {
            res.data.msgbd_content.map(v => {
              if (v.db_active === 1) {
                this.blockList.push(v)
              }
            })
            this.$forceUpdate()
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.msg)
        });
    },
    //获取设备编组名称
    getBlockName (id) {
      for (let i = 0; i < this.blockList.length; i++) {
        if (this.blockList[i]._id === id) {
          return this.blockList[i].db_name
        }
      }
      return ''
    },
    //获取配方
    getFormula () {
      getFormula(this.device_id, this.$ws)
        .then(res => {
          if (res.code === 200) {
            this.formulaList = res.data.msgbd_content
            this.$forceUpdate()
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.msg)
        });
    },
    //获取配方名称
    getFormulaName (id) {
      for (let i = 0; i < this.formulaList.length; i++) {
        if (this.formulaList[i]._id === id) {
          return this.formulaList[i].fml_name
        }
      }
      return '无'
    },
    //对计划数据进行初始化
    initPlan (plan) {
      //获取事务
      this.getTask(plan)
      //初始化计划的时间
      this.initPlanWeekAndDate(plan)
      //计划时间文字设置
      this.initPlanTimeStr(plan)
      //初始化液位
      this.initLevel(plan)
    },
    //往前补0
    addZero (val, size) {
      if (val.length < size) {
        return this.addZero(('0' + val), size)
      } else {
        return val
      }
    },
    initPlanWeekAndDate (plan) {
      //初始化周计划
      if (plan.irr_running_day) {
        let a = plan.irr_running_day
        let binary = a.toString(2)
        binary = this.addZero(binary, 7)
        let weeks = binary.split('')
        plan.weeks = weeks
      }
      //初始化日期计划
      if (plan.irr_span_day !== '0') {
        let array = plan.irr_span_day.split(';')
        plan.irr_span_day0 = array[0]//开始日期
        plan.irr_span_day1 = array[1]//结束日期
        plan.irr_span_day2 = Number(array[2]) //间隔天数
      } else {
        plan.irr_span_day0 = this.formatDate(new Date(), 'yyyy-MM-dd')
        plan.irr_span_day1 = this.formatDate(new Date(), 'yyyy-MM-dd')
        plan.irr_span_day2 = 0
      }
    },
    //计划时间文字设置    
    initPlanTimeStr (plan) {
      let taskTime = 0
      //灌溉时长
      if (plan && plan.tasks) {
        for (let i = 0; i < plan.tasks.length; i++) {
          taskTime = taskTime + Number(plan.tasks[i].it_span_time)
        }
      }
      //循环间隔
      if (plan.irr_recircle_interval_time) {
        taskTime = taskTime + Number(plan.irr_recircle_interval_time)
      }
      //循环次数
      if (plan.irr_recircle_time) {
        taskTime = taskTime * (Number(plan.irr_recircle_time) + 1)
      }
      //计算出结束时间
      plan.irr_stop_time = this.figureOutPlanEndTime(plan.irr_start_time, taskTime)
      let str = ''
      if (plan.irr_running_condition === 0) {//周计划
        this.timeDialogActiveName = 'weekPlan'
        for (let i = 0; i < plan.weeks.length; i++) {
          if (plan.weeks[i] === '1') {
            str += this.weekOptions[i].name + ','
          }
        }
      } else if (plan.irr_running_condition === 1) {//日期计划
        this.timeDialogActiveName = 'datePlan'
        str += (plan.irr_span_day0 + '至' + plan.irr_span_day1 + (plan.irr_span_day2 === 0 ? '每天 ' : ',每隔' + plan.irr_span_day2 + '天 '))
      }

      if (plan.irr_start_time && plan.irr_stop_time) {
        str += (plan.irr_start_time) + '-' + (plan.irr_stop_time + ' ' + '运行')
      }
      plan.timeStr = str
      this.$forceUpdate()
    },
    //获取计划
    getPlan () {
      getPlan(this.device_id, 0, this.$ws)
        .then(res => {
          if (res.code === 200) {
            let list = res.data.msgbd_content
            if (list.length !== 0) {
              this.initPlan(list[0])
              this.plan = list[0]
              this.getRadEnableStr(this.plan)
            }
            this.planList = list
            this.$forceUpdate()
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.msg)
        });
    },
    //切换计划
    planClick (tab, event) {
      getPlan(this.device_id, this.planList[tab.index]._id, this.$ws)
        .then(res => {
          if (res.code === 200) {
            let list = res.data.msgbd_content
            if (list.length !== 0) {
              this.initPlan(list[0])
              this.plan = list[0]
              this.getRadEnableStr(this.plan)
              this.planList[tab.index] = list[0]
            }
            this.$forceUpdate()
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.msg)
        });
    },
    //计划禁用/启用
    changePlanEnable (item) {
      if (item.irr_enable === 0) {
        item.irr_enable = 1
      } else {
        item.irr_enable = 0
      }
      this.$forceUpdate()
    },
    // //计划irr_span_day转中文
    // getPlanTimeStr (item) {
    //   let str = ''
    //   if (item.irr_running_condition === 0) {//周计划
    //     if (item.irr_running_day) {
    //       let a = item.irr_running_day
    //       let binary = a.toString(2)
    //       let weeks = binary.split('')
    //       for (let i = 0; i < weeks.length; i++) {
    //         if (weeks[i] === '1') {
    //           str += this.weekOptions[i].name + ','
    //         }
    //       }
    //     }
    //   } else if (item.irr_running_condition === 1) {//日期计划
    //     if (item.irr_span_day) {
    //       let array = item.irr_span_day.split(';')
    //       str += (array[0] + '至' + array[1] + (array[2] === '0' ? '每天 ' : ',每隔' + array[2] + '天 '))
    //     }
    //   }

    //   if (item.irr_start_time && item.irr_stop_time) {
    //     str += (item.irr_start_time) + '-' + (item.irr_stop_time + ' ' + '运行')
    //   }
    //   return str
    // },
    //删除计划时间
    deletePlanTime (item) {
      item.irr_control_way = 0
      this.$forceUpdate()
    },
    //删除计划液位
    deletePlanLevel (item) {
      item.irr_level_id = 0
      this.$forceUpdate()
    },
    //获取事务
    getTask (row) {
      getTask(this.device_id, row._id, this.$ws)
        .then(res => {
          if (res.code === 200) {
            row.tasks = res.data.msgbd_content
            this.initPlanTimeStr(row)
            this.$forceUpdate()
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.msg)
        });
    },
    //新增事务
    addTask () {
      this.taskStep = 1
      this.devValueList = []//选中阀门
      this.blockValueList = []//选中阀门组
      this.task = {
        it_fml_id: 0,//选中配方
        it_flow: 0,//灌溉量
        it_span_time: 0,//灌溉时长
      }
      this.taskIndex = this.plan.tasks.length
      this.taskDialogVisible = true
    },
    //编辑事务
    editTask (task, index) {
      this.taskStep = 1
      this.task = task
      this.taskIndex = index
      this.taskDialogVisible = true
      //阀门
      this.devValueList = []
      if (task.it_dev_id > 0) {
        this.devValueList.push(task.it_dev_id)
      }
      //阀门组
      this.blockValueList = []
      if (task.it_db_id > 0) {
        this.blockValueList.push(task.it_db_id)
      }
    },
    //标记选中阀门
    getDevValue (dev) {
      for (let i = 0; i < this.devValueList.length; i++) {
        if (dev._id === this.devValueList[i]) {
          return true
        }
      }
      return false
    },
    //勾选设备/取消勾选阀门
    devChange (dev) {
      for (let i = 0; i <= this.devValueList.length; i++) {
        if (i == this.devValueList.length) {
          this.devValueList.push(dev._id)
          break
        } else if (dev._id === this.devValueList[i]) {
          this.devValueList.splice(i, 1)
          break
        }
      }
      this.$forceUpdate()
    },
    //标记选中阀门组
    getBlockValue (block) {
      for (let i = 0; i < this.blockValueList.length; i++) {
        if (block._id === this.blockValueList[i]) {
          return true
        }
      }
      return false
    },
    //勾选设备/取消勾选阀门组
    blockChange (block) {
      for (let i = 0; i <= this.blockValueList.length; i++) {
        if (i == this.blockValueList.length) {
          this.blockValueList.push(block._id)
          break
        } else if (block._id === this.blockValueList[i]) {
          this.blockValueList.splice(i, 1)
          break
        }
      }
      this.$forceUpdate()
    },
    //标记选中配方
    getFormulaValue (formula) {
      if (formula._id === this.task.it_fml_id) {
        return true
      }
      return false
    },
    //勾选配方/取消勾选配方
    formulaChange (formula) {
      if (this.task.it_fml_id === formula._id) {
        this.task.it_fml_id = 0
      } else {
        this.task.it_fml_id = formula._id
      }
      this.$forceUpdate()
    },
    //新增页面事务下一步
    nextTaskStep () {
      if (this.devValueList.length === 0 && this.blockValueList.length === 0) {
        this.$message.warning('请选择设备')
        return
      }
      this.taskStep = 2
    },
    //保存事务(追加事务)
    saveTask () {
      if (!(this.task.it_flow > 0 || this.task.it_span_time > 0)) {
        this.$message.warning('请输入时间或灌溉量')
        return
      }

      let array = []
      if (this.devValueList.length > 0) {
        for (let i = 0; i < this.devValueList.length; i++) {
          let a = {
            it_db_id: 0,//阀门组
            it_dev_id: this.devValueList[i],//阀门
            it_fml_id: this.task.it_fml_id,//配方
            it_flow: this.task.it_flow,//灌溉量
            it_span_time: this.task.it_span_time,//灌溉时间
            it_irr_id: this.plan._id,//计划
          }
          array.push(a)
        }
      }
      if (this.blockValueList.length > 0) {
        for (let i = 0; i < this.blockValueList.length; i++) {
          let a = {
            it_db_id: this.blockValueList[i],//阀门组
            it_dev_id: 0,//阀门
            it_fml_id: this.task.it_fml_id,//配方
            it_flow: this.task.it_flow,//灌溉量
            it_span_time: this.task.it_span_time,//灌溉时间
            it_irr_id: this.plan._id,//计划
          }
          array.push(a)
        }
      }
      this.plan.tasks.splice(this.taskIndex, 1, ...array)
      this.taskDialogVisible = false
      this.$forceUpdate()
    },
    //删除事务
    deleteTask (tasks, index) {
      tasks.splice(index, 1)
      this.initPlanTimeStr(this.plan)
      this.$forceUpdate()
    },
    //光辐射按钮
    editRad () {
      this.radDialogVisible = true
      this.$forceUpdate()
    },
  }
}
</script>
<style scoped>
.taskDiv {
  margin-bottom: 15px;
  font-size: 25px;
}

.radDiv {
  margin-bottom: 15px;
  margin-left: 170px;
  font-size: 20px;
}

.taskIndex {
  background: #4c8def;
  color: #ffffff;
}

.planLine {
  background: #7a9bab;
  color: #ffffff;
  font-size: 26px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
}

.weekClass {
  display: flex;
  justify-content: space-around;
}

.dateClass {
  display: flex;
  justify-content: space-around;
  margin: 15px;
}

.dateInput {
  width: 150px;
}

.saveButton {
  text-align: right;
  margin-top: 20px;
}

.centerBottom {
  text-align: center;
  margin-bottom: 20px;
}
</style>
